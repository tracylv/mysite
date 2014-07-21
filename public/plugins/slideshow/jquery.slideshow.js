// slideshow
(function ($) {

    var defaults =
    {
        loop: true
    };

    $.fn.slideshow = function (options) {

        var settings = $.extend(true, {}, defaults, options);
        return this.each(function () {
            var $con = $(this);
            var $slide = $(".slide", $con);
            var $slideitem = $("li", $slide);
            var $slidecopy = $slideitem.clone();
            var slidewidth = $slideitem.width();

            $con.width(slidewidth).height($slideitem.height());
            $slide.width(slidewidth * 2).height($slideitem.height());
            $slide.css({"position":"absolute", "top":"0", "left":"0"});




        });
    };
    $.fn.slideshow.defaults = defaults;
})(jQuery);