import { getJson } from "../json/getJson";

interface ToFormData {
    (record: Record<string, any>|FormData): FormData;
    (record?: Record<string, any>|FormData|null): FormData|undefined;
}

export const toFormData = ((record?: Record<string, any>|FormData|null) => {
    if (!record) return undefined;
    if (record instanceof FormData) return record;
    const formData = new FormData();
    for (const key in record) {
        let value = record[key];
        if (typeof value !== "string") value = getJson(value);
        formData.append(key, value);
    }
    return formData;
}) as ToFormData;