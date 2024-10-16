#!../../../.venv/bin/python
# -*- coding:utf-8 -*-
import sys
from pathlib import Path


def main():
    place = sys.argv[1]
    file = Path(f"./data/{place}.json")
    return file.read_text()


if __name__ == "__main__":
    print("Content-Type: application/json\n\n%s" % main())
