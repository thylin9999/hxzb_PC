<template>
<div class="wrap bg-white">
    <div class="header font-16 font-regular text-333 font-500 text-center">
        {{ title }}
    </div>
    <div
        v-for="item in list"
        :key="item.matchId"
        class="row w-100 p-l-15 p-r-15 flex align-center">
        <div class="left flex justify-between align-center">
            <div class="time flex font-12 font-300 flex-column justify-center align-center text-333">
                <span class="scale-9">time</span>
                <span class="scale-9">date</span>
            </div>
            <span class="font-12 text-gray3 font-300">韩国k联赛</span>
            <span class="font-12 text-gray3 font-300">第19轮</span>
        </div>
        <div class="middle flex align-center p-l-25 font-12 text-333">
            <div class="team1 flex align-center">
                <span>水原三星</span>
                <span class="icon m-l-5 m-r-10 border-radius-50 d-inline-block"></span>
                <span class="score">0</span>
            </div>
            <span class="m-l-10 m-r-10">VS</span>
            <div class="team1 flex flex-reverse align-center">
                <span>水原三星</span>
                <span class="icon m-l-5 m-r-10 border-radius-50 d-inline-block"></span>
                <span class="score">0</span>
            </div>
        </div>
        <div class="right">
            <ul class="hosts flex align-center ">
                <li class="host border-radius-50 m-r-10" v-for="n in 4" :key="n">

                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { getMatchList } from '@/api/competition/competition'
import { statusCode } from '@/utils/statusCode'

export default {
    name: 'MatchWithStatus',
    props: {
        status: {
            type: [Number, String],
            default: 1000
        },
        title: {
            type: String,
            default: '进行中的比赛'
        },
        leagueType: {
            type: [Number, String],
            default: 1
        }
    },
    data () {
        return {
            list: []
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            const { data, code } = await getMatchList({
                playing: this.status,
                pageSize: 4,
                leagueType: this.leagueType
            })
            console.log(data, code)
            if (code === statusCode.success) {
                this.list = data.list
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap {
    width: 850px;
}
.header {
    line-height: 44px;
}
.row {
    line-height: 43px;
    border-top: 1px solid #DEE4FF;
    .left {
        width: 25%;
        .time {
            span {
                line-height: 12px;
            }
        }
    }
    .middle {
        width: 50%;
    }
    .right {
        width: 25%;
        .host {
            width: 30px;
            height: 30px;
            background-color: #C9CFED;
        }
    }
    .team1 {
        .icon {
            width: 15px;
            height: 15px;
            background-color: #C9CFED;
        }
    }
}
</style>
