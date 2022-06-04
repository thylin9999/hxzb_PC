<template>
    <div class="wrap-1200 recommends flex-1 m-t-25 flex justify-between ">
        <div class="host-recommend m-b-20">
            <div class="flex align-center ">
                <tab-title title="直播推荐" />
                <competition-tab class="m-l-30 p-l-10" />
            </div>
            <div class="competition-list p-15 m-t-15">
                <ul class="w-100 flex flex-wrap">
                    <li
                        class="m-l-5 m-r-5 p-t-15 p-b-15"
                        v-for="competition in competitions"
                        :key="competition.id"
                    >
                        <competition-card
                            :competition-info="competition"
                        />
                    </li>
                </ul>
            </div>
        </div>
        <div class="host-rank">
            <host-rank />
        </div>
    </div>
</template>

<script>
import TabTitle from '@/components/TabTitle'
import CompetitionTab from '@/components/CompetitionTab'
import CompetitionCard from '@/components/CompetitionCard'
import HostRank from '@/components/HostRank'
import { getCompetitions } from '@/api/competition/competition'
export default {
    name: 'RecommendAndRank',
    components: {
        HostRank,
        CompetitionTab,
        TabTitle,
        CompetitionCard
    },
    data () {
        return {
            competitions: []
        }
    },
    created () {
        this.getCompetitions()
    },
    methods: {
        async getCompetitions () {
            const { data } = await getCompetitions()
            this.competitions = data.data
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.recommends {
    .host-recommend {
        width: 950px;
        .competition-list {
            width: 950px;
            background-color: $text-white;
        }
    }
    .host-rank {
        width: 240px;
    }

}
</style>
