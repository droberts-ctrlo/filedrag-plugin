import { HtmlElementOrJQueryElement } from "./types";

const getElement = (element: HtmlElementOrJQueryElement): JQuery<HTMLElement> => {
    return element instanceof HTMLElement ? $(element) : element;
};

export const hasClass = (element: HtmlElementOrJQueryElement, className: string): boolean => {
    return getElement(element).hasClass(className);
}

export const addClass = (element: HtmlElementOrJQueryElement, className: string): void => {
    if(hasClass(element, className)) return;
    getElement(element).addClass(className);
}

export const removeClass = (element: HtmlElementOrJQueryElement, className: string): void => {
    if(!hasClass(element, className)) return;
    getElement(element).removeClass(className);
}

export const hide = (element: HtmlElementOrJQueryElement): void => {
    if(hasClass(element, "hidden")) return;
    getElement(element).addClass("hidden");
    getElement(element).attr("aria-hidden", "true");
    getElement(element).attr("tabindex", "-1");
    getElement(element).css("display", "none");
    getElement(element).css("visibility", "hidden");
}

export const show = (element: HtmlElementOrJQueryElement): void => {
    if(!hasClass(element, "hidden")) return;
    getElement(element).removeClass("hidden");
    getElement(element).removeAttr("aria-hidden");
    getElement(element).removeAttr("tabindex");
    getElement(element).css("display", "");
    getElement(element).css("visibility", "");
}
