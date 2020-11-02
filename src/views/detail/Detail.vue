<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo ="detailInfo" />
      <detail-param-info :paramInfo ="paramInfo" />
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components : {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages : [],
        goods : {},
        shop : {},
        detailInfo : {},
        paramInfo:{}
      }
    },
    created() {
      //1. 保存传入的iid
      this.iid = this.$route.params.iid
      console.log(this.iid);
      //2. 根据iid请求详情数据
      getDetail(this.iid).then( res => {
        const data = res.result;
        //轮播图
        this.topImages = data.itemInfo.topImages

        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        console.log(this.goods);

        // 3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //5.参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      })
      //
    },
    methods : {
      imageLoad(){
        this.$refs.scroll.refresh();
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc( 100% - 44px);
  }
</style>
