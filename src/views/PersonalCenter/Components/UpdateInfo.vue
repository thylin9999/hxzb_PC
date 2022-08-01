<template>
<div class="item flex align-center flex-column p-t-30 p-b-20">
    <div class="info flex ">
        <span
            class="icon d-inline-block bg-no-repeat bg-center bg-size-100"
            :style="{
                backgroundImage: `url(${icon})`
            }"
        ></span>
        <div class="flex flex-column m-l-20 font-18 text-333 justify-between">
            <span>{{ title }}</span>
            <span>{{ value }}</span>
        </div>
    </div>
    <component class="submit-button m-t-20 pointer font-18 text-333 font-300 d-inline-block text-center p-0" :is="comName"></component>
</div>
</template>

<script>
import DialogUpdatePassword from '@/views/PersonalCenter/Components/DialogUpdatePassword'
import DialogUpdatePhone from '@/views/PersonalCenter/Components/DialogUpdatePhone'
export default {
    name: 'UpdateInfo',
    components: {
        DialogUpdatePassword,
        DialogUpdatePhone
    },
    props: {
        type: {
            type: String,
            default: 'password'
        },
        info: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
        }
    },
    computed: {
        tip () {
            return this.type === 'phone' ? '更改手机号' : '更改密码'
        },
        comName () {
            return this.type === 'phone' ? 'DialogUpdatePhone' : 'DialogUpdatePassword'
        },
        title () {
            return this.type === 'phone' ? '我的手机' : '我的密码'
        },
        icon () {
            return this.type === 'phone' ? require('../../../assets/images/personal/lock.png') : require('../../../assets/images/personal/lock.png')
        },
        value () {
            return this.type === 'phone' ? this.info : '已设置密码'
        }
    },
    methods: {
        updateOperate () {

        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    width: 270px;
    height: 150px;
    background: #F1F2F5;
    border-radius: 3px;
    .icon {
        width: 45px;
        height: 45px;
    }
    .submit-button{
        width: 153px;
        height: 33px;
        line-height: 33px;
        border: 1px solid #333333;
        border-radius: 3px;
    }
}
</style>
