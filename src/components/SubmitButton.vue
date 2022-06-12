<template>
    <span class="d-inline-block pointer p-t-10 p-b-10 font-medium font-500 w-100 h-100 text-center font-16 line-height-22">{{ text }}</span>
</template>

<script>
export default {
    name: 'SubmitButton',
    props: {
        text: {
            type: String,
            default: '确定'
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
span {
    background-color: $background-color1;
    color: $text-white;
    &:hover {
        opacity: 0.7;
    }
}
</style>
