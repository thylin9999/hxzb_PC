<template>
<div class="hot-rooms">
    <title-row
        icon="hot"
        title="热门直播"
        class="m-b-30 m-t-20"
    />
    <div class="w-100"
         v-loading="isLoading"
         element-loading-background="transparent">
        <ul v-if="list.length" class="w-100 flex  align-center">
            <li
                v-for="(item, index) in list"
                :key="item.id"
                class="m-r-20"
            >
                <live-broad-card
                    :index="index"
                    :info="item"
                    :show-top-img="!isHome"
                />
            </li>
        </ul>
        <el-empty
            v-else
            :image-size="108"
            description="暂无数据" />
    </div>
</div>
</template>

<script>
import TitleRow from '@/components/TitleRow'
import LiveBroadCard from '@/components/LiveBroadCard'
import { getHotRooms } from '@/api/competition/competition'

export default {
    name: 'HotRecommend',
    props: {
        isHome: {
            type: Boolean,
            default: false
        }
    },
    components: {
        TitleRow,
        LiveBroadCard
    },
    data () {
        return {
            list: [],
            isLoading: false
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            try {
                this.isLoading = true
                const { data } = await getHotRooms({})
                // 首页展示4条，直播页面展示5条
                this.list = this.isHome ? data.list.slice(0, 4) : data.list.slice(0, 5)
            } catch (e) {
                console.log('出粗了')
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.hot-rooms {
    li:nth-child(4n) {
        margin-right: 0!important;
    }
}
</style>
