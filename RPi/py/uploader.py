import time
import json
import requests
from pathlib import Path
HEADERS = {
    "Content-Type": "application/json",
}
PLACE = "1411"
URL = "https://www.48v.me/~mizunoshota/cgi-bin/MAC-Observer/upload_devices.py/?%s" % PLACE
_5MINUTES = 5 * 60  # 5分を秒単位で定義

__app_root = Path(__file__).parent.parent
devices_json_path = __app_root/"data"/"devices.json"
print(devices_json_path)


def send():
    if not devices_json_path.exists():
        return
    data = json.load(devices_json_path.open("r"))
    res = requests.post(URL, headers=HEADERS, json=data)
    print(res.text)


while True:
    send()
    time.sleep(_5MINUTES)
