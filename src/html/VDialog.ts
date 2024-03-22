import { isString } from '../check/isString';
import { setTemplate } from '../string/setTemplate';
import { VField, VFieldOptions, VFieldType } from './VField';
import { addEl } from './addEl';
import { ElOptions } from './interfaces';
import { setCls } from './setCls';
import { setCss } from './setCss';
import { setEl } from './setEl';

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
export class VDialog {
  isClosed = false;
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

  constructor(options: VDialogOptions) {
    this.options = options;
    let { cls, title, message, field, cancel, submit, onClose, onSubmit, onChange } = options;

    this.onClose = onClose;
    this.onSubmit = onSubmit;
    this.onChange = onChange;

    if (isString(title)) title = { innerHTML: title };
    if (isString(message)) message = { innerHTML: message };
    if (isString(field)) field = { type: field };
    if (isString(cancel)) cancel = { innerHTML: cancel };
    if (isString(submit)) submit = { innerHTML: submit };

    const c = (this.c = cls || 'vDlg');
    setCss(c, setTemplate(css, { c }));

    const el = setEl('div', { cls: `${c} ${c}-hide` }) as HTMLDivElement;
    const formEl = setEl('form', { cls: c + '_form' }) as HTMLFormElement;
    const closeEl = setEl('span', { cls: c + '_close', innerHTML: '&times;' }) as HTMLSpanElement;
    const titleEl = title && (setEl('h2', { cls: c + '_title', ...title }) as HTMLHeadingElement);
    const messageEl =
      message && (setEl('div', { cls: c + '_message', ...message }) as HTMLDivElement);
    const vField = field instanceof HTMLElement ? undefined : field && new VField(field);
    const fieldEl = vField ? vField.el : field instanceof HTMLElement ? field : undefined;
    const actionsEl = setEl('div', { cls: c + '_actions' }) as HTMLDivElement;
    const cancelEl =
      cancel && (setEl('button', { cls: c + '_cancel', ...cancel }) as HTMLButtonElement);
    const submitEl =
      submit && (setEl('button', { cls: c + '_submit', ...submit }) as HTMLButtonElement);

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

    addEl(el, formEl);
    addEl(actionsEl, cancelEl, submitEl);
    addEl(formEl, closeEl, titleEl, messageEl, fieldEl, actionsEl);

    formEl.onclick = this._onFormClick.bind(this);
    formEl.onsubmit = this._onSubmit.bind(this);
    closeEl.onclick = el.onclick = this._onClose.bind(this);

    document.body.appendChild(el);

    setTimeout(() => {
      this.el.className = c;
    }, 20);
  }

  _onFormClick(e: Event) {
    e.stopPropagation();
  }

  _onClose(e: Event) {
    e.preventDefault();
    this.isClosed = true;
    this.onClose && this.onClose(this, e);
    const c = this.c;
    setCls(this.el, { [`${c}-hide`]: true }, true);
    setTimeout(() => this.el.remove(), 1000);
  }

  _onSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.onSubmit && this.onSubmit(this, e);
    this._onClose(e);
  }

  _onChange(e: SubmitEvent) {
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
    return new Promise<VDialog>((resolve) => {
      this.onSubmit = resolve;
      this.onClose = resolve;
    });
  }

  waitValue() {
    return this.waitSubmit().then((d) => d.getValue());
  }

  getValue() {
    if (this.isClosed) return null;
    return this.vField?.getValue();
  }

  setValue(value: string) {
    this.vField?.setValue(value);
  }
}

/**
 * A convenience function for creating and returning a new `VDialog` instance.
 *
 * @function vDialog
 * @param {VDialogOptions} options - Configuration options for the dialog.
 * @returns {VDialog} An instance of the `VDialog` class.
 */
export const vDialog = (options: VDialogOptions): VDialog => new VDialog(options);

// prompt({
//     title: 'Envoyer le document par email',
//     content: 'Veuillez saisir votre adresse e-mail',
//     inputType: 'email',
//     cancelBtn: 'Annuler',
//     submitBtn: 'Envoyer',
// })
