import { useState } from 'react'
export async function getData(backendLink, endpoint, endpointInfo) {
    const response = await fetch(`${backendLink}${endpoint}/${endpointInfo}`);
    const data = await response.json();
    return data
}

export function useFetchedData(backendLink, user) {
    const [zadania, pobierz] = useState([]);
    const [userData, userSet] = useState([]);
    const [harmonogram, harmoSet] = useState("")
    const [specificDate, setSpecificDate] = useState("any")

    const pobierzUser = async () => {
        const data = await getData(backendLink, "userData", user)
        userSet(data.dane);
    }

    const pobierzZadania = async (date) => {
        const data = await getData(backendLink, `zadania/${user}`, date)
        pobierz(data.zadania);
    }

    const pobierzHarmonogram = async () => {
        const data = await getData(backendLink, `harmonogram`, user)
        harmoSet(data.harmonogram);
    }

    const update = (date = specificDate) => {
        setSpecificDate(date)
        pobierzZadania(date);
        pobierzHarmonogram();
        pobierzUser();
    }

    return { update, zadania, userData, harmonogram, specificDate }
}