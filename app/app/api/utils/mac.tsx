import { exec } from "node:child_process";
import os from "os";
import util from "util";
const execPromise = util.promisify(exec);

function getLanMacAddresses() {
  const platform = os.platform();
  if (platform === "win32") {
    return execWindowsARP();
  } else if (platform === "linux") {
    return execLinuxARP();
  }
  throw new Error("対応していないOSです。");
}

async function execWindowsARP() {
  const { stdout, stderr } = await execPromise("arp -a");
  if (stderr) throw new Error(`標準エラー: ${stderr}`);
  const macAddresses: { ip: string; mac: string }[] = [];
  const lines = stdout.split("\n");
  lines.forEach((line) => {
    const parts = line.split(" ").filter(Boolean);
    if (
      parts.length > 2 &&
      parts[1].match(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/)
    ) {
      macAddresses.push({ ip: parts[0], mac: parts[1] });
    }
  });

  return macAddresses;
}

async function execLinuxARP() {
  const { stdout, stderr } = await execPromise("arp -a");
  if (stderr) {
    throw new Error(`標準エラー: ${stderr}`);
  }

  const macAddresses: { ip: string; mac: string }[] = [];
  const lines = stdout.split("\n");
  lines.forEach((line) => {
    const parts = line.split(" ").filter(Boolean);
    if (
      parts.length > 3 &&
      parts[3].match(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/)
    ) {
      macAddresses.push({ ip: parts[1], mac: parts[3] });
    }
  });

  console.log("LinuxのLAN内のMACアドレス一覧:", macAddresses);
  return macAddresses;
}
function getMacAddress() {
  const networkInterfaces = os.networkInterfaces();

  for (let interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    if (!interfaces) {
      continue;
    }
    for (let iface of interfaces) {
      if (
        iface.family === "IPv4" &&
        iface.mac &&
        iface.mac !== "00:00:00:00:00:00" &&
        !iface.internal
      ) {
        return { ip: iface.address, mac: iface.mac };
      }
    }
  }

  throw new Error("MACアドレスが見つかりませんでした");
}

export { getLanMacAddresses, getMacAddress };
