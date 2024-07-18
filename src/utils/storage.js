// 定义通用键名
const INFO_KEY = 'hm_shopping_info'
// 本地搜索历史
const HISTORY_KEY = 'hm_history_list'

// 对获取个人信息方法封装
export const getInfo = () => {
  // 设置默认
  const defaultObj = { token: '', userId: '' }
  // 从本地获取用户信息
  const result = localStorage.getItem(INFO_KEY)
  // 判断有无用户数据，有则进行json解析，无则设置为默认信息
  return result ? JSON.parse(result) : defaultObj
}
// 对设置本地的个人信息的方法进行封装
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移出本地个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
// 获取本地搜索历史信息
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 设置本地搜索历史数据
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
