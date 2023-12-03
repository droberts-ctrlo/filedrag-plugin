import { HtmlElementOrJQueryElement } from "./types";

const getElement = (element: HtmlElementOrJQueryElement): JQuery<HTMLElement> => {
    return element instanceof HTMLElement ? $(element) : element;
};

export const hasClass = (element: HtmlElementOrJQueryElement, className: string): boolean => {
    return getElement(element).hasClass(className);
}

export const addClass = (element: HtmlElementOrJQueryElement, className: string): void => {
    if (hasClass(element, className)) return;
    getElement(element).addClass(className);
}

export const removeClass = (element: HtmlElementOrJQueryElement, className: string): void => {
    if (!hasClass(element, className)) return;
    getElement(element).removeClass(className);
}

export const hideElement = (element: HtmlElementOrJQueryElement): void => {
    if (hasClass(element, "hidden")) return;
    getElement(element).addClass("hidden");
    getElement(element).attr("aria-hidden", "true");
    getElement(element).css("display", "none");
    getElement(element).css("visibility", "hidden");
}

export const showElement = (element: HtmlElementOrJQueryElement): void => {
    if (!hasClass(element, "hidden")) return;
    getElement(element).removeClass("hidden");
    getElement(element).removeAttr("aria-hidden");
    getElement(element).removeAttr("tabindex");
    getElement(element).removeAttr("style");
}

export const stopPropagation = (e: JQuery.Event | Event): void => {
    try {
        e.stopPropagation();
    } catch (e) { }
    try {
        e.preventDefault();
    } catch (e) { }
};