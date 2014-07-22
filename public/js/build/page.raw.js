/*! MySite 2014-07-22 */
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
            free:true,
            mp3:"/media/audio/troubleisafriend.mp3",
            oga:"/media/audio/troubleisafriend.ogg"
        },
        {
            title:"The Show",
            free:true,
            mp3:"/media/audio/TheShow.mp3",
            oga:"/media/audio/TheShow.ogg"
        },
        {
            title:"The Sound of Silence",
            free:true,
            mp3:"/media/audio/TheSoundofSilence.mp3",
            oga:"/media/audio/TheSoundofSilence.ogg"
        },
        {
            title:"Everything At Once",
            free:true,
            mp3:"/media/audio/EverythingAtOnce.mp3",
            oga:"/media/audio/EverythingAtOnce.ogg"
        },
        {
            title:"洛丽塔",
            free:true,
            mp3:"/media/audio/luolita.mp3",
            oga:"/media/audio/luolita.ogg"
        },
        {
            title:"皇后大道东",
            free:true,
            mp3:"/media/audio/huanghoudadaodong.mp3",
            oga:"/media/audio/huanghoudadaodong.ogg"
        }
    ], {
        playlistOptions: {
            autoPlay: true,
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