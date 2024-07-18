import request from '@/utils/request'
// 加入购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, goodsNum, goodsSkuId
  })
}
// 购物车数据请求
export const getCartList = () => {
  return request.get('/cart/list')
}
// 购物车商品数据更新（数量更新）
export const changeCartCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId, goodsNum, goodsSkuId
  })
}
// 删除购物车商品
export const delSelectCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
