<template>
<div class="live-broad-cast flex ">
    <div class="left-menus w-100 h-100 bg-white">
        <div class="categories w-100">
            <div
                class="category pointer w-100 flex align-center"
                :class="{
                    'is-active': categoryId === category.id
                }"
                @click="changeCategory(category)"
                v-for="category in  categories" :key="category.id">
                <svg-icon class="icon-20" :icon-class="category.icon"></svg-icon>
                <span class="font-16 text-333 font-500">{{ category.label }}</span>
            </div>
        </div>
    </div>
    <div class="right-content p-t-20 m-l-30">
        <div class="w-100 p-l-15 p-r-15">
            <MatchListRow class="w-100" />
        </div>
        <hot-recommend class="w-100"/>
        <host-list class=""/>
    </div>
</div>
</template>

<script>
import MatchListRow from '@/views/Competition/MatchListRow'
import HotRecommend from '@/components/HotRecommend'
import HostList from '@/views/Host/HostList'
export default {
    name: 'HostIndex',
    components: {
        MatchListRow,
        HotRecommend,
        HostList
    },
    data () {
        return {
            categoryId: 1,
            categories: [
                {
                    id: 1,
                    label: '全部直播',
                    icon: 'live-broad'
                },
                {
                    id: 2,
                    label: '我的关注',
                    icon: 'my-favorite'
                },
                {
                    id: 3,
                    label: '我的预约',
                    icon: 'my-booked'
                }
            ]
        }
    },
    methods: {
        changeCategory (category) {
            this.categoryId = category.id
        }
    }
}
</script>

<style lang="scss" scoped>
.left-menus {
    width: 350px;
    padding: 25px 0 25px 45px;
    .category {
        line-height: 44px;
        &.is-active {
            span{
                color: #506EFF;
            }
        }
    }
}
.right-content {
    width: calc(100% - 380px);
}
::v-deep {
    .live-broad-cast {
        .left-list {
           padding: 30px 0 ;
        }
    }
}
</style>
