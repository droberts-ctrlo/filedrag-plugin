import { HtmlElementOrJQueryElement } from "./types";
import { addClass, hideElement, removeClass, showElement, stopPropagation } from "./util";

interface DropZoneOptions {
    debug?: boolean;
    multiple?: boolean;
    testing?: boolean;
}

export class DropZone {
    private el: JQuery<HTMLElement>;
    protected dropZone: JQuery<HTMLElement>;
    protected dragging: boolean = false;

    constructor(element: HtmlElementOrJQueryElement, private options: DropZoneOptions, private callback: (files: File[]) => void) {
        if(this.options.debug) console.log("DropZone", element, options);
        this.el = element instanceof HTMLElement ? $(element) : element;
        if(this.options.multiple === undefined) this.options.multiple = false;
        this.init();
    }

    private init() {
        if(this.el.attr("data-dropzone") === "true") return;
        if(this.options.debug) console.log("DropZone.init");
        this.getElements();
        this.addDocumentListeners();
        this.addElementListeners();
    }

    private addElementListeners() {
        if(this.options.debug) console.log("DropZone.addElementListeners");
        this.dropZone.on("dragenter", (e:JQuery.DragEnterEvent)=> {
            if(!this.dragging) return;
            stopPropagation(e);
            addClass(this.dropZone, "drag-over");
        });
        this.dropZone.on("dragleave", (e:JQuery.DragLeaveEvent)=> {
            if(!this.dragging) return;
            stopPropagation(e);
            removeClass(this.dropZone, "drag-over");
        });
        this.dropZone.on("drop", (e:JQuery.DropEvent)=> {
            if(!this.dragging) return;
            stopPropagation(e);
            removeClass(this.dropZone, "drag-over");
            this.dragging = false;
            hideElement(this.dropZone);
            showElement(this.el);
            const files = this.options.testing ? [new File([""],"test.txt")]: e.originalEvent.dataTransfer.files;
            if(this.options.debug) console.log("Dropping: ", files);
            this.callback(this.options.multiple ? Array.from(files): [files[0]]);
        });
    }

    private addDocumentListeners() {
        if(this.options.debug) console.log("DropZone.addDocumentListeners");
        $(document).on("dragenter", (e)=> {
            if(this.dragging) return;
            this.dragging = true;
            showElement(this.dropZone);
            hideElement(this.el);
        });
        $(document).on("dragleave", (e:JQuery.DragLeaveEvent)=> {
            if(!(this.options.testing) && e.originalEvent.clientX != 0 && e.originalEvent.clientY != 0 ) return;
            if(!this.dragging) return;
            this.dragging = false;
            hideElement(this.dropZone);
            showElement(this.el);
        });
        $(document).on("drop", (e)=> {stopPropagation(e);})
    }

    private getElements() {
        if(this.options.debug) console.log("DropZone.getElements");
        this.el.data("dropzone", "true");
        this.dropZone = $(`<div class="drop-zone"></div>`);
        this.el.parent().append(this.dropZone);
        hideElement(this.dropZone);
    }
};