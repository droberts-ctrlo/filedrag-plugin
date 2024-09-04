import { hideElement, showElement } from "./util";

window.$ = require('jquery');

describe('Utiltity functions', () => {
    it('hides an element',()=>{
        const el = document.createElement('div');
        const getAttr = jest.spyOn(el,'getAttribute');
        const setAttr = jest.spyOn(el, 'setAttribute');
        hideElement(el);
        expect(getAttr).toHaveBeenCalledWith('aria-hidden');
        expect(setAttr).toHaveBeenCalledWith('aria-hidden','true');
    });

    it('does not hide an element if it is already hidden',()=>{
        const el = document.createElement('div');
        el.setAttribute('aria-hidden','true');
        const getAttr = jest.spyOn(el,'getAttribute');
        const setAttr = jest.spyOn(el, 'setAttribute');
        hideElement(el);
        expect(getAttr).toHaveBeenCalledWith('aria-hidden');
        expect(setAttr).not.toHaveBeenCalled();
    });

    it('shows an element',()=>{
        const el = document.createElement('div');
        el.setAttribute('aria-hidden','true');
        const getAttr = jest.spyOn(el,'getAttribute');
        const removeAttr = jest.spyOn(el, 'removeAttribute');
        showElement(el);
        expect(getAttr).toHaveBeenCalledWith('aria-hidden');
        expect(removeAttr).toHaveBeenCalled();
    });

    it('does not show an element if it is already shown',()=>{
        const el = document.createElement('div');
        const getAttr = jest.spyOn(el,'getAttribute');
        const removeAttr = jest.spyOn(el, 'removeAttribute');
        showElement(el);
        expect(getAttr).toHaveBeenCalledWith('aria-hidden');
        expect(removeAttr).not.toHaveBeenCalled();
    });
});
