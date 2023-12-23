export const duration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = (seconds % 60).toString().padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
};
