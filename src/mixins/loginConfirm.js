export default {
  methods: {
    loginConfirm () {
      // 是否需要登录确认弹出框
      // 需要：弹出确认框并返回true
      // 不需要，返回false
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '未登录',
          message: '请先登录',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {
        })
        return true
      }
      return false
    }
  }
}
