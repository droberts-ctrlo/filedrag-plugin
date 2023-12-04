import { addClass, hasClass, hideElement as hideElement, removeClass, showElement as showElement } from "./util";

window.$ = require('jquery');

describe('Utiltity functions', () => {
    it('checks if an element has a class', () => {
        const el = {
            hasClass: jest.fn()
        }
        hasClass(el, 'test');
        expect(el.hasClass).toHaveBeenCalledWith('test');
    });

    it('adds a class to an element', () => {
        const el = {
            hasClass: jest.fn().mockReturnValue(false),
            addClass: jest.fn()
        }
        addClass(el, 'test');
        expect(el.addClass).toHaveBeenCalledWith('test');
        expect(el.hasClass).toHaveBeenCalledWith('test');
    });

    it('does not add a class to an element if it already has it', () => {
        const el = {
            hasClass: jest.fn().mockReturnValue(true),
            addClass: jest.fn()
        }
        addClass(el, 'test');
        expect(el.addClass).not.toHaveBeenCalled();
        expect(el.hasClass).toHaveBeenCalledWith('test');
    });

    it('removes a class from an element', () => {
        const el = {
            hasClass: jest.fn().mockReturnValue(true),
            removeClass: jest.fn()
        }
        removeClass(el, 'test');
        expect(el.removeClass).toHaveBeenCalledWith('test');
        expect(el.hasClass).toHaveBeenCalledWith('test');
    });

    it('does not remove a class from an element if it does not have it', () => {
        const el = {
            hasClass: jest.fn().mockReturnValue(false),
            removeClass: jest.fn()
        }
        removeClass(el, 'test');
        expect(el.removeClass).not.toHaveBeenCalled();
        expect(el.hasClass).toHaveBeenCalledWith('test');
    });

    it('hides an element',()=>{
        const el = {
            hasClass: jest.fn().mockReturnValue(false),
            addClass: jest.fn(),
            css: jest.fn(),
            attr: jest.fn()
        };
        hideElement(el);
        expect(el.addClass).toHaveBeenCalledWith('hidden');
        expect(el.css).toHaveBeenCalledWith('display', 'none');
        expect(el.hasClass).toHaveBeenCalledWith('hidden');
        expect(el.css).toHaveBeenCalledWith('visibility', 'hidden');
        expect(el.attr).toHaveBeenCalledWith('aria-hidden', 'true');
    });

    it('does not hide an element if it is already hidden',()=>{
        const el = {
            hasClass: jest.fn().mockReturnValue(true),
            addClass: jest.fn(),
            css: jest.fn(),
            attr: jest.fn()
        };
        hideElement(el);
        expect(el.addClass).not.toHaveBeenCalled();
        expect(el.css).not.toHaveBeenCalled();
        expect(el.hasClass).toHaveBeenCalledWith('hidden');
        expect(el.css).not.toHaveBeenCalled();
        expect(el.attr).not.toHaveBeenCalled();
    });

    it('shows an element',()=>{
        const el = {
            hasClass: jest.fn().mockReturnValue(true),
            removeClass: jest.fn(),
            removeAttr: jest.fn()
        };
        showElement(el);
        expect(el.removeClass).toHaveBeenCalledWith('hidden');
        expect(el.hasClass).toHaveBeenCalledWith('hidden');
        expect(el.removeAttr).toHaveBeenCalledWith('aria-hidden');
        expect(el.removeAttr).toHaveBeenCalledWith('style');
    });

    it('does not show an element if it is already shown',()=>{
        const el = {
            hasClass: jest.fn().mockReturnValue(false),
            removeClass: jest.fn(),
            removeAttr: jest.fn()
        };
        showElement(el);
        expect(el.removeClass).not.toHaveBeenCalled();
        expect(el.hasClass).toHaveBeenCalledWith('hidden');
        expect(el.removeAttr).not.toHaveBeenCalled();
    });
});
