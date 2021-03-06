<template>
<div class="my-broadcasts">
    <header-title title="我的直播"/>
    <ul class="flex align-center m-l-30 p-t-10 p-b-10">
        <li
            v-for="item in menus"
            :key="item.id"
            class="pointer p-l-15 p-r-15 text-center item-type"
            :class="{'is-active': item.id === currentType}"
            @click="changeType(item)"
        >{{ item.title }}</li>
    </ul>
    <div class="table w-100 p-l-15 m-t-15 p-r-15">
        <el-table
            :key="currentType"
            height="100%"
            :data="list"
            border
            fit
            v-loading="isLoading"
        >
            <el-table-column
                v-if="!isBooked"
                prop="id"
                align="center"
                label="比赛id"
                min-width="180" />
            <el-table-column
                prop="type"
                align="center"
                label="比赛类型"
                min-width="180" />
            <el-table-column
                prop="title"
                align="center"
                label="直播标题"
                min-width="180" />
            <el-table-column
                :prop="isBooked ? 'matchTime' : 'start_time'"
                align="center"
                label="开始时间"
                min-width="180" />
            <el-table-column
                v-if="isFinished"
                prop="end_time"
                align="center"
                label="结束时间"
                min-width="180" />
            <el-table-column
                prop="announcement"
                label="直播公告"
                align="center"
                min-width="150" />
            <el-table-column
                v-if="!isFinished"
                prop="leagueType"
                align="center"
                label="操作"
                :min-width="isGoing ? 150 : 250" >
                <template slot-scope="scope">
                    <template v-if="isBooked">
                        <el-button  small @click="cancel(scope.row)">取消预约</el-button>
                        <el-button small @click="startBroadcast(scope.row)">一键开播</el-button>
                    </template>
<!--                    <el-button v-if="isFinished" small @click="cancel(scope.row)">取消预约</el-button>-->
                    <el-button v-if="isGoing" small @click="closeBroadcast(scope.row)">下播</el-button>
<!--                    <span @click="cancel(scope.row)">取消预约</span>-->
                </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
import HeaderTitle from '@/views/PersonalCenter/Components/HeaderTitle'
import { getBookedMatches, bookOpenBroadcast, cancelSubscribe, getMyBroadcastHistory, closeLive } from '@/api/Host/Host'
import { matchTypes } from '@/utils/utils'
import { statusCode } from '@/utils/statusCode'
import { Message } from 'element-ui'
export default {
    name: 'MyBroadcast',
    components: {
        HeaderTitle
    },
    data () {
        return {
            list: [],
            currentType: 3,
            isLoading: false,
            menus: [
                {
                    id: 3,
                    title: '未开始'
                },
                {
                    id: 1,
                    title: '直播中'
                },
                {
                    id: 2,
                    title: '已结束'
                }
            ]
        }
    },
    created () {
        this.fetchData()
    },
    computed: {
        apiParams () {
            return this.currentType === 3 ? null : {
                pageNumber: 1,
                pageSize: 2000,
                status: this.currentType
            }
        },
        isBooked () {
            return this.currentType === 3
        },
        isFinished () {
            return this.currentType === 2
        },
        isGoing () {
            return this.currentType === 1
        }
    },
    watch: {
        currentType () {
            this.fetchData()
        }
    },
    methods: {
        async fetchData () {
            try {
                this.isLoading = true
                const request = this.currentType === 3 ? getBookedMatches : getMyBroadcastHistory
                const { data } = await request(this.apiParams)
                if (data) {
                    if (this.currentType === 3) {
                        this.list = data.list.reduce((all, item) => {
                            all.push({
                                ...item,
                                type: matchTypes[item.leagueType]
                            })
                            return all
                        }, [])
                    } else {
                        // 进行中,已结束
                        this.list = data.list.reduce((all, item) => {
                            all.push({
                                ...item,
                                type: matchTypes[item.type],
                                title: item.room_title,
                                matchTime: new Date(item.start_time)
                            })
                            return all
                        }, [])
                    }
                } else {
                    this.list = []
                }
            } catch (e) {
                console.log('出错了')
            } finally {
                this.isLoading = false
            }
        },
        changeType (item) {
            this.currentType = item.id
            this.list = []
        },
        async cancel (row) {
            try {
                const { code, msg } = await cancelSubscribe(row.matchId)
                if (code === statusCode.success) {
                    Message.success(msg)
                    this.fetchData()
                } else {
                    Message.error(msg)
                }
            } catch (e) {
                console.log('出错了')
            }
        },
        async closeBroadcast (row) {
            // 主播下播
            try {
                const { code, msg } = await closeLive()
                if (code === statusCode.success) {
                    Message.success(msg)
                    this.fetchData()
                }
            } catch (e) {
                console.log('出错了')
            }
        },
        async startBroadcast (row) {
            // 一键开播

            const { code } = await bookOpenBroadcast(row.id)
            if (code === statusCode.success) {
                Message.success('开播成功')
                this.fetchData()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.my-broadcasts {
    height: 500px;
}
.table {
    height: calc(100% - 165px);
}
.item-type {
    width: 150px;
    height: 40PX;
    line-height: 40px;
    border-bottom: 2px solid transparent;
    &.is-active {
        border-bottom: 2px solid #4859DE;
    }
}
</style>
