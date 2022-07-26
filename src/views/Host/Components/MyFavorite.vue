<template>
    <div class="my-host">
        <div class="w-100 ">
            <title-row icon="all-broad" title="未开播" class="m-b-30" />
            <OfflineHosts />
        </div>
        <div class="p-relative m-t-20">
            <title-row icon="all-broad" title="正在开播" class="m-b-30" />

        </div>
        <div class="w-100"
             v-loading="isLoading"
             element-loading-background="transparent">
            <div v-if="matches.length" class="">
                <ul class="flex flex-wrap hosts"  >
                    <li
                        v-for="item in matches"
                        :key="item.id"
                        class="m-b-25 card-item"
                    >
                        <live-broad-card
                            :info="item"
                        />
                    </li>
                </ul>
            </div>
            <el-empty
                v-else
                :image-size="108"
                description="暂无数据" />
        </div>
    </div>
</template>

<script>
import LiveBroadCard from '@/components/LiveBroadCard'
import TitleRow from '@/components/TitleRow'
import OfflineHosts from '@/views/Host/Components/OfflineHosts'
import { getOnlineBroadcast } from '@/api/competition/competition'

export default {
    name: 'MyFavorite',
    components: {
        OfflineHosts,
        LiveBroadCard,
        TitleRow
    },
    data () {
        return {
            matches: [],
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
                const { data } = await getOnlineBroadcast({
                    type: 1 // 足球
                })
                this.matches = data.list
            } catch (e) {
                console.log('出错了')
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card-item {
    margin-right: 10px;
}
</style>
