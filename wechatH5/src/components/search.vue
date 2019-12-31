<template>
	<div class="search">
		<span @click='communitySelect'>
			<!-- <span class="icon icon1"></span> -->
			<img class="icon icon1" src="../../static/images/nav_btn_ic_location@3x.png">
			{{$store.state.commuintyName}}
			<!-- <span class="icon icon2"></span> -->
			<img class="icon icon2" src="../../static/images/nav_btn_ic_put-down@3x.png">
		</span>
		<span class="searchGoods" @click='searchGoods()'></span>
	</div>
</template>
<script type="text/javascript">
//	import
	export default{
		name:'search',
		data(){
			return{
				commuintyName:'合立正通小区'
			}
		},
		methods:{
			communitySelect(){
				this.$store.commit('setcityname',this.$store.state.locationCity);
				this.$store.commit('setisLocation',true)
				this.$router.push({path:'/communitySelect'});

			},
			searchGoods(){
				sessionStorage.setItem('keyword','');
				sessionStorage.setItem('goodsListShow',false);
				this.$router.push({path:'/goodsSearch'})
			}
		}
	}
</script>
<style scoped="scoped">
	.search{
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		text-align: center;
		height: 0.5rem;
		line-height: 0.5rem;
		z-index: 111;
		background-color: #FFFFFF;
		color: #333333;
		font-size: 0.16rem;
	}
	.searchGoods{
		position: absolute;
		top: 0.15rem;
		right: 0.1rem;
		display: inline-block;
		width: 0.2rem;
		height: 0.2rem;
		background: url(../../static/images/nav_btn_ic_search@3x.png) left center no-repeat;
		background-size: 100%;
	}
	.icon{
		display: inline-block;
		width: 0.14rem;
		height: 0.14rem;
		margin-top: -0.02rem;
		vertical-align: middle;
	}
</style>