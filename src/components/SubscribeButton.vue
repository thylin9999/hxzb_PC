<template>
<div class="subscribe font-14 p-l-15 p-r-15 pointer" :class="{'un-subscribe': isSubscribe}">
    <span v-if="isSubscribe">✅</span>
    <span v-else>订阅</span>
</div>
</template>

<script>
export default {
    name: 'SubscribeButton',
    props: {
        hostId: {
            type: [String, Number],
            default: 1
        },
        isSubscribe: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.subscribe{
    background-color: $text-white;
    border: 1px solid $background-color1;
    color: $background-color1;
    line-height: 20px;
    border-radius: 15px;
    &.un-subscribe {
        border-color: #eee;
    }
}
</style>
