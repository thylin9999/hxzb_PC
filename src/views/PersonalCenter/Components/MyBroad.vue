<template>
<div>
    <ul class="flex align-center m-l-30 p-t-10 p-b-10">
        <li
            v-for="item in menus"
            :key="item.id"
            class="pointer p-l-15 p-r-15 text-center item-type"
            :class="{'is-active': item.id === currentType}"
            @click="changeType(item)"
        >{{ item.title }}</li>
    </ul>
    <component :is="comName" :key="comName"/>
</div>
</template>

<script>
import BookLiveBroadCast from '@/views/PersonalCenter/Components/BookLiveBroadCast'
import OpenLiveBroadCast from '@/views/PersonalCenter/Components/OpenLiveBroadCast'
export default {
    name: 'MyBroad1',
    components: {
        OpenLiveBroadCast,
        BookLiveBroadCast
    },
    data () {
        return {
            menus: [
                {
                    id: 1,
                    title: '直播开播',
                    comName: 'OpenLiveBroadCast'
                },
                {
                    id: 2,
                    title: '预约直播',
                    comName: 'BookLiveBroadCast'
                }
            ],
            currentType: 1,
            comName: 'OpenLiveBroadCast'
        }
    },
    methods: {
        changeType (item) {
            this.currentType = item.id
            this.comName = item.comName
        }
    }
}
</script>

<style lang="scss" scoped>
.item-type {
    width: 150px;
    height: 40PX;
    line-height: 40px;
    border-bottom: 2px solid transparent;
    &.is-active {
        border-bottom: 2px solid #4859DE;
    }
}
</style>
