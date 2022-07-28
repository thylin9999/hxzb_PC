<template>
<div class="card w-100 p-l-30 rect bg-white flex align-center">
    <div class="left-time">
        <span class="font-16 text-333 font-regular font-500">{{ match.matchTime | filterTime }}</span>
    </div>
    <div class="left-info p-l-15 flex align-center justify-between">
        <div class="battle-info w-100 flex justify-between align-center">
            <div class="home team flex align-center">
                <div class="flex icon-and-name  align-center justify-center">
                    <custom-span
                        class="font-regular m-r-5 text-right team-name text-333  font-16 font-500"
                        :content="match.homeChs"
                    />
                    <div class="icon bg-no-repeat bg-center " :style="{
                        backgroundImage: `url(${homeLogo})`
                    }"></div>
                </div>
                <span class=" score text-center d-inline-block">{{ match.homeScore }}</span>
            </div>
            <span class="vs text-center font-30 d-inline-block">-</span>
            <div class="away team flex align-center">
                <span class=" score text-center d-inline-block">{{ match.awayScore }}</span>
                <div class="flex icon-and-name align-center justify-center">
                    <div class="icon bg-no-repeat bg-center "
                      :style="{
                        backgroundImage: `url(${awayLogo})`
                    }"
                    ></div>
                    <custom-span
                        class="font-regular team-name m-l-5 text-left font-16 font-400"
                        :content="match.awayChs"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="right-host p-r-20 flex align-center justify-between">
        <div class="league-name text-center">
            <CustomSpan :content="match.leagueChsShort" class="font-12 font-500 text-gray4" />
        </div>
        <div class="button ">
            <div
                v-if="isFutureMatch || isEnd"
                class=" pointer match-status flex align-center justify-center w-100 h-100"
                :class="{
                    'un-subscribe': isFutureMatch && !isSubscribe,
                    'is-end': isEnd || isSubscribe
                }"
                v-throttle="[()=>subscribeMatch(),3000]">
                <span class="font-12 font-400 font-regular ">{{ buttonString }}</span>
            </div>
            <div v-else class="hosts overflow-x-auto">
                <ul v-if="match.anchor_list.length > 2" class="flex flex-no-wrap">
                    <li
                        v-for="host in match.anchor_list"
                        :key="host.id"
                        class="host-item m-r-5 flex pointer flex-column justify-center align-center"
                        @click="goToLiveRoom(host)"
                    >
                        <div class="icon bg-no-repeat bg-center "
                             :style="{
                            backgroundImage: emptyLogo ? `url(${emptyLogo})` :`url(${host.img})`
                        }"
                        ></div>
                    </li>
                </ul>
                <div class="live-broadcast text-center">
                    <span class="font-12 font-regular font-300">直播中</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import dayjs from 'dayjs'
import CustomSpan from '@/components/CustomSpan'
import { addSubscribeMatch } from '@/api/competition/competition'
import { matchStatus } from '@/utils/utils'
import { Message } from 'element-ui'
import { statusCode } from '@/utils/statusCode'
import { mapState } from 'vuex'
export default {
    name: 'MatchCardRect',
    filters: {
        filterTime (value) {
            return dayjs(value).format('HH:mm')
        }
    },
    props: {
        match: {
            type: Object,
            default: () => ({})
        },
        isFinish: {
            type: Boolean,
            default: false
        }
    },
    components: {
        CustomSpan
    },
    data () {
        return {
            emptyLogo: require('@/assets/images/common/team-flag.png')
        }
    },

    computed: {
        ...mapState('user', ['token']),
        buttonString () {
            return this.isFutureMatch ? (this.isSubscribe ? '已预约' : '预约') : matchStatus[this.match.state]
        },
        isGoing () {
            return !this.isFutureMatch && !this.isEnd
        },
        isEnd () {
            return this.match.state * 1 === -1
        },
        isFutureMatch () { // 未来的赛事
            return this.match.state * 1 === 0
        },
        isSubscribe () {
            return this.match.appointment * 1 === 1
        },
        awayLogo () {
            return this.match.awayLogo ? this.match.awayLogo : this.emptyLogo
        },
        homeLogo () {
            return this.match.homeLogo ? this.match.homeLogo : this.emptyLogo
        }
    },
    methods: {
        async subscribeMatch () {
            if (!this.isFutureMatch) {
                return
            }
            if (!this.token) {
                this.openLoginDialogMixin()
                return
            }
            try {
                const { code, msg } = await addSubscribeMatch(this.match.matchId)
                if (code === statusCode.success) {
                    Message.success(msg)
                    this.$emit('refresh')
                    // this.$emit('updateAppointment', { id: this.match.matchId, value: this.match.appointment === 1 ? 2 : 1 })
                } else {
                    if (code === statusCode.isExpired) {
                        this.openLoginDialogMixin()
                    }
                    Message.error(msg)
                }
            } catch (e) {
                console.log('出凑了')
            }
        },
        goToLiveRoom (host) {
            const { href } = this.$router.resolve({
                path: '/liveRoom',
                query: { room_id: host.room_id }
            })
            window.open(href, '_blank')
        }

    }
}
</script>

<style lang="scss" scoped>
.card {
    height: 70px;
    padding: 6px 0;
    border-radius: 3px;
    border-bottom: 1px solid #DEE4FF;
}
.left-time {
    width: 10%;
}
.left-info {
    width: 60%;
    .time-and-title {
        width: 100px;
    }
    .match-time {
        color: #272727;
    }
    .match-title {
        font-weight: 400;
        color: #272727;
    }
    .battle-info {
        .vs {
            width: 30px;
            line-height: 30px;
        }
        .team {
            width: calc(50% - 15px);
            .score {
                width: 50px;
                font-size: 25px;
                color: #272727;
            }
            .icon-and-name{
                width: calc(100% - 50px);
            }
        }
        .icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-size: contain;
        }
        .team-name {
            width: calc(100% - 35px);
        }
    }
}
.right-host {
    width: 30%;
    line-height: 26px;
    .button {
        width: 65px;
    }
    .league-name {
        width: calc(100% - 65px);
    }
    .hosts{
        margin: 0 auto;
        .host-item{
            .icon {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-size: contain;
            }
            span {
                color: #737373;
            }
        }
        .live-broadcast{
            width: 65px;
            line-height: 26px;
            background-color: #FB7674;
            border-radius: 3px;
            color: #fff;
            background-image: url('../../../assets/images/common/live.gif');
            background-size: 12px 16px;
            background-position: 7px center;
            background-repeat: no-repeat;
        }
    }
    .un-subscribe {
        background-color: #142563;
        color: #fff;
    }

    .is-subscribe, .un-subscribe {
        border-radius: 26px;
    }
    .match-status {
        background: linear-gradient(0deg, #3B5FFF, #A2B3FF);
        border-radius: 3px;
        color: #fff;
    }
    .is-end {
        border: 1px solid #939393;
        background: transparent;
        font-weight: 300;
        color: #939393;
    }
}
</style>
