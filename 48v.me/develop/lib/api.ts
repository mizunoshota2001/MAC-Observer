async function getDevices(place: string) {
  try {
    const response = await fetch(
      `https://www.48v.me/~mizunoshota/cgi-bin/MAC-Observer/get_devices.py?${place}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch {
    return { known: [], unknown: [] };
  }
}

export { getDevices };
