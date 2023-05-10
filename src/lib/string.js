export function emptyString(str) {
    if (str.trim() === "") return true;
    return false;
}

export function softCompare(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') return false;
    str1 = str1.trim().toLowerCase();
    str2 = str2.trim().toLowerCase();
    return str1 === str2;
}

export function subStr(str, len = 20) {
    return str.substr(0, len + str.substr(len).search(' ')).trim()
}

export function stringMatch(str1, str2) {
    str1 = str1.toLowerCase().trim();
    str2 = str2.toLowerCase().trim();
    if (!emptyString(str2) && str1.indexOf(str2) !== -1) return true;
    return false;
}

export function validUsername(username) {
    let regex = /(^[a-zA-Z_])([\w.]{3,15}$)/;
    return regex.test(username);
}

export function validName(name) {
    let regex = /^[a-zA-Z]+$/
    return regex.test(name);
}

