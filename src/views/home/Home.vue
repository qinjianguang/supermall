<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll" v-bind:probe-type="3"
            @scroll="contentScroll" :pull-up-load = "true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control class="tab-control"  v-bind:titles="['流行','新款','精选']"
                   @tabClick = 'tabClick'/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComponents/HomeSwiper";
  import RecommendView from "./childComponents/RecommendView";
  import FeatureView from "./childComponents/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components : {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners : [],
        recommends : [],
        goods : {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType:'pop',
        isShowBackTop : false
      }
    },
    computed : {
      showGoods(){
        console.log(this.goods[this.currentType].list)
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.multiData();
      // 2.首页详情数据
      this.homeGoods('pop');
      this.homeGoods('new');
      this.homeGoods('sell');
    },
    methods : {
      /*
      * 事件监听
      * */
      tabClick(index) {
        console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //console.log(position);
        this.isShowBackTop = -position.y > 1000;
      },
      loadMore(){
        console.log('上拉加载更多');
        this.homeGoods(this.currentType);

        this.$refs.scroll.scroll.refresh();
      },
      /*
      * 网络请求
      * */
      multiData() {
        getHomeMultidata().then(res => {
          //console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      homeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          console.log(res)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
   padding-top: 44px;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    /*position: sticky;*/
    top: 44px;
    z-index: 9;
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
