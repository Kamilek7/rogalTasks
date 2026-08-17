import {useState, useEffect} from "react"
import Scheduler from '../scheduler.jsx'
import { removeHarmonogram, createHarmonogram, editHarmonogram } from './harmonogram_service.js'
import { parseDniDay, parseDniWeek } from "./harmonogram_mapper.js"
import { useHarmonogramForm } from "./harmonogram_form.js"
import HarmonogramWeek from "./harmonogramWeeks.jsx"
import HarmonogramDay from "./harmonogramDays.jsx"
import ErrorBar from "../utils/errorBar.jsx"
import HeaderText from "../utils/headerText.jsx"

const Harmonogram = ({harmonogram, zamknijOkno, blad, callback}) => {

    const form = useHarmonogramForm(harmonogram, zamknijOkno, blad, callback)
    useEffect(()=>{

    },[form.reset])

    return <form onSubmit={form.onSubmit}>
            <HeaderText>Harmonogram</HeaderText>
             <select id='aktywnosc' onChange={(e) => form.setH(e.target.value)} value={form.infoState.currentHID} selected="new">
                 <option value='new'>Dodaj nowa aktywnosc</option>
               {harmonogram.map((h) => (
                <option key={h["ID"]} value={h['ID']}>{h['nazwa']}</option>
                 ))}
             </select>

            <ErrorBar></ErrorBar>
             <input id='nazwa' type='text' value={form.infoState.nazwa} onChange={(e) => form.dispatchInfo({type: "NAME_CHANGE",payload: e.target.value})} placeholder={form.selectedH.nazwa}></input>
            <h2>Odstęp czasu</h2>
            <select id='intervalMode' onChange={(e) => form.dispatchDay({type:"INTERVAL_MODE", payload:parseInt(e.target.value)})} value={form.dayState.intervalMode} selected='0'>
               {form.intervalModeMap.map((inter) => (
                <option key={inter["val"]} value={inter["val"]}>{inter['nazwa']}</option>
                 ))}
             </select>
             <input id='intervalVal' type='number' value={form.dayState.intervalVal} onChange={(e) => form.dispatchDay({type:"INTERVAL_VAL", payload: e.target.value})} min='1'></input>
            {form.dayState.intervalMode==0&&
                <HarmonogramDay form={form}></HarmonogramDay>
            }
            {form.dayState.intervalMode==1&&
                <HarmonogramWeek form={form}></HarmonogramWeek>
            }
            {form.infoState.currentH!="new"&&<><button onClick={(e) => {e.preventDefault(); form.removeH(form.selectedH.ID)}}>Usuń wybraną aktywność</button><button type='submit' >Edytuj</button></>}
            {form.infoState.currentH=="new"&&<button type='submit' >Dodaj</button>}
            
    </form>
    
}

export default Harmonogram