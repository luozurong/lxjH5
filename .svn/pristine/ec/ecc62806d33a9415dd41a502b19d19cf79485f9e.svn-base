
	(function() {
	var windowwidth = document.documentElement.clientWidth;
	var windowheight = document.documentElement.clientHeight;
	var indexNum = 0;
	var lxjTip = {
		//消失提示语
		msg: function(content, options) {
			if(indexNum > 0) {
				lxjTip.close();
			}
			var msgContent = "<div class='lxj_msg_content'>" + (content ? content : '') + "</div>";
			//创建正文元素
			var lxj_tipbox = document.createElement("div");
			lxj_tipbox.setAttribute("id", "lxj_tipbox" + indexNum);
			lxj_tipbox.className = "lxj_tipbox" + " lxj_tip_msg " + (options ? (options.skin ? options.skin : '') : '');
			document.body.appendChild(lxj_tipbox);
			var msgContent = document.createElement("div");
			msgContent.className = "lxj_content";
			msgContent.textContent = (content ? content : '');
			lxj_tipbox.appendChild(msgContent);

			lxjTip.tipAtuo(indexNum);
			var timeOut = options ? (options.time ? options.time : 2000) : 2000;
			if(indexNum > 0) {
				try {
					eval("clearTimeout(settimeOut" + (indexNum - 1) + ")");
				} catch(e) {}
			}
			eval("window.settimeOut" + indexNum + "=setTimeout('lxjTip.close(" + indexNum + ")'," + timeOut + ")");
			indexNum++;

		},
		//确认取消提示语
		confirm: function(content, options) {
			if(indexNum > 0) {
				lxjTip.close();
			}
			//创建背景元素
			var tipBackground = document.createElement("div");
			tipBackground.setAttribute("id", "lxj_tipBackground" + indexNum);
			tipBackground.className = "lxj_tipBackground";
			document.body.appendChild(tipBackground); //把背景元素放进body标签里面
			//创建正文元素
			var lxj_tipbox = document.createElement("div");
			lxj_tipbox.setAttribute("id", "lxj_tipbox" + indexNum);
			lxj_tipbox.className = "lxj_tipbox" + " lxj_tip_confirm " + (options ? (options.skin ? options.skin : '') : '');
			document.body.appendChild(lxj_tipbox);
			var lxj_tipContent = document.createElement("div");
			lxj_tipContent.className = "lxj_content";
			lxj_tipContent.textContent = content;
			lxj_tipbox.appendChild(lxj_tipContent);
			var lxj_tipButtom = document.createElement("div");
			lxj_tipButtom.className = "lxj_tipButtom";

			var lxj_tipButtomA = document.createElement("div");
			lxj_tipButtomA.className = "lxj_tipButtomA0";
			lxj_tipButtomA.textContent = options ? (options.btn ? (options.btn[0] ? options.btn[0] : "确认") : "确认") : "确认";
			lxj_tipButtomA.onclick = options ? (options.yes ? options.yes : lxjTip.close) : lxjTip.close;
			lxj_tipButtom.appendChild(lxj_tipButtomA);

			var lxj_tipButtomB = document.createElement("div");
			lxj_tipButtomB.className = "lxj_tipButtomA1";
			lxj_tipButtomB.textContent = options ? (options.btn ? (options.btn[1] ? options.btn[1] : "取消") : "取消") : "取消";
			lxj_tipButtomB.onclick = lxjTip.close;
			lxj_tipButtom.appendChild(lxj_tipButtomB);

			lxj_tipbox.appendChild(lxj_tipButtom);
			lxjTip.tipAtuo(indexNum);
			indexNum++;

		},
		//确认提示语
		alert: function(content, options) {
			if(indexNum > 0) {
				lxjTip.close();
			}
			//创建背景元素
			var tipBackground = document.createElement("div");
			tipBackground.setAttribute("id", "lxj_tipBackground" + indexNum);
			tipBackground.className = "lxj_tipBackground";
			document.body.appendChild(tipBackground); //把背景元素放进body标签里面
			//创建正文元素
			var lxj_tipbox = document.createElement("div");
			lxj_tipbox.setAttribute("id", "lxj_tipbox" + indexNum);
			lxj_tipbox.className = "lxj_tipbox" + " lxj_tip_alert " + (options ? (options.skin ? options.skin : '') : '');
			document.body.appendChild(lxj_tipbox);
			var lxj_tipContent = document.createElement("div");
			lxj_tipContent.className = "lxj_content";
			lxj_tipContent.textContent = content;
			lxj_tipbox.appendChild(lxj_tipContent);
			var lxj_tipButtom = document.createElement("div");
			lxj_tipButtom.className = "lxj_tipButtom";

			var lxj_tipButtomA = document.createElement("div");
			lxj_tipButtomA.className = "lxj_tipButtomA0";
			lxj_tipButtomA.textContent = options ? (options.btn ? (options.btn[0] ? options.btn[0] : "确认") : "确认") : "确认";
			lxj_tipButtomA.onclick = options ? (options.yes ? options.yes : lxjTip.close) : lxjTip.close;
			lxj_tipButtom.appendChild(lxj_tipButtomA);
			lxj_tipbox.appendChild(lxj_tipButtom);
			lxjTip.tipAtuo(indexNum);
			indexNum++;
		},
		//关闭删除节点
		close: function() {
			var index = indexNum;
			if(index == 0) {
				index = 0;
			} else {
				index = Number(indexNum) - 1;
			}
			var tipBackgroundClose = document.getElementById("lxj_tipBackground" + index);
			var lxj_tipboxClose = document.getElementById("lxj_tipbox" + index);
			if(tipBackgroundClose) {
				tipBackgroundClose.parentNode.removeChild(tipBackgroundClose);
			}
			if(lxj_tipboxClose) {
				lxj_tipboxClose.parentNode.removeChild(lxj_tipboxClose);
			}
		},
		//计算定位居中显示
		tipAtuo: function(indext) {
			var lxj_tipboxAtuo = document.getElementById("lxj_tipbox" + indext);
			var lxj_tipboxAtuoheight = lxj_tipboxAtuo.offsetHeight;
			var lxj_tipboxAtuowidth = lxj_tipboxAtuo.offsetWidth;
			lxj_tipboxAtuo.style.top = (windowheight - lxj_tipboxAtuoheight) / 2 + "px";
			lxj_tipboxAtuo.style.left = (windowwidth - lxj_tipboxAtuowidth) / 2 + "px";
		},
	};
	window.lxjTip = lxjTip;
})();
