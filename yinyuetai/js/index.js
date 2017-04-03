//阻止默认事件
document.addEventListener('touchstart', function(e){
	//e.preventDefault();
});
//导航滑动
subTopBar();
function subTopBar(){
	var _subTopBar = document.getElementById('subTopBar');
	var _ul = _subTopBar.querySelector('ul');
	var _li = _ul.querySelectorAll('li');
	var _width = 0;
	for(var i=0; i<_li.length; i++){
		_width += _li[i].offsetWidth*1.01;
	}
	_ul.style.width = _width + 'px';
	var startPoint = 0;
	var startX = 0;
	var _translateX = 0;
	var step = 1;
	var lastTime = 0;
	var lastTimeDis = 0;
	_ul.addEventListener('touchstart', function(e){
		_ul.style.transition = '';
		startPoint = e.changedTouches[0].pageX;
		startX = _translateX;
		step = 1;
		lastTime = new Date().getTime();
		lastTimeDis = 0;
	});
	_ul.addEventListener('touchmove', function(e){
		var nowPoint = e.changedTouches[0].pageX;
		var disX = nowPoint - startPoint;
		var nowTime = new Date().getTime();
		_translateX = startX + disX;
		if(_translateX > 0){
			//根据超出长度计算系数，超出的越多，系数越小
			// step = 1 - _translateX / _width;
			// _translateX = parseInt(_translateX * step);
			_translateX = 0;
		}
		if(_translateX < _subTopBar.offsetWidth - _width){
			// var over = _subTopBar.offsetWidth - _width -_translateX;
			// step = 1 - over / _width;
			// over = parseInt(over * step);
			// _translateX = _subTopBar.offsetWidth - _width - over;
			_translateX = _subTopBar.offsetWidth - _width
		}
		lastTimeDis = nowTime - lastTime;
		lastTime = nowTime;
		// _ul.style.transform = _ul.style.WebkitTransform = 'translateX('+ _translateX +'px)';
		_ul.style.transform = _ul.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
	});
	_ul.addEventListener('touchend', function(e){
		nowPoint = e.changedTouches[0].pageX;
		if(_translateX < 0){
			var speed = ((nowPoint - startPoint) / lastTimeDis)*5;
			_translateX = _translateX + speed;
			_ul.style.transition = '300ms';
			// _ul.style.transform = _ul.style.WebkitTransform = 'translateX('+ _translateX +'px)';
			_ul.style.transform = _ul.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
		}
		if(_translateX > 0){
			_translateX = 0;
			_ul.style.transition = '300ms cubic-bezier(.34,.92,.58,.9)';
			// _ul.style.transform = _ul.style.WebkitTransform = 'translateX('+ _translateX +'px)';
			_ul.style.transform = _ul.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
		}
		if(_translateX < _subTopBar.offsetWidth - _width){
			_translateX = _subTopBar.offsetWidth - _width;
			_ul.style.transition = '300ms cubic-bezier(.34,.92,.58,.9)';
			// _ul.style.transform = _ul.style.WebkitTransform = 'translateX('+ _translateX +'px)';
			_ul.style.transform = _ul.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
		}
	});
}
//头部频道点击切换
menuBtn();
function menuBtn(){
	var _menuBtn = document.getElementById('menuBtn');
	var _headerNav = document.getElementById('headerNav');

	_menuBtn.addEventListener('touchstart', function(e){
		if(_menuBtn.className == 'menuBtnShow'){
			_menuBtn.className = 'menuBtnClose';
			_headerNav.style.display = 'block';
		}else{
			_menuBtn.className = 'menuBtnShow'
			_headerNav.style.display = 'none';
		}
		e.stopPropagation();//阻止冒泡
	});
	//阻止冒泡
	_headerNav.addEventListener('touchstart', function(e){
		e.stopPropagation();
	});
	document.addEventListener('touchstart', function(){
		if(_menuBtn.className == 'menuBtnClose'){
			_menuBtn.className = 'menuBtnShow';
			_headerNav.style.display = 'none';
		}
	});
}
//banner图片切换
banner();
function banner(){
	var _banner = document.getElementById('banner');
	var _ul = _banner.querySelector('ul');
	_ul.innerHTML += _ul.innerHTML;
	var _lis = _ul.querySelectorAll('li');
	var _bannerNav = _banner.querySelector('#bannerNav');
	var _spans = _bannerNav.querySelectorAll('span');
	var _width = _banner.offsetWidth;
	var _height = _lis[0].offsetHeight;
	var timer = null;
	var now = 0;
	var isMove = true;
	var isFirst = true;
	// _banner.style.height = _height/67.5 + 'rem';
	_ul.style.width = _lis.length +'00%';
	for(var i=0; i<_lis.length; i++){
		_lis[i].style.width = 1/_lis.length*100 + '%';
		//_lis[i].style.width = _width + 'px';
	}
	var startPoint = 0;
	var startX = 0;
	var _translateX = 0;
	_banner.addEventListener('touchstart', function(e){
		clearInterval(timer);
		now = Math.round(-_translateX/_width);
		if(now == 0){
			now = _spans.length;
		}
		if(now == _lis.length-1){
			now = _spans.length - 1;
		}
		_ul.style.transition = '';
		_translateX = -now * _width;
		// _ul.style.transform = _ul.style.WebkitTransform = 'translateX('+ _translateX +'px)';
		_ul.style.transform = _ul.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
		//startPoint = e.changedTouches[0];
		startPoint = {
			pageX: e.changedTouches[0].pageX,
			pageY: e.changedTouches[0].pageY
		}
		startX = _translateX;
		isMove = true;
		isFirst = true;
	});
	_banner.addEventListener('touchmove', function(e){
		if(!isMove){
			return;
		}
		var nowPoint = e.changedTouches[0];
		var disX = nowPoint.pageX - startPoint.pageX;
		var disY = nowPoint.pageY - startPoint.pageY;
		if(isFirst){
			isFirst = false;
			if(Math.abs(disX) < Math.abs(disY)){
				isMove = false;
			}
		}
		if(isMove){
			_translateX = startX + disX;
			// _ul.style.transform = _ul.style.WebkitTransform = 'translateX('+ _translateX +'px)';
			_ul.style.transform = _ul.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
		}
	});
	_banner.addEventListener('touchend', function(e){
		now = Math.round(-_translateX/_width);
		play();
		autoPlay();
	});
	autoPlay();
	function autoPlay(){
		clearInterval(timer);
		timer = setInterval(function(){
			if(now == _lis.length - 1){
				now = _spans.length - 1;
			}
			_translateX = -now * _width;
			_ul.style.transition = '';
			// _ul.style.transform = _ul.style.WebkitTransform = 'translateX('+ _translateX +'px)';
			_ul.style.transform = _ul.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
			setTimeout(function(){
				now++;
				play();
			},50);
		}, 3000);
	};
	function play(){
		_ul.style.transition = '1s';
		_translateX = -now * _width;
		// _ul.style.transform = _ul.style.WebkitTransform = 'translateX('+ _translateX +'px)';
		_ul.style.transform = _ul.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
		for(var i=0; i<_spans.length; i++){
			_spans[i].className = '';
		}
		_spans[now%_spans.length].className = 'active';
	}
}
//video滑动
video();
function video(){
	var video = document.getElementById('video');
	var videoNav = video.querySelector('.videoNav');
	var videoGroup = video.querySelector('.videoGroup');
	var videoShow = video.querySelector('.videoShow');
	var ul = videoGroup.querySelectorAll('ul');
	var ulLength = ul.length;
	videoGroup.style.width = ulLength + '00%';
	for(var i=0; i<ulLength; i++){
		ul[i].style.width = 100/ulLength + '%';
	}
	var ulWidth = ul[0].offsetWidth;
	
	videoShow.innerHTML = template[0];
	swipe(videoNav, videoGroup);
	function swipe(nav, group){
		var _a = nav.querySelectorAll('a');
		var _aWidth = _a[0].offsetWidth;
		var _aLength = _a.length;
		var startPoint = 0;
		var startX = 0;
		var _translateX = -ulWidth;
		var disX = 0;
		var now = 0;
		var isMove = true;
		var isFirst = true;
		var isLoad = true;
		// group.style.transform = group.style.WebkitTransform = 'translateX('+ _translateX +'px)';
		group.style.transform = group.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
		group.addEventListener('touchstart', function(e){
			group.style.transition = '';
			//startPoint = e.changedTouches[0];
			startPoint = {
				pageX: e.changedTouches[0].pageX,
				pageY: e.changedTouches[0].pageY
			}
			startX = _translateX;
			isMove = true;
			isFirst = true;
			isLoad = true;
		})
		group.addEventListener('touchmove', function(e){
			if(!isLoad){
				console.log(1);
				return;
			}
			if(!isMove){
				return;
			}
			var nowPoint = e.changedTouches[0];
			var disX = nowPoint.pageX - startPoint.pageX;
			var disY = nowPoint.pageY - startPoint.pageY;
			if(isFirst){
				isFirst = false;
				if(Math.abs(disX) < Math.abs(disY)){
					isMove = false;
				}
			}
			if(isMove){
				_translateX = startX + disX;
				// group.style.transform = group.style.WebkitTransform = 'translateX('+ _translateX +'px)';
				group.style.transform = group.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
			}
			if(Math.abs(disX) > ulWidth/2){
				end(disX);
			};
			function end(disX){
				var dir = disX/Math.abs(disX);
				_translateX = dir > 0 ? 0 : -2*ulWidth;
				now = Math.abs(now-dir)%_aLength;
				group.style.transition = '300ms';
				// group.style.transform = group.style.WebkitTransform = 'translateX('+ _translateX +'px)';
				group.style.transform = group.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
				isLoad = false;
				group.addEventListener('transitionend', afterEnd);
				group.addEventListener('webkitTransionEnd', afterEnd);
			}
			function afterEnd(){
				isLoad = false;
				var _span = nav.querySelector('span');
				group.removeEventListener('transitionend', afterEnd);
				group.removeEventListener('webkitTransionEnd', afterEnd);
				_span.style.transition = '300ms';
				_span.style.left = now * _aWidth + 'px';
				setTimeout(function(){
					_translateX = -ulWidth;
					group.style.transition = '';
					// group.style.transform = group.style.WebkitTransform = 'translateX('+ _translateX +'px)';
					group.style.transform = group.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
					videoShow.innerHTML = template[now];
					isLoad = true;
				}, 300)
			}
		})
		group.addEventListener('touchend', function(e){
			if(!isLoad){
				return;
			}
			if(Math.abs(disX) < ulWidth/2){
				_translateX = -ulWidth;
				group.style.transition = '300ms';
				// group.style.transform = group.style.WebkitTransform = 'translateX('+ _translateX +'px)';
				group.style.transform = group.style.WebkitTransform = 'translate3d('+ _translateX +'px, 0, 0.00001px)';
			}
		})
	}
};
//搜索框的隐藏显示
document.addEventListener('touchmove', function(){
	var content = document.querySelector('.content');
	var search = document.getElementById('search');
	var _top = content.getBoundingClientRect().top;
	if(_top < -65){
		search.style.display = 'none';
	}else{
		search.style.display = 'block';
	}
});


