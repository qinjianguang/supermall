<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor = "red">
      <img slot="item-icon" src="~assets/img/tabbar/home-alt2.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home-alt2-red.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor = "red">
      <img slot="item-icon" src="~assets/img/tabbar/controls-alt.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/controls-alt-red.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor = "red">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/cart-red.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor = "red">
      <img slot="item-icon" src="~assets/img/tabbar/person.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/person-red.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
