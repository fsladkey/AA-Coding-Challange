import json
import os
from initial_state import INITIAL_STATE


class Store:
    "Simple json file manager"

    def __init__(self, filename):
        if os.path.exists(filename):
            self.file = open(filename, 'r+')
            self.data = json.loads(self.file.read())
        else:
            self.file = open(filename, 'w')
            self.data = INITIAL_STATE

    def __getitem__(self, key):
        return self.data[key]

    def __setitem__(self, key, val):
        self.data[key] = val
        return val

    def save(self):
        self.file.seek(0)
        self.file.write(json.dumps(self.data))
        self.file.truncate()
        self.file.close()
