// 全局请求路径，也就是后端的请求基准路径
const BASE_URL_DEV = 'http://192.168.3.181:9021'

const BASE_URL_TEST = 'http://order.test.dodotour.cn:9021';

const BASE_URL_PROD = 'https://wxopen.dodotour.cn';

// 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
let ajaxTimes = 0;
// 封装请求方法，并向外暴露该方法
export const sendRequest = (options) => {
	// 解构请求头参数
	let header = {
		...options.header
	};
	// 当前请求不是登录时请求，在header中加上后端返回的token

	const sessionId = uni.getStorageSync("sessionId");

	const data = Object.assign({}, options.data || {}, {
		sessionId
	});
	ajaxTimes++;
	// 显示加载中 效果
	if (options.loadding === false) {} else {
		// uni.showLoading({
		// 	title: "加载中",
		//     mask: true,
		// });
	}
	return new Promise((resolve, reject) => {

		uni.request({
			url: BASE_URL_PROD + options.url,
			method: options.method || 'POST',
			data,
			header,
			success: (res) => {
				resolve(res.data);
				if (res.data.Code === 403) {
					uni.redirectTo({
						url: '/pages/index/login'
					});
				}
			},
			fail: (err) => {
				uni.showToast({
					icon:'error',
					title:'服务异常'
				})
				reject(err)
				
			},
			// 完成之后关闭加载效果
			complete: (result) => {
				if( result && result.statusCode && result.statusCode === 500){
					uni.showToast({
						icon:'error',
						title:'服务器异常'
					})
				}
				ajaxTimes--;
				if (ajaxTimes === 0) {
					//  关闭正在等待的图标
					uni.hideLoading();
				}
			}
		})
	})
}
