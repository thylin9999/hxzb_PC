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
        <div class="tree-menus p-b-25">
            <TreeMenus />
        </div>
        <div class="footer-buttons font-regular text-center m-t-25 m-b-30 font-16 font-500 text-white">
            <span class="btn d-inline-block pointer">下载应用</span>
            <span class="btn apply-host d-inline-block pointer m-t-10">申请直播</span>
            <div class="info flex align-center p-l-25 p-r-25 m-t-15">
                <span class="live-broad flex-1">直播咨询</span>
                <span class="question flex-1">问题咨询</span>
            </div>
        </div>
    </div>
    <div class="right-content h-100 p-t-20 p-r-30 m-l-30">
        <component :is="com" />
    </div>
</div>
</template>

<script>
import MyLiveHost from '@/views/Host/MyLiveHost'
import MyFavorite from '@/views/Host/Components/MyFavorite'
import TreeMenus from '@/components/TreeMenus'
export default {
    name: 'HostIndex',
    components: {
        MyLiveHost,
        MyFavorite,
        TreeMenus
    },
    data () {
        return {
            categoryId: 1,
            categories: [
                {
                    id: 1,
                    label: '全部直播',
                    icon: 'live-broad',
                    com: 'MyLiveHost'
                },
                {
                    id: 2,
                    label: '我的关注',
                    icon: 'my-favorite',
                    com: 'MyFavorite'
                }
            ],
            com: 'MyLiveHost'
        }
    },
    methods: {
        changeCategory (category) {
            this.categoryId = category.id
            this.com = category.com
        }
    }
}
</script>

<style lang="scss" scoped>
.left-menus {
    width: 350px;
    .categories {
        border-top: 1px solid #F1F2F5;
        border-bottom: 1px solid #F1F2F5;
    }
    .category {
        line-height: 44px;
        padding: 10px 45px;
        &.is-active {
            span{
                color: #506EFF;
            }
        }
    }
    .tree-menus{
        border-bottom: 1px solid #F1F2F5;
        height: calc(100% - 310px);
        min-height: 500px;
        overflow-y: auto;
    }
    .footer-buttons {
        .btn{
            width: 300px;
            height: 40px;
            line-height: 40px;
            background: #FB7674;
            border-radius: 10px;
        }
        .apply-host {
            background: linear-gradient(0deg, #3B5FFF, #A2B3FF);
        }
        .info {
            color: #ccc;
        }
        .live-broad{
            border-right: 1px solid #F1F2F5;
        }
    }

}
.right-content {
    width: calc(100% - 380px);
}

.live-broad-cast {
    height: calc(100vh - 245px);
}
::v-deep {
    .live-broad-cast {
        .left-list {
           padding: 30px 0 ;
        }
    }
}
</style>
