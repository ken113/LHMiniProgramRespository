<template>
	<view class="lh-notice">
		<view class="notice-mask" @click="closeNotice" catchtouchmove="true" v-show="noticeShow"></view>
		<view class="notice-content" :class="{'noticeShow':noticeShow}">
			<view class="notice-top">
				<text class="iconfont" @tap="closeNotice">&#xe86d;</text>
				<text class="text">旅游风险须知和安全提示告知书</text>
				<text>&nbsp;</text>
			</view>
			<view class="notice-center">
				<p><strong>一、 人身财产安全警示： </strong></p>
				<p><strong>1.确保身体健康：</strong>确认自身体条件能够适应和完成旅游活动；如需随时服用药物的，请随身携带并带足用量。</p>
				<p><strong>2.注意饮食卫生：</strong>提高防护传染病、流行病的意识。注意用餐卫生，不食用不卫生、不合格的食品和饮料。</p>
				<p><strong>3.做好个人防护：</strong>如旅途涉及热带、高原、海滨、草原等特殊气候、地理条件，应采取必要防护措施，充分了解目的地情况，备好相应服装鞋帽，做好防晒、防蚊虫、防高原反应等工作。晕车晕船的旅游者，备好有效药物。旅途中有不良反应，及时说明。
				</p>
				<p><strong>4.注意人身安全：</strong>请在自己能够控制风险的范围内活动，切忌单独行动，注意人身安全。旅游途中因特殊情况无法联系团队的或遇紧急情况的，应立即报警并寻求当地警察机关或中国驻当地使领馆的帮助。
				</p>
				<p><strong>5.慎选自选活动：</strong>根据自身情况选择能够控制风险的自选项目。如有心脏病、高血压、恐高症等疾病，或有老人、孕妇、儿童等人群，勿选择刺激性或高风险活动。游泳/浮潜/潜水/跳伞/攀岩/蹦极/骑马/热气球/快艇等高空、高速、水上、水下高风险活动，更具危险性，请充分了解活动知识，服从指挥。建议另购特定保险。
				</p>
				<p><strong>6.防范水上风险：</strong>水上游览或活动，应加倍注意安全，不可擅自下水或单独前往深水区或危险水域，应听从指挥和合理劝阻。 </p>
				<p><strong>7.遵守交通规则：</strong>通过马路时走人行横道或地下通道。行车途中系好安全带，并不要在车内走动，老人和儿童要有成年人陪护，以防不确定危险。车辆在颠簸路段行驶过程中不要离开座位和饮食（主要是坚果类），以免发生呛水或卡咽危险。
				</p>
				<p><strong>8.保管贵重物品：</strong>贵重物品随身携带或申请酒店的保险柜服务，勿放入交运行李、酒店房间里或旅游巴士上。随身携带财物稳妥安置，不要离开自己视线范围。游览、拍照、散步、购物时，随时注意和检查，谨防被盗遗失。
				</p>
				<p><strong>9.携带旅行票证：</strong>旅行证件、交通票证请随身妥善保管或由领队、导游保管，以避免遗忘、丢失。</p>
				<p><strong>10.保持通讯畅通：</strong>请保持手机号码与预留在旅行社的一致，保持畅通有效；并注意将手机随身携带以备紧急联系。</p>
				<p><strong>11.理性购物消费：</strong>购物时注意商品质量及价格，并向商家索取正式发票。</p>
				<p><strong>二、海上活动安全风险及注意事项告知：</strong></p>
				<p>1、我公司会根据出发当天的沿途和目的地海事天气来决定是否出发或取消行程，所以可能会有码头天气好但我们取消行程的情况，或码头天气不好但我们仍然出发的情况。我们会最大程度地减低由于天气带来的风险，我们不会用您和船员的生命去冒险，所以请您理解并支持我们的决定；
				</p>
				<p>2、出海前一天建议您不要醉酒，即便是经验丰富的水手，也难避免在宿醉后晕船；</p>
				<p>3、
					出海浮潜极为有趣，但长期暴露于阳光下也极易晒伤，根据我们的经验，任何防晒霜都没有实际保护作用（杀死珊瑚作用倒是非常明显），所以强烈建议你穿着防晒服，一方面能隔绝紫外线，一方面也能有效减低在水中的其他受伤害概率；
				</p>
				<p>4、 建议您在出海前将泳衣穿着在内，避免在封闭的船舱中更衣，极易晕船；</p>
				<p>5、
					我公司境外的供应商提供的意外保险涵盖船上的所有乘客，除了未满30天的婴儿和怀孕期间的妇女，这是由保险公司的条款所决定的，所以我公司不对上述人群在行程公司中的意外伤害或其他事故负任何责任，请您提前知晓；
				</p>
				<p>6、 我公司所有包船或拼船行程，均不限量供应瓶装饮用水和软饮料（可乐芬达），请您喝完以后再拿第二瓶，无限供应，但请不要浪费；</p>
				<p>7、 船上所有垃圾都请丢入垃圾桶，不要丢进海里；</p>
				<p>8、 不论船型，船舱内都不可吸烟，请到舱外甲板吸烟，并注意烟头不要烧坏船上设施；</p>
				<p>9、 请在使用船只时听从船长指挥，不要在未经许可的情况下操作船上的任何设备，这可能给船的行驶带来安全隐患，如您损坏船上设备请照价赔偿；</p>
				<p>10、我们选择的海岛海滩非常美丽，您到达时可能非常兴奋，请在得到船员认可的情况下再下水，并在任何情况下不要在潜入船底水下，我们的船员无法照看到您；</p>
				<p><strong>三、 第三方责任告知：</strong></p>
				<p><strong>1.航班问题提醒：</strong>旅行社对航班因运力、天气等因素延误、变更、取消等无法掌控，如遇此种情况，旅行社可能因此将对行程做出相应调整，届时敬请旅游者配合谅解。
				</p>
				<p><strong>2.个人消费说明：</strong>非旅行社行程中安排的购物、娱乐等项目，属旅游者个人消费行为，如产生纠纷或损失，旅行社不承担责任。</p>
				
				<view class="notice-bottom">北京凤宇环球国际旅行社有限公司</view>
			</view>
			
				
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeShow: false,
			};
		},
		methods: {
			closeNotice() {
				this.noticeShow = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.lh-notice {
		.notice-mask {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			z-index: 50;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.3);
		}

		.notice-content {
			flex-direction: column;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 100;
			width: 100%;
			height: 100%;
			background-color: #FFFFFF;
			transform: translateY(100%);
			transition: all 400ms ease;
			//padding-bottom: 40rpx;
			overflow: auto;

			&.noticeShow {
				transform: translateY(0) !important;
			}

			.notice-top {
				border-top: 1px solid #EEEEEE;
				border-bottom: 1px solid #EEEEEE;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-left: 32rpx;

				.iconfont {
					font-size: 32rpx;
					font-weight: 600;
				}

				.text {
					font-size: 26rpx;
				}
			}
			
			.notice-center{
				padding: 24rpx 40rpx 0rpx 32rpx;
				overflow: auto;
				height: calc( 100vh - 90rpx );
				._p{
					font-size:24rpx;
				}
				._strong{
					font-weight: 600;
				}
				
				.notice-bottom{
					text-align: center;
					font-size:24rpx;
					font-weight: 600;
					padding-bottom: 30rpx;
				}
			}
			

		}



	}
</style>
