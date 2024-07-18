import request from '@/utils/request'

// 由购物车或商品详情页结算而来，获取将要结算的商品数据
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      shopId: 0,
      coiponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

// 订单结算
export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    payType: 10,
    isUsePoints: 0,
    ...params
  })
}

// 获取订单列表
export const getOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType, page
    }
  })
}
