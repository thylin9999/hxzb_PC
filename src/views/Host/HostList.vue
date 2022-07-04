<template>
<div class="hot-live">
    <div class="p-relative">
        <title-row icon="sport" title="全部直播" class="m-b-30">
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
                    class="m-b-25 "
                >
                    <live-broad-card
                        :info="item"
                    />
                </li>
            </ul>
            <Pagination
                class="text-center p-b-20"
                :current-page.sync="pagination.pageNumber"
                :page-size.sync="pagination.pageSize"
                :total="pagination.total"
                @loadData="fetchData"
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
            this.pagination.pageNumber = 1
            this.fetchData()
        }
    },
    methods: {
        async fetchData () {
            try {
                this.isLoading = true
                // 获取所有的直播
                const { data } = await getOnlineBroadcast(this.apiParams)
                if (data) {
                    this.pagination.total = data.total
                    this.pagination.pageNumber = data.current_page
                    this.list = data ? data.list : []
                } else {
                    this.pagination.total = 0
                    this.pagination.pageNumber = 1
                    this.list = []
                }
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
.hot-live {
    margin-top: 40px;
}
.hosts{
    &.is-home {
        li {
            margin-right: 20px;
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
