export const hideElement = (element: HTMLElement | JQuery<HTMLElement>): void => {
    const $el = $(element);
    if ($el.attr("aria-hidden")) return;
    $el.attr("aria-hidden", "true");
}

export const showElement = (element: HTMLElement | JQuery<HTMLElement>): void => {
    const $el = $(element);
    if (!$el.attr("aria-hidden")) return;
    $el.removeAttr("aria-hidden");
}
