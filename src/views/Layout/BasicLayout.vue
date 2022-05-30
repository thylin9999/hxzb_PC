<template>
    <div class="h-100 basic-layout">
        <Header v-if="token" />
        <div class="justify-between d-flex h-100">
            <left-menu v-if="token" />
            <div class="d-flex flex-column flex-1 overflow-auto">
                <router-view class="flex-1 overflow-y-auto"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import LeftMenu from './LeftMenu.vue'
// import Breadcrumb from './Breadcrumb.vue'
import Header from './Header.vue'
import { mapState } from 'vuex'
export default {
    name: 'BasicLayout',
    components: {
        LeftMenu,
        Header
    },
    computed: {
        ...mapState('user', ['token', 'userName'])
    }
}
</script>
<style lang="scss" scoped>
.basic-layout {
    //width:
}
.flex-column {
    height: auto;
}
</style>
