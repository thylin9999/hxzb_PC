<template>
<div class="ranks w-100 h-100">
    <div class="header bg-white text-center flex align-center font-regular">
        <span @click="leagueType = 1" class="football pointer flex-1 item font-16 font-400" :class="{'is-active': leagueType === 1}">足球积分榜</span>
        <span  @click="leagueType = 2" class="basketball pointer flex-1 item font-16 font-400" :class="{'is-active': leagueType === 2}">篮球积分榜</span>
    </div>
    <div class="w-100">
        <div class="types w-100 flex p-l-15 p-r-15 align-center justify-between">
            <div class="type font-16 pointer"
                 :class="{
                    'is-active': type.id === activeId
                 }"
                v-for="type in options"
                 @click="activeId = type.id"
                 :key="type.id"
            >{{ type.label }}</div>
        </div>
    </div>
    <div class="tables w-100 bg-white">
        <el-table
            :data="list"
            height="100%"
            fit
            align="center"
        >
            <el-table-column
                prop="rank"
                label="排名"
                align="center"
                min-width="50"
            ></el-table-column>
            <el-table-column
                prop="team"
                label="球队"
                align="center"
                min-width="50"
            >
                <template slot-scope="scope">
                    <div class="flex align-center">
                        <span class="team-icon d-inline-block border-radius-50"></span>
                        <span class="m-l-5">{{ scope.row.team }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="score"
                label="胜/负/平"
                align="center"
                min-width="50"
            ></el-table-column>
            <el-table-column
                prop="cents"
                label="积分"
                align="center"
                min-width="50"
            ></el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
export default {
    name: 'ScoreRanks',
    data () {
        return {
            leagueType: 1,
            activeId: 1,
            options: [
                {
                    id: 1,
                    label: '英超'
                },
                {
                    id: 2,
                    label: '德甲'
                },
                {
                    id: 3,
                    label: '意甲'
                },
                {
                    id: 4,
                    label: '中超'
                },
                {
                    id: 5,
                    label: '法甲'
                },
                {
                    id: 6,
                    label: '西甲'
                }

            ],
            list: [
                {
                    id: 1,
                    rank: 1,
                    team: '球队1',
                    img: '',
                    score: '1/1/1',
                    cents: 10
                },
                {
                    id: 2,
                    rank: 2,
                    team: '球队2',
                    img: '',
                    score: '1/2/1',
                    cents: 10
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.header{
    line-height: 45px;
    padding: 6px 0;
    .football {
        border-right: 1px solid #DEE4FF;
    }
    span {
        color: #757575;
        &.is-active {
            color: #FB7674;
            font-weight: 600;
        }
    }
}
.types {
    .type {
        line-height: 35px;
        border-bottom: 2px solid transparent;
        color: #757575;
        &.is-active{
            border-color: #3B5FFF;
            color: #4768FF;
            //background: linear-gradient(0deg, #3B5FFF, #A2B3FF);
        }
    }
}
.tables{
    height: calc(100% - 95px);
    color: #757575;
    .team-icon {
        width: 15px;
        height: 15px;
        background-color: #C9CFED;
    }
}
</style>
