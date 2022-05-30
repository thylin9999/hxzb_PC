<template>
    <div>
        <span>login</span>
        <el-button @click="submit">点我登录</el-button>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Login',
    methods: {
        ...mapActions('user', ['login']),
        async submit () {
            const { status } = await this.login()
            if (status === 200) {
                // 登录成功
                this.$router.push({ path: '/' })
            }
        }
    }
}
</script>
<style lang="scss" scoped></style>
