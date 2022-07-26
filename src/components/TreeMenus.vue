<template>
<ul class="menu-tree">
    <li class="menu p-t-25 p-b-25 pointer transition-3"
        v-for="menu in menus"
        :key="menu.id"
        :class="{
            'is-active': menu.isOpen
        }"
    >
        <div class="content w-100 flex justify-between align-center">
            <div class="">
                <span class="icon d-inline-block"></span>
                <span class="font-16">{{ menu.label}}</span>
            </div>
            <span class="open-icon" @click="menu.isOpen = !menu.isOpen">下拉</span>
        </div>
        <Leagues v-if="![3,4].includes(menu.id) && menu.isOpen" :type="menu.id" />
    </li>
</ul>
</template>

<script>
import Leagues from '@/components/Leagues'
export default {
    name: 'TreeMenus',
    components: {
        Leagues
    },
    data () {
        return {
            menus: [
                {
                    id: 1,
                    label: '足球',
                    icon: 'football',
                    isOpen: false
                },
                {
                    id: 2,
                    label: '篮球',
                    icon: 'basketball',
                    isOpen: false
                },
                {
                    id: 3,
                    label: '电竞',
                    icon: 'eSport',
                    isOpen: false
                },
                {
                    id: 4,
                    label: '其他',
                    icon: 'other',
                    isOpen: false
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.menu-tree {
    .menu {
        padding-left: 45px;
        height: 20px;
        color: #7990FF;
        &.is-active {
            height: fit-content;
        }
    }
    .content {
        padding-right: 45px;
        .icon {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
