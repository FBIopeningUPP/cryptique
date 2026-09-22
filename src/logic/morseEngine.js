export const MORSE_TABLE = {
    A: '.-',    B: '-...',  C: '-.-.',  D: '-..',   E: '.',
    F: '..-.',  G: '--.',   H: '....',  I: '..',    J: '.---',
    K: '-.-',   L: '.-..',  M: '--',    N: '-.',    O: '---',
    P: '.--.',  Q: '--.-',  R: '.-.',   S: '...',   T: '-',
    U: '..-',   V: '...-',  W: '.--',   X: '-..-',  Y: '-.--',
    Z: '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
};

export const MORSE_UNIT_MS = 120;

export function textToMorse(text) {
    return text
        .toUpperCase()
        .split(' ')
        .map((word) =>
        word
            .split('')
            .map((char) => MORSE_TABLE[char] || '')
            .filter(Boolean)
            .join(' ')
    )
    .join(' / ');
}

export function compileMorseSchedule(morseString, unitMs = MORSE_UNIT_MS) {
    const schedule = [];

    for (let i = 0; i < morseString.length; i++) {
        const symbol = morseString[i];

        if (symbol === '.') {
          schedule.push({ type: 'ON', durationMs: unitMs });
          schedule.push({ type: 'OFF', durationMs: unitMs }); 
        } else if (symbol === '-') {
          schedule.push({ type: 'ON', durationMs: unitMs * 3 });
          schedule.push({ type: 'OFF', durationMs: unitMs }); 
        } else if (symbol === ' ') {
          schedule.push({ type: 'OFF', durationMs: unitMs * 2 });
        } else if (symbol === '/') {
          schedule.push({ type: 'OFF', durationMs: unitMs * 4 });
        }
    }
    return schedule;
}

export function getScheduleTotalDuration(schedule) {
    return schedule.reduce((sum, item) => sum + item.durationMs, 0);
}