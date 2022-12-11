export function handleDate(dateStr) {
    const now = new Date(); 
    let date = Math.trunc(Math.abs(new Date(dateStr) - now) / 1000); 
    if (date < 60) return 'now'; 
    date = Math.trunc(date / 60); 
    if (date < 60) return date + 'm'
    date = Math.trunc(date / 60);
    if (date < 24) return date + 'h'
    date = Math.trunc(date / 24);
    if (date < 7) return date + 'd'
}