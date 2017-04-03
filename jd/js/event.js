/*******
* 右上角购物车，鼠标移入
* author：lufang
*/
function indexCartPop(){
	var _indexCart = $('#indexCart');
	var _myCart = $('#myCart');
	var _indexCartPop = $('#indexCartPop');
	_indexCart.mouseenter(function(){
		_myCart.css('border-bottom', 'none')
		_indexCartPop.css('display', 'block');
	});
	_indexCart.mouseleave(function(){
		_myCart.css('border-bottom', '1px solid #e3e4e5')
		_indexCartPop.css('display', 'none');
	});
}

/*******
* 首页幻灯片切换
* author：lufang
*/
function sliderBanner(){
	var _indexBanner  = $('#indexBanner');
	var _sliderBanner = $('#sliderBanner');
	var _indicator    = $('.indicator');
	var _leftArrow    = $('#leftArrow');
	var _rightArrow   = $('#rightArrow');
	var _n = 0;

	//动态添加图片
	getDataJsonp(DATAURL.indexBannerApi, function(d){
		//console.log(d);
		var _d = d.indexBanner;
		var _len = _d.length;
		for(var i=0; i<_len; i++){
			$('<li/>',{})
				.html(function(){
					var _this = $(this);
					$('<a/>',{})
						.attr('href', _d[i].href)
						.html(function(){
							var _this = $(this);
							$('<img/>',{})
								.attr('src', _d[i].img)
								.appendTo(_this);
						})
						.appendTo(_this);
				})
				.appendTo(_sliderBanner);
		}
		//添加完图片之后，再获取
		var _img = _sliderBanner.find('img');			
		var _width = _indexBanner.width();
		_sliderBanner.css('width', _width*_len);
		//动态添加圆点i
		for(var i=0; i<_len; i++){
			$('<i/>',{}).appendTo(_indicator);
		}
		var _marginLeft = -_indicator.outerWidth()/2
		_indicator.css('margin-left', _marginLeft);
		var _i = _indexBanner.find('i');
		_i.eq(0).addClass('active');
		//添加完成之后，添加事件，鼠标移入圆点，图片切换
		_i.mouseenter(function(){
			var _this = $(this);
			_this.addClass('active').siblings().removeClass('active');
			_n = _this.index();
			indexBannerMove(_sliderBanner, _n, _width)
		});
		//鼠标移入移出整个banner...显示左右箭头按钮
		_indexBanner.mouseenter(function(){
			_leftArrow.css('display', 'block');
			_rightArrow.css('display', 'block');
		});
		_indexBanner.mouseleave(function(){
			_leftArrow.css('display', 'none');
			_rightArrow.css('display', 'none');
		});
		//左边箭头
		_leftArrow.on('click', function(){
			_n--;
			if(_n < 0){
				_n = _len - 1;
			}
			indexBannerMove(_sliderBanner, _n, _width)
			_i.eq(_n).addClass('active').siblings().removeClass('active');
		});
		//右边箭头
		_rightArrow.on('click', function(){
			_n++;
			if(_n > _len - 1){
				_n = 0;
			}
			indexBannerMove(_sliderBanner, _n, _width)
			_i.eq(_n).addClass('active').siblings().removeClass('active');

		});
	});
}

/*******
* 首页幻灯片切换封装的一个函数
* author：lufang
*/
function indexBannerMove(el, n, width){
	el.css('left', -n * width);
}

/*******
* 首页头部幻灯片上面的导航
* author：lufang
*/
function navItems(){
	var _navItems = $('#navItems');
	getDataJsonp(DATAURL.navItemsApi, function(d){
		// console.log(d);
		var _d = d.navItems;
		var _len = _d.length;
		for(var i=0; i<_len; i++){
			$('<a/>',{})
				.attr('href', _d[i].href)
				.html(_d[i].name)
				.appendTo(_navItems);
		}
	});
}

/*******
* 首页左侧导航，navLeft
* 获取json，创建DOM
* author：lufang
*/
function navLeftFn(){
	getDataJsonp(DATAURL.navLeftApi, function(d){
		var _navLeftUl = $('#navLeftUl');
		var _d = d.navLeft;
		var _len = _d.length;
		for(var i=0; i<_len; i++){
			$('<li/>',{})
				.html(function(){
					var _this = $(this);
					$('<a/>',{})
						.attr('href', _d[i].href)
						.html(_d[i].type)
						.appendTo(_this);
					$('<div/>',{class: 'navLeftPop',style: 'top:'+(i*29.72)+'px'})
						.html(function(){
							var _this = $(this);
							for(var j=0; j<_d[i].products.length; j++){
								$('<a/>',{})
									.attr('href', _d[i].products[j].href)
									.html(_d[i].products[j].name)
									.appendTo(_this);
							}
						})
						.appendTo(_this);
				})
				.appendTo(_navLeftUl);
		}
	});
}


/*******
* 首页 享品质
* author：lufang
*/
function enjoy(){
	//获取json
	getDataJsonp(DATAURL.enjoyApi, function(d){
		var _quality = $('#quality');
		var _d = d.quality;
		var _len = _d.length;
		//根据json创建DOM
		for(var i=0; i<_len; i++){
			$('<li/>',{})
				.html(function(){
					var _this = (this);
					$('<a/>',{})
						.attr({
							'target': '_blank',
							'href': '/jd/detail.html?pid='+_d[i].pid,
							'data-pid': _d[i].pid
						})
						.html(function(){
							var _this = $(this);
							$('<img/>',{})
								.attr('src', _d[i].img)
								.appendTo(_this);
							$('<div/>',{class: 'info bgColor'+(i+1)+''})
								.html(function(){
									var _this = $(this);
									$('<div/>',{class: 'infoM'})
										.html(function(){
											var _this = $(this);
											$('<h4/>',{}).html(_d[i].name).appendTo(_this);
											$('<p/>',{}).html(_d[i].intro).appendTo(_this);
										})
										.appendTo(_this);
								})
								.appendTo(_this);
						})
						.appendTo(_this);
				})
				.appendTo(_quality);
		}
	})
}