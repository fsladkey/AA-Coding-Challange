import json


class Store:
    "Simple json file manager"

    def __init__(self, filename):
        self.file = open(filename, 'r+')
        self.data = json.loads(self.file.read())

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
