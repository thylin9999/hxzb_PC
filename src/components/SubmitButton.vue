<template>
    <span
        class="font-16 font-400 subscribe-button text-center font-16 pointer"
        :class="{'unsubscribe': !subscribed }"
    >{{ text }}</span>
</template>

<script>
export default {
    name: 'SubmitButton',
    props: {
        subscribed: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        text () {
            return this.subscribed ? '已订阅' : '订阅'
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.subscribe-button{
    width: 135px;
    line-height: 33px;
    border: 1px solid #05195A;
    color: #05195A;
    border-radius: 20px;
    &.unsubscribe {
        color: #6B6B6B;
        border: 1px solid #7A7A7A;
    }
}
</style>
