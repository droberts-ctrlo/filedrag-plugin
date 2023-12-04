import { DropZone } from "./DropZone";

declare global {
    interface Window {
        $: any;
    }
}

window.$ = require("jquery");

class TestDropZone extends DropZone {
    constructor(element: HTMLElement, callback: any) {
        super(element, {debug: true, testing: true}, callback);
    }

    public getDragging(): boolean {
        return this.dragging;
    }

    public setDragging(dragging: boolean): void {
        this.dragging = dragging;
    }

    public getDropZone(): JQuery<HTMLElement> {
        return this.dropZone;
    }
}

describe("DropZone tests", ()=> {
    it("should initialise the DropZone correctly", ()=> {
        const element = document.createElement("div");
        const dropElement = document.createElement("div");
        element.appendChild(dropElement);
        document.body.appendChild(element);
        const dropZone = new TestDropZone(dropElement, ()=> {});
        expect(dropZone).toBeDefined();
        expect(dropZone).toBeInstanceOf(DropZone);
        expect($(dropElement).data("dropzone")).toBe("true");
    });

    it("should begin drag when dragging over the document", ()=> {
        const element = document.createElement("div");
        const dropElement = document.createElement("div");
        element.appendChild(dropElement);
        document.body.appendChild(element);
        const dropZone = new TestDropZone(dropElement, ()=> {});
        const event = new Event("dragenter");
        document.dispatchEvent(event);
        expect(dropZone.getDragging()).toBe(true);
    });

    it("should stop drag when leaving the document", ()=> {
        const element = document.createElement("div");
        const dropElement = document.createElement("div");
        element.appendChild(dropElement);
        document.body.appendChild(element);
        const dropZone = new TestDropZone(dropElement, ()=> {});
        dropZone.setDragging(true);
        const event = new Event("dragleave");
        document.dispatchEvent(event);
        expect(dropZone.getDragging()).toBe(false);
    });

    it("should fire the callback when dropping a file", ()=> {
        const element = document.createElement("div");
        const dropElement = document.createElement("div");
        element.appendChild(dropElement);
        document.body.appendChild(element);
        const callback = jest.fn();
        const dropZone = new TestDropZone(dropElement, callback);
        dropZone.setDragging(true);
        const event: Event = new Event("drop");
        const target = dropZone.getDropZone();
        target.trigger("drop", event);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith([new File([""], "test.txt")]);
        expect(dropZone.getDragging()).toBe(false);
    });
});
