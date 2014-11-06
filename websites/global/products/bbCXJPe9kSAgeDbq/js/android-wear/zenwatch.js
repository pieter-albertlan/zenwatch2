

this.Controller = function(){
    
    var _window = $(window);   
    var buttons = $(".wear .instructions .button-step");
    var demo;

    var initialize = function(){         
     

        if(!$("html").hasClass("lt-ie9")){
            
        }       

        demo = new Demo();

        setupEventListeners();   
        
        TweenMax.delayedCall(0.5, setActiveButton, [0]);
    }



    var setupEventListeners = function(){

        

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

        $(buttons[4]).bind("click", function (e) {
            reset();
        }); 


        _window.on("demo_step1", function (e) {
            TweenMax.delayedCall(0.5, setActiveButton, [1]);
        });

        _window.on("demo_step2", function (e) {
            TweenMax.delayedCall(0.5, setActiveButton, [2]);
        });

        _window.on("demo_step3", function (e) {
            TweenMax.delayedCall(0.5, setActiveButton, [3]);
        });
        _window.on("demo_step4", function (e) {
            TweenMax.delayedCall(0.5, setActiveButton, [4]);
        });






    }

    var step1 = function(){
        
        demo.step1();     


    }
    
    var step2 = function(){
        
        demo.setSlides("swipeup");        

    }

    var step3 = function(){
        
        demo.setSlides("swipeleft");

    }

    var step4 = function(){
        
        demo.setSlides("swiperight");

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

    var reset = function(){

        demo.destroy();
        setActiveButton(0);
        demo = new Demo();

    }
    

    $(document).ready(function() {
        initialize();        
    });

    _window.resize(function() {         
        resize();        
    });


    
}



var controller = new Controller();


