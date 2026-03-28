import { useState} from 'react'
import Page from './Page.jsx'
import Login from './login.jsx'
import './App.css'
import './css/fontello.css'
import { useCookies } from 'react-cookie'
import rogal from '../assets/rogal.png';
const backendLink = "https://tasks-backend.rogalrogalrogalrogal.online/"
function App() {
  const [cookies, setCookie] = useCookies(['loginID']);
  const [errorState, setError] = useState("");

  const handleLogin = async (data) => {
    data.e.preventDefault()
    const dane = {
      login: data.login, haslo: data.haslo
    }
    const url = `${backendLink}login`
    const options = {
      method: "POST",
      headers:  {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(dane)
    }
    const response = await fetch(url, options);
    const loginData = await response.json();
    if (response.status==208){
      setError("");
      setCookie('loginID', loginData.dane);
    }
    else
    {
      setError(loginData.message);
    }

  }
  function goFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { // Webkit
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
    document.documentElement.msRequestFullscreen();
  }
}

  return <>
  
    <div id='logoContainer' onClick={goFullScreen}><img draggable={false} src={rogal}></img></div>


      {cookies.loginID ? <Page backendLink={backendLink} user={cookies.loginID} setCookie={setCookie} /> : <Login backendLink={backendLink} error={errorState} onLogin={handleLogin} />}


  </>
}

export default App
