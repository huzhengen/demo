function cartTpl(d){
	var _html = '';
	var _d = d.cartList;
	var _len = _d.length;
	for(var i=0; i<_len; i++){
		_html += 
			`<li>
				<input type="checkbox" checked name="" class="check margin" data-price="`+_d[i].price+`" data-pid="`+_d[i].pid+`">
				<div class="goodsImg margin w80"><a href="javascript:;"><img src="`+_d[i].img+`"></a></div>
				<div class="goodsTitle margin w450"><a href="javascript:;">`+_d[i].title+`</a></div>
				<div class="price margin w80" data-price="`+_d[i].price+`">¥`+_d[i].price+`</div>
				<div class="quantity margin w80">
					<a href="javascript:;" class="decrease">-</a>
					<input type="text" name="" class="itxt" value="`+_d[i].num+`">
					<a href="javascript:;" class="increase">+</a>
				</div>
				<div class="sum margin w80" data-sum="`+_d[i].sum+`">¥`+_d[i].sum+`</div>
				<div class="action margin w80"><a href="javascript:;" class="delet">删除</a></div>
			</li>`;				
	};
	return _html;
}