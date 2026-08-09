import Zadanie from "./zadanie";

const ZadaniaLista = ({backendLink, zadania, callback}) => {

    

    const d = new Date();

    const zadBezRodzica = zadania.filter((zad) => zad["parentID"] == 0);

    return <div className="w-[calc(64vw+6rem)] mx-auto">
            <div className="mt-[1vw] mb-[5vw] rounded-4xl border-dashed border-[0.2vw] bg-[var(--backdrop)] border-[var(--color-accent)]">
                {
                    zadBezRodzica.map((zadanie) => 
                    {
                        return <Zadanie backendLink={backendLink} key={zadanie["ID"]} zadanie={zadanie} d={d} child={false} callback={callback}></Zadanie>
                    }
                )}

            </div>
            
    </div>
}

export default ZadaniaLista