<template>
    <div class="h-100 basic-layout">
        <Header />
        <div class="content-section" :class="{'is-not-home': !isHome}">
            <router-view class="content-router "></router-view>
        </div>
        <Footer />
        <SideBar />
    </div>
</template>
<script>
import Header from './Header.vue'
import Footer from '@/views/Layout/Footer'
import { mapState, mapMutations } from 'vuex'
import { getItem } from '@/utils/cookie'
import SideBar from '@/views/Layout/SideBar'
export default {
    name: 'BasicLayout',
    components: {
        Header,
        Footer,
        SideBar
    },
    data () {
        return {
            isHome: false
        }
    },
    computed: {
        ...mapState('user', ['token'])
    },
    watch: {
        '$route': {
            handler () {
                const userInfo = getItem('userInfo')
                if (userInfo) {
                    this.SET(JSON.parse(userInfo))
                }
                this.isHome = this.$route.meta.subId === 1
            }
        },
        deep: true,
        immediate: true
    },
    created () {
        const userInfo = getItem('userInfo')
        if (userInfo) {
            this.SET(JSON.parse(userInfo))
        }
        this.isHome = this.$route.meta.subId === 1
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
        min-height: calc(100% - 245px);
        &.is-not-home {
            background-color: $background-gray2;
        }
    }
}
.flex-column {
    height: auto;
}
</style>
