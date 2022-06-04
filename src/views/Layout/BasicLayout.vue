<template>
    <div class="h-100 basic-layout">
        <Header />
        <div class="content-section overflow-y-auto">
            <router-view class="content-router "></router-view>
            <Footer />
        </div>
    </div>
</template>
<script>
import Header from './Header.vue'
import Footer from '@/views/Layout/Footer'
import { mapState } from 'vuex'
export default {
    name: 'BasicLayout',
    components: {
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
        height: calc(100% - 80px);
        background-color: $body-bg;
        .content-router {
            min-height: calc(100% - 205px);
        }
    }
}
.flex-column {
    height: auto;
}
</style>
