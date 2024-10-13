import { DropZone, DropZoneOptions } from './lib/DropZone';

declare global {
  interface JQuery {
    dropZone(options: DropZoneOptions): JQuery
  }
}

(function ($) {
  $.fn.dropZone = function (options: DropZoneOptions) {
    const settings = $.extend(
      {
        debug: false,
        testing: false,
        multiple: false,
      },
      options,
    );

    this.each(function () {
      new DropZone(this, settings, (files) => {
        $(this).trigger('dropzone.drop', files);
      });
    });

    return this;
  };
})(jQuery);
