<template>
<div class="user font-16 font-medium " :class="{'light-background': isLightHeader}">
    <div v-if="!token" class="user-buttons font-18 font-400 text-center" :class="{'text-white': isLightHeader, 'text-333': !isLightHeader}">
        <span class="pointer" @click="openLogin">登录</span>
        <span class="">/</span>
        <span class="pointer" @click="openRegister">注册</span>
    </div>
    <div v-else class="flex align-center" :class="{'text-white': isLightHeader, 'text-333': !isLightHeader}">
        <span class="m-r-15 pointer" v-if="isAnchor" @click="openLiveCast">开播</span>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link flex align-center">
            <span class="flex align-center">
                <div
                    class="user-logo bg-center bg-size-100 bg-no-repeat"
                    :style="{
                        backgroundImage: `url(${avatarLogo})`

                    }"
                ></div>
                <span class="m-l-10 " :class="{'text-white': isLightHeader, 'text-333': !isLightHeader}">{{nickname}}</span>
            </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'UserInfos',
    props: {
        isLightHeader: {
            type: Boolean,
            default: false
        }
    },
    inject: ['reload'],
    data () {
        return {
            isHome: false
        }
    },
    computed: {
        ...mapState('user', ['token', 'nickname', 'avatar', 'is_anchor']),
        avatarLogo () {
            return this.avatar ? this.avatar : require('../../assets/images/user.png')
        },
        isAnchor () {
            return this.is_anchor === 2 // 1 非主播， 2，主播
        }
    },
    watch: {
        '$route': {
            handler () {
                this.isHome = this.$route.meta.subId === 1
            }
        },
        deep: true,
        immediate: true
    },
    methods: {
        ...mapActions('user', ['logoutAction']),
        openLogin () {
            this.openLoginDialogMixin()
        },
        openRegister () {
            this.openLoginDialogMixin()
        },
        goToUserCenter () {
            this.$router.push({
                name: 'PersonalCenter',
                params: {
                    tabId: 1
                }
            })
        },
        handleCommand (command) {
            if (command === 'userCenter') {
                this.goToUserCenter()
            } else {
                this.logoutAction()
                if (this.$route.name === 'Home') {
                    // this.reload()
                } else {
                    this.$router.push('/')
                }
            }
        },
        openLiveCast () {
            this.$router.push({
                name: 'PersonalCenter',
                params: {
                    tabId: 6
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.user-buttons {
    border-radius: 20px;
    border: 1px solid #333;
    width: 135px;
    line-height: 30px;
}
.user-logo {
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
.light-background {
    color: #333;
    .user-buttons {
        border-color: #fff;
    }
}
</style>
