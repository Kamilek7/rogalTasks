import { useState} from 'react'
export function useSorting() {
    const [sortAsc, setOrder] = useState(true);
    const [sortTyp, setSort] = useState(0);

    const sortType = (idx) => 
    {
        if (idx==sortTyp)
            setOrder(!sortAsc);
        else
            setOrder(true);
        setSort(idx);
    }

    const sorter = (a, b) =>
    {
        var direction = sortAsc ? 1 : -1;
        switch (sortTyp) {
            case 0:
                return a["nazwa"].localeCompare(b["nazwa"])*direction;
            case 1:
                return (new Date(a["data"]) - new Date(b["data"]))*direction ;
            case 2:
                return (parseInt(a["status"]) - parseInt(b["status"]))*direction;
        }
    }

    return {sorter, sortType}
}