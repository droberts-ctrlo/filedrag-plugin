import { HtmlElementOrJQueryElement } from "./types";
import { hideElement } from "./util";

interface DropZoneOptions {
    debug?: boolean;
}

export class DropZone {
    private el: JQuery<HTMLElement>;
    private dropZone: JQuery<HTMLElement>;

    constructor(element: HtmlElementOrJQueryElement, private options: DropZoneOptions, private callback: (files: File[]) => void) {
        this.el = element instanceof HTMLElement ? $(element) : element;
        this.init();
    }

    private init() {
        if(this.el.data("dropzone") === "true") return;
        this.getElements();
        this.addDocumentListeners();
        this.addElementListeners();
    }

    private addElementListeners() {
        throw new Error("Method not implemented.");
    }

    private addDocumentListeners() {
        throw new Error("Method not implemented.");
    }

    private getElements() {
        this.el.data("dropzone", "true");
        this.dropZone = $(`<div class="drop-zone"></div>`);
        this.el.parent().append(this.dropZone);
        hideElement(this.dropZone);
    }
};