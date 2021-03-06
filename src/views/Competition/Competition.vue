<template>
<div class="wrap-1200 competition-box p-t-10">
    <timer-filter
        :type.sync="competitionType"
        :time.sync="filterTime"
        @setToday="setToday"
        @choseTime="fetchData"
    />
    <div class="content w-100 p-t-10 flex">
        <div class="left-bars flex justify-center p-t-10 bg-center bg-no-repeat bg-size-100">
            <ul class="">
                <template v-for="type in matchTypes">
                    <li
                        :key="type.id"
                        @click="changeType(type)"
                        :class="{'is-active': type.id === matchType}"
                        class="flex font-16 font-regular p-relative align-center pointer m-t-20 type-item justify-center text-white"
                    >
                        <icon-png :width="21" :height="21" :icon="type.icon"/>
                        <span class="m-l-10">{{ type.title }}</span>
                    </li>
                </template>

            </ul>
        </div>
        <div class="matches h-100 m-l-10">
            <div class="title flex align-center">
                <span class="date font-500 font-medium">{{ filterTime | dateFilter}}</span>
                <template v-if="competitionType === 1">
                    <ul class="flex align-center" v-if="matchType !== 3">
                        <li
                            v-for="menu in menus"
                            :key="menu.id"
                            @click="changeMenu(menu)"
                            class="font-16 pointer menu-item text-center bg-center bg-no-repeat bg-size-100"
                            :class="{'is-active': menu.id === statusType }"
                        >
                            {{ menu.title }}
                        </li>
                    </ul>
                    <ul class="flex align-center" v-else>
                        <li
                            v-for="statusType in statusTypes"
                            :key="statusType.id"
                            @click="changeHotMatchType(statusType)"
                            class="font-16 pointer menu-item text-center bg-center bg-no-repeat bg-size-100"
                            :class="{'is-active': statusType.id === hotMatchType }"
                        >
                            {{ statusType.title }}
                        </li>
                    </ul>
                </template>
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
import TimerFilter from '@/views/Competition/TimerFilter'
import IconPng from '@/components/IconPng'
import MatchCardRect from '@/views/Competition/MatchCardRect'
import { getMatchList, getHostMatches } from '@/api/competition/competition'
import dayjs from 'dayjs'
import debounce from 'lodash.debounce'
import { mapState } from 'vuex'
export default {
    name: 'Competition',
    filters: {
        dateFilter (value) {
            let str = ''
            if (value) {
                str = dayjs(value).format('MM月DD日')
            }
            return str
        }
    },
    components: {
        TimerFilter,
        IconPng,
        MatchCardRect
    },
    data () {
        return {
            filterTime: dayjs().format('YYYY-MM-DD'),
            competitionType: 1, // 1 表示 赛程， 2 赛果
            matchType: 1, // 赛事类型 足球
            pagination: {
                total: 0,
                currentPage: 1
            },
            hotMatchType: 1, // 热门比赛的分类， 1， 进行中，2 未开始
            statusType: 1, // 赛事状态
            list: [],
            isLoading: false
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
                competitionType: this.competitionType,
                filterTime: this.filterTime,
                matchType: this.matchType,
                statusType: this.statusType,
                hotMatchType: this.hotMatchType
            }
        },
        apiParams () {
            let playing = 3000
            if (this.competitionType === 1) {
                if (this.matchType === 3) {
                    // 热门赛事
                    playing = this.hotMatchType === 1 ? 2000 : 1000
                } else {
                    if (this.matchType === 4 || this.statusType === 1) {
                        playing = 2000
                    } else {
                        playing = 1000
                    }
                }
            }
            return {
                pageNumber: 1,
                pageSize: 2000,
                leagueId: null, // 联赛id，
                // playing: this.competitionType === 1 ? ((this.matchType === 4 || this.statusType === 1) ? 2000 : 1000) : 3000,
                playing,
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
        setToday () {
            this.filterTime = dayjs().format('YYYY-MM-DD')
        },
        changeMenu (menu) {
            this.statusType = menu.id
            // this.fetchData()
        },
        changeType (type) {
            this.matchType = type.id
        },
        changeTab (tab) {
            console.log(tab, 'tab')
        },
        fetchData: debounce(async function () {
            const request = this.matchType === 3 ? getHostMatches : getMatchList
            try {
                this.isLoading = true
                const { data } = await request(this.apiParams)
                this.list = data.list ? data.list.reduce((all, item) => {
                    all.push({
                        ...item
                        // state: 1
                    })
                    return all
                }, []) : []
            } catch (e) {
                console.log('出错了')
            } finally {
                this.isLoading = false
            }
        }, 100),
        changeHotMatchType (statusType) {
            this.hotMatchType = statusType.id
        },
        updateAppointment ({ id, value }) {
            const temp = this.list.find(x => x.matchId === id)
            temp.appointment = value
            // this.fetchData()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.competition-box {
    height: 950px;
}
.tabs {
    background-color: $text-white;
}
.content {
    height: calc(100% - 137px);
    .left-bars{
        width: 245px;
        height: 100%;
        background-image: url('../../assets/images/matches/bg.png');
        .type-item{
            width: 180px;
            line-height: 55px;
            border: 1px solid #C5A26B;
            border-radius: 10px;
        }
        .type-item.is-active {
            &:after {
                position: absolute;
                content: '';
                top: 20px;
                left: calc(100% + 10px);
                width: 0;
                height: 0;
                line-height: 0;
                font-size: 0;
                border: 10px solid transparent;
                border-left-color: #C5A26B;
            }

        }
    }
    .matches {
        background-color: #E8E8E8;
        border-radius: 10px;
        padding: 26px 22px;
        width: calc(100% - 255px);
        .title {
            .date {
                margin-right: 37px;
                font-size: 30px;
                color: #343434;
            }
            .menu-item {
                width: 90px;
                height: 34px;
                line-height: 34px;
                color: #979797;
                background-image: url('../../assets/images/icons/tab.png');
                &.is-active {
                    color: $text-white;
                    background-image: url('../../assets/images/icons/tab-active.png');

                }
            }
        }
        .match-list {
            height: calc(100% - 35px);
        }
    }
}
</style>
