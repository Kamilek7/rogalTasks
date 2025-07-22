import { useState, useEffect, useRef } from 'react'
import './App.css'
import './css/fontello.css'


function Login({error, onLogin}) {
    const [mode, setMode] = useState("login")
    const loginRef = useRef(null);
    const passRef = useRef(null);

    const validate = async() => {
        const dane = {
            login: loginRef.current?.value, haslo: passRef.current?.value
        }
        const url = "https://tasks-backend.rogalrogalrogalrogal.online/validateData"
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
            document.getElementById("errorCode").innerHTML = error;
            document.getElementById("submit").removeAttribute("disabled");
        }
    }
    
    const register = async(e) => {
        e.preventDefault()
        const dane = {
            login: loginRef.current?.value, haslo: passRef.current?.value
        }
        const url = "https://tasks-backend.rogalrogalrogalrogal.online/register"
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
            onLogin({login:loginRef.current?.value, haslo:passRef.current?.value, e:e});
        }
        else
        {
            const data = await response.json();
            document.getElementById("errorCode").innerHTML = data.message;
            document.getElementById("submit").setAttribute("disabled", "");
        }
        
    }

    useEffect(()=>{
        setTimeout(() =>{
            validate(loginRef.current?.value, passRef.current?.value)
        }, 400)
        
    })
    

  return <>
  
    <div><button onClick={()=>{mode=="login"? setMode("register"):setMode("login")}}>{mode=="login"?"Zarejestruj się":"Zaloguj się"}</button><div id='headInfo'>{mode=="login"?"Zaloguj się do usługi:":"Zarejestruj się:"}</div>
    <form onSubmit={(e) => {mode=="login"? onLogin({login:loginRef.current?.value, haslo:passRef.current?.value, e:e}):register(e)}}>
        <div id='formDiv'>
            
            
            <span style={{color:"red", height:"3vh", textAlign:"center"}} id='errorCode'>{error}</span>
            <label >Login</label>
            <input ref={loginRef} onChange={(e) => {validate()}} type='text'></input>
            <label >Hasło</label>
            <input ref={passRef} id="pass" onChange={(e) => {validate()}} type='password'></input>
            <input id='submit' disabled type='submit' value={mode=="login"?"Zaloguj się":"Zarejestruj się"}></input>
        </div>
    </form></div>
  </>
}

export default Login
