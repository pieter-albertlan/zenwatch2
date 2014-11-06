

this.ImageSequencer = function(){
    
    var _window = $(window);     

    var sequencer;
    var button;
    var controls;
    var imgs;

    var mainTimeline = new TimelineMax({paused:true});
    var floatTimeline = new TimelineMax();
    

    var initialize = function(){         
     

        if(!$("html").hasClass("lt-ie9")){
            
        }

        setupStageItems();
        setupEventListeners();
        initAnimation();


    }


    var setupStageItems = function(){

        shadow = $(".product-shadow", "#sequence");
        shadowWrapper = $(".product-shadow-wrapper", "#sequence");
        sequencer = $(".sequencer", "#sequence");
        controls = $(".controls", sequencer);     
        button = $(".draggable", sequencer);   
        imgs = sequencer.find("img");
        wrapper = $(".img-wrapper", sequencer);     

    }

    var setupEventListeners = function(){
        
        button.draggable({ containment: "parent", axis: "x" });

        button.bind("drag", function (e) {
            var time = parseInt(e.pageX - sequencer.position().left - parseFloat(controls.css("margin-left")));            
            playTimeline(time);
        });

    }

    var initAnimation = function(){

        mainTimeline.insert(TweenMax.to(shadow, imgs.length/2, {scaleX:1.3, scaleY:0.66, ease:SteppedEase.config(imgs.length/2), yoyo:true, repeat:1}));

        for (var i = 0; i < imgs.length; i++) {
            mainTimeline.insert(TweenMax.to(imgs[i], 1, { autoAlpha:1, ease:SteppedEase.config(1), yoyo:true, repeat:1 }), i);
            mainTimeline.gotoAndStop(1);
        };

        

        floatTimeline.insert(TweenMax.to(wrapper, 2, {startAt:{y:-20}, y:0, ease:Quad.easeInOut, yoyo:true, repeat:-1}));
        floatTimeline.insert(TweenMax.from(shadow, 2, {alpha:0.85, ease:Quad.easeInOut, yoyo:true, repeat:-1}));
        floatTimeline.insert(TweenMax.to(shadowWrapper, 2, {scaleX:1.05, scaleY:1.05, ease:Quad.easeInOut, yoyo:true, repeat:-1}));


    }

    var playTimeline = function(time){

        if (time < 8){
            time = 8;
        } else if ( time > 284 ){
            time = 284;
        }

        var ratio = time / 284;

        TweenMax.to(mainTimeline, 0, { time: ratio * imgs.length, ease:Quad.easeOut });


    }

    

    



    var reset = function(){

        

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



var imageSequencer = new ImageSequencer();


