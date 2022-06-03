<template>
<div class="user font-16 font-medium">
    <div v-if="!token">
        <span class="pointer">登录</span>
        <span class="m-l-10 m-r-10">|</span>
        <span class="pointer">注册</span>
    </div>
    <div v-else>
        <div class="user-logo"></div>
        <span>用户名</span>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'UserInfos',
    data () {
        return {}
    },
    computed: {
        ...mapState('user', ['token'])
    }
}
</script>

<style scoped>

</style>
