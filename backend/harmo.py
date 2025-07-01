import mysql.connector
import os
from dotenv import load_dotenv
import datetime

load_dotenv()

# SQL data
DATABASE = os.getenv('DB')
HOST = "localhost"
USER = "python"
PASSWORD = os.getenv('PASS')
mydb = mysql.connector.connect(
    host=HOST,
    port=3306,
    user=USER,
    password=PASSWORD,
    database=DATABASE)
mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM harmonogram;")
harmoData = mycursor.fetchall()
dayDict = {"Monday" : "a", "Tuesday": "b", "Wednesday" : "c", "Thursday" : "d", "Friday" : "e"}

for row in harmoData:
    name = row[1]
    times = row[2].split(",")
    user = row[3]
    weight = row[4]

    unpack = []
    current = datetime.datetime.now()
    dayName = current.strftime("%A")
    let = dayDict[dayName]
    for code in times:
        letter = code[0]
        if letter == let:
            unpack.append(int(code[1:]))
    unpack.sort()
    unpack.append(0)

    new = []
    lent = len(unpack)
    first = unpack[0]
    for i in range (lent):
        if i>0:
            if unpack[i] != unpack[i-1]+1:
                if unpack[i-1] !=first:
                    new.append(f"{first+9}:00-{unpack[i-1]+10}:00")
                else:
                    new.append(f"{first+9}:00-{first+10}:00")
                first = unpack[i]
    for hours in new:
        date = f"{current.strftime("%Y-%m-%d")} {hours[:5]}"
        if current.strftime("%H")=='3':

            nazwa = f"{name} - {hours}"
            sql = f"INSERT INTO zadania (status, waga, data, nazwa, parentID, uzytkownik) VALUES (1, {weight}, '{date}', '{nazwa}', 0, {user});"
            mycursor.execute(sql)
    mydb.commit()
