export function handleDate(dateStr) {
    const now = new Date();
    const offDate = new Date(dateStr);
    let date = Math.trunc(Math.abs(offDate - now) / 1000);
    if (date < 60) return 'now';
    date = Math.trunc(date / 60);
    if (date < 60) return date + 'm';
    date = Math.trunc(date / 60);
    if (date < 24) return date + 'h';
    date = Math.trunc(date / 24);
    if (date < 7) return date + 'd';
    if (date < 365) return offDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
    });
    return offDate.toLocaleDateString();
}

export function chatDate(dateStr) {
    const now = new Date();
    const offDate = new Date(dateStr);
    const differenceInSeconds = Math.trunc(Math.abs(now - offDate) / 1000);

    const res = offDate.toLocaleTimeString(undefined, {
        minute: '2-digit',
        hour: '2-digit',
        hour12: false
    });

    if (differenceInSeconds <= 86400) return res;
    return `${offDate.toLocaleDateString()} - ${res}`;
}