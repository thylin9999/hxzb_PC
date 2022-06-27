<template>
<div class="">
    <title-row
        icon="hot"
        title="热门直播"
        class="m-b-30 m-t-20"
    />
    <div class="w-100">
        <ul class="w-100 flex justify-between align-center">
            <li
                v-for="(item, index) in list"
                :key="item.id"
            >
                <live-broad-card
                    :index="index"
                    :info="item"
                    :show-top-img="!isHome"
                />
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import TitleRow from '@/components/TitleRow'
import LiveBroadCard from '@/components/LiveBroadCard'
import { getHotBroadcast } from '@/api/competition/competition'

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
            list: [
                {
                    id: 1,
                    url: '',
                    title: '直播标题',
                    cover: 'https://cdn.podapi.com/image/live/20220511/810101297e7bf7d0418f718121cf2e2b?imageView2/2/w/600/h/600',
                    views: 10000,
                    host: {
                        name: '主播名称',
                        icon: ''
                    }
                },
                {
                    id: 2,
                    cover: 'https://cdn.podapi.com/image/live/20220511/810101297e7bf7d0418f718121cf2e2b?imageView2/2/w/600/h/600',
                    title: '直播标题',
                    views: 10000,
                    host: {
                        name: '主播名称',
                        icon: ''
                    }
                },
                {
                    id: 3,
                    cover: 'https://cdn.podapi.com/image/live/20220511/810101297e7bf7d0418f718121cf2e2b?imageView2/2/w/600/h/600',
                    title: '直播标题',
                    views: 10000,
                    host: {
                        name: '主播名称',
                        icon: ''
                    }
                },
                {
                    id: 4,
                    cover: 'https://cdn.podapi.com/image/live/20220511/810101297e7bf7d0418f718121cf2e2b?imageView2/2/w/600/h/600',
                    title: '直播标题',
                    views: 10000,
                    host: {
                        name: '主播名称',
                        icon: ''
                    }
                }
            ]
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            try {
                const { data } = await getHotBroadcast({})
                this.list = this.isHome ? data.list.slice(0, 4) : data.list
            } catch (e) {
                console.log('出粗了')
            }
        }
    }
}
</script>

<style scoped>

</style>
