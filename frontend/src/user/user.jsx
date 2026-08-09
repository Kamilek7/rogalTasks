import { useState } from 'react'

import Button from '../utils/button.jsx'
import UserViewData from './user_viewData.jsx';
import UserViewTasks from './user_viewTasksData.jsx';

function UserConfig({ backendLink, dane, zamknijOkno, userID, callback, logout }) {

    const [mode, setMode] = useState(true);


    return <>

        <form onSubmit={(e) => { e.preventDefault(); }}>

            {mode ? (<div>
                <UserViewData backendLink={backendLink} dane={dane} zamknijOkno={zamknijOkno} userID={userID} callback={callback} logout={logout}></UserViewData>
                <Button clickFunc={() => { setMode(false) }}>Pokaż historie zadań</Button>
            </div>) :
                (
                    <div>
                        <UserViewTasks dane={dane}></UserViewTasks>
                        <Button clickFunc={() => { setMode(true) }}>Pokaż dane</Button>
                    </div>)
            }

        </form>
    </>
}

export default UserConfig