export function getDateFormatted(data, child) {
    if (data != null) {
        if (child)
            return new Date(data + " GMT+0200");
        else
            return new Date(data);
    }
    else
        return new Date(8.64e15)
}

export function getLocalDate(data)
{
    const localDate = new Date(data);
    return `${localDate.getFullYear()}-${`${localDate.getMonth() + 1}`.padStart(2, 0)}-${`${localDate.getDate()}`.padStart(2, 0)}T${`${localDate.getHours()}`.padStart(2, 0)}:${`${localDate.getMinutes()}`.padStart(2, 0)}`
}