import { describe, expect, it } from 'vitest';
import { applyCaesarShift, angleToShift, shiftToAngle, verifyAnswer } from './cipherEngine.js';
import { areAllScrapsAssembled, shouldSnapToTarget } from './jigsawEngine.js';
import { compileMorseSchedule, getScheduleTotalDuration, textToMorse } from './morseEngine.js';
import { formatDialsToString, isCombinationCorrect, rotateTumbler } from './safeLockEngine.js';

describe('cipher engine', () => {
  it('decodes the letter puzzle and accepts normalized answers', () => {
    expect(applyCaesarShift('DWODV', -3)).toBe('ATLAS');
    expect(verifyAnswer(' atlas ', ['ATLAS'])).toBe(true);
  });

  it('round-trips wheel positions', () => {
    expect(angleToShift(shiftToAngle(7))).toBe(7);
  });
});

describe('morse engine', () => {
  it('encodes text and produces the expected timing', () => {
    expect(textToMorse('SOS')).toBe('... --- ...');
    const schedule = compileMorseSchedule('.-', 100);
    expect(getScheduleTotalDuration(schedule)).toBe(600);
  });
});

describe('safe lock engine', () => {
  it('wraps tumblers and recognizes the archive combination', () => {
    expect(rotateTumbler([0, 0, 0, 0], 0, -1)).toEqual([9, 0, 0, 0]);
    expect(isCombinationCorrect([3, 4, 3, 7])).toBe(true);
    expect(formatDialsToString([3, 4, 3, 7])).toBe('3437');
  });
});

describe('jigsaw engine', () => {
  it('detects nearby pieces and complete assemblies', () => {
    expect(shouldSnapToTarget({ x: 0, y: 0 }, { x: 3, y: 4 }, 5)).toBe(true);
    expect(areAllScrapsAssembled([true, true, true])).toBe(true);
    expect(areAllScrapsAssembled([true, false, true])).toBe(false);
  });
});
