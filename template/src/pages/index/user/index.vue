<template>
  <div id="user-index">
    <!-- top-header -->
    <top-header></top-header>

    <!-- list -->
    <div class="list"
         v-for="(item, index) in userList"
         :key="index">
      <span>ID：{{item.UserId}}，</span>
      <span>昵称：{{item.UserName}}</span>
    </div>
  </div>
</template>

<script>
import ajaxUserList from '@/api/module/user-list.js';
export default {
    props: [],
    components: {},
    data() {
        return {
            userList: []
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const self = this;

            ajaxUserList(self, {
                data: {},
                beforeSend() {
                    self.$vux.loading.show();
                },
                complete() {
                    self.$vux.loading.hide();
                },
                interceptError(res) {
                    console.log('自定义拦截器内容');
                }
            }).then(res => {
                if (res.Code === self.$natCode.success) {
                    this.userList = res.Data.List;
                    console.log('处理用户数据', this.userList);
                } else if (res.Code === self.$natCode.notLogin) {
                    const _msg = this.$natCodeMsg.notLogin;

                    console.log(_msg);
                    console.log('处理未登录的操作');
                } else {
                    const _msgError = this.$natCodeError(res.Code);

                    console.log(_msgError);
                    console.log('处理code未约定以及可能不存在通用操作');
                }
            });
        }
    }
};
</script>

<style lang='scss'>
#user-index {
  .list {
    margin: 0 40px;
    padding: 20px 0;
    color: #323233;
    font-size: 28px;
    background-color: #fafafa;
    margin-bottom: 20px;
    padding-left: 40px;
  }
}
</style>
