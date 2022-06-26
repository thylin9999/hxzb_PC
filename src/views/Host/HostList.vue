<template>
<div class="wrap-1450">
    <div class="p-relative">
        <title-row icon="sport" title="全部直播" class="m-b-30 m-t-20">
            <more-button />
        </title-row>
        <match-types
            class="match-types p-absolute"
            :host-id.sync="hostId"
        />
    </div>
    <div class="w-100"
         v-loading="isLoading"
         element-loading-background="transparent">
        <ul class="flex flex-wrap hosts" v-if="list.length">
            <li
                v-for="item in list"
                :key="item.id"
                class="m-b-30"
            >
                <live-broad-card
                    :info="item"
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
import MoreButton from '@/components/MoreButton'
import LiveBroadCard from '@/components/LiveBroadCard'
import MatchTypes from '@/views/components/MatchTypes'
import { getOnlineBroadcast } from '@/api/competition/competition'

export default {
    name: 'HostList',
    components: {
        TitleRow,
        MoreButton,
        LiveBroadCard,
        MatchTypes
    },
    data () {
        return {
            list: [],
            hostId: 5,
            isLoading: false
        }
    },
    created () {
        this.fetchData()
    },
    computed: {
        apiParams () {
            return {
                pageNumber: 1,
                pageSize: 20,
                type: this.hostId * 1 === 5 ? null : this.hostId // 赛事类型
            }
        }
    },
    watch: {
        hostId () {
            this.fetchData()
        }
    },
    methods: {
        async fetchData () {
            try {
                this.isLoading = true
                // 获取所有的直播
                const { data } = await getOnlineBroadcast(this.apiParams)
                console.log(data, 'data')
                this.list = data ? data.list : []
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
.hosts{
    li {
        margin-right: 30px;
    }
    li:nth-child(4n) {
        margin-right: 0;
    }
}
.match-types {
    left: 200px;
    top: 5px;
}
</style>
