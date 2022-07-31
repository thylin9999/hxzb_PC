<template>
<div class="user-header p-t-25 p-b-25 flex  align-center p-l-25 p-r-20">
    <div class="icon m-r-15 bg-no-repeat bg-center bg-size-100" :style="{
            backgroundImage: `url(${bgImg})`
        }"></div>
    <div class="info">
        <span class="font-18 font-500 text-333">
            <custom-span :content="nickname" />
        </span>
        <div class="id m-t-15 flex align-center font-14 font-500 justify-between">
            <div>
                ID: <span>{{ id }}</span>
            </div>
            <span class="pointer " @click="copy">复制</span>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import CustomSpan from '@/components/CustomSpan'
import { Copy } from '@/utils/validator'

export default {
    name: 'UserHeader',
    components: {
        CustomSpan
    },
    computed: {
        ...mapState('user', ['nickname', 'id', 'avatar']),
        bgImg () {
            return this.avatar ? this.avatar : require('../../../assets/images/user.png')
        }
    },
    methods: {
        copy () {
            Copy(this.id)
        }
    }
}
</script>

<style lang="scss" scoped>
.user-header {
    border-bottom: 1px solid #F1F2F5;
}
.info {
    width: calc(100% - 75px);
    .id {
        color: #7F7F7F;
    }
}
.icon {
    width: 60px;
    height: 60px;
    border-right: 3px;
}
</style>
