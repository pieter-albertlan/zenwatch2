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

	$(".android-apps .menu-page li a").click(function(){

		$(".android-apps .menu-page li a").removeClass("on");
		$(this).addClass("on");
		if($(this).is("#btn-android")){
			$(".group-android").fadeIn();
			$(".group-third-party").hide();
		}else{
			$(".group-third-party").fadeIn();
			$(".group-android").hide();
		}
		
		return false;
	});
});