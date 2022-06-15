<template>
<div class="header p-t-25 p-b-25 p-l-30">
    <span class="font-22 font-medium text-333">{{ title }}</span>
</div>
</template>

<script>
export default {
    name: 'HeaderTitle',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    line-height: 30px;
    border-bottom: 1px solid #F0F0F0;
}
</style>
