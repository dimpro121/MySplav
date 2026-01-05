
function isValidEmailUnicode(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    return regex.test(email);
}