#!../../../.venv/bin/python
# -*- coding:utf-8 -*-
import os
import cgitb
import json
import sys
from pathlib import Path
__parent = Path(__file__).parent
cgitb.enable()


def main():
    try:
        body = json.load(sys.stdin)
        place = sys.argv[1]
        file = __parent/"data"/f"{place}.json"
        os.umask(0)
        file.parent.mkdir(parents=True, exist_ok=True, mode=0o777)
        file.touch(exist_ok=True, mode=0o777)
        json.dump(body, file.open("w"))
        return json.dumps({"success": 1})
    except Exception as e:
        return json.dumps({"success": 0, "error": str(e)})


if __name__ == "__main__":
    print("Content-Type: application/json\n\n%s" % main())
