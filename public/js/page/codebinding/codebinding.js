//codebinding
$(function () {

    //hintText
    $("input[type='text'], input[type='password']").hintText();

    // audio player
    new jPlayerPlaylist({
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
            autoPlay: true
        },
        swfPath: "/plugins/jplayer",
        supplied: "mp3, oga",
        wmode: "window",
        smoothPlayBar: true,
        keyEnabled: true,
        loop: true
    });



});