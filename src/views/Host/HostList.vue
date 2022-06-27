<template>
<div class="">
    <div class="p-relative">
        <title-row icon="sport" title="全部直播" class="m-b-30 m-t-20">
            <more-button v-if="isHome" @click.native="goToLiveBroadCast"/>
        </title-row>
        <match-types
            class="match-types p-absolute"
            :host-id.sync="hostId"
        />
    </div>
    <div class="w-100"
         v-loading="isLoading"
         element-loading-background="transparent">
        <div v-if="list.length" class="">
            <ul class="flex flex-wrap hosts" :class="{'is-home': isHome, 'is-not-home': !isHome }" >
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
            <Pagination
                class="text-center"
            />
        </div>
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
import Pagination from '@/components/Pagination'
import { getOnlineBroadcast } from '@/api/competition/competition'

export default {
    name: 'HostList',
    props: {
        isHome: {
            type: Boolean,
            default: false
        }
    },
    components: {
        TitleRow,
        MoreButton,
        LiveBroadCard,
        MatchTypes,
        Pagination
    },
    data () {
        return {
            list: [],
            hostId: 5,
            isLoading: false,
            pagination: {
                pageNumber: 1,
                pageSize: 20,
                total: 0
            }
        }
    },
    created () {
        this.fetchData()
    },
    computed: {
        apiParams () {
            return {
                pageNumber: this.pagination.pageNumber,
                pageSize: this.pagination.pageSize,
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
                const { data, total, current_page } = await getOnlineBroadcast(this.apiParams)
                this.pagination.total = total
                this.pagination.pageNumber = current_page
                this.list = data ? data.list : []
            } catch (e) {
                console.log('出错了')
            } finally {
                this.isLoading = false
            }
        },
        goToLiveBroadCast () {
            this.$router.push({
                name: 'LiveBroad'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.hosts{
    &.is-home {
        li {
            margin-right: 30px;
        }
        li:nth-child(4n) {
            margin-right: 0;
        }
    }
    &.is-not-home {
        li {
            margin-right: 25px;
        }
        li:nth-child(5n) {
            margin-right: 0;
        }
    }
}
.match-types {
    left: 200px;
    top: 5px;
}
</style>
