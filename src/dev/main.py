import os
from flask import Flask, send_from_directory, request, g, jsonify
import sqlite3
import json
import hashlib
import secrets
import time
from flask_cors import CORS
from datetime import datetime, timedelta, timezone

app = Flask(__name__, static_folder='filmfest/build')

# global variables
DATABASE = "gerdy.db"
CORS(app)


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

@app.route('/signup', methods=["POST"])
def signup():
    try:
        if(query_db('SELECT * FROM users WHERE email="'+request.json['email']+'"') != []):
            return 'taken'
        else:
            execute_db('INSERT INTO users (first,last,email,password,bio,badges,priv) VALUES ("'+request.json['first']+'","'+request.json['last']+'","'+request.json['email']+'","'+(hashlib.sha256(request.json['password'].encode('utf-8')).hexdigest())+'","","","comment")')
            return 'created'
    except Exception as e:
        print(e)
        return 'error'

@app.route("/login", methods=["POST"])
def login():
    correct = query_db('select password from users where email="'+request.json['email']+'"')[0][0]
    provided = hashlib.sha256(request.json['password'].encode('utf-8')).hexdigest()
    if (correct == provided):
        key = secrets.token_hex(16)
        execute_db('update users set accesstoken="'+key+'" where email="'+request.json['email']+'"')
        epoch = int(time.time())
        expireamount = 86400 #expire time
        expiration = epoch + expireamount
        execute_db('update users set tokenexpires="'+str(expiration)+'" where email="'+request.json['email']+'"')
        return json.dumps({"key":key,"expires":expiration,"id":str(query_db('select id from users where email="'+request.json['email']+'"')[0][0])})
    else:
        return 'wrong'

@app.route("/refreshkey", methods=["POST"])
def refreshkey():
    if (request.json['key'] == query_db('SELECT accesstoken FROM users WHERE id="'+request.json['id']+'"')[0][0]):
        key = secrets.token_hex(16)
        execute_db('update users set accesstoken="'+key+'" where id="'+request.json['id']+'"')
        epoch = int(time.time())
        expireamount = 86400 #expire time
        expiration = epoch + expireamount
        execute_db('update users set tokenexpires="'+str(expiration)+'" where id="'+request.json['id']+'"')
        return json.dumps({"key":key,"expires":expiration})
    else:
        return 'wrong'

@app.route("/pdata", methods=["POST"])
def pdata():
    #TODO OPTIONAL COULD CHECK TOKEN EXPIRY WITH SERVER CACHED EXPIRY FOR ADDED SECURITY
    #starting data
    data = {
            "name":"",
            "bio":"",
            "badges":"",
            "owned":"false",
            "priv":""
            #profile picture here eventually
    }
    #query for data
    profiledata = query_db('select distinct first,last,bio,badges,priv from users where id="'+request.json['profileid']+'"')
    if(len(profiledata) > 0): #check if exists
        #update keys if its does
        data.update(name=str(profiledata[0][0] + " " + profiledata[0][1]))
        data.update(bio=str(profiledata[0][2]))
        data.update(badges=str(profiledata[0][3]))
        data.update(priv=str(profiledata[0][4]))

        #user is not authenticated
        if(request.json['userid'] == None or request.json['userkey'] == None):
                #return normal data telling them its not them
                return json.dumps(data)
        #user has given us some form of authentication
        else:
            #check if user is claiming this is them
            if(request.json['userid'] != request.json['profileid']):
                #they arent so just give them the data with owned=false
                return json.dumps(data)
            else: #user is claiming this is them
                #check for broken authentication
                #TODO THIS IS UNREACHABLE BEACUSE OF FIRST RETURN CHECK LOW PRIO
                if((request.json['userid'] == None and request.json['userkey'] != None) or (request.json['userid'] != None and request.json['userkey'] == None)):
                    return 'broken'
                else:
                    #authentication not broken
                    #get accesstoken cached for our userid
                    cached = query_db('select accesstoken from users where id="'+request.json['userid']+'"')[0][0]
                    provided = request.json['userkey']
                    #check if our access token for this user is what the server has cached for this user
                    if(cached != provided):
                        return 'unauthorized'
                    else: #if authorized
                        data.update(owned="true")
                        return json.dumps(data)
                        #return our data proving this is the owned users profile

    else:
        return 'notexist'
    
    
    

    
    

if __name__ == '__main__':
    app.run(host='127.0.0.1', use_reloader=True, port=5000, threaded=True, debug=True)