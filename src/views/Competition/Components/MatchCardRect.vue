<template>
<div class="card w-100 m-b-5 rect bg-white flex align-center">
    <div class="left-info p-l-15 flex align-center justify-between">
        <div class="flex time-and-title flex-column justify-center font-regular align-center">
            <span class="match-time font-18 m-b-15 font-400 ">{{ match.matchTime | filterTime}}</span>
            <custom-span
                class="match-title font-18 text-center"
                :content="match.leagueChsShort"
            />
        </div>
        <div class="battle-info flex justify-between align-center">
            <div class="home team flex align-center">
                <div class="flex icon-and-name flex-column align-center justify-center">
                    <div class="icon bg-no-repeat bg-center bg-size-100" :style="{
                        backgroundImage: `url(${homeLogo})`
                    }"></div>
                    <custom-span
                        class="font-regular w-100 text-center team-name m-t-10 font-15 font-400"
                        :content="match.homeChs"
                    />
                </div>
                <span class=" score text-center d-inline-block">{{ match.homeScore }}</span>
            </div>
            <span class="vs text-center font-25 d-inline-block">vs</span>
            <div class="away team flex align-center">
                <span class=" score text-center d-inline-block">{{ match.awayScore }}</span>
                <div class="flex icon-and-name flex-column align-center justify-center">
                    <div class="icon bg-no-repeat bg-center bg-size-100"
                      :style="{
                        backgroundImage: `url(${awayLogo})`
                    }"
                    ></div>
                    <custom-span
                        class="font-regular team-name w-100 text-center m-t-10 font-16 font-400"
                        :content="match.awayChs"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="right-host p-r-20 flex justify-between">
        <div class="hosts overflow-x-auto">
            <ul class="flex flex-no-wrap">
                <li
                    v-for="host in match.anchor_list"
                    :key="host.id"
                    class="host-item m-r-5 flex pointer flex-column justify-center align-center"
                    @click="goToLiveRoom(host)"
                >
                    <div class="icon bg-no-repeat bg-center bg-size-100"
                        :style="{
                            backgroundImage: `url(${host.img})`
                        }"
                    ></div>
                    <CustomSpan class="font-12 text-73 m-t-10" :content="host.nick"/>
                </li>
            </ul>
        </div>
        <div class="button ">
            <div
                class=" pointer is-subscribe flex align-center justify-center w-100 h-100"
                :class="{
                    'un-subscribe': isFutureMatch && !isSubscribe,
                }"
                v-throttle="[()=>subscribeMatch(),3000]">
                <icon-png class="m-r-5" v-if="isFutureMatch" :width="20" :height="19" :icon="iconName"/>
                <span class="font-16 font-400 font-regular ">{{ buttonString }}</span>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import dayjs from 'dayjs'
import CustomSpan from '@/components/CustomSpan'
import IconPng from '@/components/IconPng'
import { addSubscribeMatch } from '@/api/competition/competition'
import { matchStatus } from '@/utils/utils'
import { Message } from 'element-ui'
import { statusCode } from '@/utils/statusCode'
import { mapState } from 'vuex'
export default {
    name: 'MatchCardRect',
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
        CustomSpan,
        IconPng
    },
    data () {
        return {
            emptyLogo: require('../../assets/images/common/team-flag.png')
        }
    },
    filters: {
        filterTime (value) {
            return dayjs(value).format('HH:mm')
        }
    },

    computed: {
        ...mapState('user', ['token']),
        buttonString () {
            return this.isFutureMatch ? (this.isSubscribe ? '已预约' : '预约') : matchStatus[this.match.state]
        },
        iconName () {
            return this.isFutureMatch ? (this.isSubscribe ? 'matches/appointment' : 'matches/going') : 'matches/going'
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
    height: 80px;
    padding: 6px 0;
    border-radius: 3px;
}
.left-info {
    width: 50%;
    border-right: 1px solid #C3C3C3;
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
        width: calc(100% - 100px);
        .vs {
            width: 30px;
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
            width: 34px;
            height: 34px;
            border-radius: 50%;
        }
        .team-name {
            color: #272727;
        }
    }
}
.right-host {
    width: 50%;
    .button {
        width: 100px;
        height: 40px;
    }
    .hosts{
        width: calc(100% - 150px);
        margin: 0 auto;
        .host-item{
            width: 45px;
            .icon {
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
            span {
                color: #737373;
            }
        }
    }
    .un-subscribe {
        background-color: #142563;
        color: #fff;
    }
    .is-subscribe {
        border: 2px solid #142563;
    }
    .is-subscribe, .un-subscribe {
        border-radius: 30px;
    }
}
</style>
