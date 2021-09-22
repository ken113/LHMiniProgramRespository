<template>
	<view class="lh-calendar">
		<view :class="{'calendar-mask':true,'show-year':yearMonthShow,'show-hour':hourminShow }" @tap="closeCalendar" catchtouchmove="true"
			v-show="calendarShow"></view>
		<view class="calendar-content" :class="{'calendarShow':calendarShow}">
			<view class="calendar-button">
				<text @tap="closeCalendar">取消</text>
				<text @tap="confirm">确定</text>
			</view>
			<view class="year-date">
				<text class="left iconfont" @tap="changeMonth('prev')">&#xe679;</text>
				<!-- <text class="year-month-box" @tap="changeYear">
					<text class="year">{{currentYear}}年</text>
					<text class="month">{{currentMonth}}月</text>
				</text> -->
				<picker class="year-month-box" @change="bindPickerChange" mode="multiSelector" :value="pickerValue1" :range="array">
					<text class="year">{{currentYear}}年</text>
					<text class="month">{{currentMonth}}月</text>
				</picker>

				<text class="right iconfont" @tap="changeMonth('next')">&#xe6a3;</text>
			</view>
			<view class="calendar-list">
				<view class="weeks-list">
					<text class="weeks-item">日</text>
					<text class="weeks-item">一</text>
					<text class="weeks-item">二</text>
					<text class="weeks-item">三</text>
					<text class="weeks-item">四</text>
					<text class="weeks-item">五</text>
					<text class="weeks-item">六</text>
				</view>
				<view class="days-list">
					<view v-for="(day,index) in dateList" :key="day"
						:class="selectDate=== day.date ?  'days-item selected':'days-item' " @tap="clickDate(day)">
						<view :class=" day.disabled ? 'date disabled' :'date'">
							{{ today === day.date ? '今' : parseInt(day.date.substring(8,10)) }}
						</view>
						<view v-if="day.disabled" class="disabled-text">不可用</view>
					</view>

				</view>
			</view>
			<view class="date-time" v-if=" type === 'datetime' ">
				<view class="date">{{ selectDate }}</view>
				<!-- <view class="time" @tap="selectHourMin">
					{{ selectTime }}
				</view> -->
				<picker class="input" mode="multiSelector" :range="times" @change="bindPickerChange2" :value="pickerValue2" >
					{{ selectTime }}
				</picker>
			</view>
		</view>

		<view class="calendar-content-yearmonth" :class="{'yearMonthShow':yearMonthShow}">
			<view class="top">
				<text @tap="cancelYearMonth">取消</text>
				<text @tap="complateYearMonth">完成</text>
			</view>
			<view class="center">
				<picker-view :value="pickerValue1" @change="bindChange" class="year-month-box2"
					:indicator-style="indicatorStyle2">
					<picker-view-column>
						<view class="year-item2" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="month-item2" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
		
		<view class="calendar-content-hourmin" :class="{'hourminShow':hourminShow}">
			<view class="top">
				<text @tap="cancelHourMin">取消</text>
				<text @tap="complateHourMin">完成</text>
			</view>
			<view class="center">
				<picker-view :value="pickerValue2" @change="bindChangeTime" class="year-month-box2"
					:indicator-style="indicatorStyle2">
					<picker-view-column>
						<view class="year-item2" v-for="(item,index) in hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="year-item2" v-for="(item,index) in mins" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column v-if="showSeconds">
						<view class="year-item2" v-for="(item,index) in seconds" :key="index">{{item}}秒</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
		
	</view>


</template>

<script>
	import LHPicker from './LHPicker.vue';

	import util from '@/common/util.js';

	export default {
		name: "LHCalendar",
		components: {
			LHPicker
		},
		props: {
			value: {
				type: String,
				default: function() {
					return '';
				},
			},
			type: {
				type: String,
			},
			format: {
				type: String,
			},
			showSeconds: {
				type: Boolean,
				default: function() {
					return true;
				},
			},
			disabledList: {
				type: Array,
				default: function() {
					return [];
				},
			},
			startDate: {
				type: String,
				default: function() {
					return '';
				},
			},
			endDate: {
				type: String,
				default: function() {
					return '';
				},
			},
		},
		watch: {
			disabledList: {
				deep: true,
				handler(n, o) {
					this.fillDays();
				}
			},
			startDate: {
				deep: true,
				handler(n, o) {
					this.fillDays();
				}
			},
			endDate: {
				deep: true,
				handler(n, o) {
					this.fillDays();
				}
			},
			value:{
				deep:true,
				handler(n,o){
					if(n){
						let _value1 = n.split(' ')[0];
						let _value2 = '';
						let _hours = 0;
						let _mins = 0;
						if( n.split(' ').length > 1 ){
							_value2 = n.split(' ')[1];
							_hours = _value2.split(':')[0].replace(/[\u4e00-\u9fa5]/g, "") * 1;
							_mins = _value2.split(':')[1].replace(/[\u4e00-\u9fa5]/g, "") * 1;
						}
						let _year = _value1.split('-')[0];	
						let _month = _value1.split('-')[1];
						let _date = _value1.split('-')[2];
						
						this.currentMonth = _month*1; // 当前月
						this.currentYear= _year*1;
						this.currentDate= _date*1;
						
						this.pickerValue1 = [_year - 1900, _month - 1];
						
						this.selectDate = _value1;
						
						
						this.pickerValue2 = [_hours, _mins];
						this.selectTime = this.hourKey[_hours].key + ':' + (_mins > 9 ? _mins : '0' + _mins)  + '分';
					}
					this.fillDays();
				}
			}
		},
		data() {
			const tdate = new Date();
			let hourKey = [
				{ key: '凌晨0点', value: '00' }, { key: '凌晨1点', value: '01' }, { key: '凌晨2点', value: '02' }, { key: '凌晨3点', value: '03' }, { key: '凌晨4点', value: '04' },
				{ key: '凌晨5点', value: '05' }, { key: '上午6点', value: '06' }, { key: '上午7点', value: '07' }, { key: '上午8点', value: '08' }, { key: '上午9点', value: '09' },
				{ key: '上午10点', value: '10' }, { key: '中午11点', value: '11' }, { key: '中午12点', value: '12' }, { key: '下午13点', value: '13' }, { key: '下午14点', value: '14' },
				{ key: '下午15点', value: '15' }, { key: '下午16点', value: '16' }, { key: '下午17点', value: '17' }, { key: '下午18点', value: '18' }, { key: '晚上19点', value: '19' },
				{ key: '晚上20点', value: '20' }, { key: '晚上21点', value: '21' }, { key: '晚上22点', value: '22' }, { key: '晚上23点', value: '23' },
			];
			
			let _year = tdate.getFullYear(),
				_month = tdate.getMonth() + 1,
				_date = tdate.getDate(); //几号

			const years = [];
			const months = [];

			for (let i = 1900; i <= 2100; i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}

			let hours = [];
			for (let i = 0; i < 24; i++) {
				//hours.push(i > 9 ? i : '0' + i);
				hours.push( hourKey[i].key );
			}
			let mins = [];
			for (let i = 0; i < 60; i++) {
				//mins.push(i > 9 ? i : '0' + i);
				let min = i > 9 ? i : '0' + i;
				mins.push( min + '分');
			}
			let seconds = [];
			for (let i = 0; i < 60; i++) {
				seconds.push(i > 9 ? i : '0' + i);
			}
			
			//生日的默认25年前6月份
			if( this.type === 'birthdate'){
				_year = _year - 25;
				_month = 6;	
			}
			
			return {
				hourKey,
				years,
				months,
				hours,
				mins,
				seconds,
				array:[years,months],
				times:[ hours,mins],
				pickerValue1:[_year - 1900, _month - 1],
				pickerValue2: [0, 0, 0],
				calendarShow: false,
				today: util.dateFormat(new Date(), 'd'),
				currentMonth: _month, // 当前月
				currentYear: _year,
				currentDate: _date,
				dateList: [],
				selectDate: util.dateFormat(new Date(), 'd'),
				selectTime: '00:00:00',
				//disabledList: ['2021-06-05', '2021-06-28'],
				indicatorStyle: `height:100%;`,
				yearMonthShow: false,
				indicatorStyle2: `height: 50px;`,
				hourminShow:false
			};
		},
		mounted() {
			this.fillDays();
			if (!this.showSeconds) {
				this.pickerValue2 = [0, 0];
				this.selectTime = '凌晨00点:00分';
			}
		},
		methods: {
			bindPickerChange(e) {
				const [ year,month ] = e.detail.value;
				this.currentYear = 1900 + year;
				this.currentMonth = month + 1;
				
				this.pickerValue1 = e.detail.value;
				this.fillDays();
				
			},
			bindPickerChange2(e) {
				
				const [ hours,mins ] = e.detail.value;
				this.selectTime = this.times[0][hours] + ':' + this.times[1][mins];
				
				this.pickerValue2 = e.detail.value;
			},
			// 显示组件
			showCalendar() {
				// 隐藏软件盘
				uni.hideKeyboard();
				this.calendarShow = true;
			},
			closeCalendar() {
				this.calendarShow = false;
				this.$emit("cancel");
			},
			confirm() {
				let disabled = false;
				this.dateList.forEach( item=>{
					if( this.selectDate === item.date && item.disabled){
						disabled = true;
					}
				});
				if( disabled ){
					return;
				}
				let date = this.selectDate;
				if (this.type === 'datetime') {
					date += ' ' + this.selectTime;
				}
				this.$emit("confirm", date.trim());
				this.calendarShow = false;
			},
			bindChange(e) {
				// const val = e.detail.value;
				// this.currentYear = val[0] + 1900;
				// this.currentMonth = val[1] + 1;

				// this.fillDays();
				
				this.pickerValue1 = e.detail.value;
			},
			bindChangeTime(e) {
				const val = e.detail.value;

				const times = [];

				times.push(this.hours[val[0]]);
				times.push(this.mins[val[1]]);

				if (this.seconds[val[2]]) {
					times.push(this.seconds[val[2]]);
				}
				this.selectTime = times.join(':');
			},
			fillDays() {
				//当前月的1号
				const _curDate1 = new Date(
					this.currentYear, this.currentMonth - 1, 1
				);
				const _curDay1 = _curDate1.getDay();

				const data1 = [],
					data2 = [];

				for (let i = 0; i < _curDay1; i++) {
					const temp1 = new Date(_curDate1).getTime() - 24 * 60 * 60 * 1000 * (_curDay1 - i);
					let disabled = false;
					let date = util.dateFormat(temp1, 'd');
					if (this.disabledList.includes(date)) {
						disabled = true;
					}
					if (this.startDate && temp1 < +new Date(this.startDate.replace(/-/g, '/'))) {
						disabled = true;
					}
					if (this.endDate && temp1 > +new Date(this.endDate.replace(/-/g, '/'))) {
						disabled = true;
					}
					data1.push({
						date,
						disabled
					});
				}

				//当前月的最后一天
				const _curDate2 = new Date(this.currentYear, this.currentMonth, 0);
				const _curDay2 = _curDate2.getDay();

				for (let i = 0; i < 7 - _curDay2 - 1; i++) {
					const temp2 = new Date(_curDate2).getTime() + 24 * 60 * 60 * 1000 * (i + 1);
					let disabled = false;
					let date = util.dateFormat(temp2, 'd');
					if (this.disabledList.includes(date)) {
						disabled = true;
					}
					if (this.startDate && temp2 < +new Date(this.startDate.replace(/-/g, '/'))) {
						disabled = true;
					}
					if (this.endDate && temp2 > +new Date(this.endDate.replace(/-/g, '/'))) {
						disabled = true;
					}
					data2.push({
						date,
						disabled
					});
				}
				const days = [];
				for (let i = 0; i < _curDate2.getDate(); i++) {

					let m = this.currentMonth > 9 ? this.currentMonth : '0' + this.currentMonth;

					let date = (i + 1) > 9 ? (i + 1) : '0' + (i + 1);

					const temp = this.currentYear + '-' + m + '-' + date;

					let disabled = false;

					if (this.disabledList.includes(temp)) {
						disabled = true;
					}
					if (this.startDate && +new Date(temp.replace(/-/g, '/')) < +new Date(this.startDate.replace(/-/g,
							'/'))) {
						disabled = true;
					}
					if (this.endDate && +new Date(temp.replace(/-/g, '/')) > +new Date(this.endDate.replace(/-/g, '/'))) {
						disabled = true;
					}
					days.push({
						date: temp,
						disabled
					});

				}

				this.dateList = [...data1, ...days, ...data2];
			},
			clickDate(e) {

				const {
					date,
					disabled
				} = e;
				if (disabled) {
					return;
				}

				this.selectDate = e.date;
			},
			changeYear() {
				this.yearMonthShow = true;
			},
			cancelYearMonth(){
				this.yearMonthShow = false;
			},
			complateYearMonth(){
				const val = this.pickerValue1;
				this.currentYear = val[0] + 1900;
				this.currentMonth = val[1] + 1;
				
				this.fillDays();
				
				this.yearMonthShow = false;
			},
			selectHourMin(){
				this.hourminShow = true;
			},
			cancelHourMin(){
				this.hourminShow = false;
			},
			complateHourMin(){
				this.hourminShow = false;
			},
			changeMonth(type) {
				let _month = this.currentMonth,
					_year = this.currentYear;
				//上一个月
				if (type === "prev") {
					_month = this.currentMonth - 1;
					if (_month === 0) {
						_month = 12;
						_year--;
					}
				} else {
					_month = this.currentMonth + 1;
					if (_month === 13) {
						_month = 1;
						_year++;
					}
				}
				this.currentYear = _year;
				this.currentMonth = _month;

				this.fillDays();
				this.pickerValue1 = [_year - 1900, _month - 1];
			},
		}
	}
</script>

<style lang="scss" scoped>
	.lh-calendar {
		.calendar-mask {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			z-index: 50;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.3);

			&.show-year {
				z-index: 101;
			}
			&.show-hour {
				z-index: 101;
			}
		}

		.calendar-content {
			flex-direction: column;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 100;
			width: 100%;
			//height: 600upx;
			background-color: #FFFFFF;
			transform: translateY(100%);
			transition: all 300ms ease;
			//padding-bottom: 40rpx;
		}



		.calendarShow {
			transform: translateY(0) !important;
		}



		.calendar-content .calendar-button {
			justify-content: space-between;
			height: 80upx;
			line-height: 80upx;
			display: flex;
		}

		.calendar-button text {
			width: 120upx;
			font-size: 28upx;
			font-weight: 500;
			display: block;
			text-align: center;
		}

		.calendar-button text:first-child {
			color: #303030;
		}

		.calendar-button text:last-child {
			color: #4992E7;
		}

		.year-date {
			justify-content: center;
			height: 80upx;
			line-height: 80upx;
			display: flex;
			border-top: #eee 1upx solid;
			border-bottom: #eee 1upx solid;

			.iconfont {
				width: 120rpx;

				// &.right{
				// 	text-align: right;
				// }
				text-align: center;
				font-size: 38rpx;
			}



			.year-month-box {
				width: 200rpx;
				height: 100%;
				border-top: none;
				border-bottom: none;
				text-align: center;

				.year.iconfont {
					width: 80rpx;
					font-size: 36rpx;
				}

				.year-item {
					align-items: center;
					justify-content: center;
					text-align: center;
					display: flex;
				}

				.month-item {
					align-items: center;
					justify-content: center;
					text-align: center;
					display: flex;
				}
			}
		}

		.calendar-list {
			margin-bottom: 20rpx;

			.weeks-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				margin: 10rpx 0;

				.weeks-item {
					width: 100rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
				}
			}

			.days-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				.days-item {
					width: 100rpx;
					height: 80rpx;
					margin-top: 10rpx;
					text-align: center;
					//line-height: 60rpx;
					// display: flex;
					// justify-content: center;
					// align-items: center;

					&.selected {
						.date {
							background: #4992E7;
							color: #fff;
						}
					}

					.date {
						font-size: 28rpx;
						width: 60%;
						margin: 0 auto;

						&.disabled {
							color: #999;
						}
					}

					.disabled-text {
						font-size: 20rpx;
						color: #999;
					}
				}
			}
		}

		.date-time {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20rpx 40rpx;

			.date {
				font-size: 28rpx;
				color: #666;
				font-weight: 500;
			}

			.time {

				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				
				.time-box {
					width: 200rpx;
					height: 100%;

					.item {
						align-items: center;
						justify-content: center;
						text-align: center;
						display: flex;
					}
				}
			}

		}

		.calendar-content-yearmonth,.calendar-content-hourmin {
			flex-direction: column;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 1002;
			width: 100%;
			//height: 600upx;
			background-color: #FFFFFF;
			transform: translateY(100%);
			transition: all 300ms ease;

			&.yearMonthShow {
				transform: translateY(0) !important;
			}
			
			&.hourminShow{
				transform: translateY(0) !important;
			}

			.top {

				justify-content: space-between;
				height: 80rpx;
				line-height: 80rpx;
				display: flex;

				text {
					width: 120rpx;
					font-size: 28rpx;
					font-weight: 500;
					display: block;
					text-align: center;
				}
			}

			.top text:first-child {
				color: #303030;
			}

			.top text:last-child {
				color: #4992E7;
			}

			.center {
				
				border-top: #eee 1upx solid;

				.year-month-box2 {
					width: 750rpx;
					height: 500rpx;
					margin-top: 20rpx;
					
					.year-item2 {
						height: 50px;
						align-items: center;
						justify-content: center;
						text-align: center;
						display: flex;
					}

					.month-item2 {
						height: 50px;
						align-items: center;
						justify-content: center;
						text-align: center;
						display: flex;
					}
				}
			}
		}
	}
</style>
