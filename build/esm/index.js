import { DropZone } from "./lib/DropZone";
(function ($) {
    $.fn.dropZone = function (options) {
        const settings = $.extend({
            debug: false,
            testing: false,
            multiple: false,
        }, options);
        this.each(function () {
            new DropZone(this, settings, (files) => {
                $(this).trigger("dropzone.drop", files);
            });
        });
        return this;
    };
})(jQuery);
