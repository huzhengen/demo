//接口

var SITEURL = 'http://xxx.xxx.com/jd/';

var DATAURL = {
	//首页的数据
	navItemsApi: SITEURL + 'navItems.php',
	indexBannerApi: SITEURL + 'indexBanner.php',
	navLeftApi: SITEURL + 'navLeft.php',
	enjoyApi: SITEURL + 'enjoy.php',

	//产品详情页的数据
	//smallImgApi: SITEURL + 'smallImg.php',
	//'api4371830': SITEURL + '4371830.php',
	//provinceApi: SITEURL + 'province.php',

	//选择地址
	addressApi: SITEURL + 'address.php',

	//购物车
	cartListApi: SITEURL + 'cartList.php',
	cartApi: SITEURL + 'cart.php', //计算的接口，计算单个商品，单价*数量
	//cartUlLi: SITEURL + 'cartUlLi.php'
	checkedGoodsApi: SITEURL + 'checkedGoods.php' //计算总的商品的数量，价格
}