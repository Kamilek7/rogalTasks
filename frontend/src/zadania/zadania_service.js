import { AppContext } from '../utils/AppContext.jsx'
import { useContext } from 'react'

export async function sendRequest(id, backendLink, callback, method, endpoint, body = null)
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
    return response;
}


// To nie jest do konca hook, ale może w przyszlosci cos sie doda
export function useRequestActions(id, callback, applyCSS) {
    const backendLink = useContext(AppContext).backendLink;
    const removeTask = async () => {
        applyCSS();
        sendRequest(id, backendLink, callback, "DELETE", "usunZadanie")
    }
    const completeTask = async () => {
        applyCSS();
        sendRequest(id, backendLink, callback, "PATCH", "wykonajZadanie")
    }
    const updateTaskInfo = async (nazwa, data) => {
        const dane = {
            nazwa, data
        }
        sendRequest(id, backendLink, null, "PATCH", "updateTaskInfo", JSON.stringify(dane))
    }
    return {removeTask, completeTask, updateTaskInfo}

}