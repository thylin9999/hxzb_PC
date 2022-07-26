<template>
    <div v-if="matches.length" class="matches w-100 text-white flex align-center justify-between  font-regular">
        <div class="left-list w-100 p-relative">
            <template v-if="showButtons">
                <span @click="prev"
                         :class="{
                        'is-unactive opacity-7 not-allowed': !leftMove
                    }"
                                  class="prev  p-absolute "></span>
                <span @click="next"
                      :class="{
                        'is-unactive opacity-7 not-allowed': !rightMove
                    }"
                      class="next  p-absolute"></span>
                <div class="show-more pointer font-12 h-100 p-absolute" @click="goToMore">
                    <span class="calender d-inline-block bg-no-repeat bg-center bg-size-100"></span>
                    <span class="more-span">更多赛程</span>
                </div>
            </template>
            <div ref="ulBox"
                 class="ul-box overflow-x-auto"
                :class="{'has-show-button': showButtons}"
            >
                <ul
                    ref="matchUl"
                    class="list p-b-10 overflow-x-auto  flex  flex-no-wrap"
                    :style="ulStyle"
                >
                    <li
                        class=" match-item  p-t-10 "
                        v-for="match in matches"
                        :key="match.id"
                    >
                        <div class="header p-b-5 p-l-10 p-r-5 p-relative font-500 flex flex-column  font-15 text-14">
                            <div class="flex w-100 justify-between align-center">
                                <CustomSpan class="match-title text-green font-12 text-14" :content="match.leagueChsShort"/>
                                <span class=" font-12 font-regular  font-400">{{ match.matchTime }}</span>
                            </div>
                            <div class="flex justify-between align-center  match-status">
                                <el-popover
                                    popper-class="anchor-popper"
                                    placement="right"
                                    width="350"
                                    trigger="click">
                                    <div class="anchor-list">
                                        <p class="text-center text-14 font-12 p-t-10 p-b-10 font-300 font-regular">{{ match.anchor_number }}名主播正在播本场比赛</p>
                                        <div class="ul-box p-b-15 p-l-20 p-r-20 flex flex-column overflow-y-auto">
                                            <template
                                                v-for="anchor in match.anchor_list"
                                            >
                                                <AnchorInfo class="m-t-15" :anchor="anchor" :key="anchor.room_id"/>
                                            </template>
                                        </div>
                                    </div>
                                    <div
                                        slot="reference"
                                        class="hosts font-12 text-14 pointer bg-no-repeat p-l-20"
                                        :class="{'visibility-hidden': match.anchor_number <= 0}"
                                    >
                                        {{ match.anchor_number }} 位主播
                                    </div>
                                </el-popover>

                                <div class="match-buttons text-center font-12">
                                     <span
                                         v-throttle="[()=>book(match),3000]"
                                         class="font-12 status-span pointer d-inline-block w-100 h-100 text-center"
                                         :class="{
                                            'is-subscribe': match.isSubscribe,
                                            'is-going': match.isGoing,
                                         }"
                                     >{{
                                             match.isGoing ? match.matchStatusString : match.isSubscribe ? '已预约' : '预约'
                                         }}</span>
                                </div>
                            </div>

                        </div>
                        <div class="team-score p-l-10 p-r-10">
                            <div class="team  flex justify-between align-center">
                                <div class="flex align-center">
                                <span
                                    class="team-flag m-r-10 bg-no-repeat border-radius-50 bg-center bg-size-100 d-inline-block"
                                    :style="{
                                        backgroundImage: match.homeLogo ? `url(${match.homeLogo})` : `url(${matchLogo})`
                                    }"
                                ></span>
                                    <span class="font-16 text-14 font-regular">{{ match.homeChs}}</span>
                                </div>
                                <span class="score">{{ match.isFuture ? '-' : match.homeScore}}</span>
                            </div>
                            <div class="team  flex justify-between align-center">
                                <div class="flex align-center">
                                <span
                                    class="team-flag m-r-10 bg-no-repeat border-radius-50 bg-center bg-size-100 d-inline-block"
                                    :style="{
                                        backgroundImage: match.awayLogo ? `url(${match.awayLogo})` : `url(${matchLogo})`
                                    }"
                                ></span>
                                    <span class="font-16 text-14 font-regular">{{ match.awayChs }}</span>
                                </div>
                                <span class="score">{{ match.isFuture ? '-' : match.awayScore }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getHostMatches, addSubscribeMatch } from '@/api/competition/competition'
import dayjs from 'dayjs'
import CustomSpan from '@/components/CustomSpan'
import AnchorInfo from '@/views/Competition/Components/AnchorInfo'
import { Message } from 'element-ui'
import { mapState } from 'vuex'
import { matchStatus } from '@/utils/utils'
import { statusCode } from '@/utils/statusCode'
export default {
    name: 'MatchList',
    props: {
        showButtons: {
            type: Boolean,
            default: false
        }
    },
    components: {
        CustomSpan,
        AnchorInfo
    },
    data () {
        return {
            pagination: {
                pageNumber: 1,
                pageSize: 20
            },
            matches: [],
            matchLogo: require('../../assets/images/common/match-logo.png'),
            leftMove: false,
            rightMove: false
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
            return this.matches.length * 235
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
        async book (match) {
            if (!match.isGoing) {
                if (this.token) {
                    // 已登录
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
                    left: left - 235,
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
        },
        goToMore () {
            this.$router.push({
                name: 'LiveBroad'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.left-list {
    .ul-box {
        width: 100%;
        &.has-show-button {
            width: calc(100% - 50px);
        }
    }
    .list {
        min-width: 100%;
    }
    .match-item {
        width: 235px;
        height: 145px;
        margin-right: 15px;
        background-color: #fff;
        color: #141414;
        .match-status {
            line-height: 22px;
            height: 22px;
            .hosts{
                background-image: url('../../assets/images/common/live.gif');
                background-position: left center;
                background-size: 12px 16px;
            }
            .match-buttons {
                width: 60px;
                .status-span {
                    background: linear-gradient(0deg, #3B5FFF, #A2B3FF);
                    color: #fff;
                    font-weight: 300;
                    border-radius: 3px;
                }
                .is-subscribe {
                    color: #939393;
                    border: 1px solid #939393;
                    background: #fff;
                }
                .is-going {
                    color: #4366FF;
                    background: #fff;
                    border: 1px solid #496AFF;
                }

            }
        }
        .book-icon {
            width: 14px;
            height: 13px;
            background-image: url('../../assets/images/common/book.png');
        }
        .header {
            border-bottom: 1px solid #DEE4FF;
            .match-title {
                width: calc(100% - 115px);
                line-height: 24px;
            }
        }
        .team-score {
            .team {
                margin-top: 5px;
                line-height: 33px;
                height: 33px;
            }
            margin: 0 auto;
            .score {
                font-size: 25px;
            }
        }
        .team-flag {
            width: 30px;
            height: 28px;
            background-image: url('../../assets/images/common/team-flag.png');
        }
    }
    .prev, .next {
        width: 27px;
        height: 60px;
        top: 45px;
        display: inline-block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 6px 11px;
        background-color: #BFC3D8;
        border-radius: 3px;
    }
    .prev {
        left: -30px;
        width: 23px;
        height: 60px;
        background-image: url('../../assets/images/common/prev.png');
        &.is-active {
            background-image: url('../../assets/images/common/prev.png');
        }
    }
    .next {
        width: 23px;
        height: 60px;
        background-image: url('../../assets/images/common/next.png');
        right: -30px;
        &.is-active {
            background-image: url('../../assets/images/common/next.png');
        }
    }
    .show-more {
        right: 0;
        top: 0;
        z-index: 5;
        height: 145px;
        display: flex;
        justify-content: center;
        align-items: center;
        .calender {
            width: 14px;
            height: 15px;
            background-image: url('../../assets/images/home/calender-bg.png');
        }
        width: 35px;
        background-color: #fff;
        color: #2D2D2D;
        writing-mode: vertical-lr;
        .more-span {
            letter-spacing: 3px;
        }
    }
}

.anchor-list {
    width: 350px;
    height: 300px;
    p {
        border-bottom: 1px solid #DEE4FF;
    }
    .ul-box {
        height: calc(100% - 40px);
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
