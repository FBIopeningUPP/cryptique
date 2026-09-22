export function shiftChar(char, shift) {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
        const normalizedShift = ((shift % 26) + 26) % 26;
        return String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65);
    }

    if (code >= 97 && code <= 122) {
        const normalizedShift = ((shift % 26) + 26) % 26;
        return String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97);
    }
    return char;
}

export function applyCaesarShift(text, shift) {
    return text
        .split('')
        .map((char) => shiftChar(char, shift))
        .join('');
}

export function angleToShift(degrees) {
    const normalizedShift = ((shift % 26) + 26) % 26;
    return normalizedShift * (360 / 26);
}

export function verifyAnswer(input, acceptedAnswers) {
    const cleaned = input.trim().toUpperCase();
    return acceptedAnswers.map((a) => a.trim().toUpperCase()).includes(cleaned);
}