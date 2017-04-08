window.onload = function(){
	var lis = document.querySelectorAll('li');
	var cart = document.querySelector('.cart');
	var obj = {};
	var total = 0;
	var totalPrice = null;
	for(let i=0; i<lis.length; i++){
		lis[i].ondragstart = function(e){
			var ps = this.querySelectorAll('p');
			// console.log(ps);
			e.dataTransfer.setData('title', ps[0].innerHTML);
			e.dataTransfer.setData('price', ps[1].innerHTML);
			e.dataTransfer.setDragImage(this, 0, 0);
		}
	}

	cart.ondragover = function(e){
		e.preventDefault();
	}
	cart.ondrop = function(e){
		e.preventDefault();
		e.stopPropagation();
		// console.log(123);
		var title = e.dataTransfer.getData('title');
		var price = e.dataTransfer.getData('price');

		if(!obj[title]){
			var div = document.createElement('div');
			div.className = 'clearfix';
			var span = document.createElement('span');
			span.innerHTML = title;
			var i = document.createElement('i');
			i.innerHTML = price;
			var em = document.createElement('em');
			em.innerHTML = 1;
			div.appendChild(span);
			div.appendChild(i);
			div.appendChild(em);
			cart.appendChild(div);
			obj[title] = title;
			// console.log(obj);
		}else{
			var span = document.querySelectorAll('span');
			var em = document.querySelectorAll('em');
			console.log(span[1].innerHTML)
			for(let j=1; j<span.length; j++){
				if(span[j].innerHTML == title){
					console.log(123);
					em[j].innerHTML = parseInt(em[j].innerHTML) + 1;
				}
			}
		}

		if(!totalPrice){
			totalPrice = document.createElement('div');
			totalPrice.className = 'clearfix totalPrice';
			
		}
		total += parseInt(price);
		totalPrice.innerHTML = '总价格：' + total + '元';
		cart.appendChild(totalPrice);
		
	}
}