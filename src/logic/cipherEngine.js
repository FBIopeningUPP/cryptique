export function shiftChar(char, shift) {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    const s = ((shift % 26) + 26) % 26;
    return String.fromCharCode(((code - 65 + s) % 26) + 65);
  }
  if (code >= 97 && code <= 122) {
    const s = ((shift % 26) + 26) % 26;
    return String.fromCharCode(((code - 97 + s) % 26) + 97);
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
  const normalized = ((degrees % 360) + 360) % 360;
  const step = 360 / 26;
  return Math.round(normalized / step) % 26;
}

export function shiftToAngle(shift) {
  const normalized = ((shift % 26) + 26) % 26;
  return normalized * (360 / 26);
}

export function verifyAnswer(input, acceptedAnswers) {
  const cleaned = input.trim().toUpperCase();
  return acceptedAnswers.map((a) => a.trim().toUpperCase()).includes(cleaned);
}