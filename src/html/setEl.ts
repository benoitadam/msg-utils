import { ElOptions } from './interfaces';
import { setAttrs } from './setAttrs';
import { setStyle } from './setStyle';
import { setCls } from './setCls';

/**
 * Creates or configures an HTML element with specific options.
 * 
 * @param {HTMLElement | keyof HTMLElementTagNameMap} el - The element to create or configure. Can be an existing HTML element or the name of an HTML tag as a string.
 * @param {ElOptions} [options] - An optional object containing configurations for the element, such as attributes, styles, classes, content, etc.
 * 
 * @returns {HTMLElement} The configured HTML element.
 * 
 * This function simplifies the creation and configuration of HTML elements by encapsulating multiple common DOM operations into a single interface.
 * If a tag name is provided, a new element of that type is created. If an existing element is provided, it is directly used.
 * 
 * Configuration options:
 * - `reset`: if true, resets the element's attributes.
 * - `attrs`: an object containing attributes to add or modify on the element.
 * - `style`: an object containing CSS style properties to apply.
 * - `cls`: one or several CSS class names to add.
 * - `children`: an array of child elements to add to the parent element.
 * - `ctn`: HTML content as a string to set as the inner content of the element.
 * - `...rest`: additional properties to assign directly to the element via `Object.assign`.
 * 
 * The function allows for great flexibility in handling DOM elements, making the creation of dynamic user interfaces more concise and maintainable.
 */
export const setEl = (el: HTMLElement | keyof HTMLElementTagNameMap, options?: ElOptions) => {
  if (typeof el === 'string') el = document.createElement(el) as HTMLElement;
  if (!options) return el;

  const { reset, attrs, style, cls, children, ctn, ...rest } = options;

  if (reset) setAttrs(el, {});
  if (attrs) setAttrs(el, attrs, true);
  if (style) setStyle(el, style, true);
  if (cls) setCls(el, cls, true);
  if (ctn) el.innerHTML = ctn;

  Object.assign(el, rest);

  if (children) for (const childEl of children) el.appendChild(childEl);

  return el;
};
