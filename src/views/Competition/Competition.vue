<template>
<div class="wrap-1200 flex competition-box p-t-10">
    <div class="left-menus w-100 h-100 bg-white">
        <div class="types p-b-10 p-t-10 w-100">
            <div
                class="type pointer w-100 flex align-center"
                :class="{
                    'is-active': competitionTypeId === competitionType.id
                }"
                @click="changeCategory(competitionType)"
                v-for="competitionType in  competitionTypes" :key="competitionType.id">
                <svg-icon class="icon-20" :icon-class="competitionType.icon"></svg-icon>
                <span class="font-16 text-333 font-500">{{ competitionType.label }}</span>
            </div>
        </div>
        <div class="tree-menus p-b-25">
            <TreeMenus />
        </div>
    </div>
    <div class="content flex flex-column flex m-l-10">
        <TimerFilter :time.sync="filterTime" />
        <div class="matches w-100 bg-white m-t-15 p-t-20 ">
            <div class="title flex align-center m-l-30 p-l-10">
                <span class="date font-500 font-medium">{{ filterTime | dateFilter}}</span>
            </div>
            <div class="match-list w-100 m-t-20 overflow-y-auto"
                 v-loading="isLoading"
                 element-loading-background="transparent"
            >
                <ul v-if="showData.length">
                    <li
                        v-for="item in showData"
                        :key="item.id"
                    >
                        <match-card-rect
                            :match="item"
                            :is-finish="competitionType===2"
                            @refresh="fetchData"
                        />
                    </li>
                </ul>
                <el-empty
                    class="h-100"
                    v-else
                    :image-size="108"
                    description="暂无数据" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import TreeMenus from '@/components/TreeMenus'
import TimerFilter from '@/views/Competition/TimerFilter'
import MatchCardRect from '@/views/Competition/Components/MatchCardRect'
import { getMatchList } from '@/api/competition/competition'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import { statusCode } from '@/utils/statusCode'
export default {
    name: 'Competition',
    filters: {
        dateFilter (value) {
            let str = ''
            if (value) {
                str = dayjs(value).format('MM-DD')
            }
            return str
        }
    },
    components: {
        TreeMenus,
        TimerFilter,
        MatchCardRect
    },
    data () {
        return {
            filterTime: dayjs().format('YYYY-MM-DD'),
            matchType: 1, // 赛事类型 足球
            pagination: {
                total: 0,
                currentPage: 1
            },
            hotMatchType: 1, // 热门比赛的分类， 1， 进行中，2 未开始
            statusType: 1, // 赛事状态
            list: [],
            isLoading: false,
            competitionType: 1,

            competitionTypeId: 1,
            competitionTypes: [
                {
                    id: 1,
                    label: '全部赛程',
                    icon: 'football'
                },
                {
                    id: 2,
                    label: '我的预约',
                    icon: 'calender'
                }
            ]
        }
    },
    computed: {
        ...mapState('commonData', ['competitionTabs', 'matchTypes']),
        isToday () {
            return dayjs(this.filterTime).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
        },
        menus () {
            const list = [{
                id: 2,
                title: '全部赛事'
            }]
            if (this.isToday && this.competitionType === 1) {
                list.unshift({
                    id: 1,
                    title: '进行中'
                })
            }
            return list
        },
        statusTypes () {
            const list = [
                {
                    id: 2,
                    title: '未开始'
                }
            ]
            if (this.isToday && this.competitionType === 1) {
                list.unshift({
                    id: 1,
                    title: '进行中'
                })
            }
            return list
        },
        fetchDataParams () {
            return {
                competitionType: this.competitionTypeId,
                filterTime: this.filterTime,
                matchType: this.matchType,
                statusType: this.statusType,
                hotMatchType: this.hotMatchType
            }
        },
        apiParams () {
            return {
                pageNumber: 1,
                pageSize: 2000,
                leagueId: null, // 联赛id，
                // playing: this.competitionType === 1 ? ((this.matchType === 4 || this.statusType === 1) ? 2000 : 1000) : 3000,
                playing: 1000,
                leagueType: this.matchType === 4 ? null : this.matchType, // 赛事分类，足球，篮球等
                day: this.filterTime
            }
        },
        showData () {
            // return this.matchType === 3
            //     ? this.list.filter(x => {
            //         return x.state === this.hotMatchType - 2 // 未开
            //     })
            //     : this.list
            return this.list
        }
    },
    watch: {
        fetchDataParams: {
            handler () {
                this.fetchData()
            },
            deep: true,
            immediate: true
        },
        isToday: {
            handler () {
                this.statusType = this.menus[0].id
                this.hotMatchType = this.statusTypes[0].id
                // this.fetchData()
            },
            immediate: true
        }
    },

    methods: {
        changeCategory (type) {
            this.competitionTypeId = type.id
        },
        async fetchData () {
            try {
                const { data, code } = await getMatchList({
                    pageNumber: 1,
                    pageSize: 20,
                    leagueId: null,
                    playing: 1000,
                    leagueType: null
                })
                if (code === statusCode.success) {
                    this.list = data.list.reduce((all, item) => {
                        all.push({
                            ...item
                        })
                        return all
                    }, [])
                }
            } catch (e) {
                console.log('出错了')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.left-menus {
    width: 350px;
    .types {
        border-top: 1px solid #F1F2F5;
        border-bottom: 1px solid #F1F2F5;
    }
    .type {
        line-height: 20px;
        padding: 10px 30px;
        &.is-active {
            span{
                color: #506EFF;
            }
        }
    }
}
.content {
    width: calc(100% - 360px);
    .matches {
        height: calc(100% - 120px);
        .title {
            border-left: 5px solid #3E62FF;
            line-height: 20px;
            height: 20px;
            border-radius: 3px;
            color: #3F62FF;
        }
    }
}
</style>
