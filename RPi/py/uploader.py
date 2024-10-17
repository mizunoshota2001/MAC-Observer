import time
import urllib.request

HEADERS = {
    "Content-Type": "application/json",
}
PLACE = "1411"
POST_TO = "https://www.48v.me/~mizunoshota/cgi-bin/MAC-Observer/upload_devices.py/?%s" % PLACE
GET_FROM = "http://localhost:3000/api/getDevices"
_5MINUTES = 5 * 60


def send():
    try:
        req = urllib.request.Request(GET_FROM)
        body = urllib.request.urlopen(req)
        req = urllib.request.Request(
            POST_TO,
            data=body.read(),
            headers=HEADERS)
        urllib.request.urlopen(req)
    except Exception as e:
        print(e)


while True:
    send()
    time.sleep(_5MINUTES)
