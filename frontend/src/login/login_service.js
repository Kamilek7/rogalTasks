export async function sendRequest(backendLink, endpoint, dane) {
    const url = `${backendLink}${endpoint}`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dane)
    }
    const response = await fetch(url, options);
    return response;
}