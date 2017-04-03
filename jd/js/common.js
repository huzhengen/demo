// 全站公共方法

//不跨域ajax
function getDataFn(url, callback){
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'json',
		success: function(d){
			callback(d);
		}
	});
}


//跨域ajax
function getDataJsonp(url, callback){
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'jsonp',
		jsonp: 'callback',
		success: function(d){
			callback(d)
		}
	});
}

//购物车接口，计算单个商品的总价
function cartFnJsonp(url, string, callback){
	$.ajax({
		url: url,
		type: 'get',
		data: 'cart='+string,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success: function(d){
			callback(d)
		}
	});
}

//购物车，计算所有的商品的数量，价格
function getCheckedGoodsJsonp(url, string, callback){
	$.ajax({
		url: url,
		type: 'get',
		data: 'goods='+string,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success: function(d){
			callback(d)
		}
	});
}
