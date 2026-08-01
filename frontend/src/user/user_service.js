// Zrobic z tego potem metode ogolnodostepna, razem z tym co jest zadaniach

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

export function userManager(id, backendLink, zamknijOkno, logout, callback) {

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
