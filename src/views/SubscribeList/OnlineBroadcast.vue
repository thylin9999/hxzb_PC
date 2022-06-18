<template>
<div class="wrap-1200 p-t-15 p-l-15 bg-white">
    <tab-title title="正在直播" />
    <div class="online-broadcast">
        <ul v-if="tableData.length" class="w-100 flex flex-wrap">
            <li
                class="m-l-5 m-r-5 p-t-15 p-b-15"
                v-for="competition in tableData"
                :key="competition.id"
            >
                <competition-card
                    :competition-info="competition"
                />
            </li>
        </ul>
        <el-empty
            v-else
            :image-size="108"
            description="暂无数据" />
    </div>
</div>
</template>

<script>
import TabTitle from '@/components/TabTitle'
import CompetitionCard from '@/components/CompetitionCard'
import { getOnlineBroadcast } from '@/api/competition/competition'

export default {
    name: 'OnlineBroadcast',
    components: {
        TabTitle,
        CompetitionCard
    },
    data () {
        return {
            tableData: []
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            const { data } = await getOnlineBroadcast({})
            this.tableData = data.list
            console.log(this.tableData, 'adf')
        }
    }
}
</script>

<style lang="scss" scoped>
.bg-white {
    min-height: 230px;
    .empty-div {
        height: 185px;
    }
}
.empty-div {
    background-image: url('../../assets/images/common/empty.png');
    background-size: 105px 80px;
}
::v-deep {
    .el-empty {
        padding: 0!important;
    }
}
</style>
