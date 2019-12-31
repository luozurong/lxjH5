$(function() {
	var $button = $(".button");
	var $init = $(".init");
	var $mask = $(".mask");
	var $award1 = $(".award1");
	var $award2 = $(".award2");
	var $award3 = $(".award3");
	$("#button1").click(function() {
		if(!$button.hasClass("status")) {
			$("#boxColor").attr("src", "img/06.png");
			var randomNum = random();
			$init.addClass("status").removeClass("chest");
			$("#chest1").addClass("chestChoosed");
			$button.addClass("status");
			setTimeout(function() {
				$mask.show();
//				if(randomNum <= 40) {
//					$award1.show();
//				} else {
//					$award2.show();
//
//				}
			$award3.show();
				$("#chest1").removeClass("chestChoosed");
			}, 1000);
		}

	})
	$("#button2").click(function() {
		if(!$button.hasClass("status")) {
			$("#boxColor").attr("src", "img/07.png");
			var randomNum = random();
			$init.addClass("status").removeClass("chest");
			$("#chest2").addClass("chestChoosed");
			$button.addClass("status");
			setTimeout(function() {
				$mask.show();
//				if(randomNum <= 40) {
//					$award1.show();
//				} else {
//					$award2.show();
//
//				}
			$award3.show();
				$("#chest2").removeClass("chestChoosed");
			}, 1000);
		}
	})
	$("#button3").click(function() {
		if(!$button.hasClass("status")) {
			$("#boxColor").attr("src", "img/08.png");
			var randomNum = random();
			$init.addClass("status").removeClass("chest");
			$("#chest3").addClass("chestChoosed");
			$button.addClass("status");
			setTimeout(function() {
				$mask.show();
//				if(randomNum <= 40) {
//					$award1.show();
//				} else {
//					$award2.show();
//
//				}
				$award3.show();
				$("#chest3").removeClass("chestChoosed");
			}, 1000);
		}
	})
	$("#chest1").click(function() {
		if(!$(this).hasClass("status")) {
			$("#boxColor").attr("src", "img/06.png");
			var randomNum = random();
			$init.addClass("status").removeClass("chest");
			$(this).addClass("chestChoosed");
			$button.addClass("status");
			setTimeout(function() {
				$mask.show();
//				if(randomNum <= 40) {
//					$award1.show();
//				} else {
//					$award2.show();
//
//				}
				$award3.show();
				$("#chest1").removeClass("chestChoosed");
			}, 1000);
		}

	})
	$("#chest2").click(function() {
		if(!$(this).hasClass("status")) {
			$("#boxColor").attr("src", "img/07.png");
			var randomNum = random();
			$init.addClass("status").removeClass("chest");
			$(this).addClass("chestChoosed");
			$button.addClass("status");
			setTimeout(function() {
				$mask.show();
//				if(randomNum <= 40) {
//					$award1.show();
//				} else {
//					$award2.show();
//
//				}
				$award3.show();
				$("#chest2").removeClass("chestChoosed");
			}, 1000);
		}

	})
	$("#chest3").click(function() {
		if(!$(this).hasClass("status")) {
			$("#boxColor").attr("src", "img/08.png");
			var randomNum = random();
			$init.addClass("status").removeClass("chest");
			$(this).addClass("chestChoosed");
			$button.addClass("status");
			setTimeout(function() {
				$mask.show();
//				if(randomNum <= 40) {
//					$award1.show();
//				} else {
//					$award2.show();
//
//				}
				$award3.show();
				$("#chest3").removeClass("chestChoosed");
			}, 1000);
		}

	})
	$(".award1").click(function() {
		window.location.href = "https://www.sojump.hk/jq/11013759.aspx";
	})
	$(".award2").click(function() {
		$button.removeClass("status");
		$award2.hide();
		$mask.hide();
		$init.removeClass("status").addClass("chest");
	})
	$("#sure").click(function(){
		$award3.hide();
		$mask.hide();
	})
})

function random() {
	var num = Math.round(Math.random() * 99 + 1);
	return num;
}