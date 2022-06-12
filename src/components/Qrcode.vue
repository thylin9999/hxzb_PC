<template>
<div class="qrcode w-100 h-100">
    <div class="code w-100 h-100"></div>
</div>
</template>

<script>
export default {
    name: 'Qrcode'
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.qrcode {
    padding: 3px;
    background-color: $text-white;
    .code {
        background-color: #eee;
    }
}

</style>
