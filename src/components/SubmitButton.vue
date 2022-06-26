<template>
    <span
        class="font-16 font-400 text-center font-16 pointer"

    >{{ title }}</span>
</template>

<script>
export default {
    name: 'SubmitButton',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
span {
    line-height: 45px;
    background-color: $background-color1;
    color: $text-white;
    &:hover {
        opacity: 0.7;
    }
}
</style>
