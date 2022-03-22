import os
from flask import Flask, send_from_directory, request, g, jsonify
import sqlite3
import json
import hashlib
import re
import secrets
import time
from flask_cors import CORS
from datetime import datetime, timedelta, timezone

app = Flask(__name__, static_folder='filmfest/server')

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

def authorized(paramID,paramKEY):
    #get our users accesstoken and its expiry
    data = query_db('SELECT accesstoken,tokenexpires FROM users WHERE id="'+paramID+'"')[0]
    #if our access token matches the token passed with the request
    if(paramKEY == data[0]):
        #if token expiry data is still in the future
        if(int(data[1]) > int(time.time())):
            print("not expired")
            return True #user is authorized
        else:
            print("expired")
            return False #user is not authorized
    else:
        print("key not matches")
        print(paramKEY,data[0])
        return False #user is not authorized

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
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
            try:
                os.mkdir('filmfest/server/users/'+str(query_db('select id from users where email="'+request.json['email']+'"')[0][0]))
            except:
                #TODO MAYBE HANDLING HERE BUT ASSUMING THIS IS JUST BECAUSE ACCOUNT DELETED FROM TABLE BUT ACCOUNTS SHOULD NEVER BE DELETED IT WOULD SHIFT EVERYTHING DOWN
                pass
            return 'created'
    except Exception as e:
        print(e)
        return 'error'

@app.route("/login", methods=["POST"])
def login():
    try:
        correct = query_db('select password from users where email="'+request.json['email']+'"')[0][0]
        provided = hashlib.sha256(request.json['password'].encode('utf-8')).hexdigest()
        if (correct == provided):
            key = secrets.token_hex(16)
            execute_db('update users set accesstoken="'+key+'" where email="'+request.json['email']+'"')
            epoch = int(time.time())
            expireamount = 86400 #expire time
            expiration = epoch + expireamount
            execute_db('update users set tokenexpires="'+str(expiration)+'" where email="'+request.json['email']+'"')
            
            data = query_db('select id,priv from users where email="'+request.json['email']+'"')[0]
            
            return json.dumps({"key":key,"expires":expiration,"id":str(data[0]),"priv":str(data[1])})
        else:
            return 'wrong'
    except:
        return 'An error has occurred'

@app.route("/refreshkey", methods=["POST"])
def refreshkey():
    if (authorized(request.json['id'],request.json['key'])):
        key = secrets.token_hex(16)
        execute_db('update users set accesstoken="'+key+'" where id="'+request.json['id']+'"')
        epoch = int(time.time())
        expireamount = 86400 #expire time
        expiration = epoch + expireamount
        execute_db('update users set tokenexpires="'+str(expiration)+'" where id="'+request.json['id']+'"')
        return json.dumps({"key":key,"expires":expiration})
    else:
        return 'wrong'

@app.route("/editprofile", methods=["POST"])
def editprofile():
    if(authorized(request.form['id'], request.form['key'])):
        try:
            if request.files["file"]:
                #if file
                uploaded_file = request.files["file"]

                extension = query_db('select pfp from users where id="'+request.form['id']+'"')[0][0]
                if(extension != None):
                    os.remove('filmfest/server/users/'+request.form['id']+"/pfp."+extension)
                uploaded_file.save("filmfest/server/users/" + request.form['id'] + "/pfp."+re.sub(r"\.(?![^.]*$)", "", uploaded_file.filename).split(".")[1])
                execute_db('update users set pfp="'+re.sub(r"\.(?![^.]*$)", "", uploaded_file.filename).split(".")[1]+'" where id='+request.form['id'])
        except Exception as e:
            #no file
            print(e)
            pass

        idd = request.form['id']
        first = request.form['first']
        last = request.form['last']
        bio = request.form['bio']
        key = request.form['key']

        execute_db('update users set first="'+first+'",last="'+last+'",bio="'+bio+'" where id="'+idd+'"')

        return "done"
    else:
        return "unauthorized"

@app.route("/videouploadpre", methods=["POST"])
def videouploadpre():
    if(authorized(request.json['userid'],request.json['userkey'])):
        return json.dumps([query_db('select id,name from projects where enabled="yes"')] + [query_db('select id,name from groups where type="class"')])
    else:
        return "unauthorized"

@app.route("/postvideo", methods=["POST"])
def postvideo():
    if(authorized(request.form['userid'],request.form['userkey'])):
        #upload to /server/users/uid/videoid.mp4
        videoid = query_db('select count(*) from videos')[0][0] + 1
        path = "filmfest/server/users/" + str(request.form['userid']) + "/" + str(videoid) + ".mp4"
        request.files["file"].save(path)
        execute_db('insert into videos (owner,path,views,project,class,description,title) values ("'+request.form['userid']+'","'+path+'","0","'+request.form['project']+'","'+request.form['class']+'","'+request.form['description']+'","'+request.form['title']+'")')
        return str(videoid)
    else:
        return "unauthorized"

@app.route("/videodata", methods=["POST"])
def videodata():
    try:
        videorow = query_db('select * from videos where id='+request.json['videoid'])[0]
        ownerdata = query_db('select id,first,last,priv,pfp from users where id='+videorow[1])
        
        owner = {
            "id":ownerdata[0][0],
            "first":ownerdata[0][1],
            "last":ownerdata[0][2],
            "priv":ownerdata[0][3],
            "pfp":ownerdata[0][4],
        }

        location = 'http://127.0.0.1:5000/' + str(videorow[2][9:])
        views = videorow[3]

        tags = []
        for item in (videorow[4].split(' ')):
            tags.append({
                "id":item,
                "name":query_db('select name from projects where enabled="yes" and id="'+item+'"')[0][0],
                "type":"project",
            })

        for item in (videorow[5].split(' ')):
            tags.append({
                "id":item,
                "name":query_db('select name from groups where enabled="yes" and type="class" and id="'+item+'"')[0][0],
                "type":"class"
            })

        title = videorow[7]
        description = videorow[6]

        videodata = {
            "owner":owner,
            "location":location,
            "views":views,
            "tags":tags,
            "title":title,
            "description":description,
        }

        execute_db('update videos set views="'+str(int(views) + 1) + '" where id="'+request.json['videoid']+'"')

        return json.dumps(videodata)
    except:
        return "notfound"

@app.route("/getreccomendations", methods=["POST"])
def getreccomendations():
    try:
        if(request.json['mode'] == 'recent'):
            items = query_db('select id,owner,path,views,title from videos order by id desc limit 30')
            
            finalist=[]
            for item in items:
                finalist.append({
                    "id":item[0],
                    "owner":item[1], #THIS TURN INTO ITS OWN ARRAY
                    "thumb":'http://127.0.0.1:5000/' + str(item[2][9:]) +"#t=1",
                    "views":item[3],
                    "title":item[4],
                })
            return json.dumps(finalist)
        #TODO REVISIT AND CREATE A RECCOMMENDED ALGORITHM POSSIBLY UTILIZING LOCAL STORAGE FOR VIEW HISTORY BUT FOR NOW RETURN RANDOM VIDEOS
        #TODO MAYBE MOVE THIS CODE TO THE VIDEO GET DATA SO ITS NOT USING MULTIPLE CALLS
        elif(request.json['mode'] == 'reccomended'):
            # TODO THIS IS HOW YOU WOULD NOT GET CURRENT VIDEO IN RETURN
            # select id,owner,path,views,title from videos where not id=1  order by random() limit 10
            items = query_db('select id,owner,path,views,title from videos order by random() limit 10')
            
            finalist=[]
            for item in items:
                finalist.append({
                    "id":item[0],
                    "owner":item[1], #THIS TURN INTO ITS OWN ARRAY
                    "thumb":'http://127.0.0.1:5000/' + str(item[2][9:]) +"#t=1",
                    "views":item[3],
                    "title":item[4],
                })
            return json.dumps(finalist)

    except Exception as e:
        print(e)
        return 'fail'

@app.route("/pdata", methods=["POST"])
def pdata():
    #starting data
    data = {
            "name":"",
            "bio":"",
            "badges":"",
            "owned":"false",
            "priv":"",
            "pfp":""
            #profile picture here eventually
    }
    #query for data
    profiledata = query_db('select distinct first,last,bio,priv,pfp from users where id="'+request.json['profileid']+'"')
    if(len(profiledata) > 0): #check if exists
        #update keys if its does
        data.update(first=str(profiledata[0][0]))
        data.update(last=str(profiledata[0][1]))
        data.update(bio=str(profiledata[0][2]))
        data.update(priv=str(profiledata[0][3]))

        grouplist = str(query_db('select distinct groups from users where id="'+request.json['profileid']+'"')[0][0]).split(' ')
        finalgroupstring = ""

        if(grouplist[0] != "None"):
            for groupid in grouplist:
                finalgroupstring += str(query_db('select name from groups where id='+groupid)[0][0]) + "_"
            data.update(badges=finalgroupstring[:-1])
        else:
            data.update(badges="")


        if(profiledata[0][4] == None):
            data.update(pfp="http://127.0.0.1:5000/users/defualt/pfp.jpeg")
        else:
            data.update(pfp="http://127.0.0.1:5000/users/"+request.json['profileid']+"/pfp."+str(profiledata[0][4]))
        
        items = query_db('select id,owner,path,views,title from videos where owner="'+request.json['profileid']+'"')
        finalist=[]
        for item in items:
            finalist.append({
                "id":item[0],
                "owner":item[1], #THIS TURN INTO ITS OWN ARRAY
                "thumb":'http://127.0.0.1:5000/' + str(item[2][9:]) +"#t=1",
                "views":item[3],
                "title":item[4],
            })
        data.update(content=finalist)

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
                    #authenticate the user
                    if(authorized(request.json['userid'],request.json['userkey'])):
                        data.update(owned="true")
                        return json.dumps(data)
                    else: #if not authorized
                        return 'unauthorized'
    else:
        return 'notexist'

@app.route('/admin')
def admin():
    priv = query_db('select priv from users where id='+request.json['id'])[0][0]
    if(authorized(request.json['id'], request.json['key']) and (priv == 'admin' or priv == 'dev')):
        if(request.json["action"] == 'ban'):
            execute_db('update users set priv="banned" where id="'+request.json['actionid']+'"')
            return "success"
    else:
        return "unauthorized"

@app.route("/userlist", methods=["POST"])
def userlist(): #THIS WILL NEED REDONE FOR SEARCH TERMS AND OTHER BS AND WHETHER OR NOT ADMIN IS CALLING IT POSSIBLY ADMIN CHANGES ONLY ON CLIENTSIDE
    #IF USER ASKING IS ADMIN SEND THEIR PRIV BACK WITH THEM AS VERIFICATION
    priv = query_db('select priv from users where id='+request.json['id'])[0][0]
    if(authorized(request.json['id'], request.json['key']) and (priv == 'admin' or priv == 'dev')):
        return json.dumps(query_db('select id,first,last,priv,pfp from users')) #TODO THIS NEEDS PAGIZATION
    else:
        return 'unauthorized'


if __name__ == '__main__':
    app.run(host='127.0.0.1', use_reloader=True, port=5000, threaded=True, debug=True)