// Zrobic z tego potem metode ogolnodostepna, razem z tym co jest zadaniach
import { AppContext } from '../utils/AppContext.jsx'
import { useContext } from 'react'

async function sendRequest(id, backendLink, callback, method, endpoint, body = null)
{
    const url = `${backendLink}${endpoint}/${id}`;
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
    }
    if (body!= null) options.body = body
    const response = await fetch(url, options)
    if (callback!=null)
        setTimeout(async () => {
            callback();
        }, 1000)
}

export function userManager(zamknijOkno, callback) {

    const backendLink = useContext(AppContext).backendLink;
    const id = useContext(AppContext).userID;
    const logout = useContext(AppContext).logout;

    const removeAcc = async () =>
    {
        sendRequest(id, backendLink, null, "DELETE", "userRemove")
        zamknijOkno();
        logout();
    }

    const update = async (element) =>
    {
        const dane = {
            what: element.nameSQL,
            value: element.value
        }
        sendRequest(id, backendLink, callback, "PATCH", "userChange", JSON.stringify(dane))
    }
    return {removeAcc, update}
}
