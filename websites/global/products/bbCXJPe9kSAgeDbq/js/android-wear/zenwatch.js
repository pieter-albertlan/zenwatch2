

this.Controller = function(){
    
    var HEADER_HEIGHT = 89;

    var _window = $(window);   
    var buttons = $("section.overview .instructions .button-step");
    var buttonReset = $("section.overview .instructions .button-reset");  
    var zenfone_hitarea = $("#zenwatch-hitarea");
    var instructions_overlay = $("section.overview .watch-instructions-overlay");
    var instructions = $(".instruction", instructions_overlay);

    var activeInstructionId = 0;
    var instructionTimelines = [];

    var demo;

    var initialize = function(){         
     

        if(!$("html").hasClass("lt-ie9")){
            
        }       

        demo = new Demo();

        resize();
        initInstructionAnimation();
        setupEventListeners();  
        
        TweenMax.delayedCall(0.5, setActiveButton, [0]);
        TweenMax.delayedCall(1.0, fadeInInstructionsOverlay, [0]);        
    }



    var setupEventListeners = function(){
        
        zenfone_hitarea.bind("mousedown", function (e) {
            if (activeInstructionId != 4){
                fadeOutInstructionsOverlay();
            } else {
                reset();
            }
        });


        $(buttons[0]).bind("click", function (e) {
            step1();
        });
        $(buttons[1]).bind("click", function (e) {
            step2();
        });    

        $(buttons[2]).bind("click", function (e) {
            step3();
        }); 

        $(buttons[3]).bind("click", function (e) {
            step4();
        }); 

        buttonReset.bind("click", function (e) {
            reset();
        }); 


        _window.on("demo_step1", function (e) {
            fadeOutInstructionsOverlay();               
            TweenMax.delayedCall(0.5, setActiveButton, [1]);
            TweenMax.delayedCall(1.0, fadeInInstructionsOverlay, [1]);        
        });

        _window.on("demo_step2", function (e) {  
            TweenMax.delayedCall(0.5, setActiveButton, [2]);
            TweenMax.delayedCall(1.0, fadeInInstructionsOverlay, [2]);        
        });

        _window.on("demo_step3", function (e) {
            TweenMax.delayedCall(0.5, setActiveButton, [3]);
            TweenMax.delayedCall(1.0, fadeInInstructionsOverlay, [3]);   
        });
        _window.on("demo_step4", function (e) {
            TweenMax.delayedCall(0.5, setActiveButton, [4]);
            TweenMax.delayedCall(1.0, fadeInInstructionsOverlay, [4]);   
        });



    }

    var step1 = function(){
              
        fadeOutInstructionsOverlay();
        demo.step1();           

    }
    
    var step2 = function(){
        
        fadeOutInstructionsOverlay();
        demo.setSlides("swipeup");        

    }

    var step3 = function(){
        
        fadeOutInstructionsOverlay();
        demo.setSlides("swipeleft");

    }

    var step4 = function(){
        
        fadeOutInstructionsOverlay();
        demo.setSlides("swiperight");

    }

    

    var fadeOutInstructionsOverlay = function(){

        stopInstructionTimelines();
        TweenMax.killDelayedCallsTo(fadeInInstructionsOverlay);
        TweenMax.to(instructions_overlay, 0.01, { autoAlpha:0, ease:Quart.easeOut });        
    }

    var fadeInInstructionsOverlay = function(id){

        instructions.removeClass("active");
        $(instructions[id]).addClass("active");
        TweenMax.to(instructions_overlay, 1, { autoAlpha:1, ease:Quart.easeOut });
        activeInstructionId = id;  

        playInstructionTimeline(id);
    }

    var playInstructionTimeline = function(id){
        
        stopInstructionTimelines();  
        instructionTimelines[id].gotoAndPlay(0);
    }

    var stopInstructionTimelines = function(){

        for (var i = 0; i < instructionTimelines.length; i++) {
            instructionTimelines[i].gotoAndStop(0);
        };  

    }

    var setActiveButton = function(id){

        var button = $(buttons[id]);
        var buttonText = $(button.parent()).find(".instruction");

        removeActiveButtons();
        button.addClass("active");
        button.removeClass("disabled");

        TweenMax.from(button, 0.5, {alpha:0, ease:Quad.easeOut});
        TweenMax.from(buttonText, 1, {alpha:0, y:100, ease:Quad.easeOut});

    }

    var removeActiveButtons = function(){

        buttons.removeClass("active");

    }

    var initInstructionAnimation = function(){

        instructionTimelines = [];

        var timeline1 = new TimelineMax({paused:true});
        var circle1 = $(instructions[0]).find(".circle1");
        var circle2 = $(instructions[0]).find(".circle2");
        var circle3 = $(instructions[0]).find(".circle3");
        var circle4 = $(instructions[0]).find(".circle4");
        TweenMax.set([circle1, circle2, circle3, circle4], {clearProps:"all"});
        timeline1.insert(TweenMax.from(circle1, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.0}));
        timeline1.insert(TweenMax.from(circle2, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.15}));
        timeline1.insert(TweenMax.from(circle3, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.30}));
        timeline1.insert(TweenMax.from(circle4, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.45}));

        var timeline2 = new TimelineMax({paused:true});
        var arrow1 = $(instructions[1]).find(".arrow1");
        var arrow2 = $(instructions[1]).find(".arrow2");
        var arrow3 = $(instructions[1]).find(".arrow3");
        TweenMax.set([arrow1, arrow2, arrow3], {clearProps:"all"});
        timeline2.insert(TweenMax.from(arrow3, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.0}));
        timeline2.insert(TweenMax.from(arrow2, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.25}));
        timeline2.insert(TweenMax.from(arrow1, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.50}));

        var timeline3 = new TimelineMax({paused:true});
        arrow1 = $(instructions[2]).find(".arrow1");
        arrow2 = $(instructions[2]).find(".arrow2");
        arrow3 = $(instructions[2]).find(".arrow3");
        TweenMax.set([arrow1, arrow2, arrow3], {clearProps:"all"});
        timeline3.insert(TweenMax.from(arrow3, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.0}));
        timeline3.insert(TweenMax.from(arrow2, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.25}));
        timeline3.insert(TweenMax.from(arrow1, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.50}));

        var timeline4 = new TimelineMax({paused:true});
        arrow1 = $(instructions[3]).find(".arrow1");
        arrow2 = $(instructions[3]).find(".arrow2");
        arrow3 = $(instructions[3]).find(".arrow3");
        TweenMax.set([arrow1, arrow2, arrow3], {clearProps:"all"});
        timeline4.insert(TweenMax.from(arrow1, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.0}));
        timeline4.insert(TweenMax.from(arrow2, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.25}));
        timeline4.insert(TweenMax.from(arrow3, 1, {alpha:0, ease:Quad.easeIn, repeat:-1, yoyo:true, repeatDelay:0.25, delay:0.50}));

        var timeline5 = new TimelineMax({paused:true});
        var arrow = $(instructions[4]).find(".arrow");
        TweenMax.set([arrow1], {clearProps:"all"});
        timeline5.append(TweenMax.to(arrow, 1, {alpha:0.5, ease:Quad.easeInOut, yoyo:true, repeat:-1}));

        TweenMax.set(timeline1, {timeScale:2});
        TweenMax.set(timeline2, {timeScale:2});
        TweenMax.set(timeline3, {timeScale:2});
        TweenMax.set(timeline4, {timeScale:2});
        TweenMax.set(timeline5, {timeScale:2});

        instructionTimelines = [timeline1, timeline2, timeline3, timeline4, timeline5];


    }

    var resize = function(){

        var windowHeight = _window.height();
        var group = $("section.overview .center .group");
        var marginTop = ((windowHeight - 500) / 2);
        if (marginTop < 115 ) { marginTop = 115 };
        group.css("margin-top", marginTop  );

        var wear = $("section.overview .wear");
        var instructionsWrapper = $("#instructions-overlay");

        wear.css("bottom", ((windowHeight - 750) / 2)  );
        instructionsWrapper.css("bottom", ((windowHeight - 750) / 2)  + 450  );

    }

    var reset = function(){
        
        demo.destroy();
        setActiveButton(0);
        demo = new Demo();
        initInstructionAnimation();
        fadeInInstructionsOverlay(0);


    }
    

    $(document).ready(function() {
        initialize();        
    });

    _window.resize(function() {         
        resize();        
    });


    
}



var controller = new Controller();


