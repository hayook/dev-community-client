
function describe(testSuite, callback) {
    console.log(`\n${testSuite}\n`);
    callback();
}

function test(testName, callback) {
    try {
        callback();
        console.log(`✅ ${testName}`);
    } catch (error) {
        console.error(`❌ ${testName}`);
        console.error(error);
    }
}

function expect(actualValue) {
    return {
        toBe(expectedValue) {
            if (actualValue === expectedValue) {
                return true;
            } else {
                throw new Error(`Expected ${expectedValue}, but got ${actualValue}`);
            }
        }
    };
}


describe('validUsername function', () => {
    test('should return true for valid usernames', () => {
        expect(validUsername('username123')).toBe(true);
        expect(validUsername('user_name')).toBe(true);
        expect(validUsername('User_Name_123')).toBe(true);
    });

    test('should return false for invalid usernames', () => {
        expect(validUsername('')).toBe(false);
        expect(validUsername('user')).toBe(false);
        expect(validUsername('user!name')).toBe(false);
        expect(validUsername('user name')).toBe(false);
        expect(validUsername('user-name')).toBe(false);
        expect(validUsername('user-name-123-456-789')).toBe(false);
        expect(validUsername('123username')).toBe(false);
    });
});


















function formatDate(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 5) {
        return "just now";
    } else if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInSeconds < 604800) {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    } else {
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
}


















// test(overLength("hayou", 5), false);
// test(overLength("hayeddine", 5), true);
// test(overLength("    hayou  ".trim(), 5), false);

// test(validName(""), false);
// test(validName(" "), false);
// test(validName(" a"), false);
// test(validName("-a"), false);
// test(validName("hayou"), true);
// test(validName("hayou t"), false);

// test(validPassword(""), false);
// test(validPassword(" "), false);
// test(validPassword("adsf"), false);
// test(validPassword("  is is @ pas wor - _ . 2 6 1$s#!@^%"), true);

// test(validUsername(""), false)
// test(validUsername("           "), false)
// test(validUsername("-aaaaaaaaa"), false)
// test(validUsername("a"), false)
// test(validUsername("aaa"), false)
// test(validUsername("_aaa"), false)
// test(validUsername("_aaaa_aaaa"), true)
// test(validUsername("1aaaaaa"), false)
// test(validUsername("aaaa3aaaaa"), true)
// test(validUsername("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"), false)
// test(validUsername("aaaaaaaa aa"), false)
// test(validUsername("aaaaaaaa.aa"), false)
// test(validUsername("aaaa3aaa-aa"), false)
// test(validUsername("itshayoué"), false)
// test(validUsername(" its-hayou"), false)

// test(emptyInput(""), true);
// test(emptyInput("1 2 3"), false);
// test(emptyInput("\n"), true);
// test(emptyInput("\t"), true);
// test(emptyInput("\nd"), false);





function overLength(str, maxLength) {
    if (str.length > maxLength) return true;
    return false;
}

function validName(name) {
    let regex = /^[a-zA-Z]+$/
    return regex.test(name);
}


function validPassword(password) {
    if (password.length > 8) return true;
    return false;
}


function validUsername(username) {
    let regex = /(^[a-zA-Z_])(\w{5,15}$)/;
    return regex.test(username);
}

function emptyInput(input) {
    if (input.trim() === "") return true;
    return false;
}



// function test(value, expectedOutput) {
//     if (value === expectedOutput) {
//         console.log('✅ Passed');
//         return;
//     }
//     console.log('❌ Failed');
//     return;
// }