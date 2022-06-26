<template>
<div class="wrap-1450 p-t-15 p-l-15 bg-white">
    <title-row icon="tv" title="正在直播" />
    <div class="online-broadcast"
         v-loading="isLoading"
    >
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
import TitleRow from '@/components/TitleRow'
import CompetitionCard from '@/components/CompetitionCard'
import { getOnlineBroadcast } from '@/api/competition/competition'

export default {
    name: 'OnlineBroadcast',
    components: {
        TitleRow,
        CompetitionCard
    },
    data () {
        return {
            tableData: [],
            isLoading: false
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            this.isLoading = true
            const { data } = await getOnlineBroadcast({})
            this.isLoading = false
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
