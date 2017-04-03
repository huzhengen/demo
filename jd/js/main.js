;
$(function(){
	new Main().init();
});

function Main(){
	this.init = Inits;
};

function Inits(){
	//indexCartPop(); //首页右上角购物车，鼠标移入显示
	sliderBanner(); //首页幻灯片切换
	navItems(); //首页幻灯片上面的导航
	navLeftFn();// 首页左侧导航
	enjoy();// 首页享品质
}