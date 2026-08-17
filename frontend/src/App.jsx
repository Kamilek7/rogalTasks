import { createContext, useState } from 'react'
import Page from './page/page.jsx'
import Login from './login/login.jsx'
import './App.css'
import './css/fontello.css'
import { useCookies } from 'react-cookie'
import { AppContext } from './utils/AppContext.jsx'
import rogal from '../assets/rogal.png';
const backendLink = "https://tasks-backend.rogalrogalrogalrogal.online/"
function App() {
  const [cookies, setCookie] = useCookies(['loginID']);
  const login = (ID) => {
    setCookie("loginID", ID)
  }
  const logout = () => {
    setCookie("loginID", "")
  }
  return <>
    <AppContext.Provider value={{backendLink, userID: cookies.loginID, login, logout}}>
      <div className='top-0px w-[100%] mx-auto my-[0.5vw] border-dashed border-b-3 border-[var(--color-accent)] rounded-[0.5vw]' id='logoContainer'>
        <img className='my-[1vw] mx-auto w-[calc(17vh+4vw)] block' draggable={false} src={rogal}></img>
      </div>
      {cookies.loginID ? <Page /> : <Login />}
    </AppContext.Provider>
  </>
}

export default App
