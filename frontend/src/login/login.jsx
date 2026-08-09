import { useState, useEffect } from 'react'
import { LoginData } from './login_helpers';
import Button from '../utils/button.jsx'
import ErrorBar from '../utils/errorBar.jsx';
import FancyLabel from '../utils/fancyLabel.jsx';

function Login({backendLink, setCookie}) {
    const [mode, setMode] = useState("login")
    const {loginRef, passRef, errorState, login, validate, register} = LoginData(backendLink, setCookie)

    useEffect(() => {
        validate();
    }, [])

    return <>
        <div>
            <Button clickFunc={() => { mode == "login" ? setMode("register") : setMode("login")}}>{mode == "login" ? "Zaloguj się do usługi:" : "Zarejestruj się:"}</Button>
            <form onSubmit={(e) => { mode == "login" ? login(e) : register(e) }}>
                <div className='[&>*]:m-auto [&>*]:block [&>*]:mb-[4vh] w-fit m-auto'>
                    <ErrorBar>{errorState}</ErrorBar>
                    <div className='relative left-[-1.5rem]'>
                        <FancyLabel>Login</FancyLabel>
                        <input ref={loginRef} onChange={(e) => { validate() }} type='text'></input>
                    </div>
                    <div className='relative left-[-1.5rem]'>
                        <FancyLabel>Hasło</FancyLabel>
                        <input ref={passRef} id="pass" onChange={(e) => { validate() }} type='password'></input>
                    </div>

                    <input className='mt-[3vh]' id='submit' disabled type='submit' value={mode == "login" ? "Zaloguj się" : "Zarejestruj się"}></input>
                </div>
            </form>
        </div>
    </>
}

export default Login