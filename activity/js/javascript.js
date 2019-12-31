$(function(){
	var $audio=$("#yinyue")[0];
	$(".imgBox").click(function(){
		if($audio.paused){
			$(this).addClass("play");
			$audio.play();
			return;
		}
		$audio.pause();
		$(this).removeClass("play");
	});
	var $height1=$(".swiper-slide").height();
	$(".swiper-container").height($height1);
	window.onresize=function(){
		var $height2=$(".swiper-slide").height();
		if($height2>=$height1){
			var $height3=$(".swiper-slide").height();
//			$(".swiper-slide").height($height1);
			$(".swiper-container").height($height1);
		}
	}
})