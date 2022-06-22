<template>
<div class="header flex align-center">
    <span class="icon bg-no-repeat bg-center bg-size-100" :style="{ backgroundImage: `url(${iconBg})`}"></span>
    <span class="font-500 m-l-10 text-333 d-inline-block font-30">{{ title }}</span>
</div>
</template>

<script>
export default {
    name: 'TitleRow',
    props: {
        title: {
            type: String,
            default: '22222'
        },
        icon: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconBg () {
            return require(`../assets/images/icons/${this.icon}.png`)
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    line-height: 40px;
}
.icon {
    width: 35px;
    height: 40px;
}
</style>
