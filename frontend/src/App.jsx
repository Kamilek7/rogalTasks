import { useState} from 'react'
import Page from './Page.jsx'
import Login from './login.jsx'
import './App.css'
import './css/fontello.css'
import { useCookies } from 'react-cookie'
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
  return <>
  
    <div id='logoContainer'><img draggable={false} src='..\assets\rogal.png'></img></div>


      {cookies.loginID ? <Page backendLink={backendLink} user={cookies.loginID} setCookie={setCookie} /> : <Login error={errorState} onLogin={handleLogin} />}


  </>
}

export default App
