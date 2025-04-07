import { randomNumberBetween } from "./numberUtils";


export function getDateDaysAgo(n: number) {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(n));
    return {
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear()
    };
};


export function getRandomDateBetweenDaysAgo(min: number, max: number) {
    return getDateDaysAgo(randomNumberBetween(min,max));
};