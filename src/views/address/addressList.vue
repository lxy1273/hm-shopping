<template>
  <div>
    <div class="address-list">
      <van-nav-bar fixed title="收货地址" left-arrow @click-left="$router.go(-1)" />
      <van-address-list v-model="chosenAddressId" :list="addressList" @add="onAdd" @edit="onEdit" @select="changeAddress"/>
    </div>
    <div class="address-edit">
      <van-dialog v-model="show" title="地址编辑" confirm-button-text="( Q A Q )">
        <van-address-edit
        :address-info="addressEditInfo"
        :area-list="areaList"
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"/>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { getAddress, addAddress, addressEdit, addressRemove, getDefaultId, addressSetDefault } from '@/api/address'
export default {
  data () {
    return {
      chosenAddressId: '',
      addressList: [
      ],
      // 地址编辑弹出窗flag
      show: false,
      // 地址编辑地区列表
      areaList,
      addressEditInfo: {}
    }
  },
  computed: {
  },
  methods: {
    // 编辑完毕，页面更新，状态恢复，弹窗数据重置，由于多次使用，进行封装
    dialogReset () {
      this.show = false
      this.getAddressList()
      this.getAddressDefaultId()
      this.addressEditInfo = {}
    },
    // 地址列表-新增地址
    onAdd () {
      this.addressEditInfo = undefined
      this.show = true
    },
    // 地址列表-编辑地址
    onEdit (item, index) {
      this.addressEditInfo = this.addressList[index]
      this.show = true
    },
    // 编辑弹窗-编辑地址保存,content为表单内容
    onSave (content) {
      console.log('编辑')
      // flag等于0，标志着该保存为新增地址
      if (this.addressEditInfo === undefined) {
        const { name, tel, addressDetail } = content
        this.addAddressInfo(name, tel, addressDetail)
      } else {
        // flag等于1，标志着该保存为修改地址
        this.addressInfoEdit(content.id, content.name, content.tel, content.addressDetail)
      }
      // 设置默认地址
      if (content.isDefault === true) {
        this.addressSetDefault(content.id)
      }
      this.dialogReset()
    },
    // 编辑弹窗-删除地址
    onDelete (content) {
      this.addressDelete(content.id)
      this.dialogReset()
    },
    changeAddress (item) {
      addressSetDefault(item.id)
      this.dialogReset()
    },
    // 获取所有的地址信息
    async getAddressList () {
      const { data } = await getAddress()
      this.addressList = data.list.map((item) => {
        const res = {}
        res.id = item.address_id
        res.name = item.name
        res.tel = item.phone
        res.city = item.region.city
        res.province = item.region.province
        res.county = item.region.region
        res.address = item.region.province + item.region.city + item.region.region + item.detail
        res.addressDetail = item.detail
        if (item.address_id === this.chosenAddressId) {
          res.isDefault = true
        } else {
          res.isDefault = false
        }
        return res
      })
    },
    // 新增地址api调用
    async addAddressInfo (name, phone, detail) {
      await addAddress(name, phone, detail)
    },
    // 修改地址
    async addressInfoEdit (addressId, name, phone, detail) {
      await addressEdit(addressId, name, phone, detail)
    },
    // 删除地址
    async addressDelete (addressId) {
      await addressRemove(addressId)
    },
    // 获取默认地址
    async getAddressDefaultId () {
      const { data } = await getDefaultId()
      this.chosenAddressId = data.defaultId
    },
    // 设置默认地址
    async addressSetDefault (addressId) {
      await addressSetDefault(addressId)
    }
  },
  created () {
    this.getAddressDefaultId()
    this.getAddressList()
  }
}
</script>

<style lang="less" scoped>
.address-list {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
