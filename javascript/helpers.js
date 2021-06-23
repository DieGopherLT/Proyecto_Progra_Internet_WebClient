export const meterToKilometer = (meters) => {
    const km = parseFloat((parseInt(meters) / 1000).toFixed(2));
    return Number.isInteger(km) ? Math.trunc(km) : km;
}

export const sliceName = (name) => {
    const splattedName = name.split(' ');

    if(splattedName.length > 3){
        const [firstName, secondName, lastname] = splattedName;
        return `${ firstName } ${ secondName } ${ lastname }`;
    }
    else
        return name;
};

export const minutesToHours = (minutes) => {
    const hours = Math.trunc(parseInt(minutes) / 60);
    const leftMinutes = Math.trunc(parseInt(minutes) - (hours * 60));

    if(leftMinutes === 0)
        return `${hours} hora(s)`;
    else
        return `${hours} hora(s), ${leftMinutes} minutos`;
}
