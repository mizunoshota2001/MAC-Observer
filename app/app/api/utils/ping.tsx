// ping-all.js

import ping from "ping";

/**
 * 指定されたサブネット内の有効なIPアドレスリストを生成します。
 * @param {string} subnet - サブネットのプレフィックス（例: '192.168.1'）
 * @param {number} [start=1] - 開始ホスト番号
 * @param {number} [end=254] - 終了ホスト番号
 * @returns {string[]} IPアドレスの配列
 */
function generateIPList(subnet, start = 1, end = 254) {
  const ipList = [];
  for (let i = start; i <= end; i++) {
    ipList.push(`${subnet}.${i}`);
  }
  return ipList;
}

/**
 * 指定されたIPアドレスにPingを実行します。
 * @param {string} ip - Pingを実行するIPアドレス
 * @param {number} timeout - タイムアウト時間（秒）
 * @returns {Promise<boolean>} IPが生存しているかどうか
 */
async function pingIP(ip, timeout = 2) {
  try {
    const res = await ping.promise.probe(ip, {
      timeout: timeout,
      // 必要に応じてオプションを追加
    });
    return res.alive;
  } catch (error) {
    console.error(`Error pinging ${ip}:`, error);
    return false;
  }
}

/**
 * 並列処理を管理し、指定された関数を適用します。
 * @param {number} poolLimit - 同時に実行するタスクの数
 * @param {Array} array - 処理対象の配列
 * @param {Function} iteratorFn - 各要素に対して実行する非同期関数
 * @returns {Promise<*>} 全てのプロミスが解決された結果の配列
 */
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

/**
 * 全IPアドレスにPingを送信し、応答があったIPをリストアップします。
 * @param {string} subnet - サブネットのプレフィックス（例: '192.168.1'）
 * @param {Object} [options] - オプション設定
 * @param {number} [options.timeout=2] - Pingのタイムアウト時間（秒）
 * @param {number} [options.concurrencyLimit=50] - 同時に実行するPingの数
 * @returns {Promise<string[]>} 応答があったIPアドレスの配列
 */
async function pingAllIPs(subnet: string, options = {}) {
  const { timeout = 0.001, concurrencyLimit = 255, start = 1, end = 254 } = options;

  const ipList = generateIPList(subnet, start, end);
  const aliveIPs = [];

  // Pingを実行するためのラッパー関数
  const pingWrapper = async (ip) => {
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
