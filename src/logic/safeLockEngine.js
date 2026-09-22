import { details } from "framer-motion/client";

export const INITIAL_DIALS = [0, 0, 0, 0];
export const TARGET_COMBINATION = [3, 4, 3, 7];

export function rotateTumbler(currentDials, tumblerIndex, delta) {
    if (tumblerIndex < 0 || tumblerIndex >= currentDials.length) {
        return currentDials;
    }

    const newDials = [...currentDials];
    const currentValue = newDials[tumblerIndex];
    newDials[tumblerIndex] = ((currentValue + delta) % 10 + 10) % 10;
    return newDials;
}

export function isCombinationCorrect(currentDials, targetCombination = TARGET_COMBINATION) {
    if (currentDials.length !== targetCombination.length) return false;
    return currentDials.every((val, index) => val === targetCombination[index]);
}

export function formatDialsToString(dials) {
    return dials.join('');
}