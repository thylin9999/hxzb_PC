<template>
<div class="box flex align-center ">
    <span class="hot-image bg-center bg-no-repeat"
        :style="{'backgroundImage': `url(${hostInfo.img})`}"
    ></span>
    <div class="right-section m-l-5">
        <span class="host-name font-16 line-height-22 font-regular text-333">{{ hostInfo.name }}</span>
        <div class="subscribes">
<!--            <svg-icon icon-class="start"></svg-icon>-->
            <span class="font-12 font-medium text-gray">{{ hostInfo.subscribe }}</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'HostCard',
    props: {
        hostInfo: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 165px;
}
.hot-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
