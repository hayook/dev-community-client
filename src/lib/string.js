export function fullSpaces(str) {
    for (const ch of str) {
        if (ch !== ' ') return false;
    }
    return true;
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
    if (!fullSpaces(str2) && str1.indexOf(str2) !== -1) return true;
    return false;
}
