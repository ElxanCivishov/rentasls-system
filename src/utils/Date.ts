export const MONTHS = {
    1: "Yanvar",
    2: "Fevral",
    3: "Mart",
    4: "Aprel",
    5: "May",
    6: "İyun",
    7: "İyul",
    8: "Avqust",
    9: "Sentyabr",
    10: "Oktyabr",
    11: "Noyabr",
    12: "Dekabr",
} as const;

export const getFromTodayYear = (from: number = 2000): number[] => {
    const currentDate = new Date();
    const years: number[] = [];
    for (let i = from; i <= currentDate.getFullYear(); i++) {
        years.push(i);
    }
    return years.reverse();
};

export const monthsOptions = Object.entries(MONTHS).map(([value, label]) => ({ value: Number(value), key: value, label }));

export const yearOptions = getFromTodayYear().map((year) => ({ value: year, label: year, key: year }));
