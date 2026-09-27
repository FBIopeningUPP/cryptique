import { describe, expect, it } from 'vitest';
import { PUZZLES } from './puzzles.js';

describe('puzzle catalog', () => {
  it('has unique ids, rewards, and playable answers', () => {
    const ids = PUZZLES.map(({ id }) => id);
    const rewardIds = PUZZLES.map(({ reward }) => reward.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(rewardIds).size).toBe(rewardIds.length);
    PUZZLES.forEach((puzzle) => {
      expect(puzzle.acceptedAnswers.length).toBeGreaterThan(0);
      expect(puzzle.hints.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('keeps seal positions contiguous and every puzzle placeable', () => {
    expect(PUZZLES.map(({ sealIndex }) => sealIndex)).toEqual(
      PUZZLES.map((_, index) => index),
    );

    PUZZLES.forEach((puzzle) => {
      expect(puzzle.placement.label).toBeTruthy();
      expect(puzzle.placement.sealedSrc).toMatch(/^\/assets\//);
      expect(puzzle.placement.solvedSrc).toMatch(/^\/assets\//);
    });
  });

  it('only references existing prerequisite puzzles', () => {
    const ids = new Set(PUZZLES.map(({ id }) => id));

    PUZZLES.forEach((puzzle) => {
      puzzle.prerequisites.forEach((prerequisite) => {
        expect(ids.has(prerequisite)).toBe(true);
        expect(prerequisite).not.toBe(puzzle.id);
      });
    });
  });
});
