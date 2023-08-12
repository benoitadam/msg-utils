import { fromEntries } from "../record/fromEntries";

export const getAttrs = (el: Element) => 
    fromEntries(el.getAttributeNames().map(name => [name, el.getAttribute(name)]));