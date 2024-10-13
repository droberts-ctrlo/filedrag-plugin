export interface DropZoneOptions {
    debug?: boolean;
    multiple?: boolean;
}
export declare class DropZone {
    private options;
    private callback;
    private el;
    protected dropZone: JQuery;
    protected dragging: boolean;
    constructor(element: HTMLElement | JQuery, options: DropZoneOptions, callback: (files: File[]) => void);
    private init;
    private addElementListeners;
    private addDocumentListeners;
    private getElements;
}
