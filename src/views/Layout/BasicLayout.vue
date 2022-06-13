<template>
    <div class="h-100 basic-layout">
        <Header />
        <div class="content-section">
            <router-view class="content-router "></router-view>
        </div>
        <Footer />
        <login />
    </div>
</template>
<script>
import Header from './Header.vue'
import Footer from '@/views/Layout/Footer'
import Login from '@/views/User/Login'
import { mapState, mapMutations } from 'vuex'
import { getItem } from '@/utils/cookie'

export default {
    name: 'BasicLayout',
    components: {
        Header,
        Footer,
        Login
    },
    computed: {
        ...mapState('user', ['token', 'userName'])
    },
    created () {
        const userInfo = getItem('userInfo')
        if (userInfo) {
            this.SET(JSON.parse(userInfo))
        }
    },
    methods: {
        ...mapMutations('user', ['SET'])
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.basic-layout {
    .content-section {
        min-height: calc(100% - 285px);
        //background-color: $body-bg;
    }
}
.flex-column {
    height: auto;
}
</style>
