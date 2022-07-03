<template>
<div class="user font-16 font-medium light-background" :class="{'light-background': isLightHeader}">
    <div v-if="!token" class="user-buttons font-20 font-400 text-center">
        <span class="pointer" @click="openLogin">登录</span>
        <span class="">/</span>
        <span class="pointer" @click="openRegister">注册</span>
    </div>
    <div v-else class="flex align-center">
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
                <span class="m-l-10 text-white" :class="{'text-white': isLightHeader}">{{nickname}}</span>
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
    data () {
        return {}
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
    methods: {
        ...mapActions('user', ['logoutAction']),
        openLogin () {
            this.openLoginDialog()
        },
        openRegister () {
            this.openLoginDialog()
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
                this.$router.push('/')
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
    color: #FCFFA7;
    border-radius: 20px;
    border: 1px solid #FCFFA7;
    width: 135px;
    line-height: 40px;
}
.user-logo {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    //background-image: url('../../assets/images/user.png');
    //background-size: contain;
}
.light-background {
    color: $text-white;
}
</style>
