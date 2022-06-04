<template>
<div class="qrcode ">
    <div class="code"></div>
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
        width: 75px;
        height: 75px;
        background-color: #eee;
    }
}

</style>
