import mysql.connector
import os
from dotenv import load_dotenv
import datetime
import discord

load_dotenv()

# SQL data
DATABASE = os.getenv('DB')
HOST = "localhost"
USER = "python"
PASSWORD = os.getenv('PASS')
TOKEN = os.getenv("DISCORD")
current = datetime.datetime.now()

# Baza
mydb = mysql.connector.connect(
    host=HOST,
    port=3306,
    user=USER,
    password=PASSWORD,
    database=DATABASE)

mycursor = mydb.cursor()

# Przetwarzanie danych z harmonogramu tylko o 3 rano
if current.strftime("%H")=='3':
    mycursor.execute("SELECT * FROM harmonogram;")
    harmoData = mycursor.fetchall()
    dayDict = {"Monday" : "a", "Tuesday": "b", "Wednesday" : "c", "Thursday" : "d", "Friday" : "e"}
    for row in harmoData:
        name = row[1]
        times = row[2].split(",")
        user = row[3]
        weight = row[4]

        unpack = []
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
        # Zamiana danych na format XX:00-YY:00
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
            nazwa = f"{name} - {hours}"
            sql = f"INSERT INTO zadania (status, waga, data, nazwa, parentID, uzytkownik) VALUES (1, {weight}, '{date}', '{nazwa}', 0, {user});"
            mycursor.execute(sql)
        mydb.commit()

toSend = []

mycursor.execute(f"SELECT nazwa, TIME(data), discord FROM zadania JOIN uzytkownicy ON uzytkownicy.ID=zadania.uzytkownik WHERE status!=100 AND DATE(data)='{current.strftime("%Y-%m-%d")}';")
zadData = mycursor.fetchall()

for zadanie in zadData:
    # To bedzie zmieniane u kazdego uzytkownika
    discordID = zadanie[2]
    if discordID!=0:
        msg = f"Pamiętaj o wykonaniu swojego zadania {zadanie[0]} o godzinie {zadanie[1]}!"
        toSend.append((discordID, msg))

# Nie chcialem sie meczyc z porownywaniem daty w pythonie bo latwiej to zrobic po prostu w SQL
mycursor.execute(f"SELECT nazwa, DATE(data), discord FROM zadania JOIN uzytkownicy ON uzytkownicy.ID=zadania.uzytkownik WHERE status!=100 AND DATE(data)<'{current.strftime("%Y-%m-%d")}';")
zadData = mycursor.fetchall()

for zadanie in zadData:
    # To bedzie zmieniane u kazdego uzytkownika
    discordID = zadanie[2]
    if discordID!=0:
        msg = f"Pamiętaj o wykonaniu swojego zaległego zadania {zadanie[0]} z dnia {zadanie[1]}!"
        toSend.append((discordID, msg))


# Wysylanie zapisanych wiadomosci przez bota
intents = discord.Intents.default()
intents.message_content = True
intents.members = True  # Needed to fetch users
client = discord.Client(intents=intents)
@client.event
async def on_ready():
    print(f"Logged in as {client.user}")
    for messageData in toSend:
        try:
            user = await client.fetch_user(messageData[0])
            await user.send(messageData[1])
            print("DM sent successfully!")
        except Exception as e:
            print(f"Failed to send DM: {e}")

    await client.close()  # Exit after sending

client.run(TOKEN)