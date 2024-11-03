"use client"

export const Cache = {
    get: (key: string) => {
        return sessionStorage.getItem(key);
    },
    set: (key: string, value: any) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    clear: () => {sessionStorage.clear()}
};