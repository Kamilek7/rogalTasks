import { useRef, useState, useContext } from 'react'
import { sendRequest } from './login_service';
import { AppContext } from '../utils/AppContext.jsx'

export function LoginData() {
    const loginRef = useRef(null);
    const passRef = useRef(null);
    const [errorState, setError] = useState("");
    const backendLink = useContext(AppContext).backendLink;
    const loginF = useContext(AppContext).login;
    const login = async (e) => {
        e.preventDefault()
        const dane = {
            login: loginRef.current?.value,
            haslo: passRef.current?.value
        }
        const response = await sendRequest(backendLink, "login", dane)
        const loginData = await response.json();
        if (response.status == 208) {
            setError("");
            loginF(loginData.dane)
        }
        else setError(loginData.message);
    }
    const validate = () => {
        let msg = "";
        if (loginRef.current?.value == '' && passRef.current?.value == '')
            msg = "Wpisz login i hasło!";
        else if (loginRef.current?.value == '')
            msg = "Wpisz login!";
        else if (passRef.current?.value == '')
            msg = "Wpisz hasło!"
        if (msg != "") {
            document.getElementById("error-message-form").innerHTML = msg;
            document.getElementById("submit").setAttribute("disabled", "");
        }
        else {
            document.getElementById("error-message-form").innerHTML = errorState;
            document.getElementById("submit").removeAttribute("disabled");
        }
    }
    const register = async (e) => {
        e.preventDefault()
        const dane = {
            login: loginRef.current?.value,
            haslo: passRef.current?.value
        }
        const response = await sendRequest(backendLink, "register", dane)
        if (response.status == 206) {
            login(e);
        }
        else {
            const data = await response.json();
            document.getElementById("error-message-form").innerHTML = data.message;
            document.getElementById("submit").setAttribute("disabled", "");
        }
    }
    return { loginRef, passRef, errorState, login, validate, register }
}
