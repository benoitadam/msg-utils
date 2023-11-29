interface ToFormData {
    (record: Record<string, any> | FormData): FormData;
    (record?: Record<string, any> | FormData | null): FormData | undefined;
}
export declare const toFormData: ToFormData;
export {};
