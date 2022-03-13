import os
from flask import Flask, send_from_directory, request, g, jsonify
import sqlite3
import json
from datetime import datetime, timedelta, timezone

app = Flask(__name__, static_folder='filmfest/build')

# global variables
DATABASE = "zoogs.db"


# connecting to our db
def get_db():
    try:
        db = getattr(g, "_database", None)
        if db is None:
            db = g._database = sqlite3.connect(DATABASE)
        return db
    except Exception as e:
        return e


# executing a db change
def execute_db(cmd):
    try:
        con = sqlite3.connect(DATABASE)
        c = con.cursor()
        c.execute(cmd)
        con.commit()
    except Exception as e:
        return e


# probing db for data
def query_db(query, args=(), one=False):
    try:
        cur = get_db().execute(query, args)
        rv = cur.fetchall()
        cur.close()
        return (rv[0] if rv else None) if one else rv
    except Exception as e:
        return e


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print('attempt')
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', use_reloader=True, port=5000, threaded=True, debug=True)