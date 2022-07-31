<template>
    <el-button
        class="font-16 font-400 text-center font-16 pointer"
        :disabled="disabled"
        :loading="loading"
    >{{ title }}</el-button>
</template>

<script>
export default {
    name: 'SubmitButton',
    props: {
        title: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.el-button {
    line-height: 45px;
    background: $background-color1!important;
    color: $text-white!important;
    padding: 0!important;
    &:hover {
        opacity: 0.7;
    }
}
</style>
