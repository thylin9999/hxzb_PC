<template>
    <div class="h-100 basic-layout">
        <Header />
        <div class="justify-between content-section d-flex h-100">
            <left-menu v-if="token" />
            <div class="d-flex flex-column flex-1 overflow-auto">
                <router-view class="flex-1 overflow-y-auto"></router-view>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script>
import LeftMenu from './LeftMenu.vue'
import Header from './Header.vue'
import Footer from '@/views/Layout/Footer'
import { mapState } from 'vuex'
export default {
    name: 'BasicLayout',
    components: {
        LeftMenu,
        Header,
        Footer
    },
    computed: {
        ...mapState('user', ['token', 'userName'])
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.basic-layout {
    .content-section {
        height: calc(100% - 285px);
        background-color: $body-bg;
    }
}
.flex-column {
    height: auto;
}
</style>
