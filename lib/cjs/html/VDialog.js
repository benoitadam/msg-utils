"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vDialog = exports.VDialog = void 0;
const isString_1 = require("../check/isString");
const setTemplate_1 = require("../string/setTemplate");
const VField_1 = require("./VField");
const addEl_1 = require("./addEl");
const setCls_1 = require("./setCls");
const setCss_1 = require("./setCss");
const setEl_1 = require("./setEl");
const css = `
.{c} {
    display: flex; align-items: center; justify-content: center;
    position: fixed; z-index: 10000; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden;
    background: rgb(0,0,0); background: rgba(0,0,0,0.5); opacity: 1;
    transition: all 0.3s ease;
}
.{c}_form {
    position: relative; padding: 20px; width: 60%;
    background-color: #fefefe; border: 1px solid #888; border-radius: 5px; 
    -webkit-box-shadow: 2px 4px 11px -2px rgba(0,0,0,0.5); box-shadow: 2px 4px 11px -2px rgba(0,0,0,0.5);
    transition: all 0.3s ease; transform: scale(1);
}
.{c}_title { font-size: 1.3em; font-weight: bold; margin: 0 0 10px; }
.{c}_close { color: #aaa; position: absolute; right: 10px; top: 0; font-size: 28px; font-weight: bold; }
.{c}_close:hover, .close:focus { color: black; text-decoration: none; cursor: pointer; }
.{c}_actions { margin: 10px -5px 0; display: flex; align-items: center; justify-content: end; }
.{c}_cancel, .{c}_submit {
    cursor: pointer;
    border-radius: 5px;
    background: #535353;
    color: white;
    padding: 8px 15px;
    margin: 0 5px;
}
.{c}_cancel { background: #e60000; }
.{c}_submit { background: #0070ff; }
.{c}-hide { opacity: 0; }
.{c}-hide .{c}_form { transform: scale(0); }
`;
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
class VDialog {
    constructor(options) {
        this.isClosed = false;
        this.options = options;
        let { cls, title, message, field, cancel, submit, onClose, onSubmit, onChange } = options;
        this.onClose = onClose;
        this.onSubmit = onSubmit;
        this.onChange = onChange;
        if ((0, isString_1.isString)(title))
            title = { innerHTML: title };
        if ((0, isString_1.isString)(message))
            message = { innerHTML: message };
        if ((0, isString_1.isString)(field))
            field = { type: field };
        if ((0, isString_1.isString)(cancel))
            cancel = { innerHTML: cancel };
        if ((0, isString_1.isString)(submit))
            submit = { innerHTML: submit };
        const c = (this.c = cls || 'vDlg');
        (0, setCss_1.setCss)(c, (0, setTemplate_1.setTemplate)(css, { c }));
        const el = (0, setEl_1.setEl)('div', { cls: `${c} ${c}-hide` });
        const formEl = (0, setEl_1.setEl)('form', { cls: c + '_form' });
        const closeEl = (0, setEl_1.setEl)('span', { cls: c + '_close', innerHTML: '&times;' });
        const titleEl = title && (0, setEl_1.setEl)('h2', { cls: c + '_title', ...title });
        const messageEl = message && (0, setEl_1.setEl)('div', { cls: c + '_message', ...message });
        const vField = field instanceof HTMLElement ? undefined : field && new VField_1.VField(field);
        const fieldEl = vField ? vField.el : field instanceof HTMLElement ? field : undefined;
        const actionsEl = (0, setEl_1.setEl)('div', { cls: c + '_actions' });
        const cancelEl = cancel && (0, setEl_1.setEl)('button', { cls: c + '_cancel', ...cancel });
        const submitEl = submit && (0, setEl_1.setEl)('button', { cls: c + '_submit', ...submit });
        this.el = el;
        this.formEl = formEl;
        this.closeEl = closeEl;
        this.titleEl = titleEl;
        this.messageEl = messageEl;
        this.vField = vField;
        this.fieldEl = fieldEl;
        this.actionsEl = actionsEl;
        this.cancelEl = cancelEl;
        this.submitEl = submitEl;
        (0, addEl_1.addEl)(el, formEl);
        (0, addEl_1.addEl)(actionsEl, cancelEl, submitEl);
        (0, addEl_1.addEl)(formEl, closeEl, titleEl, messageEl, fieldEl, actionsEl);
        formEl.onclick = this._onFormClick.bind(this);
        formEl.onsubmit = this._onSubmit.bind(this);
        closeEl.onclick = el.onclick = this._onClose.bind(this);
        document.body.appendChild(el);
        setTimeout(() => {
            this.el.className = c;
        }, 20);
    }
    _onFormClick(e) {
        e.stopPropagation();
    }
    _onClose(e) {
        e.preventDefault();
        this.isClosed = true;
        this.onClose && this.onClose(this, e);
        const c = this.c;
        (0, setCls_1.setCls)(this.el, { [`${c}-hide`]: true }, true);
        setTimeout(() => this.el.remove(), 1000);
    }
    _onSubmit(e) {
        e.preventDefault();
        this.onSubmit && this.onSubmit(this, e);
        this._onClose(e);
    }
    _onChange(e) {
        this.onChange && this.onChange(this, e);
    }
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
    waitSubmit() {
        return new Promise((resolve) => {
            this.onSubmit = resolve;
            this.onClose = resolve;
        });
    }
    waitValue() {
        return this.waitSubmit().then((d) => d.getValue());
    }
    getValue() {
        var _a;
        if (this.isClosed)
            return null;
        return (_a = this.vField) === null || _a === void 0 ? void 0 : _a.getValue();
    }
    setValue(value) {
        var _a;
        (_a = this.vField) === null || _a === void 0 ? void 0 : _a.setValue(value);
    }
}
exports.VDialog = VDialog;
/**
 * A convenience function for creating and returning a new `VDialog` instance.
 *
 * @function vDialog
 * @param {VDialogOptions} options - Configuration options for the dialog.
 * @returns {VDialog} An instance of the `VDialog` class.
 */
const vDialog = (options) => new VDialog(options);
exports.vDialog = vDialog;
// prompt({
//     title: 'Envoyer le document par email',
//     content: 'Veuillez saisir votre adresse e-mail',
//     inputType: 'email',
//     cancelBtn: 'Annuler',
//     submitBtn: 'Envoyer',
// })
