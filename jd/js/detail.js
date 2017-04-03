;
$(function(){
	new Detail();
});

/*******
* 产品信息页面
* author：lufang
*/
function Detail(){
	this.init();
}
Detail.prototype = {
	init: function(){
		var _self = this;
		_self.getData();
		_self.address();
		_self.cartLeft();
		_self.chooseCart();
	},
	//获取该产品的数据
	getData: function(){
		var _self = this;
		var _href = document.location.href;
		var _start = _href.indexOf('?');
		var _pid = _href.substring(_start+5)
		getDataJsonp(SITEURL+_pid+'.php', function(d){
			console.log(d)
			_self.middleImg(d); //获取json后，生成第一张大图片DOM	
			_self.smallImg(d); //获取json后，生成小图片
			_self.createInfo(d); //生成右侧信息
			$(document).attr('title', d.title);
			var _chooseCart = $('#chooseCart');
			_chooseCart.attr('data-pid', d.pid);
			_self.crumb(d);
		});
	},
	//面包屑导航
	crumb: function(d){
		var _self = this;
		var _crumb = $('.crumb');
		for(var i=0; i<d.crumb.length; i++){
			$('<a/>',{})
				.attr('href', 'javascript:;')
				.html(d.crumb[i].crumb)
				.appendTo(_crumb);
			$('<span/>',{}).html('>').appendTo(_crumb);
		}
		var _span = _crumb.find('span');
		var _len = _span.length;
		_span.eq(_len-1).remove();
	},
	//右侧产品详细信息
	createInfo: function(d){
		var _itemInfoWrap = $('#itemInfoWrap');
		_itemInfoWrap.find('h1').html(d.title);
		_itemInfoWrap.find('h2').html(d.intro);
		_itemInfoWrap.find('h3').find('span').html('￥'+d.price);
	},
	//获取小图片，生成DOM
	smallImg: function(d){
		var _self = this;
		var _specList = $('#specList');
		var _preview = $('.preview');
		var _d = d.img;
		var _len = _d.length;					
		//for循环，获取小图片，生成DOM
		for(var i=0; i<_len; i++){
			$('<li/>',{})
				.attr({
					'data-middleImg-url': _d[i].middleImg,
					'data-largeImg-url': _d[i].largeImg
				})
				.html(function(){
					var _this = $(this);
					$('<img/>',{})
						.attr('src', _d[i].smallImg)
						.appendTo(_this);
				})
				.mouseenter(function(){
					var _this = $(this);
					_self.mouseEnterSmallImg(_this, _preview);
				})
				.appendTo(_specList);
		}
		var _li = _specList.find('li');
		var _outerWidth = _li.eq(0).outerWidth();
		var _margin = parseInt(_li.css('marginLeft'))*2
		var _width = _outerWidth+_margin
		_li.eq(0).addClass('active');
		_specList.css('width', _len * _width);//给小图片ul一个宽度
		_self.sliderSmallImg(_width, _len);//左右箭头点击切换
	},
	//点击左右箭头切换
	sliderSmallImg: function(_width, _len){
		var _self = this;
		var _n = 0;
		var _prev = $('#prev');
		var _next = $('#next');
		var _specList = $('#specList');
		_next.on('click', function(){
			if(_n < (_len-5)){
				_n++;
				_specList.css('left', -_width*_n);
			}
		});
		_prev.on('click', function(){
			if(_n > 0){
				_n--;
				_specList.css('left', -_width*_n);
			}
		});
	},
	//获取第一张大图片
	middleImg: function(d){
		var _self = this;
		var _preview = $('.preview');
		var _d = d.img;
		$('<img/>',{})
			.attr({
				'src': _d[0].middleImg,
				'data-largeImg-url': _d[0].largeImg
			})
			.appendTo(_preview);
		_self.mouseEnterMiddleImg();
	},
	//鼠标移入，右边显示一张大图，
	mouseEnterMiddleImg: function(){
		var _self = this;
		var _preview = $('.preview');		
		var _previewWrap = $('.previewWrap');
		_preview.mouseenter(function(e){
			var _largeImgUrl = _preview.find('img').attr('data-largeImg-url');
			var _this = $(this);
			//生成遮罩的DOM
			$('<div/>',{class: 'zoom'})
				.appendTo(_this);
			//生成右侧大图的DOM
			$('<div/>',{class: 'zoomDiv'})
				.html(function(){
					var _this = $(this);
					$('<img/>',{})
						.attr('src', _largeImgUrl)
						.appendTo(_this);
				})
				.appendTo(_previewWrap);
		});
		_preview.mousemove(function(e){
			var _zoom = $('.zoom');
			var _zoomDivImg = $('.zoomDiv').find('img');
			var _left = e.clientX - _preview.offset().left - _zoom.width()/2;
			var _top = e.clientY - (_preview.offset().top-$(document).scrollTop()) - (_zoom.width()/2);
			if(_left < 0){_left = 0;};
			if(_left > (450-300)){_left = (450-300)};
			if(_top < 0){_top = 0;};
			if(_top > (450-300)){_top = (450-300)};
			_zoom.css({
				'left': _left,
				'top' : _top
			});
			_zoomDivImg.css({
				'left': -_left*800/450,
				'top' : -_top*800/450
			});
		});
		_preview.mouseleave(function(e){
			var _this = $(this);
			var _zoom = $('.zoom');
			var _zoomDiv = $('.zoomDiv');
			_zoom.remove();
			_zoomDiv.remove();
		});
	},
	//鼠标移入小图片，添加class，以及大图切换
	mouseEnterSmallImg: function(_this, _preview){
		var _self = this;
		var _img = _preview.find('img');
		var _middleImgUrl = _this.attr('data-middleImg-url');
		var _largeImgUrl = _this.attr('data-largeImg-url');
		_img.eq(0).attr({
			'src': _middleImgUrl,
			'data-largeImg-url': _largeImgUrl
		});
		_this
			.addClass('active')
			.siblings()
			.removeClass('active');
	},
	//关于收货地址
	address: function(){
		var _self = this;
		var _address = $('#address');
		var _addressHead = $('#addressHead');
		var _addressCon = $('#addressCon');
		var _span = _addressCon.find('span');
		var _ol = _addressCon.find('ol');
		_addressHead.mouseenter(function(){
			_addressHead.css('border-bottom', 'none');
			_addressCon.css('display', 'block');
			_self.getProvince(_addressCon);			
			_self.addressSwitch(_addressCon);
		});
		$(document).on('click', function(){
			_addressHead.css('border', '1px solid #CECBCE');
			_addressCon.css('display', 'none');
		});
		_address.on('click', function(){
			return false;
		});
		// _address.mouseleave(function(){
		// 	_addressHead.css('border', '1px solid #CECBCE');
		// 	_addressCon.css('display', 'none');
		// });
	},
	addressSwitch: function(_addressCon){
		var _li = _addressCon.find('li');
		var _ol = _addressCon.find('ol');
		var _len = _li.length;
		for(var i=0; i<_len; i++){
			_li.on('click', function(){
				var _this = $(this);
				var _index = _this.index();
				_this.addClass('active').siblings().removeClass('active');
				_ol.eq(_index).addClass('active').siblings().removeClass('active');
			});
		}
	},
	//获取省份
	getProvince: function(_addressCon){
		var _self = this;
		var _li = _addressCon.find('li');
		var _ol = _addressCon.find('ol');
		var _span = _addressCon.find('span');
		getDataJsonp(DATAURL.addressApi, function(d){
			var _d = d.province;
			var _len = _d.length;
			_ol.eq(0).html('');
			for(var i=0; i<_len; i++){
				// console.log(_d[i])
				$('<a/>',{})
					.attr({
						'data-value': _d[i].value,
						'data-name': _d[i].name
					})
					.html(_d[i].name)					
					//这，是，点击省份
					.on('click', function(){
						var _this = $(this);
						var _name = _this.attr('data-name');
						var _value = _this.attr('data-value');
						_span.eq(0).html(_name).attr('data-name', _name);
						_li.eq(0).removeClass('active');
						_li.eq(1).removeClass('disNone').addClass('active disBlock')
						_ol.eq(0).removeClass('active');
						_ol.eq(1).addClass('active');
						_self.getCity(_addressCon, _d[_value-1].city);
					})
					.appendTo(_ol.eq(0))
			}
		});
	},
	getCity: function(_addressCon, _d){
		var _self = this;
		var _li = _addressCon.find('li');
		var _ol = _addressCon.find('ol');
		var _span = _addressCon.find('span');
		var _len = _d.length;
		_ol.eq(1).html('');
		for(var i=0; i<_len; i++){
			$('<a/>',{})
				.attr({
					'data-value': _d[i].value,
					'data-name': _d[i].name
				})
				.html(_d[i].name)
				//这，是，点击城市
				.on('click', function(){
					var _this = $(this);
					var _name = _this.attr('data-name');
					var _value = _this.attr('data-value');
					_span.eq(1).html(_name).attr('data-name', _name);
					_li.eq(0).removeClass('active');
					_li.eq(1).removeClass('active');
					_li.eq(2).addClass('active disBlock').removeClass('disNone');
					_ol.eq(0).removeClass('active');
					_ol.eq(1).removeClass('active');
					_ol.eq(2).addClass('active');
					_self.getArea(_addressCon, _d[_value-1].area);
				})
				.appendTo(_ol.eq(1));
		}
	},
	getArea: function(_addressCon, _d){
		var _self = this;
		var _address = $('#addressHead').find('span');
		var _addressHead = $('#addressHead');
		var _li = _addressCon.find('li');
		var _ol = _addressCon.find('ol');
		var _span = _addressCon.find('span');
		var _len = _d.length;
		_ol.eq(2).html('');
		for(var i=0; i<_len; i++){
			$('<a/>',{})
				.attr({
					'data-value': _d[i].value,
					'data-name': _d[i].name
				})
				.html(_d[i].name)
				//这，是，点击地区
				.on('click', function(){
					var _this = $(this);
					var _name = _this.attr('data-name');
					_span.eq(2).html(_name).attr('data-name', _name);
					var _addressSpan = _addressCon.find('span');
					var _html = '';
					for(var j=0; j<_addressSpan.length; j++){
						_html += _addressSpan.eq(j).attr('data-name');
					}
					_address.html(_html);
					_addressHead.css('border', '1px solid #CECBCE');
					_addressCon.css('display', 'none');
				})
				.appendTo(_ol.eq(2))
		}
	},
	//关于购物车
	cartLeft: function(){
		var _cartValue = $('#cartValue');
		var _cartAdd = $('#cartAdd');
		var _cartReduce = $('#cartReduce');
		_cartReduce.css('cursor', 'not-allowed');

		_cartAdd.on('click', function(){
			var _cartNum = _cartValue.val();
			_cartNum++;
			_cartReduce.css('cursor', 'pointer');
			_cartValue.val(_cartNum)
		});
		_cartReduce.on('click', function(){
			var _cartNum = _cartValue.val();
			_cartNum--;
			if(_cartNum<=1){
				_cartNum = 1;
				_cartReduce.css('cursor', 'not-allowed');
			}	
			_cartValue.val(_cartNum)
		});
		
		//没做匹配不是数字的
		_cartValue.blur(function(){
			var _cartNum = _cartValue.val();
			if(_cartNum<=1){
				_cartValue.val(1);
				_cartReduce.css('cursor', 'not-allowed');
			}else{
				_cartReduce.css('cursor', 'pointer');
			}
		});
	},
	//点击加入购物车
	chooseCart: function(){
		var _chooseCart = $('#chooseCart');
		var _cartValue = $('#cartValue');
		_chooseCart.on('click', function(){
			window.location.href="http://xxx.xxx.com/jd/cart.html";
			var _cartNum = _cartValue.val();
			var _pid = _chooseCart.attr('data-pid');
			console.log(_cartNum, _pid);
		});
	}
}