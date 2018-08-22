<template>
    <div class="resuletCon">
        <group>
            <cell title="收藏"
                  is-link></cell>
            <cell title="相册"
                  is-link></cell>
            <cell title="卡包"
                  is-link></cell>
            <cell title="表情"
                  is-link></cell>
        </group>
        <div>
            <img :src="testImgUrl"
                 alt=""
                 class="img">
        </div>
    </div>

</template>

<script>
import getImgSrc from '../../assets/js/image-check.js';
import testImg from '../../assets/img/test.png';
export default {
    data() {
        return {
            testImgUrl: getImgSrc.getImgSrc(testImg)
        };
    }
};
</script>
<style lang="scss" scoped>
div .img {
    display: block;
    width: 300px;
    height: auto;
}
h2 {
    color: #123123;
}
</style>
