<template>
	<div class="index-container">
		<el-row :gutter="20">
			<el-col :lg="24" :md="12" :sm="24" :xl="6" :xs="24">
				<el-card shadow="never">
					<vab-chart :option="spider" style="height:288px;"/>
				</el-card>
			</el-col>
			<el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
				<el-card shadow="never">
					<div slot="header">
						<span>授权数</span>
					</div>
					<vab-chart autoresize :option="sqs" />
					<div class="bottom">
						<span>总授权数:{{ config2.endVal }}</span>
					</div>
				</el-card>
			</el-col>

			<el-col v-for="(item, index) in iconList" :key="index" :lg="3" :md="3" :sm="6" :xl="3" :xs="12">
				<router-link target="_blank" :to="item.link">
					<el-card class="icon-panel" shadow="never">
						<vab-icon
							:icon="['fas', item.icon]"
							:style="{ color: item.color }"
						></vab-icon>
						<p>{{ item.title }}</p>
					</el-card>
				</router-link>
			</el-col>
			<el-col :lg="11" :md="24" :sm="24" :xl="11" :xs="24">
				<el-card class="card" shadow="never">
					<div slot="header">
						<span>依赖信息</span>
						<div style="float: right">部署时间:{{ updateTime }}</div>
					</div>
					<div class="bottom-btn">
						<el-popover placement="top" trigger="hover" width="250">
							<p>
								请我们喝杯咖啡，付款后联系qq
								783963206，我们将邀请您加入我们的讨论群，谢谢您愿意支持开源，加群获取文档、及基础模板，群内大佬众多，希望能帮到大家（如情况不允许，请勿勉强）。
							</p>
							<el-image :src="require('@/assets/zfb_kf.jpg')"></el-image>
							<a slot="reference" target="_blank">
								<el-button type="primary">QQ讨论群、基础版、文档</el-button>
							</a>
						</el-popover>
						<a
							href="https://github.com/chuzhixin/vue-admin-better"
							target="_blank"
						>
							<el-button type="warning">github下载源码点star</el-button>
						</a>
						<a
							href="https://gitee.com/chu1204505056/vue-admin-beautiful"
							target="_blank"
						>
							<el-button type="warning">码云下载源码点star</el-button>
						</a>
						<a @click="handleChangeTheme">
							<el-button type="danger">修改主题和布局</el-button>
						</a>
					</div>
					<table class="table">
						<tr>
							<td>@vue/cli版本</td>
							<td>{{ devDependencies['@vue/cli-service'] }}</td>
							<td>vue版本</td>
							<td>{{ dependencies['vue'] }}</td>
						</tr>
						<tr>
							<td>vuex版本</td>
							<td>{{ dependencies['vuex'] }}</td>
							<td>vue-router版本</td>
							<td>{{ dependencies['vue-router'] }}</td>
						</tr>
						<tr>
							<td>element-ui版本</td>
							<td>{{ dependencies['element-ui'] }}</td>
							<td>axios版本</td>
							<td>{{ dependencies['axios'] }}</td>
						</tr>
						<tr>
							<td>eslint版本</td>
							<td>{{ devDependencies['eslint'] }}</td>
							<td>prettier版本</td>
							<td>{{ devDependencies['prettier'] }}</td>
						</tr>
						<tr>
							<td>sass版本</td>
							<td>{{ devDependencies['sass'] }}</td>
							<td>mockjs版本</td>
							<td>{{ dependencies['mockjs'] }}</td>
						</tr>
						<tr>
							<td>layouts版本</td>
							<td>{{ dependencies['layouts'] }}</td>
							<td>lodash版本</td>
							<td>{{ dependencies['lodash'] }}</td>
						</tr>
					</table>
				</el-card>

				<el-card shadow="never">
					<div slot="header">
						<span>其他信息</span>
					</div>
					<div style="text-align: center">
						<vab-colorful-icon icon-class="vab" style="font-size: 140px" />
						<h1 style="font-size: 30px">vue-admin-better</h1>
					</div>
					<div v-for="(item, index) in noticeList" :key="index">
						<el-alert
							v-if="index !== 0"
							:closable="item.closable"
							:title="item.title"
							:type="item.type"
						></el-alert>
						<br />
					</div>
					<el-alert :closable="false" :title="userAgent" type="info"></el-alert>
					<br />
				</el-card>
			</el-col>
			<el-col :lg="13" :md="13" :sm="24" :xl="13" :xs="24">
				<el-card class="card" shadow="never">
					<div slot="header">
						<span>更新日志</span>
					</div>
					<el-timeline :reverse="reverse">
						<el-timeline-item
							v-for="(activity, index) in activities"
							:key="index"
							:color="activity.color"
							:timestamp="activity.timestamp"
						>
							{{ activity.content }}
						</el-timeline-item>
					</el-timeline>
				</el-card>
				<plan></plan>
				<version-information></version-information>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import VabChart from '@/plugins/echarts'
import { dependencies, devDependencies } from '../../../package.json'
import { getSpiders } from '@/api/admin'
import Plan from './components/Plan'
import VersionInformation from './components/VersionInformation'

export default {
	name: 'Index',
	components: {
		VabChart,
		Plan,
		VersionInformation,
	},
	data() {
		return {
			timer: 0,
			updateTime: process.env.VUE_APP_UPDATE_TIME,
			nodeEnv: process.env.NODE_ENV,
			dependencies: dependencies,
			devDependencies: devDependencies,
			config2: {
				startVal: 0,
				endVal: this.$baseLodash.random(1000, 20000),
				decimals: 0,
				prefix: '',
				suffix: '',
				separator: ',',
				duration: 8000,
			},

			//访问量
			spider: {
				title: {
					text: '蜘蛛访问统计'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					data: [
						'百度蜘蛛',
						'搜狗蜘蛛',
						'360蜘蛛',
						'神马蜘蛛',
						'头条蜘蛛'
					]
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: this.get7dayTime()
					}
				],
				yAxis: [
					{
						type: 'value'
					}
				],
				series: [
					{
						name: '百度蜘蛛',
						type: 'line',
						stack: 'Total',
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '搜狗蜘蛛',
						type: 'line',
						stack: 'Total',
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '360蜘蛛',
						type: 'line',
						stack: 'Total',
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '神马蜘蛛',
						type: 'line',
						stack: 'Total',
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [320, 332, 301, 334, 390, 330, 320]
					},
					{
						name: '头条蜘蛛',
						type: 'line',
						stack: 'Total',
						label: {
							show: true,
							position: 'top'
						},
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [820, 932, 901, 934, 1290, 1330, 1320]
					}
				]
			},
			//授权数
			sqs: {
				color: [
					'#1890FF',
					'#36CBCB',
					'#4ECB73',
					'#FBD437',
					'#F2637B',
					'#975FE5',
				],
				backgroundColor: 'rgba(252,252,252,0)',
				grid: {
					top: '4%',
					left: '2%',
					right: '4%',
					bottom: '0%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						/*boundaryGap: false,*/
						data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
						axisTick: {
							alignWithLabel: true,
						},
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: [
					{
						name: '授权数',
						type: 'bar',
						barWidth: '60%',
						data: [10, 52, 20, 33, 39, 33, 22],
					},
				],
			},
			//词云
			cy: {
				grid: {
					top: '4%',
					left: '2%',
					right: '4%',
					bottom: '0%',
				},
				series: [
					{
						type: 'wordCloud',
						gridSize: 15,
						sizeRange: [12, 40],
						rotationRange: [0, 0],
						width: '100%',
						height: '100%',
						textStyle: {
							normal: {
								color() {
									const arr = [
										'#5470c6',
										'#91cc75',
										'#fac858',
										'#ee6666',
										'#73c0de',
										'#975FE5',
									]
									let index = Math.floor(Math.random() * arr.length)
									return arr[index]
								},
							},
						},
						data: [
							{
								name: 'vue-admin-better',
								value: 15000,
							},
							{
								name: 'element',
								value: 10081,
							},
							{
								name: 'beautiful',
								value: 9386,
							},

							{
								name: 'vue',
								value: 6500,
							},
							{
								name: 'chuzhixin',
								value: 6000,
							},
							{
								name: 'good',
								value: 4500,
							},
							{
								name: 'success',
								value: 3800,
							},
							{
								name: 'never',
								value: 3000,
							},
							{
								name: 'boy',
								value: 2500,
							},
							{
								name: 'girl',
								value: 2300,
							},
							{
								name: 'github',
								value: 2000,
							},
							{
								name: 'hbuilder',
								value: 1900,
							},
							{
								name: 'dcloud',
								value: 1800,
							},
							{
								name: 'china',
								value: 1700,
							},
							{
								name: '1204505056',
								value: 1600,
							},
							{
								name: '972435319',
								value: 1500,
							},
							{
								name: 'young',
								value: 1200,
							},
							{
								name: 'old',
								value: 1100,
							},
							{
								name: 'vuex',
								value: 900,
							},
							{
								name: 'router',
								value: 800,
							},
							{
								name: 'money',
								value: 700,
							},
							{
								name: 'qingdao',
								value: 800,
							},
							{
								name: 'yantai',
								value: 9000,
							},
							{
								name: 'author is very cool',
								value: 9200,
							},
						],
					},
				],
			},

			//更新日志
			reverse: true,
			activities: [],
			noticeList: [],
			//其他信息
			userAgent: navigator.userAgent,
			//卡片图标
			iconList: [
				{
					icon: 'video',
					title: '视频播放器',
					link: '/vab/player',
					color: '#ffc069',
				},
				{
					icon: 'table',
					title: '表格',
					link: '/vab/table/comprehensiveTable',
					color: '#5cdbd3',
				},
				{
					icon: 'laptop-code',
					title: '源码',
					link: 'https://github.com/chuzhixin/vue-admin-better',
					color: '#b37feb',
				},
				{
					icon: 'book',
					title: '书籍',
					link: '',
					color: '#69c0ff',
				},
				{
					icon: 'bullhorn',
					title: '公告',
					link: '',
					color: '#ff85c0',
				},
				{
					icon: 'gift',
					title: '礼物',
					link: '',
					color: '#ffd666',
				},

				{
					icon: 'balance-scale-left',
					title: '公平的世界',
					link: '',
					color: '#ff9c6e',
				},
				{
					icon: 'coffee',
					title: '休息一下',
					link: '',
					color: '#95de64',
				},
			],
		}
	},
	/*beforeDestroy() {
		clearInterval(this.timer)
	},*/
	/*mounted() {
		let base = +new Date(2020, 1, 1)
		let oneDay = 24 * 3600 * 1000
		let date = []

		let data = [Math.random() * 1500]
		let now = new Date(base)

		const addData = (shift) => {
			now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
			date.push(now)
			data.push(this.$baseLodash.random(20000, 60000))

			if (shift) {
				date.shift()
				data.shift()
			}

			now = new Date(+new Date(now) + oneDay)
		}

		for (let i = 1; i < 6; i++) {
			addData()
		}
		addData(true)
		this.fwl.xAxis[0].data = date
		this.fwl.series[0].data = data
		this.timer = setInterval(() => {
			addData(true)
			this.fwl.xAxis[0].data = date
			this.fwl.series[0].data = data
		}, 3000)
	},*/
	created(){
		this.fetchData();
	},
	methods: {
		get7dayTime(){
			var data=[];
			for(var i=0;i<7;i++){
				data.push(this.getDay(i));
			}
			return data.reverse();
		},
		getDay(day){
			var today = new Date();
			var targetday_milliseconds=today.getTime() - 1000*60*60*24*day;
			today.setTime(targetday_milliseconds); //注意，这行是关键代码
			var tYear = today.getFullYear();
			var tMonth = today.getMonth();
			var tDate = today.getDate();
			tMonth = this.doHandleMonth(tMonth + 1);
			tDate = this.doHandleMonth(tDate);
			return tYear+"-"+tMonth+"-"+tDate;
		},
		doHandleMonth(month){
			var m = month;
			if(month.toString().length === 1){
				m = "0" + month;
			}
			return m;
		},
		handleClick(e) {
			this.$baseMessage(`点击了${e.name},这里可以写跳转`)
		},
		handleZrClick(e) {},
		handleChangeTheme() {
			this.$baseEventBus.$emit('theme')
		},
		async fetchData() {
			const { data } = await getSpiders();
			console.log(data)
		},
	},
}
</script>
<style lang="scss" scoped>
.index-container {
	padding: 0 !important;
	margin: 0 !important;
	background: #f5f7f8 !important;

	::v-deep {
		.el-alert {
			padding: $base-padding;

			&--info.is-light {
				min-height: 82px;
				padding: $base-padding;
				margin-bottom: 15px;
				color: #909399;
				background-color: $base-color-white;
				border: 1px solid #ebeef5;
			}
		}

		.el-card__body {
			.echarts {
				width: 100%;
				height: 115px;
			}
		}
	}

	.card {
		::v-deep {
			.el-card__body {
				.echarts {
					width: 100%;
					height: 305px;
				}
			}
		}
	}

	.bottom {
		padding-top: 20px;
		margin-top: 5px;
		color: #595959;
		text-align: left;
		border-top: 1px solid $base-border-color;
	}

	.table {
		width: 100%;
		color: #666;
		border-collapse: collapse;
		background-color: #fff;

		td {
			position: relative;
			min-height: 20px;
			padding: 9px 15px;
			font-size: 14px;
			line-height: 20px;
			border: 1px solid #e6e6e6;

			&:nth-child(odd) {
				width: 20%;
				text-align: right;
				background-color: #f7f7f7;
			}
		}
	}

	.icon-panel {
		height: 117px;
		text-align: center;
		cursor: pointer;

		svg {
			font-size: 40px;
		}

		p {
			margin-top: 10px;
		}
	}

	.bottom-btn {
		button {
			margin: 5px 10px 15px 0;
		}
	}
}
</style>
