export class DropZone {
    constructor(element, options, callback) {
        this.options = options;
        this.callback = callback;
        this.dragging = false;
        if (this.options.debug)
            console.log("DropZone", element, options);
        this.el = element instanceof HTMLElement ? $(element) : element;
        if (this.options.multiple === undefined)
            this.options.multiple = false;
        this.init();
    }
    init() {
        if (this.el.attr("data-dropzone") === "true")
            return;
        if (this.options.debug)
            console.log("DropZone.init");
        this.getElements();
        this.addDocumentListeners();
        this.addElementListeners();
    }
    addElementListeners() {
        if (this.options.debug)
            console.log("DropZone.addElementListeners");
        this.dropZone.on("dragenter", (e) => {
            if (!this.dragging)
                return;
            e.stopPropagation();
            this.dropZone.addClass("drag-over");
        });
        this.dropZone.on("dragleave", (e) => {
            if (!this.dragging)
                return;
            e.stopPropagation();
            this.dropZone.removeClass("drag-over");
        });
        this.dropZone.on("drop", (e) => {
            if (!this.dragging)
                return;
            e.stopPropagation();
            this.dropZone.removeClass("drag-over");
            this.dragging = false;
            this.dropZone.hide();
            this.el.show();
            const files = e.originalEvent.dataTransfer.files;
            if (this.options.debug)
                console.log("Dropping: ", files);
            this.callback(this.options.multiple ? Array.from(files) : [files[0]]);
        });
    }
    addDocumentListeners() {
        if (this.options.debug)
            console.log("DropZone.addDocumentListeners");
        $(document).on("dragenter", () => {
            if (this.dragging)
                return;
            this.dragging = true;
            this.dropZone.show();
            this.el.hide();
        });
        $(document).on("dragleave", (e) => {
            if (e.originalEvent.clientX != 0 && e.originalEvent.clientY != 0)
                return;
            if (!this.dragging)
                return;
            this.dragging = false;
            this.dropZone.hide();
            this.el.show();
        });
        $(document).on("drop", (e) => { e.stopPropagation(); });
    }
    getElements() {
        if (this.options.debug)
            console.log("DropZone.getElements");
        this.el.data("dropzone", "true");
        this.dropZone = $(`<div class="drop-zone"></div>`);
        this.el.parent().append(this.dropZone);
        this.dropZone.hide();
    }
}
;
