from flask import Flask, request
from flask_cors import CORS,cross_origin
from flask import Flask,jsonify
# from pymongo import json_util  # import bson json utilities
import json

from pymongo import MongoClient

# Establish connection
client = MongoClient('localhost', 27017)

# Check if the connection was successful
if client.server_info():
    db = client.awt
    collection = db.users

    # Perform a basic operation to validate the connection
    count = collection.count_documents({})
    print(f"Connected to MongoDB Atlas. Found {count} documents in the 'users' collection.")
else:
    print("Failed to connect to the MongoDB Atlas cluster.")


app = Flask(__name__)
CORS(app,supports_credentials=True)

@cross_origin(supports_credentials=True)
@app.route("/")
def hello_world():
    response = {
        "message": "Hello, World!"
    }
    return jsonify(response)


@cross_origin(supports_credentials=True)
@app.route('/newlogin/<userid>', methods=['POST'])
def newlogin(userid):
    userid = request.json['userid']
    password = request.json['password']
    # query the database for matching user
    user = collection.find_one({'userid': userid, 'password': password})
    print(user)

    if user:
       # print("yessss")
        return "success"
    else:
        print("nooooo")
        return jsonify({'success': False, 'message': 'Invalid username or password'})

@cross_origin(supports_credentials=True)
@app.route("/login", methods=["POST"])
def login(): 
    id = request.json['id']
    password = request.json['password']
  #  cpassword = request.json['cpassword']
    existing_user = collection.find_one({'userid': id})

    if existing_user:
        return jsonify({'success': False, 'message': 'Id already exists Try Login!'})
    else:
        collection.insert_one({'userid': id, 'password': password})
        return "success"


@cross_origin(supports_credentials=True)
@app.route("/add_student/<userid>", methods=["PUT"])
def add_student(userid): 
    d=request.get_json()
    print(d)
    del d['id']
    collection.update_one({"userid": userid}, {"$set": d})
    return {"Success":True,'Message': 'Student Data Updated.'}, 200

@app.route("/view_student/<userId>", methods=["GET"])
def view_student(userId):
    user = collection.find_one({"userid": userId})
    print(user)
    if user:
        del user["_id"]  # Remove MongoDB ObjectId
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404
    
@app.route("/view_all/<userId>", methods=["GET"])
def view_all(userId):
    user = collection.find_one({"userid": userId})
    print(user)
    if user:
        del user["_id"]  # Remove MongoDB ObjectId
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404

@app.route("/delete_student/<userid>", methods=["DELETE"])
def delete_student(userid):
    try:
        # Delete the document with the provided userid
        result = collection.delete_one({"userid": userid})

        # Check if a document was deleted successfully
        if result.deleted_count == 1:
            return jsonify({"message": f"User with id {userid} deleted successfully"}), 200
        else:
            return jsonify({"message": f"User with id {userid} not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/update_student/<string:userid>', methods=['PUT'])
def update_student(userid):
    d=request.get_json()
    print(d)
    del d['id']
    collection.update_one({"userid": userid}, {"$set": d})
    return {"Success":True,'Message': 'Student Data Updated.'}, 200
    

@app.route('/get_student/<string:userid>', methods=['GET'])
def get_student(userid):
    # Find the student in the database
    student = collection.find_one({'userid': userid})
    del student['_id']
    print(student)
    if student:
        # Return the student data as a JSON response
        return student
    else:
        # Return a 404 error if the student is not found
        return {'error': 'Student not found'}, 404

    

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=5001)


