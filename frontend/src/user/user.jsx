import { useState } from 'react'

import UserViewData from './user_viewData.jsx';
import UserViewTasks from './user_viewTasksData.jsx';

function UserConfig({ backendLink, dane, zamknijOkno, userID, callback, logout }) {

    const [mode, setMode] = useState(true);


    return <>

        <form onSubmit={(e) => { e.preventDefault(); }}>

            {mode ? (<div>
                <UserViewData backendLink={backendLink} dane={dane} zamknijOkno={zamknijOkno} userID={userID} callback={callback} logout={logout}></UserViewData>
                <button onClick={() => { setMode(false) }}>Pokaż historię zadań</button>
            </div>) :
                (
                    <div>
                        <UserViewTasks dane={dane}></UserViewTasks>
                        <button onClick={() => { setMode(true) }}>Pokaż dane</button>
                    </div>)
            }

        </form>
    </>
}

export default UserConfig