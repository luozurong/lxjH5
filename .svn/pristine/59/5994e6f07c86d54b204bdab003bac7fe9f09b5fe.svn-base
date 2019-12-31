(function($) {
	var MySetTimeHour = 3;
		//	商家时间
	var myDate = new Date();
	myDate.setHours(myDate.getHours() + MySetTimeHour);
	var PYear = myDate.getFullYear();
	var PMonth = myDate.getMonth() + 1;
	var PMonth = "0" + PMonth.toString();
	var myDay = myDate.getDate();
	var myHour = myDate.getHours();
	var myMintues = myDate.getMinutes();
	var result = $('#result')[0];
	var btns = $('.Time-choose');

	function STime() {
		var hour = myDate.getHours();
		var jian = 9;
		var jia  = 19;
		//半小时内清空
		var myTomorrow = new Date();
		myTomorrow.setDate(myTomorrow.getDate() + 1);
		var NewMonth = (myTomorrow.getMonth() + 1)+"";
		NewMonth = NewMonth.length==2?NewMonth:("0" + NewMonth);
		
		if (myMintues < 30) {
			//如果当前时间加3小时后的时间符合9-19点，就显示对应的配送到达时间
			if (jian <= hour && hour <= jia) {
				result.innerText = myDate.getFullYear() + "-" + PMonth + "-" + myDate.getDate() + " " + hour + ":30";
			//	如果当前时间加3小时在早上九点之前，就显示离下单时间最近的时间
			} else if (hour < 9) {
				hour = 9;
				result.innerText = myDate.getFullYear() + "-" + PMonth + "-" + myDate.getDate() + " " + hour + ":00";
			//	如果当前时间加3小时是超过晚上19点的，就显示第二天早上的九点为配送到达时间
			} else if (hour > 19) {
				hour = 9;
				result.innerText = myTomorrow.getFullYear() + "-" + NewMonth + "-" + myTomorrow.getDate() + " " + hour + ":00";
			}
		} else {
			hour = myDate.getHours() + 1;
			if (jian <= hour && hour <= jia) {
				result.innerText = myDate.getFullYear() + "-" + PMonth + "-" + myDate.getDate() + " " + hour + ":00";
			} else if (hour < 9) {
				hour = 9;
				result.innerText = myDate.getFullYear() + "-" + PMonth + "-" + myDate.getDate() + " " + hour + ":00";
			} else if (hour > 19) {
				hour = 9;
				result.innerText = myTomorrow.getFullYear() + "-" + NewMonth + "-" + myTomorrow.getDate() + " " + hour + ":00";
			}

		}
	}

	STime();
	//				$.init();
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			/*
			 * 首次显示时实例化组件
			 * 示例为了简洁，将 options 放在了按钮的 dom 上
			 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
			 */
			options.beginDate = myDate;
			var picker = new $.DtPicker(options);
			picker.show(function(rs) {
				/*
				 * rs.value 拼合后的 value
				 * rs.text 拼合后的 text
				 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
				 * rs.m 月，用法同年
				 * rs.d 日，用法同年
				 * rs.h 时，用法同年
				 * rs.i 分（minutes 的第二个字母），用法同年
				 */
				var hh = rs.h.value;
				var MM = rs.m.value;
				var DD = rs.d.value;
				var II = rs.i.value;
				if (rs.y.value > PYear) {
					if (hh >= 9 && hh <= 19) {
						result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + rs.h.text + ":" + rs.i.text;
					} else if (hh < 9 || hh > 19) {
						result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + "09" + ":" + rs.i.text;
					}
				} else if (rs.y.value < PYear) {
					STime();
				} else if (rs.y.value = PYear) {
					if (MM > PMonth) {
						if (hh >= 9 && hh <= 19) {
							result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + rs.h.text + ":" + rs.i.text;
						} else if (hh < 9 || hh > 19) {
							result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + "09" + ":" + rs.i.text;
						}
					} else if (MM < PMonth) {
						STime();
					} else if (MM = PMonth) {
						if (DD > myDay) {
							if (hh >= 9 && hh <= 19) {
								result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + rs.h.text + ":" + rs.i.text;
							} else if (hh < 9 || hh > 19) {
								result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + "09" + ":" + rs.i.text;
							}
						} else if (DD < myDay) {
							STime();
						} else if (DD = myDay) {
							if (hh > myHour) {
								if (hh >= 9 && hh <= 19) {
									result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + rs.h.text + ":" + rs.i.text;
								} else {
									STime();
								}
							} else if (hh < myHour) {
								STime();
							} else if (hh = myHour) {
								if (hh >= 9 && hh <= 19) {
									if (II > myMintues) {
										result.innerText = rs.y.text + "-" + rs.m.text + "-" + rs.d.text + " " + rs.h.text + ":" + rs.i.text;
									} else if (II <= myMintues) {
										STime();
									}
								} else {
									STime();
								}

							}
						}
					}
				}
			});
		}, false);
	});
})(mui);