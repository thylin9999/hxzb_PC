<template>
<div class="matches text-white flex align-center wrap-1200 font-regular">
    <div class="left-list p-relative">
        <span @click="fetchData" class="prev el-icon-arrow-left p-absolute"></span>
        <span @click="fetchData" class="next el-icon-arrow-right p-absolute"></span>
        <ul class="list w-100 flex justify-between flex-no-wrap">
            <li
                class=" match-item  p-t-20  bg-center bg-no-repeat bg-size-100"
                v-for="match in matches"
                :key="match.id"
            >
                <div class="header p-l-20 p-b-15 p-relative font-500 flex flex-column  font-15 text-match">
                    <span>中甲第三轮</span>
                    <span class="m-t-10">2022-06-13 {{ match.time }}</span>
                    <div class="p-absolute match-status flex align-center text-center" :class="{'is-waiting': !match.isGoing}">
                        <span class="book-icon d-inline-block m-r-5 bg-center bg-no-repeat bg-size-100" v-if="!match.isGoing"></span>
                        <span
                            @click="book(match)"
                            class=" font-12"
                            :class="{'text-white': match.isGoing, 'pointer': !match.isGoing }"
                        >{{ match.isGoing ? '比赛中' : '预约'}}</span>
                    </div>
                </div>
                <div class="team-score p-l-20 p-r-20">
                    <div class="team-a m-t-15  flex justify-between align-center">
                        <div class="flex align-center">
                            <span class="team-flag m-r-10 bg-no-repeat bg-center bg-size-100 d-inline-block"></span>
                            <span class="font-15">中超第三轮</span>
                        </div>
                        <span class="score">0</span>
                    </div>
                    <div class="team-a m-t-15  flex justify-between align-center">
                        <div class="flex align-center">
                            <span class="team-flag m-r-10 bg-no-repeat bg-center bg-size-100 d-inline-block"></span>
                            <span class="font-15">中超第三轮</span>
                        </div>
                        <span class="score">0</span>
                    </div>
                </div>
                <div class="match-footer m-t-15 flex justify-center align-center">
                    <div v-if="match.isGoing" class="is-going flex justify-center align-center">
                        <span class="icon m-r-15 bg-no-repeat bg-size-100 bg-center"></span>
                        <div class="host-list">
                            <span class="host"></span>
                            <span class="host"></span>
                            <span class="host"></span>
                            <span class="host"></span>
                        </div>
                    </div>
                    <span v-else class="wait text-center font-12 d-inline-block">未开始</span>
                </div>
            </li>
        </ul>
    </div>
    <div @click="goToCompetition" class="right-button pointer bg-center bg-no-repeat bg-size-100 flex flex-column justify-center align-center ">
        <span class="calender m-l-n-10 bg-no-repeat bg-center bg-size-100 d-inline-block">

        </span>
        <span  class="m-t-20 m-l-n-10">全部 <br/>赛程</span>
    </div>
</div>
</template>

<script>
import { getBookedMatches } from '@/api/competition/competition'
import { Message } from 'element-ui'
import { mapState } from 'vuex'
export default {
    name: 'MatchList',
    data () {
        return {
            pagination: {
                pageNumber: 1,
                pageSize: 20
            },
            matches: []
        }
    },
    computed: {
        ...mapState('user', ['token']),
        apiParams () {
            return {
                pageNumber: this.pagination.pageNumber,
                pageSize: this.pagination.pageSize
            }
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            const { data } = await getBookedMatches(this.apiParams)
            this.matches = data.reduce((all, match) => {
                all.push({
                    ...match,
                    isGoing: match.status === 1
                })
                return all
            }, [])
        },
        goToCompetition () {
            this.$router.push({
                name: 'Competition'
            })
        },
        book (match) {
            if (!match.isGoing) {
                if (this.token) {
                    // 已登录
                    // 发送请求订阅比赛
                } else {
                    Message.error('请先登录，无法预约！')
                    this.openLoginDialog()
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.left-list {
    //width: calc(100% - 90px);
    .match-item {
        width: 210px;
        height: 240px;
        padding: 0 5px;
        background-image: url('../../assets/images/common/match_bg.png');
        .match-status {
            right: 20px;
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
        }
        .team-score {
            width: calc(100% - 14px);
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
        .match-footer {
            .wait {
                width: 120px;
                padding: 7px 0;
                margin: 0 auto;
                border: 1px solid #fff;
                border-radius: 15px;
            }
            .is-going {
                span{
                    display: inline-block;
                }
                .icon {
                    width: 25px;
                    height: 20px;
                    background-image: url('../../assets/images/common/living.png');
                }
                .host {
                    margin: 0 3px;
                    width: 30px;
                    height: 30px;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-image: url('../../assets/images/common/host-avatar.png');
                }
            }
        }
    }
    .prev, .next {
        cursor: pointer;
        display: inline-block;
        color: #000;
        font-size: 50px;
    }
    .prev {
        left: -40px;
        top: 90px;
    }
    .next {
        right: -40px;
        top: 90px;
    }
}
.right-button{
    width: 90px;
    //background-color: #10234B;
    background-image: url('../../assets/images/home/calender-bg.png');
    height: 170px;
    border-radius: 10px;
    margin-left: 40px;
    .calender {
        width: 45px;
        height: 45px;
        background-image: url('../../assets/images/common/calender.png');
    }
}
</style>
