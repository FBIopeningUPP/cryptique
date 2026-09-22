export const SNAP_DISTANCE_THRESHOLD = 30;
export function calculateDistance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

export function shouldSnapToTarget(currentPos, targetPos, threshold = SNAP_DISTANCE_THRESHOLD) {
    const dist = calculateDistance(currentPos.x, currentPos.y, targetPos.x, targetPos.y);
    return dist <= threshold;
}

export function areAllScrapsAssembled(snappedStates) {
    return snappedStates.length > 0 && snappedStates.every(Boolean);
}