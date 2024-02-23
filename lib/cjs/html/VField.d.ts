import { ElOptions } from "./interfaces";
export type VFieldType = 'email' | 'text' | 'number';
export interface VFieldOptions {
    readonly cls?: string;
    readonly type?: VFieldType;
    readonly name?: string;
    readonly label?: ElOptions | string;
    readonly input?: ElOptions;
    readonly onChange?: (field: VField, ev: Event) => void;
}
export declare class VField {
    static count: number;
    options: VFieldOptions;
    el: HTMLElement;
    labelEl: HTMLLabelElement;
    inputEl: HTMLInputElement;
    onChange: (field: VField, ev: Event) => void;
    constructor(options: VFieldOptions);
    _onChange(ev: Event): void;
    getValue(): string;
    setValue(value: string): void;
}
export declare const vFieldFrom: (o: VFieldOptions | HTMLElement | VField) => VField;
export declare const vFieldEl: (o: VFieldOptions | HTMLElement | VField) => HTMLElement;
