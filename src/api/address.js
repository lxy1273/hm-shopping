import request from '@/utils/request'
// 获取地址列表
export const getAddress = () => {
  return request.get('/address/list')
}
// 添加地址信息
export const addAddress = (name, phone, detail) => {
  return request.post('/address/add', {
    form: {
      name: name,
      phone: phone,
      region: [
        {
          value: '782',
          label: '上海'
        },
        {
          value: '783',
          label: '上海市'
        },
        {
          value: '785',
          label: '徐汇区'
        }
      ],
      detail: detail
    }
  })
}

// 编辑地址
export const addressEdit = (addressId, name, phone, detail) => {
  return request.post('/address/edit', {
    addressId: addressId,
    form: {
      name: name,
      phone: phone,
      region: [
        {
          label: '上海',
          value: '782'
        },
        {
          label: '上海市',
          value: '783'
        }, {
          label: '徐汇区',
          value: '785'
        }
      ],
      detail: detail
    }
  })
}

// 删除收获地址
export const addressRemove = (addressId) => {
  return request.post('/address/remove', {
    addressId: addressId
  })
}

// 设置默认地址
export const addressSetDefault = (addressId) => {
  return request.post('/address/setDefault', {
    addressId: addressId
  })
}

// 获取默认收货地址的id
export const getDefaultId = () => {
  return request.get('/address/defaultId')
}
