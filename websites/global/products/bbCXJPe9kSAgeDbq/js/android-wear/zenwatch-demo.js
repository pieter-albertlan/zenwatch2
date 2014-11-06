

this.Demo = function(){
    
    var _window = $(window);    

    var SNAP_TRESHOLD = 200;
    var SLIDE_HEIGHT = 300;
    var SLIDE_WIDTH = 250;

    var slides = $(".wear").find(".slide");
    var zenwatch = $(".wear .zenwatch");
    var background = $(".wear").find(".background");
    var call = $(".wear .slide.call");
    var wireframe_container = $("#slides-wireframe");
    var img_container = $("#slides-img");
    var zenfone_hitarea = $("#zenwatch-hitarea");

    var zenwatchHTML;

    var direction = undefined;
    var _locked = false;
    var _panlock = false;
    
    var baseX = 0;
    var baseY = 0;
    var previousBaseX = 0;
    var previousBaseY = 0;

    var step = 0;
    var forceY = -1;
    var forceX = 0;

    var hammertime;

    var initialize = function(){    

        if(!$("html").hasClass("lt-ie9")){
            
        }

        initClockAnimation();
        initCallAnimation();

        setupStageItems();
        setupEventListeners();          

        assignClasses();
        lock();

        zenwatchHTML = zenwatch.html();  
        zenwatch.removeClass("loading");
        TweenMax.from(zenwatch, 1, {alpha:0, ease:Quart.easeOut})

    }


    var setupStageItems = function(){

        var rotationX = 12;
        var rotationY = 10;
        var rotationZ = -21;
        var transformPerspective = 800;

        TweenMax.set(wireframe_container, {rotationY:rotationY, rotationZ:rotationZ, rotationX:rotationX, transformPerspective:transformPerspective});
        TweenMax.set(img_container, {rotationY:rotationY, rotationZ:rotationZ, rotationX:rotationX, transformPerspective:transformPerspective});
        TweenMax.set(background, {rotationY:rotationY, rotationZ:rotationZ, rotationX:rotationX, transformPerspective:transformPerspective});
        TweenMax.set(zenfone_hitarea, {x:-170, y:-150, rotationY:rotationY, rotationZ:rotationZ, rotationX:rotationX, transformPerspective:transformPerspective});
        


        TweenMax.set(wireframe_container, {alpha:0});

    }

    var setupEventListeners = function(){        

        hammertime = new Hammer(zenfone_hitarea[0]);
        console.log(hammertime);
        hammertime.get('swipe', 'pan').set({ direction: Hammer.DIRECTION_ALL });  

        hammertime.on('tap', function(e) {            
            step1();   
        }); 

        hammertime.on('panleft panright pandown panup', function(e) {
            onPanMove(e);
        });          

        hammertime.on('panend', function(e) {
            onPanEnd(e);            
        }); 

         hammertime.on('swipeleft swiperight swipedown swipeup', function(e) {
            onSwipe(e);            
        });          

    }

    var initClockAnimation = function(){

        var seconds = $(".wear .zenwatch").find(".seconds");
        var minutes = $(".wear .zenwatch").find(".minutes");
        var base = $(".wear .zenwatch").find(".base");

        

        var timeline = new TimelineMax();
        var timeline_seconds = new TimelineMax({repeat:-1})

        for (var i = 1; i < 60; i++) {
            timeline_seconds.append(TweenMax.to(seconds, 1, {rotation:6*i, transformOrigin:"-3px -3px", ease:Linear.easeNone}));
        };
        timeline.insert(TweenMax.to(minutes, 3600, {rotation:360, transformOrigin:"0 42px", ease:Linear.easeNone, repeat:-1} ));

        timeline.insert(timeline_seconds);

        TweenMax.set(seconds, {alpha:0});
        
    }

    var initCallAnimation = function(){

        var button_green = $(".wear .zenwatch").find(".button-green");
        var button_red = $(".wear .zenwatch").find(".button-red");

        var timeline_call = new TimelineMax();

        timeline_call.insert(TweenMax.to(button_green, 1, { x:-29, ease:Quad.easeInOut, yoyo:true, repeat:-1, repeatDelay:0.5 } ));
        timeline_call.insert(TweenMax.to(button_red, 1, { x:29, ease:Quad.easeInOut, yoyo:true, repeat:-1, repeatDelay:0.5 } ), 1.5);

        TweenMax.set(timeline_call, {timeScale:1.75});

    }

    var onPanMove = function(e){
        
        if ((!_locked) && (!_panlock)){
            setDirection(e.angle);
            moveSlides(e);
        }
    }

    

    var onPanEnd = function(e){
        
        if (!_locked){
            snapSlides();            
        }        
        unpanlock();
    }

    var onSwipe = function(e){
        
        if (!_locked){
            lock();
            setBase(e.type);
            snapSlides();
        }

    }

    var moveSlides = function(e){        

        var slidesHorizontal = $(".slide.horizontal");
        var slidesVertical = $(".slide.vertical");

        var delta;

        if (direction == "vertical"){            
            delta = e.deltaY;
            TweenMax.set(slidesVertical, {y:e.deltaY});     
        }

        else if (direction == "horizontal"){            
            delta = e.deltaX;
            TweenMax.set(slidesHorizontal, {x:e.deltaX});   

            if (step == 3) {
                step3Fix(e.deltaX);
            }
        }




        if (Math.abs(delta) > SNAP_TRESHOLD){
            lock();
            calculateBase(e);
            snapSlides();
        }
    }

    var setSlides = function(type){

        //swipeleft, swiperight, swipedown, swipeup;

        if (!_locked){
            lock();
            setBase(type);
            snapSlides();
        }

    }

    var snapSlides = function(){

        panlock();

        var slidesHorizontal = $(".slide.horizontal");
        var slidesVertical = $(".slide.vertical"); 

        if (direction == "vertical"){ 
            TweenMax.to(slidesVertical, 0.5, {y:SLIDE_HEIGHT * (baseY - previousBaseY), ease:Quart.easeOut, onComplete:onSnapComplete});
        } else if (direction == "horizontal"){    
            TweenMax.to(slidesHorizontal, 0.5, {x:SLIDE_WIDTH * (baseX - previousBaseX), ease:Quart.easeOut, onComplete:onSnapComplete});                                                
        } else {
            unlock();
        }

        if (step == 4){
            step3Fix2();
        }

        direction = undefined

    }
    

    var onSnapComplete = function(e){

        assignClasses();
        unlock();

        if (step == 4){
            step5();
        } else if (step == 5){
            step6();        
        } else if (step == 7){
            step8();
        } else if (step == 6){
            step8();
        } else if (step == 9){
            step9();
        } 

    }    

    var assignClasses = function(){   

        for (var i = 0; i < slides.length; i++) {
            var slide = $(slides[i]);

            var idH = parseFloat(slide.attr("idH")) + (baseX - previousBaseX);
            var idV = parseFloat(slide.attr("idV")) + (baseY - previousBaseY);        

            if (slide.hasClass("horizontal")){
                slide.attr("idH", idH);
            }
            if (slide.hasClass("vertical")){            
                slide.attr("idV", idV);
            }   

            if ( ( slide.hasClass( "horizontal" )) && ( slide.hasClass( "vertical" ) )  ){
                if (slide.attr("idV") == "0"){
                    slide.removeClass("vertical");
                } else {
                    slide.removeClass("horizontal");
                }
            }

            if ((idH == 0) && (idV == 0)){

                slide.addClass("horizontal");
                slide.addClass("vertical");
            }

            if (!slide.hasClass("disabled")){
                TweenMax.set(slide, { clearProps:"all" });
            }
            

            slide.css("top", parseFloat(slide.attr("idV")) * SLIDE_HEIGHT);
            slide.css("left", parseFloat(slide.attr("idH")) * SLIDE_WIDTH);
        };

        if (step == 2){
            var call_later = $(".wear .slide.call-later");
            call_later.addClass("horizontal");
            call_later.addClass("vertical");
        }

        if (step == 3){
            var call = $(".wear .slide.call");
            call.addClass("vertical");   
        }

        if (step == 4){
            var call = $(".wear .slide.call");
            call.removeClass("vertical");
            step7();   
        }        
        

        previousBaseX = baseX;
        previousBaseY = baseY;            

    }

    var fadeInSlides = function(){

        TweenMax.to(wireframe_container, 0.5, {alpha:1, ease:Quad.easeOut});
        
        var seconds = $(".wear .zenwatch").find(".seconds");
        var cover = $(".wear .zenwatch").find(".cover");

        TweenMax.to(seconds, 0.5, {alpha:1, ease:Quad.easeOut});
        TweenMax.to(cover, 0.5, {alpha:0, ease:Quad.easeOut});

        var minutes_sleepmode = $(".wear .zenwatch").find(".minutes.sleepmode");
        var base_sleepmode = $(".wear .zenwatch").find(".base.sleepmode");

        TweenMax.to(minutes_sleepmode, 0.5, {alpha:0, ease:Quad.easeOut});
        TweenMax.to(base_sleepmode, 0.5, {alpha:0, ease:Quad.easeOut});

    }

    var calculateBase = function(e){

        if (e.deltaY > SNAP_TRESHOLD){
            baseY++;
        } else if (e.deltaY < -SNAP_TRESHOLD){
            baseY--;
        } else if (e.deltaX > SNAP_TRESHOLD){
            baseX++;
        } else if (e.deltaX < -SNAP_TRESHOLD){
            baseX--;
        }

        checkBounds();

    }

    var setBase = function (type){

        switch (type){
            case "swipeleft":
                baseX--;
                direction="horizontal";
                break;
            case "swiperight":
                baseX++
                direction="horizontal";
                break;
            case "swipeup":
                baseY--;
                direction="vertical";
                break;
            case "swipedown":
                baseY++
                direction="vertical";
                break;  
        }

        checkBounds();

    }

    var checkBounds = function(){

        if (forceX != undefined){
            if (baseX != forceX){
                baseX = previousBaseX;
            }
            if (baseY != forceY){
                baseY = previousBaseY;
            } 
            if ((baseX == forceX) && (baseY == forceY)){
                nextStep();
            }
        }


    }

    var setDirection = function(angle){        

        if (direction == undefined){

            if ((angle > -70) && (angle < 20)){
                direction = "horizontal";
            }
            else if ((angle > 20) && (angle < 110)){
                direction = "vertical";
            }
            else if ((angle > 110) && (angle < 180)){
                direction = "horizontal";
            }
            else if ((angle > -180) && (angle < -160)){
                direction = "horizontal";
            }
            else if ((angle > -160) && (angle < -70)){
                direction = "vertical";
            }
        }

    }


    //STEPS

    var step1 = function(){

        hammertime.off('tap');
        _window.trigger( "demo_step1" );
        zenfone_hitarea.addClass("active");

        fadeInSlides();        
        forceX = 0;
        forceY = -1;
        step++;

        unlock();

    }

    var step2 = function(){        
        
        forceX = -1;
        forceY = -1;

        _window.trigger( "demo_step2" );

    }

    var step3 = function(){
        
        forceX = 0;
        forceY = -1;

        _window.trigger( "demo_step3" );

    }

    var step3Fix = function(deltaX){

        if (deltaX > 0){
            TweenMax.set(call, {x:0});
        }        

    }

    var step3Fix2 = function(){
        
        call.attr("idH", -2);
        TweenMax.killTweensOf(call);               

    }

    var step4 = function(){  

        forceX = 0;
        forceY = -2;        

    }

    var step5 = function(){

        setSlides("swipeup");

    }

    var step6 = function(){

        forceX = 1;
        forceY = -2;

        //var clock = $(".wear .slide.clock");
        //clock.addClass("vertical");        

        unpanlock();

    }

    var step7 = function(){       

        var call = $(".wear .slide.call");
        var call_later = $(".wear .slide.call-later");

        call.addClass("disabled");
        call_later.addClass("disabled");  

        var clock = $(".wear .slide.clock .wrapper");  
        TweenMax.to(clock, 0.5, {y:300, ease:Quart.easeOut});

        TweenMax.to(call_later, 0.5, {x:250, alpha:0, ease:Quart.easeInOut});
        TweenMax.to(call, 0.5, {x:-250, alpha:0, ease:Quart.easeInOut});

        unpanlock();


    }

    var step8 = function(){

        forceX = 2;
        forceY = -3;

        setSlides("swipeup");

        var maps = $(".wear .slide.maps");
        maps.addClass("disabled");
        TweenMax.to(maps, 0.5, {x:250, alpha:0, ease:Quart.easeInOut});

        var clock = $(".wear .slide.clock .wrapper");  
        TweenMax.to(clock, 0.5, {y:600, ease:Quart.easeOut});

        step++;
        unpanlock();


    }

    var step9 = function(){

        forceX = 2;
        forceY = -4;

        setSlides("swipeup");

        var tasks = $(".wear .slide.tasks");
        tasks.addClass("disabled");
        TweenMax.to(tasks, 0.5, {x:250, alpha:0, ease:Quart.easeInOut});

        var clock = $(".wear .slide.clock .wrapper");  
        TweenMax.to(clock, 0.5, {y:900, ease:Quart.easeOut});

        step++;
        unpanlock();
        _window.trigger( "demo_step4" );


    }



    var nextStep = function(){

        step++;

        switch (step){
            case 2:
                step2();
                break;
            case 3:
                step3();
                break;
            case 4:
                step4();
                break;
        };



    }

    






    var destroy = function(){

        TweenMax.killAll();   
        hammertime.destroy();
        $(".wear .zenwatch").html( zenwatchHTML );        

    }

    var preload = function(){

        var imgs = $(".wear .zenwatch img");
        var loadCount = 0;

        for (var i = 0; i < imgs.length; i++) {
            var img = $(imgs[i]);
            var newImg = new Image;
            newImg.onload = function() {
                loadCount++
                if (loadCount == imgs.length){
                    initialize();
                }
            }
            newImg.src = img.attr("src");
        };

    }


    

    var panlock = function(){
        _panlock = true;
    }

    var unpanlock = function(){
        _panlock = false;
    }

    var lock = function(){
        _locked = true;
    }

    var unlock = function(){    
        _locked = false;               
    }

    

    preload();   

    _window.resize(function() {         
        resize();        
    });

    this.step1 = step1;
    this.setSlides = setSlides;
    this.nextStep = nextStep;

    this.destroy = destroy;

    
}






