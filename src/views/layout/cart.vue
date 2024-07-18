<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <div class="cart-box" v-if="isLogin && cartList.length > 0">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all">共<i>{{ cartTotal || 0 }}</i>件商品</span>
        <span class="edit" @click="isEdit = !isEdit">
          <van-icon name="edit" />
          编辑
        </span>
      </div>
      <!-- 购物车列表 -->
      <div class="cart-list" >
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox :value="item.isChecked" @click="toggleCheck(item.goods_id)"></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">¥ <span>{{ item.goods.goods_price_min }}</span></div>
              <CountBox :value="item.goods_num" @input="value => changeCount(value, item.goods_id, item.goods_sku_id)">
              </CountBox>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 空购物车时展示内容 -->
    <div v-else class="empty-cart">
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车是空的, 快去逛逛吧
      </div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>

    <div class="footer-fixed">
      <div class="all-check" @click="toggleAllCheck">
        <van-checkbox icon-size="18" :value="isAllChecked"></van-checkbox>
        全选
      </div>

      <div class="all-total">
        <div class="price">
          <span>合计：</span>
          <span>¥ <i class="totalPrice">{{ selPrice }}</i></span>
        </div>
        <div @click="goPay" v-if="!isEdit" class="goPay" :clase="{ disabled: selCount === 0 }">结算{{ selCount }}</div>
        <div v-else class="delete" :class="{ disabled: selCount === 0 }" @click="handleDel">删除{{ selCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { delSelectCart } from '@/api/cart'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'CartPage',
  data () {
    return {
      cart: [],
      isEdit: false
    }
  },
  components: {
    CountBox
  },
  computed: {
    // 判断用户登录
    isLogin () {
      return this.$store.getters.token
    },
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selCartList', 'selCount', 'selPrice', 'isAllChecked'])
  },
  created () {
    // 调用vuex中的action获取购物车列表进行存储到vuex中
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartList')
    }
  },
  methods: {
    // 更改指定选中商品状态
    toggleCheck (goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    // 全选和全反选
    toggleAllCheck () {
      this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
    },
    // 更改数量
    async changeCount (value, goodsId, goodsSkuId) {
      if (value === 0) {
        const cartIds = this.selCartList.map(item => item.id)
        await delSelectCart(cartIds)
        this.$store.dispatch('cart/getCartList')
        return
      }
      this.$store.dispatch('cart/changeCountAction', { goodsId, value, goodsSkuId })
    },
    // 删除选中商品
    handleDel () {
      if (this.selCount === 0) {
        return
      }
      this.$store.dispatch('cart/delSelect')
      // 取消删除状态
      this.isEdit = false
    },
    // 去结算
    goPay () {
      if (this.selCount !== 0) {
        this.$router.push({
          path: '/pay',
          // 由路由传递的参数
          query: {
            mode: 'cart',
            // 选中的商品id
            cartIds: this.selCartList.map(item => item.id).join(',')
          }
        })
      }
    }
  },
  watch: {
    // 监视编辑按钮状态，重置商品选中数据
    isEdit (value) {
      if (value) {
        this.$store.commit('cart/toggleAllCheck', false)
      } else {
        this.$store.commit('cart/toggleAllCheck', true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;

  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;

    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }

    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .empty-cart {
    padding: 80px 30px;

    img {
      width: 140px;
      height: 92px;
      display: block;
      margin: 0 auto;
    }

    .tips {
      text-align: center;
      color: #666;
      margin: 30px;
    }

    .btn {
      width: 110px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background-color: #fa2c20;
      border-radius: 16px;
      color: #fff;
      display: block;
      margin: 0 auto;
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }

    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;

        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;

          span {
            font-size: 16px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;

    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;

    .price {
      font-size: 14px;
      margin-right: 10px;

      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay,
    .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;

      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}
</style>
