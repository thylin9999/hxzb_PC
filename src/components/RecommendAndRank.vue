<template>
    <div class="p-t-30">
        <div class="host-recommend w-100 m-b-20">
            <title-row class="title-icon" icon="hot" title="直播推荐" />

            <div class="competition-list  m-t-15">
                <ul class="w-100 flex flex-wrap" v-if="list.length">
                    <li
                        class="m-r-25 p-t-15 p-b-15"
                        v-for="host in list"
                        :key="host.id"
                    >
                        <live-broad-card
                            :info="host"
                        />
                    </li>
                </ul>
                <el-empty
                    v-else
                    :image-size="108"
                    description="暂无数据" />
            </div>
        </div>
    </div>
</template>

<script>
import TitleRow from '@/components/TitleRow'
import LiveBroadCard from '@/components/LiveBroadCard'
import { getOnlineBroadcast } from '@/api/competition/competition'

export default {
    name: 'RecommendAndRank',
    components: {
        TitleRow,
        LiveBroadCard
    },
    data () {
        return {
            list: [],
            castId: 1
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        changeBroadcastType () {
            this.fetchData()
        },
        async fetchData () {
            try {
                const { data } = await getOnlineBroadcast({})
                this.list = data.list
            } catch (e) {
                console.log('出错了')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';

::v-deep {
    .title-icon{
        .icon {
            width: 36px;
            height: 39px;
        }
    }
}
</style>
