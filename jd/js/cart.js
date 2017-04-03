;
$(function(){
	new Cart();
});

function Cart(){
	this.init();
};

Cart.prototype = {
	init: function(){
		var _self = this;
		_self.createcartList();//生成购物车的DOM，其他的基本都是再生成DOM之后执行
	},
	//很多方法都在创建了DOM之后再执行
	createcartList: function(){
		var _self = this;
		var _cartList = $('#cartList');
		var _priceSum = $('#priceSum');
		var _amountSum = $('#amountSum');
		//页面加载后，生成购物车的DOM
		//商品的信息是获取的json
		getDataJsonp(DATAURL.cartListApi, function(d){
			_cartList.html(cartTpl(d));//完成购物车里的li ↓↓↓↓↓↓↓
			_self.getCheckedGoods();//这个是，当购物车的DOM生成的时候，获取最开始的时候，总数量和总价格（①）
			_self.cartQuantity();//这个是点击加减+-号，单个商品数量的变化，根据数量的变化，单个商品的价格也变化
			_self.cartSelect();//这个是点击单选、全选按钮
			_self.deletGoods();	//删除商品
		});
	},
	//单个商品数量的变化
	cartQuantity: function(){
		var _self = this;
		var _decrease = $('.decrease');
		var _increase = $('.increase');
		var _itxt = $('.itxt');
		var _string = ''
		//减号
		_decrease.on('click', function(){
			var _this = $(this);
			var _priceValue = _this.parent().prev().attr('data-price');
			var _itxtValue = _this.next().val();
			var _sum = _this.parent().next();
			_itxtValue--;
			if(_itxtValue<1){
				_itxtValue = 1
			}
			_this.next().val(_itxtValue);
			var _string = '[{"num":"'+_itxtValue+'","price":"'+_priceValue+'"}]'
			_self.getSum(_sum, _string);//单个商品的总价
		});
		//加号
		_increase.on('click', function(){
			var _this = $(this);
			var _priceValue = _this.parent().prev().attr('data-price');
			var _itxtValue = _this.prev().val();
			var _sum = _this.parent().next();
			_itxtValue++;
			_this.prev().val(_itxtValue);
			var _string = '[{"num":"'+_itxtValue+'","price":"'+_priceValue+'"}]'
			_self.getSum(_sum, _string);//单个商品的总价
			
		});
		//input
		_itxt.blur(function(){
			var _this = $(this);
			var _priceValue = _this.parent().prev().attr('data-price');
			var _itxtValue = _this.val();
			var _sum = _this.parent().next();
			if(_itxtValue<=1){
				_this.val(1);
				var _string = '[{"num":"1","price":"'+_priceValue+'"}]'
				_self.getSum(_sum, _string);//单个商品的总价
			}else{
				_this.val(_itxtValue);
				var _string = '[{"num":"'+_itxtValue+'","price":"'+_priceValue+'"}]'
				_self.getSum(_sum, _string);//单个商品的总价
			}
		});
	},
	//单个商品数量变化的时候，获取他总个数的价格
	//第二个参数的格式：'[{"num":"3","price":"10"}]'
	getSum: function(_sum, _string){
		var _self = this;
		//获取单个商品总的价格
		cartFnJsonp(DATAURL.cartApi, _string, function(d){
			_sum.attr('data-sum', d).html('¥'+d);
			_self.getCheckedGoods();//这个是点击加减号的时候，+-，获取总的数量，总的价格（②）
		});
	},
	//关于input选中，全选
	cartSelect: function(){
		var _self = this;
		var _priceSum = $('#priceSum');
		var _amountSum = $('#amountSum');
		var _checkAll = $('.checkAll');
		var _check = $('.check');
		//_checkAll.attr('checked', 'true');//全选按钮在开始是选中的
		if(!_check.length){
			_checkAll.removeAttr('checked');
		}
		for(var i=0; i<_check.length; i++){
			if(_check.eq(i).is(':checked') == false){
				_checkAll.removeAttr('checked');
				break;
			}
			_checkAll.attr('checked', 'true');
		}
		//点击单个商品的选择按钮input
		_check.on('click', function(){
			var _this = $(this);
			for(var i=0; i<_check.length; i++){
				if(_check.eq(i).is(':checked') == false){
					_checkAll.removeAttr('checked');
					break;
				}
				_checkAll.attr('checked', 'true');
			}
			_self.getCheckedGoods();//这个是点击单选按钮的时候，获取总的数量，总的价格（③）
		});
		//点击全选按钮（上面一个，下面一个）
		_checkAll.on('click', function(){
			var _this = $(this);
			if(_this.is(':checked') == false){
				_checkAll.removeAttr('checked');
				_check.removeAttr('checked');
				_self.getCheckedGoods();//这个是点击全选按钮的时候，获取总的数量，总的价格（④）
			}else{
				_checkAll.attr('checked', 'true');
				_check.attr('checked', 'true');
				_self.getCheckedGoods();//这个是点击全选按钮的时候，获取总的数量，总的价格（④）
			}
		});
	},
	//根据选中的商品，获取其单个商品的数量，根据后端计算，得到总数量
	//根据选中的商品，获取其单个商品的总价，根据后端计算，得到总价格
	getCheckedGoods: function(){
		var _self = this;
		var _check = $('.check');
		var _itxt = $('.itxt');
		var _sum = $('.sum');
		var _priceSum = $('#priceSum');
		var _amountSum = $('#amountSum');
		var _goodsArr = [];
		for(var i=0; i<_check.length; i++){
			if(_check.eq(i).is(':checked') == true){
				var _temp = {};
				_temp['pid'] = _check.eq(i).attr('data-pid');//商品的pid
				_temp['price'] = _check.eq(i).attr('data-price');//商品的单价
				_temp['num'] = _itxt.eq(i).val();//商品的数量
				_temp['sum'] = _sum.eq(i).attr('data-sum');//商品的总价
				_goodsArr.push(_temp);
			}
		}
		// console.log(_goodsArr);
		getCheckedGoodsJsonp(DATAURL.checkedGoodsApi, JSON.stringify(_goodsArr), function(d){
			// console.log(d);		
			if(_goodsArr.length == 0){
				_amountSum.attr('data-amountSum', 0).html(0);
				_priceSum.attr('data-priceSum', 0).html('¥'+0);
				return;
			}	
			_amountSum.attr('data-amountSum', d.num).html(d.num);
			_priceSum.attr('data-priceSum', d.sum).html('¥'+d.sum);
		});
	},
	//删除按钮
	deletGoods: function(){
		var _self = this;
		var _delet = $('.delet');
		var _cartList = $('#cartList');
		var _priceSum = $('#priceSum');
		var _amountSum = $('#amountSum');
		_delet.on('click', function(){
			var _this = $(this);
			_this.parents('li').remove();
			_self.cartSelect();//这个是点击单选、全选按钮
			_self.getCheckedGoods();
		})
	}
}


