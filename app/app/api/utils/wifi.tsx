import wifi from "node-wifi";
import { promisify } from "util";
import os from 'os';

/**
 * 現在接続しているWi-FiのSSIDを取得する関数
 * @returns {Promise<string>} 現在接続しているSSIDを返す
 */
async function getCurrentSSID() {
  const networkInterfaces = os.networkInterfaces();
  let wifiInterface = null;

  // 現在のプラットフォームを取得
  const platform = os.platform();

  // プラットフォームごとにWi-Fiインターフェース名を特定
  if (platform === 'win32') {
    // Windowsの一般的なWi-Fiインターフェース名
    const possibleNames = ['Wi-Fi', 'Wireless Network Connection', 'WLAN'];
    wifiInterface = Object.keys(networkInterfaces).find(name => possibleNames.includes(name));
  } else if (platform === 'darwin') {
    // macOSの一般的なWi-Fiインターフェース名
    const possibleNames = ['en0', 'en1', 'en2'];
    wifiInterface = Object.keys(networkInterfaces).find(name => possibleNames.includes(name));
  } else {
    // Linuxの一般的なWi-Fiインターフェース名
    wifiInterface = Object.keys(networkInterfaces).find(name => name.startsWith('wlan') || name.startsWith('wl'));
  }

  if (!wifiInterface) {
    throw new Error('Wi-Fiインターフェースが見つかりません。');
  }

  // Wi-Fiモジュールを初期化（特定のWi-Fiインターフェースを指定）
  wifi.init({
    iface: wifiInterface, // 指定したWi-Fiインターフェースを使用
  });

  // コールバックベースの関数をプロミスベースに変換
  const getCurrentConnectionsAsync = promisify(wifi.getCurrentConnections).bind(wifi);

  try {
    // 現在のWi-Fi接続情報を取得
    const currentConnections = await getCurrentConnectionsAsync();

    if (currentConnections.length > 0) {
      const ssid = currentConnections[0].ssid;
      return ssid;
    } else {
      throw new Error("現在接続しているWi-Fiネットワークが見つかりません。");
    }
  } catch (error) {
    throw new Error(`ネットワーク情報の取得中にエラーが発生しました: ${error.message}`);
  }
}

export { getCurrentSSID };
