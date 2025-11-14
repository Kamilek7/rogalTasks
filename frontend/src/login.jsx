import { useState, useRef, useEffect } from 'react'
import './App.css'
import './css/fontello.css'


function Login({backendLink, error, onLogin}) {
    const [mode, setMode] = useState("login")
    const loginRef = useRef(null);
    const passRef = useRef(null);

    const validate = () => {

        let msg = "";
        if (loginRef.current?.value=='' && passRef.current?.value=='')
            msg = "Wpisz login i hasło!";
        else if (loginRef.current?.value=='')
            msg = "Wpisz login!";
        else if (passRef.current?.value=='')
            msg = "Wpisz hasło!"

        if (msg!="")
        {
            document.getElementById("errorCode").innerHTML = msg;
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
        const url = `${backendLink}register`
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
        validate();
    },[])

  return <>
  
    <div><button onClick={()=>{mode=="login"? setMode("register"):setMode("login")}}>{mode=="login"?"Zarejestruj":"Zaloguj"}</button><div id='headInfo'>{mode=="login"?"Zaloguj się do usługi:":"Zarejestruj się:"}</div>
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
