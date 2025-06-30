import { useState, useEffect } from 'react'
import './App.css'
import './css/fontello.css'


function Login({onLogin}) {
    const [mode, setMode] = useState("login")
    const [login, setLogin] = useState("")
    const [haslo, setPass] = useState("")
    const validate = async(login1, password1) => {
        if (login1=="人")
            login1=login;
        if (password1=="人")
            password1=haslo

        const dane = {
            login: login1, haslo: password1
        }
        const url = "https://tasks-backend.rogal-rogal.duckdns.org/validateData"
        const options = {
            method: "POST",
            headers:  {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dane)
        }
        const response = await fetch(url, options);
        if (response.status!=207)
        {
            const data = await response.json();
            document.getElementById("errorCode").innerHTML = data.message;
            document.getElementById("submit").setAttribute("disabled", "");
        }
        else
        {
            document.getElementById("errorCode").innerHTML = "";
            document.getElementById("submit").removeAttribute("disabled");
        }
    }
    
    const register = async(login, password, e) => {
        e.preventDefault()
        const dane = {
            login: login, haslo: password
        }
        const url = "https://tasks-backend.rogal-rogal.duckdns.org/register"
        const options = {
            method: "POST",
            headers:  {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dane)
        }
        const response = await fetch(url, options);
        if (response.status==206)
        {
            onLogin({login:login, haslo:password, e:e});
        }
        else
        {
            const data = await response.json();
            document.getElementById("errorCode").innerHTML = data.message;
            document.getElementById("submit").setAttribute("disabled", "");
        }
        
    }
  return <>
  
  {mode=="login" &&<div><button onClick={()=>{setMode("register")}}>Zarejestruj się</button><div id='headInfo'>Zaloguj się do usługi:</div>
    <form onSubmit={(e) => {onLogin({login:login, haslo:haslo, e:e});}}>
        <div id='formDiv'>
            
            <span style={{color:"red", height:"3vh", textAlign:"center"}} id='errorCode'></span>
            <input onChange={(e) => {setLogin(e.target.value); validate(e.target.value, "人");}} type='text'></input>
            <input onChange={(e) => {setPass(e.target.value); validate("人",e.target.value);}} type='password'></input>
            <input id='submit' disabled type='submit' value='Zaloguj się'></input>
        </div>
    </form></div>
    }
      {mode=="register" &&<div><button onClick={()=>{setMode("login")}} >Zaloguj się</button><div id='headInfo'>Zarejestruj się:</div>
    <form onSubmit={(e) => {register(login, haslo, e);}}>
        <div id='formDiv'>
            
            <span style={{color:"red", height:"3vh", textAlign:"center"}} id='errorCode'></span>
            <input onChange={(e) => {setLogin(e.target.value); validate(e.target.value, "人");}} type='text'></input>
            <input onChange={(e) => {setPass(e.target.value); validate("人",e.target.value);}} type='password'></input>
            <input id='submit' disabled type='submit' value='Zaloguj się'></input>
        </div>
    </form></div>
    }
  </>
}

export default Login
