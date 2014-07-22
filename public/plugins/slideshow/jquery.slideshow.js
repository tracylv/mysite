// slideshow
(function ($) {

    var defaults =
    {
        loop: true,

        //auto play
        autoplay: true,

        // duration: 5s
        duration: 5000
    };

    $.fn.slideshow = function (options) {

        var settings = $.extend(true, {}, defaults, options);
        return this.each(function () {
            var $con = $(this);
            var $slide = $(".slide", $con);
            var $slideitem = $("li", $slide);

            var slidewidth = $slideitem.width();
            var $list = $(".itemlist li", $con);
            var slidenum = $list.length;
            var timeoutid = null;

            $con.width(slidewidth).height($slideitem.height());
            $slide.width(slidewidth).height($slideitem.height());
            $slide.css({"position":"absolute", "top":"0", "left":"0"});

            $("a.control", $con).click(function(e){

                var $this = $(this);
                var dir = "next";
                var index = $(".itemlist li.current", $con).index();

                if($this.hasClass("prev"))
                {
                    dir = "prev";
                }

                if(!settings.loop && ((index === 0 && dir =="prev") || (index == slidenum - 1 && dir =="next")))
                {
                    return false;
                }

                // make sure previous sliding finished
                if($("li",$slide).length >= 2 || $("li",$slide).length === 0)
                {
                    return false;
                }

                rotateNext(index, dir);
                e.preventDefault();
            });

            // stop rotate when hover
            $con.hover(function(){
                clearTimeout(timeoutid);
            },function(){
                if(settings.autoplay)
                {
                    autoplay();
                }
            });

            if(settings.autoplay)
            {
                autoplay();
            }

            function autoplay()
            {
                clearTimeout(timeoutid);
                timeoutid = setTimeout(function(){
                    $("a.next", $con).click();
                    autoplay();
                }, settings.duration);
            }

            function rotateNext(currentindex, direction)
            {

                var nextindex;
                var beforecss;
                var aftercss;
                var $slidecopy = $slideitem.clone();

                if(direction == "prev")
                {
                    nextindex = (currentindex - 1 + slidenum)%slidenum;
                    beforecss = {"left": 0 - slidewidth + "px"};
                    aftercss  = {"left":"0"};
                }

                if(direction == "next")
                {
                    nextindex = (currentindex + 1 + slidenum)%slidenum;
                    beforecss = {"left":"0"};
                    aftercss  = {"left": 0 - slidewidth + "px"};
                }

                // right align
                $slide.css(beforecss);

                // make container width bigger to contain two slides
                $slide.width(slidewidth * 2);
                $slidecopy.find("img").attr("src",$list.eq(nextindex).find(".img-src").attr("img-src"));

                if(direction == "prev")
                {
                    $slide.prepend($slidecopy);
                    $slide.animate(aftercss, 'slow', function(){
                        $slide.find("li:last").remove();
                        $slide.width(slidewidth).css({"left": 0});
                    });
                }

                if(direction == "next")
                {
                    $slide.append($slidecopy);
                    $slide.animate(aftercss, 'slow', function(){
                        $slide.find("li:first").remove();
                        $slide.width(slidewidth).css({"left": 0});
                    });
                }

                $list.eq(currentindex).removeClass("current");
                $list.eq(nextindex).addClass("current");
            }


        });
    };
    $.fn.slideshow.defaults = defaults;
})(jQuery);