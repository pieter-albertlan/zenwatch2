$(function(){
	$(".zen-ui .menu-page li a").click(function(){

		$(".zen-ui .menu-page li a").removeClass("on");
		$(this).addClass("on");
		if($(this).is("#btn-whats-next")){
			$(".group-whats-next").fadeIn();
			$(".group-do-it-later").hide();
		}else{
			$(".group-do-it-later").fadeIn();
			$(".group-whats-next").hide();
		}
		
		return false;
	});	
});