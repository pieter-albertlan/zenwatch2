

this.Fitness = function(){
    
    var _window = $(window);    
    var wellness;

    var dailyTimeline = new TimelineMax({paused:true, yoyo:true, repeat:-1});   
    var weeklyTimeline = new TimelineMax({paused:true, yoyo:true, repeat:-1});   
    
    var scrollIn = false;


    var initialize = function(){  

        wellness = $("#wellness-apps");

        initAnimation();
        setupEventListeners();
        
    }



    var setupEventListeners = function(){
        
        var scrollTop = wellness.offset().top;    
        var doc = $(document); 

        doc.scroll(function() {
            if (doc.scrollTop() == scrollTop){
                onScrollIn();
            }
        });

        $(".button.daily", wellness).click( function(e) {
            startDailyAnimation();
        });

        $(".button.weekly", wellness).click( function(e) {
            startWeeklyAnimation();
        });

    }

    var onScrollIn = function(){

        if (!scrollIn){
            TweenMax.delayedCall(0.5, startDailyAnimation);
        }

        scrollIn = true;
    }


    var initAnimation = function(){

        //DAILY
        var line = $(".daily .line", wellness);
        var slides = $(".daily .slides", wellness);

        var timeline = new TimelineMax({paused:true});
        timeline.insert(TweenMax.to(line, 3.25, {y:-325, ease:Linear.easeNone}));
        timeline.insert(TweenMax.to(slides, 15.3, {y:-1530, ease:Linear.easeNone}));

        dailyTimeline.insert(TweenMax.to(timeline, 5, { time:timeline.totalDuration(), ease:Quad.easeInOut })); 

        //WEEKLY
        var main = $(".weekly .main", wellness);
        weeklyTimeline.insert(TweenMax.to(main, 3, {y:-640, ease:Quad.easeInOut}));




    }

    var startDailyAnimation = function(){

        TweenMax.to($("figure .daily", wellness), 0.5, { autoAlpha:1, ease:Quart.easeOut });
        TweenMax.to($("figure .weekly", wellness), 0.25, { autoAlpha:0, ease:Quart.easeOut });

        dailyTimeline.gotoAndPlay(0);

    }

    var startWeeklyAnimation = function(){

        TweenMax.to($("figure .weekly", wellness), 0.5, { autoAlpha:1, ease:Quart.easeOut });
        TweenMax.to($("figure .daily", wellness), 0.25, { autoAlpha:0, ease:Quart.easeOut });

        weeklyTimeline.gotoAndPlay(0);

    }


    var resize = function(){

       

    }
    

    $(document).ready(function() {
        initialize();        
    });

    _window.resize(function() {         
        resize();        
    });


    
}



var fitness = new Fitness();


