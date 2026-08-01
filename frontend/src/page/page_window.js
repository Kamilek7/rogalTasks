import { useState } from 'react'

export function useWindow() {
    const [trybGlobal, trybSet] = useState([0]);
    const [oknoTaskForm, oknoTaskFormEnable] = useState(false);

    const bladOkna = (type) => {
        if (type == 0 || type == 1) {
            document.getElementById("error-message-form").innerHTML = "Musisz dodać wszystkie wartości do formularza!";
        }
        document.getElementsByClassName("modal-content")[0].classList.add("modal-content-error");
        document.getElementsByClassName("modal-content")[0].classList.remove("modal-content");
        setTimeout(() => {
            document.getElementsByClassName("modal-content-error")[0].classList.add("modal-content");
            document.getElementsByClassName("modal-content")[0].classList.remove("modal-content-error");
        }, 2000)
    }

    const zamknijOkno = (tryb) => {
        if (oknoTaskForm) {
            trybSet(tryb)
            oknoTaskFormEnable(false);
            document.getElementsByClassName("modal")[0].classList.add("modal-hidden");
            document.getElementsByClassName("modal")[0].classList.remove("modal");
            if (tryb != 2)
                document.getElementById("error-message-form").innerHTML = "";
        }
    }

    const otworzOkno = (tryb) => {
        if (!oknoTaskForm) {
            trybSet(tryb)
            oknoTaskFormEnable(true);
            document.getElementsByClassName("modal-hidden")[0].classList.add("modal");
            document.getElementsByClassName("modal-hidden")[0].classList.remove("modal-hidden");
        }
    }

    return { bladOkna, zamknijOkno, otworzOkno, trybGlobal }
}