<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar ctive-color="#ee0a24" inactive-color="#000" route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex'
}
</script>

<style lang="scss" scoped></style>
