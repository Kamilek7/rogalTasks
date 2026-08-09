import { useState} from 'react'

export function useUserData(dane)
{
        const [login, setLogin] = useState(dane[0]["login"]);
        const [pass, setPass] = useState("");
        const [dc, setDc] = useState(dane[0]["discord"]);
        const [pow, setNot] = useState(dane[0]["ilePowiadomien"]);
    
        const traits = [{name:"Login", value: login, change:setLogin, nameSQL:"login"}, {name: "Hasło", value:pass, change:setPass, nameSQL:"haslo", type:"password"}, {name: "Discord", value:dc, change:setDc, nameSQL:"discord"}, {name: "Ilość powiadomień", value:pow, change:setNot, nameSQL:"ilePowiadomien", type: "number", extra:{'min':0, 'max':16}}];

        return {traits}
}