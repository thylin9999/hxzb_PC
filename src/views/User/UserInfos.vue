<template>
<div class="user font-16 font-medium">
    <div v-if="!token">
        <span class="pointer" @click="openLogin">登录</span>
        <span class="m-l-10 m-r-10">|</span>
        <span class="pointer" @click="openRegister">注册</span>
    </div>
    <div class="flex justify-between align-center" @click="goToUserCenter" v-else>
        <div class="user-logo bg-center bg-no-repeat"></div>
        <span>{{nickname}}</span>
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
        ...mapState('user', ['token', 'nickname'])
    },
    methods: {
        openLogin () {
            this.openLoginDialog()
        },
        openRegister () {
            this.openLoginDialog()
        },
        goToUserCenter () {
            this.$router.push({
                name: 'PersonalCenter'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.user-logo {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-image: url('../../assets/images/user.png');
    background-size: contain;
}
</style>
