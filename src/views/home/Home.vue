<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  v-bind:titles="['流行','新款','精选']"
                  @tabClick = 'tabClick' ref="tabControl1"
                  class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" v-bind:probe-type="3"
            @scroll="contentScroll" :pull-up-load = "true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control  v-bind:titles="['流行','新款','精选']"
                   @tabClick = 'tabClick' ref="tabControl2"/>
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
  import {debounce} from "common/utils"

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
        isShowBackTop : false,
        tabOffsetTop: 545,
        isTabFixed:false,
        saveY: 0
      }
    },
    computed : {
      showGoods(){
        //console.log(this.goods[this.currentType].list)
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() { //活跃
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
      // 1.请求多个数据
      this.multiData();
      // 2.首页详情数据
      this.homeGoods('pop');
      this.homeGoods('new');
      this.homeGoods('sell');
    },
    mounted() {
      // 1.图片加载的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,200)
      // 2. 监听item图片加载完成
      this.$bus.$on('itemImageLoad',()=>{
        //console.log('111');
        //this.$refs.scroll.refresh();
        refresh();
      })
      // 获取tabControl的offsetTop
      // 所以组件都有一个属性$el,用于获取组件中的元素
      console.log(this.$refs.tabControl1.$el.offsetTop);;
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //console.log(position);
        this.isShowBackTop = -position.y > 1000;
        // 2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        console.log(this.currentType);
        this.homeGoods(this.currentType);

        this.$refs.scroll.scroll.refresh();
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
          //console.log(res)
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
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;

  }
</style>
