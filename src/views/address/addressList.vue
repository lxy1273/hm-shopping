<template>
  <div>
    <div class="address-list">
      <van-nav-bar fixed title="收货地址" left-arrow @click-left="$router.go(-1)" />
      <van-address-list v-model="chosenAddressId" :list="addressList" @add="onAdd" @edit="onEdit" />
    </div>
    <div class="address-edit">
      <van-dialog v-model="show" title="地址编辑">
        <van-address-edit :address-info="addressEditInfo" :area-list="areaList" show-delete show-set-default
          :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { getAddress, addAddress, addressEdit, addressRemove } from '@/api/address'
export default {
  data () {
    return {
      chosenAddressId: '1',
      flag: 0,
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
    // 页面更新，状态恢复，弹窗数据重置，由于多次使用，进行封装
    dialogReset () {
      this.show = false
      this.getAddressList()
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
      // flag等于0，标志着该保存为新增地址
      if (this.addressEditInfo === undefined) {
        const { name, tel, addressDetail } = content
        this.addAddressInfo(name, tel, addressDetail)
        this.dialogReset()
      } else {
        // flag等于1，标志着该保存为修改地址
        this.addressInfoEdit(content.id, content.name, content.tel, content.addressDetail)
        this.dialogReset()
      }
    },
    // 编辑弹窗-删除地址
    onDelete (content) {
      this.addressDelete(content.id)
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
        res.county = item.region.county
        res.address = item.region.province + item.region.city + item.region.region + item.detail
        res.addressDetail = item.detail
        return res
      })
    },
    async addAddressInfo (name, phone, detail) {
      await addAddress(name, phone, detail)
    },
    async addressInfoEdit (addressId, name, phone, detail) {
      await addressEdit(addressId, name, phone, detail)
    },
    async addressDelete (addressId) {
      await addressRemove(addressId)
    }
  },
  created () {
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
