// 导入获取购物车列表的方法
import { getCartList, changeCartCount, delSelectCart } from '@/api/cart'
export default {
  namespaced: true,
  state () {
    return {
      // 购物车列表
      cartList: []
    }
  },
  mutations: {
    // 设置数据
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 单项商品的选中与反选
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find((item, index) => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 全选与反选
    toggleAllCheck (state, flag) {
      state.cartList.forEach((item) => { item.isChecked = flag })
    },
    // 更改购物车商品数量
    changeCount (state, { value, goodsId }) {
      const obj = state.cartList.find((item) => item.goods_id === goodsId)
      obj.goods_num = value
    }
  },
  actions: {
    // 异步获取数据要在actions中
    // 获取购物车列表并通知mutations设置数据
    async getCartList (context) {
      const { data } = await getCartList()
      // 设置每一项的复选框状态都选中
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    // 购物车商品更新
    async changeCountAction (context, obj) {
      const { goodsId, value, goodsSkuId } = obj
      // 调用方法，更新仓库内数据
      context.commit('changeCount', { goodsId, value })
      // 调用请求方法，发送更新购物车请求
      await changeCartCount(goodsId, value, goodsSkuId)
    },
    // 删除购物车商品
    async delSelect (context) {
      const cartIds = context.getters.selCartList.map(item => item.id)
      await delSelectCart(cartIds)
      // 重新加载购物车数据
      context.dispatch('getCartList')
    }
  },
  getters: {
    // 获取购物车商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 获取选中的商品
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 计算选中的商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 计算选中的商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
