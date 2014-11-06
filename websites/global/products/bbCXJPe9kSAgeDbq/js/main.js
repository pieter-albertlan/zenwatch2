var animationTime = .7;
var currentPage=0;
var totalPage;
var timeNow;
var lastAnimation = 0;
var quietPeriod = 500;
var checkScrollingId = null;
var checkScrollingAry = [];
var isScrolling = false;
var preScrollTopPos;
var breakHeight = 750;
var staticPageHeight = 800;
var limitHeight = breakHeight;
var breakScreenSmall = 320;
var breakScreenMedium = 720;
var breakScreenWide = 960;
var breakIEVer =9;

var device_w;
var device_h;

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//
$(function(){

   var config = {};
   config.triggerMethod = 'click';
   config.asusMainNavH = 58;
   config.breakHeight = 650;
   config.smallBreakW = 320;
   config.mediumBreakW = 720;
   config.largeBreakW = 960;

   config.paginationW = 22;
   config.refreshTime = 1000;
   config.baseH = 800;
   config.bgW = 2000;
   config.bgH = config.baseH;
   //
   var fit = function(oriW,oriH,newW,newH,target){
        var width  = oriW;
        var height = oriH;//$(this).height();
        var parentWidth  = newW;
        var parentHeight = newH;


        if(oriW/newW < oriH/newH)
        {
            newWidth  = newW;
            newHeight = newWidth/width*height;
        }
        else
        {
            newHeight = newH;
            newWidth  = newHeight/height*width;
        }
        margin_top  = (newH - newHeight) / 2;
        margin_left = (newW  - newWidth ) / 2;
        target.css({'margin-top'  :Math.round(margin_top)  + 'px',
                     'margin-left':Math.round(margin_left) + 'px',
                     'height'     :Math.round(newHeight)   + 'px',
                     'width'      :Math.round(newWidth)    + 'px'});
    }

    var updateScreensizeStatus = function(){
        var device_w = $(window).width();
        var device_h = $(window).height();

        if(device_w>=config.largeBreakW){
            config.screen_mode = 'l';
            $("html").attr("screen-mode","l");
        }
        else if(device_w<config.largeBreakW && device_w> config.mediumBreakW){
            config.screen_mode = 'm';
            $("html").attr("screen-mode","m");
        }
        else{
            config.screen_mode = 's';
            $("html").attr("screen-mode","s");
        }
    }
    var updateScreensize = function(a_boolean){
        var device_w = $(window).width();
        var device_h = $(window).height();

        updateScreensizeStatus();

        if($("html").hasClass("lt-ie9") || $("html").hasClass("static")){
            device_h = config.baseH;
        }
        
       

        //resize event
        if(!a_boolean){
         if(device_w == config.width && device_h == config.height){
            return;
            } 

        }
        
        //alert('test');//test
        config.width = device_w;
        config.height = device_h;
                
        resizeWrap();
        resizeSignpost();
        resizeBackground();
        resizeSection();
        resizeOceanAnimation();
        resizeNextSection();
        cleanUpStuff();
    }

    var swapEl = function(a,b,scope){
        $(scope).append($(a,scope));
        $(scope).append($(b,scope));
    }


    var moveEl = function(from,to){
        $(to).append($(from));
    }

    var resizeNextSection = function(){

      

    }

    var cleanUpStuff = function(){

      TweenMax.set($("#design .overview figure"), {marginTop:"auto"});

    }

    var resizeSection = function(){
        //set page height
        switch(config.screen_mode){
            
            case "l":
                var assets_ary = [];
                assets_ary.push($(content_target+" #wrap section"));
                assets_ary.push($(content_target+" #wrap section article"));
                for(var i in assets_ary){
                    assets_ary[i].css('height',config.height);
                    assets_ary[i].css('width',config.width);   

                    var imgs = $(".bg>img",assets_ary[i]);                

                    for (var i = 0; i < imgs.length; i++) {
                      var img = $(imgs[i]);

                      var imgWidth = img.attr("baseWidth");
                      var imgHeight = img.attr("baseHeight");

                      if (imgWidth != undefined){

                        fit(imgWidth,imgHeight,config.width,config.height,img);
                      }
                    };

                    
                   // assets_ary[i].trigger('update');
                }
                

                if($("html").hasClass('static'))
                    return;
                
                //$("#overview .center").css('margin-top',(config.height-800)/2);

                

                var zenui_h = $("#ocean .overview .group").height();
                TweenMax.set($("#ocean .center"),{marginTop:(config.height-zenui_h)/2-20});

                var zenui_bg = $("#ocean .bg");
                var zenui_bg_sky = $("#ocean .bg .sky");
                var zenui_bg_sky_bottom = $("#ocean .bg .sky-bottom");
                var zenui_bg_waves = $("#ocean .bg .waves");

                fit(config.bgW,config.bgH,config.width,config.height,$(zenui_bg,assets_ary[i]));
                TweenMax.set( zenui_bg_sky, {clearProps:"all"} );
                TweenMax.set( zenui_bg_waves, {clearProps:"all"} );
                TweenMax.set( zenui_bg_sky_bottom, {clearProps:"all"} );
                //console.log(zenui_bg_waves.attr( "data-src"));
                //zenui_bg_waves.attr( "data-src", zenui_bg_waves.attr("data-src").replace( /\.gif$/, ".gif?rnd=" + Math.floor(Math.random() * 100) + 1));



                $("#next-section").css("height", "308px");
                $("#next-section .page" ).css("height", "308px");

                var section_name = $(".main-wrapper").attr("id");
                
                switch(section_name){

                  case "overview":

                    target = $(".page.overview .group");
                    target.css('margin-top', (config.height-437)/2);

                    target = $("#design .overview figure img");
                    TweenMax.set(target,{right:-config.width/7});
                                    
                    target = $("#design figure img");
                    target.css('height',config.height);

                    target = $("#design .group");
                    target.css('margin-top', (config.height-455)/2);

                    target = $("#ocean .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    target = $("#smart .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    target = $("#welness .group");
                    target.css('margin-top', (config.height-480)/2);

                  break;

                  case "design":

                    target = $("#overview .bg img");
                    fit(target.attr("baseWidth"),target.attr("baseHeight"),config.width*0.6,config.height,target);
                    target.css("margin-left", parseFloat(target.css("margin-left")) * 2);

                    target = $("#craftmanship .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    target = $("#clasp .bg figure img");
                    fit(target.attr("baseWidth"),target.attr("baseHeight"),config.width*0.55,config.height,target);
                    target.css("margin-left", parseFloat(target.css("margin-left")) * 2);

                    target = $("#clasp .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    target = $("#belt .bg img");
                    fit(target.attr("baseWidth"),target.attr("baseHeight"),config.width*0.50,config.height,target);
                    target = $("#belt .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    target = $("#face .group");
                    target.css('margin-top', (config.height-357)/2);
                    target = $("#face figure");
                    target.css('margin-top', (config.height-500)/2);

                    target = $("#timeless .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    target = $("#curved-glass .bg img");
                    fit(target.attr("baseWidth"),target.attr("baseHeight"),config.width*0.60,config.height,target);
                    target = $("#curved-glass .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    target = $("#materials .bg img");
                    var parent = $(target.parent());
                    target.attr("width", parent.width());
                    parent.css("left", (config.width - parent.width()) / 2 );
                    target = $("#materials .group");
                    target.css('margin-top', ((config.height-parent.outerHeight()) - ( target.outerHeight() ) ));

                    target = $("#sequence .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2.5);

                    target = $("#stunning-display .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    //target = $("#next-section figure img");
                    //target.attr("height", "308px")


                  break;

                  case "fitness":

                    target = $("#overview .group");
                    target.css('margin-top', ((config.height-257)-target.outerHeight())/2);

                    target = $("#wellness-manager .group");
                    target.css('margin-top', ((config.height)-target.outerHeight())/2);

                    target = $("#activity-tracking .group");
                    target.css('margin-top', ((config.height)-target.outerHeight())/3);
                    target = $("#activity-tracking figure");
                    target.css('margin-top', ((config.height)-455)/2);

                    target = $("#wellness-apps .center");
                    target.css('margin-top', ((config.height)-583)/2);

                    target = $("#up .group");
                    target.css('margin-top', ((config.height)-494)/2);

                    target = $("#scenario .group");
                    target.css('margin-top', ((config.height)-target.outerHeight())/2);


                  break;

                  case "smart":
                    target = $("#overview .group");
                    target.css('margin-top', (config.height-368)/2);

                    target = $("#perfect-combination .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    target = $("#remote-camera .group");
                    target.css('margin-top', (config.height-422)/2);

                    target = $("#zen-ui .group");
                    target.css('margin-top', (config.height-target.outerHeight()-75)/2);

                    target = $("#zen-ui .figure-img");
                    target.css('margin-top', (config.height-431-75)/2);

                    target = $("#android-apps .group");
                    target.css('margin-top', (config.height-target.outerHeight()-75)/2);
                    target = $("#android-apps figure");
                    target.css('padding-top', (config.height-220)/2);

                    target = $("#presentation-control .group");
                    target.css('margin-top', (config.height-440)/2);

                    target = $("#unlock .group");
                    target.css('top', (config.height-target.outerHeight())/2);

                    target = $("#unlock .bg-left img");
                    fit(target.attr("baseWidth"),target.attr("baseHeight"),config.width*0.50,config.height,target);

                    target = $("#unlock .bg-right img");
                    fit(target.attr("baseWidth"),target.attr("baseHeight"),config.width*0.50,config.height,target);


                    target = $("#find-my-phone .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);


                    target = $("#cover-to-mute .group");
                    target.css('margin-top', (config.height-462)/2);
                  break;


                  case "android-wear":


                    target = $("#quick-start .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);
                    
                    target = $("#links .group");
                    target.css('margin-top', (config.height-target.outerHeight())/2);

                    target = $("#links .youtube");
                    target.css('margin-top', (config.height-target.outerHeight())/2);


                  break;


                    

                }



               
            break;


            case "m":
            case "s":
                $(".bg>img").hide();
                $("#kv .bg>img").show();

                //

                //
                fit(config.bgW,config.bgH,config.width,config.height,$("#kv .bg>img"));
               // a.remove();
                //b.remove();
                $(content_target+" #wrap section").each(function(){
                    $(this).css('height','auto');
                    $(this).css('width',config.width);

                    $("article",$(this)).css('width',config.width);
                    $("article",$(this)).css('height',"auto");

                    if($("article",$(this)).length>1){
                      var max_h =400;
                        $("article",$(this)).each(function(){
                            $(this).css('height','auto');

                            var articleH = $(this).height();
                            var section_name = $(this).parent().parent().attr("id");
                            var article_name = jQuery.trim($(this).attr("class").replace("page","").replace("show","").replace("light","").replace("dark","").replace("align-bottom",""));



                            switch(section_name){

                                case 'performance':
                                    switch(article_name){
                                        case 'overview':
                                            
                                        break; 
                                    }    
                                    
                                break;
                                case 'design':
                                    switch(article_name){
                                        case 'overview':
                                            
                                        break;
                                        

                                    }
                                break;

                            }
                            articleH=Math.round(articleH);
                            //console.log('h',section_name,article_name,articleH);

                            if(articleH>max_h){
                                max_h = articleH;
                            }
                            //console.log($(this).attr("class"),$(this).height(),$(".center",$(this)).height(),$("figure",$(this)).height(),$("img",$(this)).height())
                            $(this).attr("data-height",articleH);
                        })

                        $("article",$(this)).each(function(){
                          $(this).css("height",max_h);
                          
                          //fit(config.bgW,config.bgH,config.width,max_h,$(".bg>img",$(this)));
                           //  fit(config.bgW,config.bgH,config.width,max_h,$(".bg",$(this)));
                            
                        })

                         
                    }
                 })
                
            


            break;

       }

       /*
        if($("html").hasClass('static')){
            //l
            $(content_target+" #wrap section").each(function(){
                $("article",$(this)).each(function(){
                  $(this).css("height",800);
                })
             })
        }*/
    }

    function resizeSignpostForMobile(){
        $("#special-sectionOverview section").each(function(){
            var section_H=$("#special-sectionOverview section").height();
            $(".signpost").css('top', (section_H - $(".signpost").height())/2);
        })
    }
    var resizeSignpost = function(){
        //align signpost
        $(".signpost").css('top', (config.height - $(".signpost").height())/2+$("#overview-top-nav").height()/2);

        switch(config.screen_mode){
            case 'l':
            case 'm':
                resizeSignpostForMobile();
            case 's':
                resizeSignpostForMobile();
            break;
        }
    }

    var resizeWrap = function(){
        //scene width
        $(content_target+" #wrap").css('width',config.width);
        var page_width = parseFloat($(content_target+" #wrap .center").eq(0).css('width'));

        //center scene
        if(config.width<=config.largeBreakW){
            $(content_target+" #wrap").css('margin-left',0);
        }else{
            $(content_target+" #wrap").css('margin-left',-(config.width - page_width)/2);
        }
        
    }

    var resizeBackground = function(){    
        return;
        console.log('resizeBackground');
        // fullscreen bg
        var bgH = config.height;
        if(bgH<config.baseH){
            // bgH = config.baseH;
        }

        $(".bg").each(function(){
            //oriW,oriH,newW,newH,target
/*            console.log("oriW=" + config.bgW);//test
            console.log("oriH=" + config.bgH);//test
            console.log("newW=" + config.width);//test
            console.log("newH=" + $(this).parent().height());//test
            console.log("target=" + $("article>.bg>img"));//test*/

           //fit(config.bgW,config.bgH,config.width,$(this).parent().height(),$("article>.bg>img"));        
        })
    }

    var resizeOceanAnimation = function(){

      var timeline = new TimelineMax({paused:true});

      var zenui_bg_sky = $("#ocean .bg .sky");
      var zenui_bg_sky_bottom = $("#ocean .bg .sky-bottom");
      var zenui_bg_waves = $("#ocean .bg .waves");
      var zenui_group = $("#ocean .group");

      TweenMax.set(zenui_bg_sky, {clearProps:"all"});
      TweenMax.set(zenui_bg_sky_bottom, {clearProps:"all"});
      TweenMax.set(zenui_bg_waves, {clearProps:"all"});

      TweenMax.set(zenui_bg_sky, {y:-config.height/3});
      timeline.insert(TweenMax.to(zenui_bg_sky, 1, {y:config.height/3, ease:Linear.easeNone}));

      TweenMax.set(zenui_bg_waves, {css:{height:config.height/2}});
      timeline.insert(TweenMax.to(zenui_bg_waves, 1, {css:{height:0}, ease:Linear.easeNone}));

      TweenMax.set(zenui_bg_sky_bottom, {css:{top:(config.height/2)}});
      timeline.insert(TweenMax.to(zenui_bg_sky_bottom, 1, {css:{top:config.height-2}, ease:Linear.easeNone}));

      var _window = $(window);
      var ratio = (_window.scrollTop() / config.height) / 2;
      TweenMax.set(timeline, {time:ratio});
      
      _window.unbind("scroll");

      _window.scroll(function() {
        var ratio = (_window.scrollTop() / config.height) / 2;
        if (ratio <= 1){
          TweenMax.set(timeline, {time:ratio});
        }
        
      });

    }
 
    var initPagination = function(){
        //set pagination width
        $('.pagination').each(function(){
            var item_total = $(this).find('a').length;
            var item_width = parseInt($(this).find('a').eq(1).css('width'));
            var item_gap = parseInt($(this).find('a').eq(1).css('margin-left'));
            //
            $("a>b",$(this)).eq(item_total-1).css('margin-right',0);
            //
            var setCenterW = parseInt($('.pagination a b').css('margin-right'));

            var width = (item_total*item_width + (item_total-1)*item_gap)+(config.paginationW-setCenterW)+5+'px';

            $(this).css('left','auto');
            $(this).find('.center').css('width',width);
        })
        //
        //pagination event
        var pagenation = $('.pagination a');
        pagenation.bind('mouseover',function(e){
            var target = $(this).parent().parent().parent().find('.tip');
            var text = $(this).attr('data-title');
            target.addClass('show');
            target.html(text);
            var parentOffset = $(this).parent().parent().offset(); 
            target.css('top',e.pageY - parentOffset.top - target.height()-10);
            target.css('left',e.pageX - target.width()/2);
            e.preventDefault();
        });

        pagenation.bind('mouseout',function(e){
            var target = $(this).parent().parent().parent().find('.tip');
            var text = "";
            target.removeClass('show');
            target.html(text);
            e.preventDefault();
        });
    }


    var initSection = function(){
        $(content_target+" #wrap section").each(function(){

            if($(this).find('.page').length>1){
                $(this).addClass('multi');
            }
            var article = $(this).find('.page').eq(0);
            article.addClass('show');
            $(this).find('.bg-wrap').find('.bg').eq(0).addClass('show');
            //
          
            var signpost = $(this).find('nav.signpost a');
            if(article.hasClass('dark'))
                signpost.removeClass('dark').addClass('light');

            if(article.hasClass('light'))
                signpost.removeClass('light').addClass('dark');

            var total = $("article",$(this)).length;

            if(total<=1)
                return;

            var carousel = new Carousel($(".swipe-wrap",$(this)));
            
            carousel.init();
 
            //
            //pagination event
            var pagenation = $('.pagination a',$(this));

            pagenation.unbind(config.triggerMethod).bind(config.triggerMethod,function(e){
                e.preventDefault();
                var index = $(this).index();
                var target = $(this).parent().parent().parent().find('article').eq(index);
                //
                var signpost = $(this).parent().parent().parent().find('nav.signpost a');
                if(target.hasClass('dark'))
                    signpost.removeClass('dark').addClass('light');
                
                if(target.hasClass('light'))
                    signpost.removeClass('light').addClass('dark');

                carousel.showPane(index,true);
               
            })
        })
    }

    var initSignpost = function(){
        $('.signpost a.next').unbind(config.triggerMethod).bind(config.triggerMethod,function(e){
            e.preventDefault();
            var pagination_holder = $(this).parent().parent().find('.pagination').find('a');
            var target = $(this).parent().parent().find('.pagination').find('a.active');
            var next = target.index()+1;
            if(next == pagination_holder.length){
                next = 0;
            }

            $(this).parent().parent().find('.pagination').find('a').eq(next).trigger(config.triggerMethod);

            return false;
        })

        $('.signpost a.prev').unbind(config.triggerMethod).bind(config.triggerMethod,function(e){
            e.preventDefault();
            var pagination_holder = $(this).parent().parent().find('.pagination').find('a');;
            var target = $(this).parent().parent().find('.pagination').find('a.active');
            var next = target.index()-1;
            if(next < 0){
                next = pagination_holder.length-1;
            }
            $(this).parent().parent().find('.pagination').find('a').eq(next).trigger(config.triggerMethod);
            return false;
        })
    }

     var handleComplete = function(){
        //
        $('#special-sectionOverview img').each(function(){
            $(this).attr('src',$(this).attr('data-src'));
        });
        //
        
        init();
        
     }

    var init = function(){
        initSignpost();
        initPagination();
        initSection();

        //
        //update...
        updateScreensize(true);
        setInterval(updateScreensize,config.refreshTime);
    }

    if($("#asus-api-header").length==0)
    {
        $("#special-sectionOverview").css('margin-top',-$("#special-sectionOverview").offset().top);
    }

    device_w = $(window).width();
    device_h = $(window).height();
    

    totalPage = $(content_target+" #wrap section").length;
    
    if($(window).height() >= config.breakHeight && $(window).width() >= config.largeBreakW && !$("html").hasClass("lt-ie9")){
        $(document).bind('mousedown',function(e){
            if(!$(content_target).hasClass('static')){
                $('body').addClass('mousedown');
            }
        })

        $(document).bind('mouseup',function(e){
            if(!$(content_target).hasClass('static')){
                if($("body").hasClass('scrolling')){
                    $("body").removeClass('scrolling');
                    checkScroll();
                }
                $('body').removeClass('mousedown');
            }
        })
        
        $(document).bind('mousewheel DOMMouseScroll', function(event) {
            if(!$(content_target).hasClass('static')){
                event.preventDefault();
                var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                detectScroll(event, delta);

            }
        });
    }else{

        $("html").addClass('static');
    }


    /*preload*/
    var imgArr = [];
    var queue = new createjs.LoadQueue();     
    queue.on("complete", handleComplete, this); 
    //

    if($("html").hasClass("lt-ie9")){
        handleComplete();
    }
    else{     
        var screen_mode = 'l';
        var current_width = $(window).width();
        if(current_width<400){
            screen_mode = 's';

            //swap elemnt//
            swapEl(".group","figure","section#performance article.sonicmaster .center");
            swapEl(".group","figure","section#design article.overview .center");
            swapEl(".group","figure","section#design article.weight .center");
            swapEl(".group","figure","section#camera article.smartremove .center");
            moveEl("section#accessory article.charging .headset","section#accessory article.overview .center");
            moveEl("section#accessory article.charging .charging-stand","section#accessory article.overview .center");
            $("section#accessory article.charging").remove();
            $("section#accessory .pagination").remove();
        }
        else if(current_width>=400 && current_width<960){
            screen_mode = 'm';
            swapEl(".group","figure","section#performance article.sonicmaster .center");
            swapEl(".group","figure","section#design article.overview .center");
            swapEl(".group","figure","section#design article.weight .center");
            swapEl(".group","figure","section#camera article.smartremove .center");
            moveEl("section#accessory article.charging .headset","section#accessory article.overview .center");
            moveEl("section#accessory article.charging .charging-stand","section#accessory article.overview .center");
            $("section#accessory article.charging").remove();
            $("section#accessory .pagination").remove();

        }

        var dontPreloadAry = [];
        $('#special-sectionOverview section').each(function(){
          dontPreloadAry.push($(this).find("article").eq(0).find('figure img').attr("data-src"));
        });
        $('#special-sectionOverview img').each(function(){
            var imgFile = $(this).attr('data-src');
            var imgFileMobile;

            switch(screen_mode){
                case 'l':
                     imgFileMobile = imgFile;
                     //
                     for(var i in dontPreloadAry){
                      if(imgFileMobile == dontPreloadAry[i]){
                        $(this).attr('src',$(this).attr('data-src'));
                      }
                     }
                     //
                    break;
                case 's':
                case 'm':
                    var fileName = imgFile.substr(imgFile.lastIndexOf("/")+1,imgFile.length);
                    var fileName = fileName.split(".")[0];
                    if(fileName == "icon" || fileName == "logo"){
                        imgFileMobile = imgFile;
                    }
                    else{
                        imgFileMobile = imgFile.substr(0,imgFile.length-4)+"-"+screen_mode+imgFile.substr(imgFile.length-4,imgFile.length);
                    }
                break;
            }
               
            imgFile=imgFileMobile;
            //console.log(imgFile);
            $(this).attr('data-src',imgFile);
            
            //console.log(imgFile);
            queue.loadFile({id: imgFile, src:imgFile});
        });

        initSignpost();
        initSection();

        //
        //update...
        updateScreensize();
        queue.load();
    }
   


})

/****************************************/
 

/****************************************/

function screenReset(){
    $(content_target+" *").removeAttr('style');
    $(content_target+" article").removeClass('displaying');
    $(content_target).removeAttr('style');
    $(".overview-wrapper").removeAttr('style');
}

function detectScroll(event, delta) {

    if($("body").hasClass('by-scroll') || $("body").hasClass('by-mousewheel'))
        return;
    if($('body').hasClass('mousedown'))
        return;

    var deltaOfInterest = delta,
        timeNow = new Date().getTime();

    if(timeNow - lastAnimation < quietPeriod + animationTime*1000) {
        event.preventDefault();
        return;
    }

    if (deltaOfInterest < 0) {
      moveDown()
    } else {
      moveUp()
    }
    lastAnimation = timeNow;
}

function countScroll(){
    var st = $(this).scrollTop();
    var dist = Math.abs((st)/$(window).height());
    var page = Math.round(dist);
    ////console.log(dist,page);
}
function checkScroll(){

    if(preScrollTopPos == $(this).scrollTop())
        return;
    var st = $(this).scrollTop();

    preScrollTopPos = st;
    var dist = Math.abs((st)/$(window).height());
    var page = Math.round(dist);
    moveTo(page);
}
function moveUp(){
    var nextPage = $(content_target+" #wrap").attr('data-index')*1 - 1;
    if(isNaN(nextPage))
        nextPage = 0;
    moveTo(nextPage);
}

function moveDown(){
    var nextPage = $(content_target+" #wrap").attr('data-index')*1 + 1;
    if(isNaN(nextPage))
        nextPage = 1;
    moveTo(nextPage);
}

function moveTo(a_page){
    var nextPage = a_page;
    if(nextPage<0){
        nextPage = 0;
    }

    if($(content_target+" #wrap").attr('data-index')*1 == nextPage)
        return;
    
    if($(content_target+" #wrap").attr('data-index')*1 == totalPage && nextPage > totalPage)
        return;
    var y;
    if(nextPage>=totalPage){
        //y = "max";
        y = nextPage*$(window).height()*1+$("#mainfooter").height();
        nextPage = totalPage;
    }
    else{
        y = nextPage*$(window).height()*1
    }

    $("body").addClass('by-mousewheel');

    if(isNaN(nextPage))
    {
        nextPage = 0;
    }
    currentPage = nextPage;
    $(content_target+" #wrap").attr('data-index',nextPage);

    //
    if(currentPage==0){
        $("#overview-top-nav").removeClass('hide');
        $("#asus-api-header").removeClass('hide');
    }else{
        $("#overview-top-nav").addClass('hide');
        $("#asus-api-header").addClass('hide');
    }
    
    var extraY = 0;
    
    if($(window).width()<720)
        extraY = $(".navbar").height();

   
    var time = animationTime;
    if(y == $(this).scrollTop()){
        time = 0;
    }    

    TweenMax.to(window, time, {
        scrollTo:y
        ,ease:Quad.easeOut
        ,onComplete:moveToComplete
    });
    
    toogleScroll(false);
}

function moveToComplete(){
    
    var targetSection = $(content_target+" #wrap section").eq($(content_target+" #wrap").attr('data-index')*1);
    targetSection.addClass("show")
    var targetPage = targetSection.find('article.show').eq(0);

    targetPage.addClass('display').trigger('display');

    if(!$(content_target).hasClass('static')){
        targetPage.siblings().removeClass('display').trigger('destroy');
        targetSection.siblings().removeClass('show').find('article').removeClass('display').trigger('destroy');
        
    }
    toogleScroll(false);
}

function toogleScroll(a_boolean){
    if(a_boolean){
        $("body").addClass('disabled-scroll');
   
        $(window).scroll(function(e){
            e.preventDefault();
        })
    }
    else{
        $("body").removeClass('by-mousewheel');
        $("body").removeClass('by-scroll');
        $("body").removeClass('disabled-scroll');
        //
        $(window).scroll(function(){
            if($("body").hasClass("mousedown")){
                $("body").addClass('scrolling');
            }
        })
    }
}

////////////////////////////
//Carousel
////////////////////////////
function Carousel(a_element)
{

    var self = this;
    var element = $(a_element);
    var container = $(a_element);
    var panes = $(">article", container);
    var pane_width = 0;
    var pane_count = panes.length;

    var current_pane = 0;


    /**
     * initial
     */
    this.init = function() {

        setPaneDimensions();

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
        })
       
    };


    /**
     * set the pane dimensions and scale the container
     */
    function setPaneDimensions() {
       
        pane_width = $(window).width();
        panes.each(function() {

            $(this).width(pane_width);
        });
        container.width(pane_width*pane_count);


    };


    /**
     * show pane by index
     */
    this.showPane = function(index, animate) {
        // between the bounds
        index = Math.max(0, Math.min(index, pane_count-1));
        current_pane = index;

        var offset = -((100/pane_count)*current_pane);
        setContainerOffset(offset, animate);

        var id = (container.parent().attr("id"));

        //update pagination
        var targetPagination = $("section#"+id+" nav.pagination a").eq(current_pane);
        targetPagination.addClass('active').siblings().removeClass('active');
    };


    function setContainerOffset(percent, animate) {
        container.removeClass("animate");

        if(animate) {
            container.addClass("animate");
        }

        if(Modernizr.csstransforms3d) {
            container.css("-webkit-transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
            container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
        
        }
        else if(Modernizr.csstransforms) {
            container.css("-webkit-transform", "translate("+ percent +"%,0)");
            container.css("transform", "translate("+ percent +"%,0)");
        }
        else {
            var px = ((pane_width*pane_count) / 100) * percent;
            container.css("left", px+"px");
        }
    }

    this.next = function() { return this.showPane(current_pane+1, true); };
    this.prev = function() { return this.showPane(current_pane-1, true); };


    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch(ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                var pane_offset = -(100/pane_count)*current_pane;
                var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                if((current_pane == 0 && ev.gesture.direction == "right") ||
                    (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
                    drag_offset *= .4;
                }

                setContainerOffset(drag_offset + pane_offset);
                break;

            case 'swipeleft':
                self.next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                self.prev();
                ev.gesture.stopDetect();
                break;

            case 'release':
                // more then 50% moved, navigate
                if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
                    if(ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                }
                else {
                    self.showPane(current_pane, true);
                }
                break;
        }
    }

    new Hammer(element[0], { dragLockToAxis: true }).on("release dragleft dragright swipeleft swiperight", handleHammer);
}

///