import { DropZoneOptions } from './lib/DropZone';
declare global {
    interface JQuery {
        dropZone(options: DropZoneOptions): JQuery;
    }
}
