/*! MySite 2014-07-27 */
/* common.js */

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

Array.prototype.contains = function (e) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == e) {
            return true;
        }
    }
    return false;
};

Array.prototype.indexof = function (e) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == e) {
            return i;
        }
    }
    return -1;
};

// hintText
(function ($) {

    var defaults =
    {

    };

    $.fn.hintText = function (options) {

        var settings = $.extend(true, {}, defaults, options);
        return this.each(function () {

            var $this = $(this);
            var $con = $this.parent();

            // generate hintText dom
            var dom = "<span class='hinttext'>" + $this.attr("placeholder") + "</span>";
            $this.attr("placeholder", "");
            $(dom).appendTo($con);

            if($this.val().trim().length > 0)
            {
                $(".hinttext", $con).hide();
            }

            $this.click(function () {

                // hide hint text
                $(".hinttext", $con).hide();

                // the input area get focus
                $this.focus();
            });

            // in case, click on the hint text
            $(".hinttext", $con).click(function (event) {

                // hide hint text
                $(this).hide();

                // the input area get focus
                $this.focus();
            });

            // when input area is blur, if input value is null then show hint text , or else don't show hint text
            $this.blur(function () {

                var inputval = $this.val().trim();

                if (inputval === "" || inputval === null) {
                    $(".hinttext", $con).show();
                }
            });

            // input area get focus , hide the hint text
            $this.focus(function () {
                $(".hinttext", $con).hide();
            });

        });
    };
    $.fn.hintText.defaults = defaults;
})(jQuery);
//header.js
var header='h';
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
            var slidenum = $list.length + 1;
            var timeoutid = null;
            var $slideitemcopy;
            var currentindex = settings.loop === true ? 1 : 0;
            var lock = false;

            $con.width(slidewidth).height($slideitem.height());
            for(var i = 0; i < $list.length; i++)
            {
                $slideitemcopy = $slideitem.clone();
                $slideitemcopy.find("img").attr("src",$list.eq(i).find(".img-src").attr("img-src"));
                $slide.append($slideitemcopy);
            }

            if(settings.loop)
            {
                // add the last item copy before the first slide, and add the first item copy after the last slide
                $slide.append($("li", $slide).eq(0).clone());
                $slide.prepend($("li", $slide).eq(slidenum - 1).clone());
                $slide.css({"margin-left": 0 - slidewidth + "px"});
            }
            else
            {
                $("a.prev", $con).hide();
            }
            $slide.width(slidewidth * $("li", $slide).length).height($slideitem.height());

            $("a.control", $con).click(function(e){

                if(lock)
                {
                    return false;
                }

                var $this = $(this);
                var dir = "next";

                if($this.hasClass("prev"))
                {
                    dir = "prev";
                }

                if(!settings.loop && ((currentindex === 0 && dir =="prev") || (currentindex == slidenum - 1 && dir =="next")))
                {
                    return false;
                }

                rotateNext(dir);
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

            function rotateNext(direction)
            {

                lock = true;
                var $slideitems = $("li", $slide);

                if(settings.loop)
                {
                    if(currentindex === 0)
                    {
                        $slide.css({"margin-left": 0 - slidewidth * ($slideitems.length - 2) + "px"});
                        currentindex = $slideitems.length - 2;
                    }

                    if(currentindex == $slideitems.length - 1)
                    {
                        $slide.css({"margin-left": 0 - slidewidth + "px"});
                        currentindex = 1;
                    }
                }

                if(direction == "prev")
                {
                    $slide.animate({"margin-left" : "+=" + slidewidth + "px" }, 'slow', function(){
                        currentindex = (currentindex - 1 + $slideitems.length) % $slideitems.length;

                        if(!settings.loop && currentindex === 0)
                        {
                            $("a.prev", $con).hide();
                        }
                        else
                        {
                            $("a.prev", $con).show();
                        }

                        $("a.next", $con).show();

                        lock = false;
                    });
                }

                if(direction == "next")
                {

                    $slide.animate({"margin-left" : "-=" + slidewidth + "px" }, 'slow', function(){
                        currentindex = (currentindex + 1 + $slideitems.length) % $slideitems.length;

                        if(!settings.loop && currentindex == $slideitems.length - 1)
                        {
                            $("a.next", $con).hide();
                        }
                        else
                        {
                            $("a.next", $con).show();
                        }

                        $("a.prev", $con).show();

                        lock = false;
                    });
                }
            }


        });
    };
    $.fn.slideshow.defaults = defaults;
})(jQuery);
//codebinding
$(function () {

    //hintText
    $("input[type='text'], input[type='password']").hintText();

    //slideshow
    $('.slideshow').slideshow();

    // audio player
    var myPlaylist = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
    }, [
        {
            title:"Trouble Is A Friend",
            mp3:"/media/audio/troubleisafriend.mp3",
            oga:"/media/audio/troubleisafriend.ogg"
        },
        {
            title:"The Show",
            mp3:"/media/audio/TheShow.mp3",
            oga:"/media/audio/TheShow.ogg"
        },
        {
            title:"The Sound of Silence",
            mp3:"/media/audio/TheSoundofSilence.mp3",
            oga:"/media/audio/TheSoundofSilence.ogg"
        },
        {
            title:"Everything At Once",
            mp3:"/media/audio/EverythingAtOnce.mp3",
            oga:"/media/audio/EverythingAtOnce.ogg"
        },
        {
            title:"洛丽塔",
            mp3:"/media/audio/luolita.mp3",
            oga:"/media/audio/luolita.ogg"
        },
        {
            title:"皇后大道东",
            mp3:"/media/audio/huanghoudadaodong.mp3",
            oga:"/media/audio/huanghoudadaodong.ogg"
        }
    ], {
        playlistOptions: {
            autoPlay: false,
            shuffleTime: "fast"
       },
        swfPath: "/plugins/jplayer",
        supplied: "mp3, oga",
        wmode: "window",
        smoothPlayBar: true,
        keyEnabled: true,
        loop: true
    });
    myPlaylist.shuffle(true);

});