import { VField, VFieldOptions, VFieldType } from "./VField";
import { ElOptions } from "./interfaces";
export interface VDialogButtonOptions {
    title: string;
    cls: string;
}
export interface VDialogFieldOptions {
    name: string;
    label: string;
    type: string;
    required: boolean;
}
export interface VDialogOptions {
    cls?: string;
    title?: ElOptions | string;
    message?: ElOptions | string;
    field?: VFieldOptions | HTMLElement | VFieldType;
    cancel?: ElOptions | string;
    submit?: ElOptions | string;
    onClose?: (dialog: VDialog, e: Event) => void;
    onSubmit?: (dialog: VDialog, e: Event) => void;
    onChange?: (dialog: VDialog, e: Event) => void;
}
/**
 * Represents a dialog component with customizable options for title, message, fields, and actions.
 * This class provides methods to create and manipulate a dialog interface, including form submission and value handling.
 *
 * @class VDialog
 *
 * @property {VDialogOptions} options - Configuration options for the dialog.
 * @property {HTMLDivElement} el - The main container element of the dialog.
 * @property {string} c - The base CSS class name for styling the dialog.
 * @property {HTMLFormElement} formEl - The form element within the dialog.
 * @property {HTMLSpanElement} closeEl - The element used to close the dialog.
 * @property {HTMLHeadingElement} [titleEl] - The title element of the dialog, optional.
 * @property {HTMLDivElement} [messageEl] - The message container of the dialog, optional.
 * @property {HTMLElement} [fieldEl] - The field element within the dialog, optional.
 * @property {VField} [vField] - An instance of `VField` for managing the dialog's input field, optional.
 * @property {HTMLDivElement} actionsEl - The container for action buttons (e.g., submit, cancel).
 * @property {HTMLButtonElement} [cancelEl] - The cancel button element, optional.
 * @property {HTMLButtonElement} [submitEl] - The submit button element, optional.
 * @property {(dialog: VDialog, e: Event) => void} [onClose] - Callback function to execute when the dialog is closed.
 * @property {(dialog: VDialog, e: Event) => void} [onSubmit] - Callback function to execute on form submission.
 * @property {(dialog: VDialog, e: Event) => void} [onChange] - Callback function to execute when the dialog's content changes, optional.
 *
 * @constructor
 * Creates an instance of `VDialog` with specified options. It constructs the dialog's HTML structure and initializes event listeners.
 *
 * @param {VDialogOptions} options - Configuration options for the dialog.
 */
export declare class VDialog {
    isClosed: boolean;
    options: VDialogOptions;
    el: HTMLDivElement;
    c: string;
    formEl: HTMLFormElement;
    closeEl: HTMLSpanElement;
    titleEl?: HTMLHeadingElement;
    messageEl?: HTMLDivElement;
    fieldEl?: HTMLElement;
    vField?: VField;
    actionsEl: HTMLDivElement;
    cancelEl?: HTMLButtonElement;
    submitEl?: HTMLButtonElement;
    onClose?: (dialog: VDialog, e: Event) => void;
    onSubmit?: (dialog: VDialog, e: Event) => void;
    onChange?: (dialog: VDialog, e: Event) => void;
    constructor(options: VDialogOptions);
    _onFormClick(e: Event): void;
    _onClose(e: Event): void;
    _onSubmit(e: SubmitEvent): void;
    _onChange(e: SubmitEvent): void;
    /**
     * Waits for the dialog to be submitted or closed. This method returns a Promise that resolves
     * when the dialog's submit or close actions are triggered. It's particularly useful for asynchronous
     * flows where you need to wait for user interaction before proceeding.
     *
     * The promise resolves with the `VDialog` instance itself, allowing for further interaction with
     * the dialog after it has been submitted or closed. For example, it can be used to retrieve the value
     * entered by the user before the dialog was closed.
     *
     * Note: This method modifies the dialog's `onSubmit` and `onClose` handlers to resolve the promise,
     * which might override any existing handlers assigned to these events. Ensure that no critical
     * functionality is lost by using this method in contexts where the dialog's submission or closure
     * are the only actions of interest.
     *
     * @returns {Promise<VDialog>} A promise that resolves with the `VDialog` instance when the dialog is submitted or closed.
     */
    waitSubmit(): Promise<VDialog>;
    waitValue(): Promise<string | null | undefined>;
    getValue(): string | null | undefined;
    setValue(value: string): void;
}
/**
 * A convenience function for creating and returning a new `VDialog` instance.
 *
 * @function vDialog
 * @param {VDialogOptions} options - Configuration options for the dialog.
 * @returns {VDialog} An instance of the `VDialog` class.
 */
export declare const vDialog: (options: VDialogOptions) => VDialog;
