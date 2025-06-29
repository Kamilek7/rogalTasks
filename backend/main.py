from flask import request, jsonify, json
from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "python"
app.config['MYSQL_PASSWORD'] = os.getenv('PASS')
app.config['MYSQL_DB'] = os.getenv('DB')
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)


@app.route("/zadania/<string:DATE>", methods=["GET"])
def get_tasks(DATE):
    where = ""
    if (DATE!="any"):
        where = (f"HAVING date(parents.data)='{DATE}' ")
    cursor = mysql.connection.cursor()
    cursor.execute(f"SELECT parents.*, JSON_ARRAYAGG(JSON_OBJECT('ID', children.ID)) AS children FROM (SELECT * FROM zadania WHERE status!=100) AS parents LEFT JOIN (SELECT * FROM zadania WHERE status!=100) AS children ON parents.ID=children.parentID GROUP BY ID {where}ORDER BY data ASC;")
    temp = cursor.fetchall()
    cursor.close()
    return jsonify({"zadania" : temp})

@app.route("/noweZadanie", methods=["POST"])
def addTask():
    nazwa = request.json.get("nazwa")
    data = request.json.get("data")
    rodzic = request.json.get("rodzic")
    waga = request.json.get("waga")

    if nazwa and data and rodzic and waga:
        cursor = mysql.connection.cursor()
        cursor.execute(f"INSERT INTO zadania (status, uzytkownik, nazwa, data, parentID, waga) VALUES (1, 1, '{nazwa}', '{data}', {rodzic}, {waga})")
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message":"Udalo sie dodac zadanie!"}), 201
    else:
        return jsonify({"message" : "Musisz wypełnić wszystkie dane w formularzu!"}),400
    
@app.route("/usunZadanie/<int:ID>", methods=["DELETE"])
def usunZadanie(ID):
    if ID:
        cursor = mysql.connection.cursor()
        cursor.execute(f"DELETE FROM zadania WHERE ID={ID}")
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message":"Udalo sie usunac zadanie!"}), 202
    
@app.route("/wykonajZadanie/<int:ID>", methods=["PATCH"])
def wykonajZadanie(ID):
    if ID:
        cursor = mysql.connection.cursor()
        cursor.execute(f"UPDATE zadania SET status=100 WHERE ID={ID}")
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message":"Udalo sie wykonac zadanie!"}), 203
    
@app.route("/harmonogram/<int:ID>", methods=["GET"])
def wyslijHarmo(ID):
    if ID:
        cursor = mysql.connection.cursor()
        cursor.execute(f"SELECT * FROM harmonogram WHERE uzytkownik={ID};")
        temp = cursor.fetchall()
        cursor.close()
        return jsonify({"harmonogram" : temp})
    
@app.route("/harmonogramCreate/<int:IDuser>", methods=["POST"])
def noweHarmo(IDuser):
    nazwa = request.json.get("nazwa")
    dni = request.json.get("dniD")
    waga = request.json.get("waga")
    if IDuser and nazwa and dni and waga:
        cursor = mysql.connection.cursor()
        cursor.execute(f"INSERT INTO harmonogram (nazwa, dni, waga, uzytkownik) VALUES ('{nazwa}', '{dni}', {waga}, {IDuser})")
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message" :"Udalo sie dodać nowy plan do harmonogramu!"}),204
    else:
        return jsonify({"message" :"Nie udalo sie dodać nowego planu do harmonogramu!"}),401

@app.route("/harmonogramEdit/<int:ID>", methods=["PATCH"])
def edytujHarmo(ID):
    nazwa = request.json.get("nazwa")
    dni = request.json.get("dniD")
    waga = request.json.get("waga")
    if ID:
        cursor = mysql.connection.cursor()
        cursor.execute(f"UPDATE harmonogram SET nazwa='{nazwa}', dni='{dni}', waga={waga} WHERE ID={ID}")
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message":"Udalo sie wykonac zadanie!"}), 205

if __name__ == "__main__":
    app.run(host='192.168.1.94', debug=True)