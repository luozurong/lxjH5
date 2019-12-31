<template>
	<div>
		<div class="prefecture-floor" v-for="(items,index) in recommendColumnArray" :key="index">
			<div class="prefecture-floor1" v-if="items.showType == 3">
				<img class="prefecture-floor1-banner" :src="items.columnImgUrl">
				<div class="prefecture-floor1-item" @click="jumpDetail(list.commodityId)" v-for="(list,j) in items.commodityList">
					<img class="prefecture-floor1-pic" :src="list.commodityThumbLogo">
					<div class="prefecture-floor1-name" v-text="list.commodityName"></div>
					<div class="prefecture-floor1-preprice">
						<span>{{list.currentPrice | pricePre}}</span>
						<span>{{list.currentPrice | priceNext}}</span>
					</div>
					<s class="prefecture-floor1-nextprice"  :class="{'yuan':list.prePrice == ''}">{{list.prePrice}}</s>
				</div>
			</div>
			<div class="prefecture-floor2" v-if="items.showType == 2">
				<img class="prefecture-floor2-banner" :src="items.columnImgUrl">
				<div class="prefecture-floor2-item" @click="jumpDetail(list.commodityId)" v-for="(list,j) in items.commodityList">
					<img class="prefecture-floor2-pic" :src="list.commodityThumbLogo">
					<div class="prefecture-floor2-name" v-text="list.commodityName"></div>
					<s class="prefecture-floor2-nextprice" :class="{'yuan':list.prePrice == ''}">{{list.prePrice}}</s>
					<div class="prefecture-floor2-preprice">
						<span>{{list.currentPrice | pricePre}}</span>
						<span>{{list.currentPrice | priceNext}}</span>
					</div>
				</div>
			</div>
			<div class="prefecture-floor3" v-if="items.showType == 1">
				<img class="prefecture-floor3-banner" :src="items.columnImgUrl">
				<div class="prefecture-floor3-item" @click="jumpDetail(list.commodityId)" v-for="(list,j) in items.commodityList">
					<img class="prefecture-floor3-pic" :src="list.commodityThumbLogo">
					<div class="prefecture-floor3-wrap">
						<div class="prefecture-floor3-name" v-text="list.commodityName"></div>
						<div class="prefecture-floor3-disc" v-text="list.commodityIntroduction"></div>
						<div class="prefecture-floor3-preprice">
							<span>{{list.currentPrice | pricePre}}</span>
							<span>{{list.currentPrice | priceNext}}</span>
						</div>
						<s class="prefecture-floor3-nextprice" :class="{'yuan':list.prePrice == ''}">{{list.prePrice}}</s>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    export default {  
        props: ['recommendColumnArray'],
        filters:{
			pricePre: function(value){
				var val = parseInt(value);
				return val;
			},
			priceNext: function(value){
				var val = '.'+String(parseFloat(value).toFixed(2)).split('.')[1];
				return val;
			}
		},
		methods:{
			jumpDetail(commodityId){
				this.$router.push({
					name: 'productDetail',
					params: {
						commodityId: commodityId
					}
				});
			}
		} 
    }  
</script>
</script>
<style scoped>
	.prefecture-floor1{
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		padding: 0 0.11rem;
		margin-top: 0.14rem;
		overflow: hidden;
	}
	.prefecture-floor1-banner{
		width: 100%;
		max-height: 0.6rem;
		/*padding: 0.08rem 0.03rem; */
		box-sizing: border-box;
		display: block;
	}
	.prefecture-floor1-item{
		width: 33.333%;
		float:left;
		padding: 0 0.03rem;
		box-sizing: border-box;
		margin-bottom: 0.2rem;
	}
	.prefecture-floor1-pic{
		width: 100%;
		height: 1.25rem;
	}
	.prefecture-floor1-name{
		overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.15rem;
        color: #333;
        margin-bottom: 0.04rem;
        height: 0.4rem;
        line-height: 0.2rem;
	}
	.prefecture-floor1-preprice{
		display: inline-block;
	}
	.prefecture-floor1-preprice span:first-child{
		font-size: 0.16rem;
		color: #fc9153;
	}
	.prefecture-floor1-preprice span:first-child:before{
		content: "￥";
		font-size: 0.16rem;
	}
	.prefecture-floor1-preprice span:last-child{
		font-size: 0.12rem;
		color: #fc9153;
		margin-left: -0.04rem;
	}
	.prefecture-floor1-nextprice{
		color: #999;
		/*height: 0.14rem;
		margin-left: 0.1rem;*/
		display: block;
		font-size: 0.11rem;
	}
	.prefecture-floor1-nextprice.yuan{
		opacity: 0;
	}
	.prefecture-floor1-nextprice:before{
		content: "￥";
		margin-right: -0.03rem;
	}
	.prefecture-floor2{
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		padding: 0 0.06rem;
		margin-top: 0.14rem;
		overflow: hidden;
	}
	.prefecture-floor2-banner{
		width: 100%;
		max-height: 0.6rem;
		/*padding: 0.08rem 0.06rem; */
		box-sizing: border-box;
		display: block;
	}
	.prefecture-floor2-item{
		width: 50%;
		float:left;
		padding: 0 0.06rem;
		box-sizing: border-box;
		margin-bottom: 0.2rem;
	}
	.prefecture-floor2-pic{
		width: 100%;
		height: 1.86rem;
	}
	.prefecture-floor2-name{
		overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.15rem;
        color: #333;
        margin-bottom: 0.04rem;
        height: 0.4rem;
        line-height: 0.2rem;
	}
	.prefecture-floor2-preprice{
		float: left;
	}
	.prefecture-floor2-preprice span:first-child{
		font-size: 0.16rem;
		color: #fc9153;
		/*vertical-align: text-bottom;*/
	}
	.prefecture-floor2-preprice span:first-child:before{
		content: "￥";
		font-size: 0.16rem;
		margin-right: -0.03rem;
	}
	.prefecture-floor2-preprice span:last-child{
		font-size: 0.12rem;
		color: #fc9153;
		margin-left: -0.04rem;
	}
	.prefecture-floor2-nextprice{
		color: #999;
		/*float:left;*/
		display: inline-block;
		margin-left: 0.19rem;
		line-height: 0.26rem;
	}
	.prefecture-floor2-nextprice.yuan{
		opacity: 0;
	}
	.prefecture-floor2-nextprice:before{
		content: "￥";
		margin-right: -0.03rem;
	}
	.prefecture-floor3{
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		padding: 0 0.14rem;
		margin-top: 0.14rem;
		overflow: hidden;
	}
	.prefecture-floor3-banner{
		width: 100%;
		max-height: 0.6rem;
		/* padding: 0.08rem 0; */
		box-sizing: border-box;
		display: block;
	}
	.prefecture-floor3-item{
		width: 100%;
		padding: 0.11rem 0 0.07rem 0.04rem;
		border-bottom: 1px solid #eee;
		display: flex;
		display: -webkit-flex;
	}
	.prefecture-floor3-item:last-child{
		border-bottom: none; 
	}
	.prefecture-floor3-pic{
		width: 1.16rem;
		height: 1.16rem;
		flex-shrink: 0;
		-webkit-flex-shrink: 0;
	}
	.prefecture-floor3-wrap{
		flex-grow: 2;
		-webkit-flex-grow: 2;
		padding-left: 0.13rem;
	}
	.prefecture-floor3-name{
		overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.16rem;
        color: #333;
        margin-bottom: 0.04rem;
        margin-top: 0.03rem;
        height: 0.4rem;
        line-height: 0.2rem;
	}
	.prefecture-floor3-disc{
		overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 0.14rem;
        color: #999;
        margin-bottom: 0.20rem;
        height: 0.24rem;
	}
	.prefecture-floor3-preprice{
		display: table-cell;
		float: left;
	}
	.prefecture-floor3-preprice span:first-child{
		font-size: 0.17rem;
		color: #fc9153;
		/*vertical-align: text-bottom;*/
	}
	.prefecture-floor3-preprice span:first-child:before{
		content: "￥";
		font-size: 0.17rem;
		margin-right: -0.03rem;
	}
	.prefecture-floor3-preprice span:last-child{
		font-size: 0.12rem;
		display: inline-block;
		padding-bottom: 0.02rem;
		color: #fc9153;
	/*	vertical-align: text-bottom;*/
		margin-left: -0.04rem;
	}
	.prefecture-floor3-nextprice{
		color: #999;
		float:left;
		margin-top: 0.03rem;
		margin-left: 0.19rem;
	}
	.prefecture-floor3-nextprice.yuan{
		opacity: 0;
	}
	.prefecture-floor3-nextprice:before{
		content: "￥";
		margin-right: -0.03rem;
	}
</style>