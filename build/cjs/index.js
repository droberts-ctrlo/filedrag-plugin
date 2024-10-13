"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DropZone_1 = require("./lib/DropZone");
(function ($) {
    $.fn.dropZone = function (options) {
        const settings = $.extend({
            debug: false,
            testing: false,
            multiple: false,
        }, options);
        this.each(function () {
            new DropZone_1.DropZone(this, settings, (files) => {
                $(this).trigger("dropzone.drop", files);
            });
        });
        return this;
    };
})(jQuery);
