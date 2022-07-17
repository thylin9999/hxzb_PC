<template>
<div v-if="matches.length" class="matches text-white flex align-center justify-between wrap-1200 font-regular">
    <div class="left-list p-relative">
        <span @click="prev" :class="{
            'is-active': leftMove
        }" class="prev  p-absolute"></span>
        <span @click="next"
              :class="{
                'is-active': rightMove
              }"
              class="next  p-absolute"></span>
        <div ref="ulBox" class="ul-box overflow-x-auto">
            <ul
                ref="matchUl"
                class="list  overflow-x-auto  flex  flex-no-wrap"
                :style="ulStyle"
            >
                <li
                    class=" match-item  p-t-20 m-r-10  bg-center bg-no-repeat bg-size-100"
                    v-for="match in matches"
                    :key="match.id"
                >
                    <div class="header p-l-20 p-b-15 p-relative font-500 flex flex-column  font-15 text-match">
                        <CustomSpan class="match-title font-18" :content="match.leagueChsShort"/>
                        <span class="m-t-10 font-18 font-400">{{ match.matchTime }}</span>
                        <div class="p-absolute match-status flex align-center text-center" :class="{'is-waiting': !match.isGoing}">
                            <span class="book-icon d-inline-block m-r-5 bg-center bg-no-repeat bg-size-100" v-if="!match.isGoing"></span>
                            <span
                                v-throttle="[()=>book(match),3000]"
                                class=" font-12 pointer"
                                :class="{'text-white': match.isSubscribe, 'pointer': !match.isSubscribe }"
                            >{{
                                match.isGoing ? match.matchStatusString : match.isSubscribe ? '已预约' : '预约'
                                }}</span>
                        </div>
                    </div>
                    <div class="team-score p-l-20 p-r-20">
                        <div class="team  flex justify-between align-center">
                            <div class="flex align-center">
                                <span
                                    class="team-flag border-radius-50 m-r-10 bg-no-repeat bg-center bg-size-100 d-inline-block"
                                    :style="{
                                        backgroundImage: match.homeLogo ? `url(${match.homeLogo})` : `url(${matchLogo})`
                                    }"
                                ></span>
                                <span class="font-18">{{ match.homeChs}}</span>
                            </div>
                            <span class="score">{{  match.isFuture ? '-' : match.homeScore}}</span>
                        </div>
                        <div class="team  flex justify-between align-center">
                            <div class="flex align-center">
                                <span
                                    class="team-flag m-r-10 bg-no-repeat bg-center bg-size-100 d-inline-block"
                                    :style="{
                                        backgroundImage: match.awayLogo ? `url(${match.awayLogo})` : `url(${matchLogo})`
                                    }"
                                ></span>
                                <span class="font-15">{{ match.awayChs }}</span>
                            </div>
                            <span class="score">{{ match.isFuture ? '-' : match.awayScore }}</span>
                        </div>
                    </div>
                    <div class="match-footer m-t-15 flex justify-center align-center">
                        <div v-if="match.isGoing" class="is-going flex justify-between align-center">
                            <span class="icon m-r-15 bg-no-repeat bg-size-100 bg-center"></span>
                            <div class="host-list overflow-hidden flex">
                                <span
                                    v-for="host in match.anchor_list"
                                    :key="host.id"
                                    :style="{
                                      backgroundImage: host.img ? `url(${host.img})` : 'url(' + require('../../assets/images/common/host-avatar.png') + ')'
                                    }"
                                    @click="viewLiveBroad(host)"
                                    class="host border-radius-50 pointer"></span>
                            </div>
                        </div>
                        <span v-else class="wait text-center font-12 d-inline-block">未开始</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div @click="goToCompetition" class="right-button pointer bg-center bg-no-repeat bg-size-100 flex flex-column justify-center align-center ">
        <span class="calender m-l-n-10 bg-no-repeat bg-center bg-size-100 d-inline-block">

        </span>
        <span  class="m-t-20 m-l-n-10">全部 <br/>赛程</span>
    </div>
</div>
</template>

<script>
import { getHostMatches, addSubscribeMatch } from '@/api/competition/competition'
import dayjs from 'dayjs'
import CustomSpan from '@/components/CustomSpan'
import { Message } from 'element-ui'
import { mapState } from 'vuex'
import { statusCode } from '@/utils/statusCode'
import { matchStatus } from '@/utils/utils'

export default {
    name: 'MatchList',
    components: {
        CustomSpan
    },
    data () {
        return {
            pagination: {
                pageNumber: 1,
                pageSize: 20
            },
            leftMove: false,
            rightMove: false,
            matchLogo: require('../../assets/images/common/match-logo.png'),
            matches: []
        }
    },
    computed: {
        ...mapState('user', ['token']),
        apiParams () {
            return {
                pageNumber: this.pagination.pageNumber,
                pageSize: this.pagination.pageSize,
                day: dayjs().format('YYYY-MM-DD')
            }
        },
        ulWidth () {
            return this.matches.length * 250
        },
        ulStyle () {
            return {
                width: this.ulWidth + 'px'
            }
        }
    },
    created () {
        this.fetchData()
    },
    mounted () {

    },
    methods: {
        initScroll () {
            this.$nextTick(() => {
                const wrapperInfo = this.$refs.ulBox.getBoundingClientRect()
                const wrapperWidth = wrapperInfo.width
                const innerUlInfo = this.$refs.matchUl.getBoundingClientRect()
                const innerUlWidth = innerUlInfo.width
                this.rightMove = this.$refs.ulBox.scrollLeft + wrapperWidth + 10 < innerUlWidth
                this.leftMove = this.$refs.ulBox.scrollLeft > 10
            })
        },
        async fetchData () {
            const { data } = await getHostMatches()
            if (data.list) {
                this.matches = data.list.reduce((all, match) => {
                    all.push({
                        ...match,
                        isSubscribe: match.appointment * 1 === 1,
                        isGoing: match.state !== 0,
                        isFuture: match.state === 0,
                        matchStatusString: matchStatus[match.state]
                    })
                    return all
                }, [])
                this.initScroll()
            }
        },
        goToCompetition () {
            this.$router.push({
                name: 'Competition'
            })
        },
        async book (match) {
            if (!match.isGoing) {
                if (this.token) {
                    const { code, msg } = await addSubscribeMatch(match.matchId)
                    if (code === statusCode.success) {
                        Message.success(msg)
                        this.fetchData()
                    }
                } else {
                    Message.error('请先登录，无法预约！')
                    this.openLoginDialog()
                }
            }
        },
        viewLiveBroad (host) {
            const { href } = this.$router.resolve({
                path: '/liveRoom',
                query: { room_id: host.room_id }
            })
            window.open(href, '_blank')
        },
        prev () {
            if (this.leftMove) {
                const left = this.$refs.ulBox.scrollLeft
                this.$refs.ulBox.scrollTo({
                    left: left - 250,
                    behavior: 'smooth'
                })
                setTimeout(() => {
                    this.initScroll()
                }, 300)
            }
        },
        next () {
            if (this.rightMove) {
                const left = this.$refs.ulBox.scrollLeft
                this.$refs.ulBox.scrollTo({
                    left: left + 250,
                    behavior: 'smooth'
                })
                setTimeout(() => {
                    this.initScroll()
                }, 300)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.left-list {
    width: calc(100% - 140px);
    .ul-box {
        width: calc(100% - 60px);
    }
    .list {
        min-width: 100%;
    }
    .match-item {
        width: 240px;
        height: 265px;
        background-image: url('../../assets/images/common/match_bg.png');
        .match-status {
            right: 15px;
            top: 0;
            border: 1px solid #fff;
            padding: 3px  6px;
            border-radius: 4px;
            &.is-waiting {
                border: 1px solid #FCFFA7;
                color: #FCFFA7;
            }
        }
        .book-icon {
            width: 14px;
            height: 13px;
            background-image: url('../../assets/images/common/book.png');
        }
        .header {
            width: calc(100% - 15px);
            margin-left: 6px;
            border-bottom: 1px solid #203C8E;
            .match-title {
                width: calc(100% - 85px);
                line-height: 24px;
            }
        }
        .team-score {
            .team {
                margin-top: 18px;
                line-height: 33px;
                height: 33px;
            }
            width: calc(100% - 14px);
            margin: 0 auto;
            .score {
                font-size: 25px;
            }
        }
        .team-flag {
            width: 30px;
            height: 28px;
            border-radius: 50%;
            //background-image: url('../../assets/images/common/team-flag.png');
        }
        .match-footer {
            .wait {
                width: 120px;
                padding: 7px 0;
                margin: 0 auto;
                border: 1px solid #fff;
                border-radius: 15px;
            }
            .is-going {
                width: calc(100% - 40px);
                margin: 0 auto;
                span{
                    display: inline-block;
                }
                .icon {
                    width: 25px;
                    height: 20px;
                    background-image: url('../../assets/images/common/living.png');
                }
                .host-list {
                    width: calc(100% - 25px);
                }
                .host {
                    margin: 0 3px;
                    width: 30px;
                    height: 30px;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    //background-image: url('../../assets/images/common/host-avatar.png');
                }
            }
        }
    }
    .prev, .next {
        width: 27px;
        height: 50px;
        top: 100px;
        cursor: pointer;
        display: inline-block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .prev {
        background-image: url('../../assets/images/common/prev-dis.png');
        left: -57px;
        &.is-active {
            background-image: url('../../assets/images/common/prev.png');
        }
    }
    .next {
        background-image: url('../../assets/images/common/next-dis.png');
        right: 0;
        &.is-active {
            background-image: url('../../assets/images/common/next.png');
        }
    }
}
.right-button{
    width: 110px;
    background-image: url('../../assets/images/home/calender-bg.png');
    height: 217px;
    border-radius: 10px;
    margin-left: 40px;
    .calender {
        width: 45px;
        height: 45px;
        background-image: url('../../assets/images/common/calender.png');
    }
}
</style>
