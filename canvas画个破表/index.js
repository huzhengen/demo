window.onload = function(){
	var c1 = document.getElementById('c1');
	var gc = c1.getContext('2d');
	// clock();
	setInterval(clock, 30);
	
	function clock(){
		var x = 200;
		var y = 200;
		var r = 150;
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		// console.log(h,m,s);

		var hh = (-90+h*30+m/2)*Math.PI/180; // var hh = ((h%12-3)*30)*Math.PI/180;
		var mm = (-90+m*6)*Math.PI/180;
		var ss = (-90+s*6)*Math.PI/180;
		// console.log(hh,mm,ss);

		gc.clearRect(0,0,c1.width,c1.height)

		//小刻度
		gc.strokeStyle = 'black';
		gc.beginPath();
		for(var i=0; i<60; i++){
			gc.moveTo(x,y);
			gc.arc(x,y,r,6*i*Math.PI/180,6*(i+1)*Math.PI/180,false);
		}
		gc.closePath();
		gc.stroke();

		gc.fillStyle = 'white';
		gc.strokeStyle = 'black';
		gc.beginPath();
		gc.moveTo(x,y);
		gc.arc(x,y,(r*57/60),0,360*Math.PI/180,false);
		gc.closePath();
		gc.fill();

		//大刻度
		gc.lineWidth = 2;
		gc.strokeStyle = 'black';
		gc.beginPath();
		for(var i=0; i<12; i++){
			gc.moveTo(x,y);
			gc.arc(x,y,r,30*i*Math.PI/180,30*(i+1)*Math.PI/180,false);
		}
		gc.closePath();
		gc.stroke();

		gc.fillStyle = 'white';
		gc.strokeStyle = 'black';
		gc.beginPath();
		gc.moveTo(x,y);
		gc.arc(x,y,(r*51/60),0,360*Math.PI/180,false);
		gc.closePath();
		gc.fill();

		//时针
		gc.strokeStyle = 'red';
		gc.lineWidth = 5;
		gc.beginPath();
		gc.moveTo(x,y);
		gc.arc(x,y,(r*30/60),hh,hh,false);
		gc.closePath();
		gc.stroke();

		//分针
		gc.strokeStyle = 'green';
		gc.lineWidth = 3;
		gc.beginPath();
		gc.moveTo(x,y);
		gc.arc(x,y,(r*48/60),mm,mm,false);
		gc.closePath();
		gc.stroke();

		//秒针
		gc.strokeStyle = 'blue';
		gc.lineWidth = 1;
		gc.beginPath();
		gc.moveTo(x,y);
		gc.arc(x,y,(r*48/60),ss,ss,false);
		gc.closePath();
		gc.stroke();
	}
}