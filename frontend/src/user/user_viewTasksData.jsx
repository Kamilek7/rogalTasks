import { useState } from 'react'
import { useSorting } from './user_sortHelper.js';
function UserViewTasks({ dane }) {

    const [searchText, setSearch] = useState("");
    const { sorter, sortType } = useSorting()
    return <>
        <div style={{ fontSize: "2vw", fontWeight: "bold", marginBottom: "1.1vw" }}>Historia zadań</div>
        <span style={{ color: "red", height: "3vh", textAlign: "center" }} id='error-message-form'></span>
        <div style={{ marginBottom: "1vw" }}><input value={searchText} onChange={(e) => { setSearch(e.target.value) }} type='search' placeholder='Nakarm psa'></input></div>
        <table className='history' ><tbody><tr><th><button onClick={() => { sortType(0) }} className='inTable'>Nazwa</button></th><th><button className='inTable' onClick={() => { sortType(1) }}>Data</button></th><th><button className='inTable' onClick={() => { sortType(2) }}>Status</button></th></tr>
            {
                dane.filter(e => e["nazwa"].toLowerCase().includes(searchText.toLowerCase())).sort(sorter).map(zadania => {
                    return (
                        <tr><td>{zadania["nazwa"]}</td><td>{zadania["data"]}</td><td>{zadania['status']}</td></tr>
                    )
                })
            }
        </tbody>
        </table>
    </>
}

export default UserViewTasks