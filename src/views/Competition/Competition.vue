<template>
<div class="wrap-1450 competition-box p-t-30">
    <timer-filter
        :type.sync="competitionType"
        :time.sync="filterTime"
    />
    <div class="content w-100 p-t-15 flex">
        <div class="left-bars flex justify-center p-t-10 bg-center bg-no-repeat bg-size-100">
            <ul class="">
                <li
                    v-for="type in matchTypes"
                    :key="type.id"
                    @click="changeType(type)"
                    :class="{'is-active': type.id === matchType}"
                    class="flex font-16 font-regular p-relative align-center pointer m-t-20 type-item justify-center text-white"
                >
                    <icon-png :width="21" :height="21" :icon="type.icon"/>
                    <span class="m-l-10">{{ type.title }}</span>
<!--                    <span>12场</span>-->
                </li>
            </ul>
        </div>
        <div class="matches h-100">
            <div class="title flex align-center">
                <span class="date font-500 font-medium">{{ filterTime | dateFilter}}</span>
                <ul class="flex align-center">
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
            </div>
            <div class="match-list w-100 m-t-20 overflow-y-auto"
                 v-loading="isLoading"
                 element-loading-background="transparent"
            >
                <ul v-if="list.length">
                    <li
                        v-for="item in list"
                        :key="item.id"
                    >
                        <match-card-rect
                            :match="item"
                            :is-finish="competitionType===2"
                            @updateAppointment="updateAppointment"
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
</div>
</template>

<script>
import TimerFilter from '@/views/Competition/TimerFilter'
import IconPng from '@/components/IconPng'
import MatchCardRect from '@/views/Competition/MatchCardRect'
import { getMatchList, getHostMatches } from '@/api/competition/competition'
import dayjs from 'dayjs'
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
            // if (this.isToday && this.competitionType === 1) {
            //     list.unshift({
            //         id: 1,
            //         title: '正在直播'
            //     })
            // }
            return list
        },
        fetchDataParams () {
            return {
                competitionType: this.competitionType,
                filterTime: this.filterTime,
                matchType: this.matchType,
                statusType: this.statusType
            }
        },
        apiParams () {
            return {
                pageNumber: 1,
                pageSize: 2000,
                leagueId: null, // 联赛id，
                playing: this.competitionType === 1 ? (this.matchType === 4 ? 2000 : 1000) : 3000,
                leagueType: this.matchType === 4 ? null : this.matchType, // 赛事分类，足球，篮球等
                day: this.filterTime
            }
        }
    },
    watch: {
        fetchDataParams: {
            handler () {
                this.fetchData()
            },
            deep: true
        },
        isToday: {
            handler () {
                this.statusType = this.menus[0].id
            },
            immediate: true
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        changeMenu (menu) {
            this.statusType = menu.id
        },
        changeType (type) {
            this.matchType = type.id
        },
        changeTab (tab) {
            console.log(tab, 'tab')
        },
        async fetchData () {
            const request = this.matchType === 3 ? getHostMatches : getMatchList
            try {
                this.isLoading = true
                const { data } = await request(this.apiParams)
                console.log(data, 'data')
                this.list = data.list
            } catch (e) {
                console.log('出错了')
            } finally {
                this.isLoading = false
            }
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
    height: calc(100vh - 295px);
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
        margin-left: 35px;
        background-color: #E8E8E8;
        border-radius: 10px;
        padding: 26px 22px;
        width: calc(100% - 245px);
        .title {
            .date {
                margin-right: 37px;
                font-size: 35px;
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
