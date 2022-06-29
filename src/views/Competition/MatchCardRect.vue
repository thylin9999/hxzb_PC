<template>
<div class="card w-100 rect bg-white flex align-center">
    <div class="left-info flex align-center justify-between">
        <div class="flex time-and-title flex-column justify-center font-regular align-center">
            <span class="match-time m-b-15 font-400 ">{{ match.matchTime | filterTime}}</span>
            <custom-span
                class="match-title text-center"
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
                        class="font-regular w-100 text-center team-name m-t-10 font-20 font-400"
                        :content="match.homeChs"
                    />
                </div>
                <span class=" score text-center d-inline-block">{{ match.homeScore }}</span>
            </div>
            <span class="vs text-center d-inline-block">vs</span>
            <div class="away team flex align-center">
                <span class=" score text-center d-inline-block">{{ match.awayScore }}</span>
                <div class="flex icon-and-name flex-column align-center justify-center">
                    <div class="icon bg-no-repeat bg-center bg-size-100"
                      :style="{
                        backgroundImage: `url(${awayLogo})`
                    }"
                    ></div>
                    <custom-span
                        class="font-regular team-name w-100 text-center m-t-10 font-20 font-400"
                        :content="match.awayChs"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="right-host flex justify-between">
        <div class="hosts">
            <ul class="flex">
                <li
                    v-for="host in match.anchor_list"
                    :key="host.id"
                >
                    <div class="icon"
                        :style="{
                            backgroundImage: `url(${host.img})`
                        }"
                    ></div>
                    <span>{{ host.name}}</span>
                </li>
            </ul>
        </div>
        <div class="button m-r-20">
            <template v-if="isFinish">
                <div class="is-subscribe flex align-center justify-center w-100 h-100">
                    <icon-png :width="25" :height="27" icon="matches/appointment"/>
                    <span class="font-20 m-l-10 font-400 font-regular">已结束</span>
                </div>
            </template>
            <template v-else>
                <div class="is-subscribe pointer flex align-center justify-center w-100 h-100" v-if="isGoing">
                    <icon-png :width="25" :height="27" icon="matches/appointment"/>
                    <span class="font-20 m-l-10 font-400 font-regular">比赛中</span>
                </div>
                <div
                    class="un-subscribe pointer flex align-center justify-center w-100 h-100"
                    @click="subscribeMatch"
                    v-else>
                    <icon-png :width="27" :height="25" icon="matches/going"/>
                    <span class="font-20 m-l-10 font-400 font-regular">{{ isSubscribe ? '已预约' : '预约'}}</span>
                </div>
            </template>

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
        isGoing () {
            return !matchStatus[this.match.state]
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
            try {
                const { code, msg } = await addSubscribeMatch(this.match.matchId)
                if (code === statusCode.success) {
                    Message.success(msg)
                    this.$emit('updateAppointment', { id: this.match.matchId, value: this.match.appointment === 1 ? 2 : 1 })
                }
            } catch (e) {
                console.log('出凑了')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    height: 136px;
    padding: 22px 0;
    margin-bottom: 18px;
    border-radius: 10px;
}
.left-info {
    width: 590px;
    border-right: 1px solid #C3C3C3;
    .time-and-title {
        width: 230px;
    }
    .match-time {
        font-size: 45px;
        color: #272727;
    }
    .match-title {
        font-size: 25px;
        font-weight: 400;
        color: #272727;
    }
    .battle-info {
        width: calc(100% - 230px);
        .vs {
            width: 30px;
        }
        .team {
            width: calc(50% - 15px);
            .score {
                width: 50px;
                font-size: 34px;
                color: #272727;
                font-weight: 600;
            }
            .icon-and-name{
                width: calc(100% - 50px);
            }
        }
        .icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        .team-name {
            color: #272727;
        }
    }
}
.right-host {
    width: calc(100% - 590px);
    .button {
        width: 120px;
        height: 55px;
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
