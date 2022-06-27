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
                width="180" />
            <el-table-column
                prop="title"
                align="center"
                label="直播标题"
                width="180" />
            <el-table-column
                prop="matchTime"
                align="center"
                label="开始时间"
                width="180" />
            <el-table-column
                prop="announcement"
                label="直播公告"
                align="center"
                width="180" />
            <el-table-column
                prop="leagueType"
                align="center"
                label="操作"
                width="180" />
        </el-table>
    </div>
</div>
</template>

<script>
import HeaderTitle from '@/views/PersonalCenter/Components/HeaderTitle'
import { bookBroadcast } from '@/api/Host/Host'
import { matchTypes } from '@/utils/utils'

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
                const { data } = await bookBroadcast()
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
