import { DropZone } from './DropZone';
import { it, describe, expect, jest } from '@jest/globals';

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    $: JQueryStatic
    jQuery: JQueryStatic
  }
}

window.$ = window.jQuery = require('jquery');

class TestDropZone extends DropZone {
  constructor(element: HTMLElement, callback: any) {
    super(element, { debug: true }, callback);
  }

  public getDragging(): boolean {
    return this.dragging;
  }

  public setDragging(dragging: boolean): void {
    this.dragging = dragging;
  }

  public getDropZone(): JQuery {
    return this.dropZone;
  }
}

describe('DropZone tests', () => {
  it('should initialise the DropZone correctly', () => {
    const element = document.createElement('div');
    const dropElement = document.createElement('div');
    element.appendChild(dropElement);
    document.body.appendChild(element);
    const dropZone = new TestDropZone(dropElement, () => {});
    expect(dropZone).toBeDefined();
    expect(dropZone).toBeInstanceOf(DropZone);
    expect($(dropElement).data('dropzone')).toBe('true');
  });

  it('should begin drag when dragging over the document', () => {
    const element = document.createElement('div');
    const dropElement = document.createElement('div');
    element.appendChild(dropElement);
    document.body.appendChild(element);
    const dropZone = new TestDropZone(dropElement, () => {});
    const event = $.Event('dragenter');
    $(document).trigger(event);
    expect(dropZone.getDragging()).toBe(true);
  });

  it('should stop drag when leaving the document', () => {
    const element = document.createElement('div');
    const dropElement = document.createElement('div');
    element.appendChild(dropElement);
    document.body.appendChild(element);
    const dropZone = new TestDropZone(dropElement, () => {});
    dropZone.setDragging(true);
    const event = $.Event('dragleave', { originalEvent: { clientX: 0, clientY: 0 } });
    $(document).trigger(event);
    expect(dropZone.getDragging()).toBe(false);
  });

  it('should fire the callback when dropping a file', () => {
    const element = document.createElement('div');
    const dropElement = document.createElement('div');
    element.appendChild(dropElement);
    document.body.appendChild(element);
    const callback = jest.fn();
    const dropZone = new TestDropZone(dropElement, callback);
    dropZone.setDragging(true);
    const event = $.Event('drop', { originalEvent: { dataTransfer: { files: [new File([''], 'test.txt')] }, stopPropagation: () => {} } });
    const target = dropZone.getDropZone();
    target.trigger(event);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([new File([''], 'test.txt')]);
    expect(dropZone.getDragging()).toBe(false);
  });
});
