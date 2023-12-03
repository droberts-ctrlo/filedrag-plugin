import { DropZone } from "./DropZone";

declare global {
    interface Window {
        $: any;
    }
}

window.$ = require("jquery");

describe("DropZone tests", ()=> {
    it("the DropZone should initialise correctly", ()=> {
        const element = document.createElement("div");
        const dropElement = document.createElement("div");
        element.appendChild(dropElement);
        document.body.appendChild(element);
        const dropZone = new DropZone(dropElement, {}, ()=> {});
        expect(dropZone).toBeDefined();
        expect(dropZone).toBeInstanceOf(DropZone);
        expect($(dropElement).data("dropzone")).toBe("true");
    });
});
