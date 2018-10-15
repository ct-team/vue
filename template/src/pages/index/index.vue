<template>
    <div class="wrap">
        <group>
            <x-input title="姓名"
                     placeholder="请输入姓名"
                     v-model="name"></x-input>
            <x-input title="身份证号"
                     placeholder="请输入身份证号"
                     v-model="idCard"></x-input>
            <x-input title="手机号码"
                     placeholder="请输入手机号码"
                     v-model="mobile"></x-input>
        </group>
        <div class="weui-box">
            <x-button type="primary"
                      @click.native='onSubmitHandler'>提交</x-button>
        </div>
    </div>
</template>

<script>
import { XButton, XInput } from 'vux';
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            name: '测试',
            idCard: '343422198709099876',
            mobile: '136567898089'
        };
    },
    created() {
        console.log(11111);
    },
    components: {
        XButton,
        XInput
    },
    methods: {
        onSubmitHandler() {
            const _self = this;

            this.$vux.loading.show({
                text: '提交中'
            });
            setTimeout(function() {
                _self.$vux.loading.hide();
                _self.$router.push({ path: '/result' });
            }, 2000);
        }
    }
};
</script>
<style lang="scss" scoped>
.weui-box {
    padding: 20px 15px;
}
$color: #f90;
h1 {
    background-color: $color;
    text-align: center;
    font-size: 36px;
    color: #ffffff;
}
</style>
