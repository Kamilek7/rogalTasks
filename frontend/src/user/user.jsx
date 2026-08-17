import { useState } from 'react'

import Button from '../utils/button.jsx'
import UserViewData from './user_viewData.jsx';
import UserViewTasks from './user_viewTasksData.jsx';

function UserConfig({ dane, zamknijOkno, callback, logout }) {

    const [mode, setMode] = useState(true);


    return <>

        <form onSubmit={(e) => { e.preventDefault(); }}>

            {mode ? (<div>
                <UserViewData dane={dane} zamknijOkno={zamknijOkno} callback={callback}></UserViewData>
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