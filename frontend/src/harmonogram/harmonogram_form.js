import { useState, useEffect, useReducer, useContext } from "react"
import { removeHarmonogram, createHarmonogram, editHarmonogram, prepareDataToSubmit } from './harmonogram_service.js'
import { Dzien, findIDOfE } from "./harmonogram_helpers.js"
import { infoStateReducer, initialInfoState } from "./harmonogram_infoState.js"
import { dayStateReducer, initialDayState } from "./harmonogram_dayState.js"
import { AppContext } from '../utils/AppContext.jsx'

export function useHarmonogramForm(harmonogram, zamknijOkno, blad, callback) {

    const backendLink = useContext(AppContext).backendLink;
    const userID = useContext(AppContext).userID;
    const [infoState, dispatchInfo] = useReducer(infoStateReducer, initialInfoState)
    const [dayState, dispatchDay] = useReducer(dayStateReducer, initialDayState)
    const intervalModeMap = [{ nazwa: "Dni", type: "daily", val: "0" }, { nazwa: "Tygodnie", type: "weekly", val: "1" }];
    const [reset, resetThisSH] = useState(false);
    const [dniTygodnia, setDniTygodnia] = useState([new Dzien({ nazwa: "Poniedziałek" }), new Dzien({ nazwa: "Wtorek" }), new Dzien({ nazwa: "Środa" }), new Dzien({ nazwa: "Czwartek" }), new Dzien({ nazwa: "Piątek" }), new Dzien({ nazwa: "Sobota" }), new Dzien({ nazwa: "Niedziela" })]);
    const defaultHarmo = { nazwa: "Nazwa", dni: [] };
    const updateDni = (id, changes) => {
        setDniTygodnia(prev =>
            prev.map(dni =>
                dni.id === id ? dni.copy(changes) : dni));
    }

    function closeWindow() {
        setH("new")
        resetThisSH(!reset)
        zamknijOkno();
        callback();
    }

    const removeH = async (ID) => {
        const response = await removeHarmonogram(backendLink, ID);
        closeWindow()
    }

    const parseToDay = (dni) => {
        dispatchDay({
            type: "FULL_CHANGE",
            payload: {
                data: dni.date,
                dayTime: dni.time,
                intervalMode: 0,
                intervalVal: dni.interval
            }
        })
    }
    
    const parseToWeek = (dni) => {
        dispatchDay({
            type: "INTERVALS",
            payload: {
                intervalMode: 1,
                intervalVal: dni.interval
            }
        })
        dni.days.forEach(day => {
            updateDni(day.id, { hour: `${String(day.hour).padStart(2, '0')}:${String(day.minute).padStart(2, '0')}`, check: true })
        })

    }

    const resetDays = () => {
        dniTygodnia.forEach(day => {
            updateDni(day.id, { hour: "12:00", check: false })
        })
        dispatchDay({ type: "RESET" })
    }

    const setH = (e) => {
        if (e != "new") {
            e = parseInt(e)
            const id = findIDOfE(e, harmonogram)
            dispatchInfo({
                type: "HARMO_CHANGE",
                payload: {
                    nazwa: "",
                    H: id,
                    HID: e
                }
            })
            if (harmonogram[id].dni.type == "daily")
                parseToDay(harmonogram[id].dni)
            else
                parseToWeek(harmonogram[id].dni)
        }
        else {
            resetDays()
            dispatchInfo({
                type: "HARMO_CHANGE",
                payload: {
                    nazwa: "",
                    H: e,
                    HID: e
                }
            })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        var dane = prepareDataToSubmit(dayState, dniTygodnia, infoState)
        var status = 0;
        if (infoState.currentHID == "new") {
            status = await createHarmonogram(backendLink, userID, dane)
        }
        else {
            if (infoState.nazwa == "")
                dane.nazwa = harmonogram[infoState.currentH].nazwa
            status = await editHarmonogram(backendLink, infoState.currentHID, dane)
        }
        if (status < 400) closeWindow()
        else blad(1);
    }

    const selectedH = infoState.currentH === "new" ? defaultHarmo : harmonogram[infoState.currentH];
    return {
        reset, onSubmit, infoState, dayState, dispatchDay, setH, dispatchInfo, intervalModeMap, dniTygodnia, updateDni, removeH,selectedH
    }
}