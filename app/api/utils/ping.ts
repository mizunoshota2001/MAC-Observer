import { exec } from "node:child_process";
import util from "util";
import ping from "ping";
import os from "os";

const execPromise = util.promisify(exec);

/**
 * 指定されたサブネット内の有効なIPアドレスリストを生成します。
 * @param subnet - サブネットのプレフィックス（例: '192.168.1'）
 * @param start - 開始ホスト番号
 * @param end - 終了ホスト番号
 * @returns IPアドレスの配列
 */
function generateIPList(
  subnet: string,
  start: number = 1,
  end: number = 254
): string[] {
  const ipList: string[] = [];
  for (let i = start; i <= end; i++) {
    ipList.push(`${subnet}.${i}`);
  }
  return ipList;
}

/**
 * 指定されたIPアドレスにPingを実行します。
 * @param ip - Pingを実行するIPアドレス
 * @param timeout - タイムアウト時間（秒）
 * @returns IPが生存しているかどうか
 */
async function pingIP(ip: string, timeout: number = 2): Promise<boolean> {
  try {
    const res = await ping.promise.probe(ip, {
      timeout: timeout,
      // 必要に応じてオプションを追加
    });
    return res.alive;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error pinging ${ip}:`, error.message);
    } else {
      console.error(`Error pinging ${ip}:`, error);
    }
    return false;
  }
}

/**
 * 並列処理を管理し、指定された関数を適用します。
 * @param poolLimit - 同時に実行するタスクの数
 * @param array - 処理対象の配列
 * @param iteratorFn - 各要素に対して実行する非同期関数
 * @returns 全てのプロミスが解決された結果の配列
 */
async function asyncPool<T, R>(
  poolLimit: number,
  array: T[],
  iteratorFn: (item: T) => Promise<R>
): Promise<R[]> {
  const ret: Promise<R>[] = [];
  const executing: Promise<void>[] = [];

  for (const item of array) {
    const p: Promise<R> = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    const e: Promise<void> = p.then(() => {
      executing.splice(executing.indexOf(e), 1);
    });
    executing.push(e);

    if (executing.length >= poolLimit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(ret);
}

async function flush(): Promise<void> {
  const platform = os.platform();
  if (platform === "win32") {
    try {
      const { stderr } = await execPromise("arp -d");
      if (stderr) {
        throw new Error(stderr);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error flushing ARP cache:", error.message);
      } else {
        console.error("Error flushing ARP cache:", error);
      }
    }
  } else if (platform === "linux") {
    try {
      const { stderr } = await execPromise("/usr/bin/sudo /usr/sbin/ip neigh flush all");
      if (stderr) {
        throw new Error(stderr);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error flushing ARP cache:", error.message);
      } else {
        console.error("Error flushing ARP cache:", error);
      }
    }
  } else {
    console.error("対応していないOSです。");
  }
}

/**
 * 全IPアドレスにPingを送信し、応答があったIPをリストアップします。
 * @param subnet - サブネットのプレフィックス（例: '192.168.1'）
 * @param options - オプション設定
 * @returns 応答があったIPアドレスの配列
 */
interface PingOptions {
  timeout?: number;
  concurrencyLimit?: number;
  start?: number;
  end?: number;
}

async function pingAllIPs(
  subnet: string,
  options: PingOptions = {}
): Promise<string[]> {
  const { timeout = 1, concurrencyLimit = 255, start = 1, end = 254 } = options;
  await flush();
  const ipList = generateIPList(subnet, start, end);
  const aliveIPs: string[] = [];

  // Pingを実行するためのラッパー関数
  const pingWrapper = async (ip: string): Promise<void> => {
    const isAlive = await pingIP(ip, timeout);
    if (isAlive) {
      aliveIPs.push(ip);
    }
  };

  await asyncPool(concurrencyLimit, ipList, pingWrapper);
  return aliveIPs;
}

// モジュールとしてインポートされた場合は、必要な関数をエクスポート
export { pingAllIPs };
