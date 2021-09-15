/**
 *
 * @param ms
 * @returns Promise
 */
export function DelayMs(ms: number): Promise<null> {
    return new Promise<null>((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });
}