import time
import json
import urllib.request
from pathlib import Path

HEADERS = {
    "Content-Type": "application/json",
}
PLACE = "1411"
URL = "https://www.48v.me/~mizunoshota/cgi-bin/MAC-Observer/upload_devices.py/?%s" % PLACE
_5MINUTES = 5 * 60  # 5分を秒単位で定義

__app_root = Path(__file__).parent.parent
devices_json_path = __app_root / "data" / "devices.json"
print(devices_json_path)


def send():
    try:
        if not devices_json_path.exists():
            return
        data = json.load(devices_json_path.open("r"))
        data = json.dumps(data).encode('utf-8')
        req = urllib.request.Request(URL, data=data, headers=HEADERS)
        with urllib.request.urlopen(req) as res:
            print(res.read().decode('utf-8'))
    except Exception as e:
        print(e)


while True:
    send()
    time.sleep(_5MINUTES)
