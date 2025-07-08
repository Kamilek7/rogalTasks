import {useState} from "react"

const Kalendarz = ({zamknijOkno, blad, callback, data}) =>
{

    const cellClicked = (date) =>{
        data(date)
        zamknijOkno()
        callback(date=date)
    }

    var miesiace = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]
    var days = ["Pon", "Wt", "Śr", "Czw", "Pt", "So", "Nie"]
    var years = Array(70).fill().map((x,i)=>i+1970)
    var currentTime = new Date();
    const [miesiacKalendarza, changeMonth] = useState((currentTime.getMonth()))
    const [rokKalendarza, changeYear] = useState((currentTime.getFullYear()))

    const rysujKalendarz = (ileDni, start) =>
    {
        var kalendarz = [];
        for (var i=0;i*7-start<ileDni; i++)
        {
            kalendarz.push(["","","","","","",""])
            var x;
            if (i==0)
                x=start;
            else
                x=0;
            for (var j=x; j<7&&i*7+j-start<ileDni; j++)
            {
                kalendarz[i][j%7]= i*7+j+1-start;
            }
        }
        return (
            <table>
                <tbody>
                    <tr>{days.map((day) => (<th>{day}</th>))}</tr>
                    {kalendarz.map((tydzien) => {
                        return(
                        <tr>
                            
                            {tydzien.map((dzien)=>{                        
                                let date = [rokKalendarza,(miesiacKalendarza+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}), (dzien).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})].join("-");
                                const d = new Date(date);
                                let condition = (d.getYear() >= currentTime.getYear() && d.getMonth() >= currentTime.getMonth() && d.getDate() >= currentTime.getDate())
                                return (<td>{d.getTime()>currentTime.getTime() || condition? (<div type="button" onClick={() => {cellClicked(date)}} class={(dzien!="") ? "kalendarz-active" : "kalendarz-disabled"}><p>{dzien}</p></div>) : (<div type="button" disabled class={(dzien!="") ? "kalendarz-notactive" : "kalendarz-disabled"}><p>{dzien}</p></div>)}</td>)
                                })}
                        </tr>
                    );})}
                </tbody>
            </table>
        )
    }
    return <form >
            <h2>Wybierz zadania z danego dnia</h2>

            <select onChange={(e) => {changeYear(parseInt(e.target.value))}} defaultValue={currentTime.getFullYear()}>
                {years.map((year)=> (<option value={year}>{year}</option>))}
            </select>
            <select onChange={(e) => {changeMonth(parseInt(e.target.value))}} defaultValue={currentTime.getMonth()}>
                {miesiace.map((miesiac)=> (<option value={miesiace.indexOf(miesiac)}>{miesiac}</option>))}
            </select>
            <div id='kalendarz'>
                {rysujKalendarz((new Date(rokKalendarza, miesiacKalendarza + 1, 0)).getDate(), ((new Date(rokKalendarza, miesiacKalendarza, 1)).getDay()+6)%7)}
            </div>
    </form>
}
export default Kalendarz