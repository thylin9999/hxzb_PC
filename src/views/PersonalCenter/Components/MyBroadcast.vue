<template>
<div class="my-broadcasts">
    <header-title title="未开始"/>
    <div class="table p-l-15 m-t-15 p-r-15">
        <el-table
            height="100%"
            :data="list"
            border
        >
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
                prop="matchTime"
                align="center"
                label="开始时间"
                min-width="180" />
            <el-table-column
                prop="announcement"
                label="直播公告"
                align="center"
                min-width="150" />
            <el-table-column
                prop="leagueType"
                align="center"
                label="操作"
                min-width="150" >
                <template slot-scope="scope">
                    <el-button small @click="cancel(scope.row)">取消预约</el-button>
<!--                    <span @click="cancel(scope.row)">取消预约</span>-->
                </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
import HeaderTitle from '@/views/PersonalCenter/Components/HeaderTitle'
import { getBookedMatches, cancelSubscribe } from '@/api/Host/Host'
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
            list: []
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            try {
                const { data } = await getBookedMatches()
                this.list = data.list.reduce((all, item) => {
                    all.push({
                        ...item,
                        type: matchTypes[item.leagueType]
                    })
                    return all
                }, [])
            } catch (e) {
                console.log('出错了')
            }
        },
        async cancel (row) {
            console.log(row, 'row')
            try {
                const { code, data, msg } = await cancelSubscribe(row.id)
                if (code === statusCode.success) {

                } else {
                    Message.error(msg)
                }
            } catch (e) {
                console.log('出错了')
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
    height: calc(100% - 95px);
}
</style>
