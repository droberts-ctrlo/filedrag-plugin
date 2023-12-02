import { addClass, removeClass } from "./util";

declare global {
    interface Window {
        $: any;
    }
}

window.$ = require('jquery');

describe('Utiltity functions', () => {
    it('adds a class to an element', () => {
        const element = document.createElement('div');
        addClass(element, 'foo');
        expect(element.classList.contains('foo')).toBe(true);
    });

    it('does not add a class to an element if it already has it', () => {
        const element = document.createElement('div');
        element.classList.add('foo');
        addClass(element, 'foo');
        expect(element.classList.contains('foo')).toBe(true);
    });

    it('adds a class to a jQuery element', () => {
        const element = $('<div></div>');
        addClass(element, 'foo');
        expect(element.hasClass('foo')).toBe(true);
    });

    it('does not add a class to a jQuery element if it already has it', () => {
        const element = $('<div></div>');
        element.addClass('foo');
        addClass(element, 'foo');
        expect(element.hasClass('foo')).toBe(true);
    });

    it('removes a class from an element', () => {
        const element = document.createElement('div');
        element.classList.add('foo');
        removeClass(element, 'foo');
        expect(element.classList.contains('foo')).toBe(false);
    });

    it('does not remove a class from an element if it does not have it', () => {
        const element = document.createElement('div');
        removeClass(element, 'foo');
        expect(element.classList.contains('foo')).toBe(false);
    });

    it('adds a class to a jQuery element', () => {
        const element = $('<div></div>');
        addClass(element,'foo');
        expect(element.hasClass('foo')).toBe(true);
    });

    it('does not add a class to a jQuery element if it already has it', () => {
        const element = $('<div></div>');
        element.addClass('foo');
        addClass(element, 'foo');
        expect(element.hasClass('foo')).toBe(true);
    });
});