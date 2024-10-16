async function getDevices() {
  const response = await fetch("/api/getDevices");
  if (!response.ok) {
    throw new Error("ネットワークの応答が正常ではありません");
  }
  return response.json();
}
async function getHost() {
  const response = await fetch("/api/getHost");
  if (!response.ok) {
    throw new Error("ネットワークの応答が正常ではありません");
  }
  return response.json();
}

function setDeviceName(name: string, mac: string | undefined) {
  fetch("/api/setDeviceName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, mac: mac }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ネットワークの応答が正常ではありません");
    }
    location.reload();
  });
}

function arpFlush(btn: EventTarget & HTMLButtonElement) {
  btn.disabled = true;
  fetch("/api/arpFlush", {
    method: "GET",
    cache: "no-store",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ネットワークの応答が正常ではありません");
    }
    location.reload();
  });
}

export { getDevices, getHost, setDeviceName, arpFlush };