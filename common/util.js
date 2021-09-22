export default {
	autoUpdater() {
		const updateManager = wx.getUpdateManager();
	
		updateManager.onCheckForUpdate(res => {
			
			console.log('版本检测',res);
			if (res.hasUpdate) {
				updateManager.onUpdateReady(function() {
	
					wx.showModal({
						title: '更新提示',
						content: '新的版本已准备好，是否重启应用?',
						success(res) {
							if (res.confirm) {
								updateManager.applyUpdate();
							}
							if( res.cancel){
								wx.showModal({
									title: '温馨提示~',
									content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
								});
							}
						},
					});
	
				})
	
				// 新版本下载失败
				updateManager.onUpdateFailed(function(res) {
					wx.showModal({
						title: '已经有新版本了哟~',
						content: '新的版本已经上线拉~，请您删除当前小程序，重新搜索打开哟~ ',
					});
				})
			}
		})
	},
	getRect(selector) {
		return new Promise((resolve) => {
			let view = uni.createSelectorQuery().select(selector);
			view.fields({
				size: true,
				rect: true,
				scrollOffset: true
			}, (res) => {
				resolve(res);
			}).exec();
		})
	},
	dateFormat(pdate, len) {

		let date = new Date(pdate),
			_year = date.getFullYear(),
			_month = date.getMonth() + 1,
			_date = date.getDate(),
			_h = date.getHours(),
			_m = date.getMinutes(),
			_s = date.getSeconds();


		_month = _month > 9 ? _month : '0' + _month;
		_date = _date > 9 ? _date : '0' + _date;
		_h = _h > 9 ? _h : '0' + _h;
		_m = _m > 9 ? _m : '0' + _m;
		_s = _s > 9 ? _s : '0' + _s;

		let dateStr = _year + '-' + _month + '-' + _date + ' ' + _h + ':' + _m + ':' + _s;

		if (len === 'd') {
			return dateStr.substring(0, 10);
		}
		return dateStr;
	},
	isChineseChar(str) {
		var reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
		return reg.test(str)
	},
	isEnChar(str) {
		var reg = /^[a-zA-Z]+$/;
		return reg.test(str)
	},
	isNumber(str) {
		var reg = /^[0-9]+$/;
		return reg.test(str)
	},
	isEmail(str) {
		var reg = /^([a-zA-Z0-9_#*~$^`|;:"'/?<>,&\\\(\)={}\[\]\%\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,10})+$/;
		return reg.test(str)
	},
	isDate(dateStr) {
		if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(dateStr)) {
			return false;
		}

		//使用捕获组获取日期
		var date = {
			year: RegExp.$1,
			month: RegExp.$2,
			day: RegExp.$3,
		}

		//使用 Date() 对象，新建对象时会将日期转化为合法日期
		//比如 2020-02-30 被转化为 2020-3-1
		var dateObj = new Date(date.year, date.month - 1, date.day);

		if (date.year != dateObj.getFullYear() || date.month != dateObj.getMonth() + 1 || date.day != dateObj
		.getDate()) {
			return false;
		}

		return true;
	},
	getPersonAge(strBirthday,date2) {
		var returnAge = -1;
		if (!strBirthday) {
			return -1;
		}
		strBirthday = strBirthday.substring(0, 10);
		if (strBirthday == '0001-01-01' || strBirthday == '1900-01-01') {
			return -1;
		}
		var strBirthdayArr = strBirthday.split("-");
		var birthYear = strBirthdayArr[0];
		var birthMonth = strBirthdayArr[1];
		var birthDay = strBirthdayArr[2];
	
		var d = new Date(date2);
	
		//已选中的出行日期为准，判断年龄
		let ServiceDate = date2.substring(0, 10);
		if (ServiceDate == '0001-01-01' || ServiceDate == '1900-01-01') {
			d = new Date();
		}
	
		var nowYear = d.getFullYear();
		var nowMonth = d.getMonth() + 1;
		var nowDay = d.getDate();
	
		if (nowYear == birthYear) {
			returnAge = 0; //同年 则为0岁  
		} else {
			var ageDiff = nowYear - birthYear; //年之差  
			if (ageDiff > 0) {
				if (nowMonth == birthMonth) {
					var dayDiff = nowDay - birthDay; //日之差  
					if (dayDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				} else {
					var monthDiff = nowMonth - birthMonth; //月之差  
					if (monthDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				}
			} else {
				returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天  
			}
		}
		return returnAge; //返回周岁年龄  
	}
}
