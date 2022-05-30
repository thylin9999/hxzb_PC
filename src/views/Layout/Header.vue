<template>
    <div class=" header flex justify-between align-center">
        <div class="logo">

        </div>
        <div class="user-menu">
          <span class="p-r-10 d-inline-block vertical-middle">
            <svg-icon icon-class="admin" />
          </span>
          <span>{{ userName }}</span>
        </div>
        <div>
            <span @click="changeTheme">修改主题</span>
        </div>
        <div>
            <h3 @click="changeLang">修改语言</h3>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { getLang, setLang, getItem, setItem } from '../../utils/cookie'

export default {
    name: 'Header',
    data () {
        return {
            options: [
                {
                    text: 'admin'
                },
                {
                    text: '切换语言',
                    event: this.changeLang
                },
                {
                    text: '切换皮肤',
                    event: this.changeTheme
                },
                {
                    text: '退出',
                    event: this.logout
                }
            ]
        }
    },
    computed: {
        ...mapState('user', ['userName'])
    },
    methods: {
        ...mapActions('user', ['logoutAction']),
        logout () {
            this.logoutAction()
            this.$nextTick(() => {
                this.$router.push({
                    // 退出后进入 登录页
                    name: 'login'
                })
            })
        },
        changeLang () {
            const currentLang = getLang() === 'zh' ? 'en' : 'zh'
            setLang(currentLang)
            this.$i18n.locale = currentLang
        },
        changeTheme () {
            const theme = getItem('theme') || 'default'
            const currentTheme = theme === 'default' ? 'mauve' : 'default'
            setItem('theme', currentTheme)
            document.documentElement.className = `theme-${currentTheme}`
        },
        command (cb) {
            cb()
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
svg {
    width: 20px;
    height: 20px;
}
.header{
    height: 60px;
    background-color: $primary-color;
}
.logo{
    min-width: 100px;
    background-color: #fff;
    height: 40px;
    margin-left: 50px;
}
.user-menu{
    width: 180px;
    color: #fff;
}
</style>
