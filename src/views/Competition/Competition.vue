<template>
<div class="wrap-1200 p-b-30">
    <div class="tabs m-t-20  p-l-30 p-t-20 p-b-20 overflow-hidden">
        <tabs
            :current-id.sync="currentId"
            :tabs="competitionTabs"
            @updateTab="changeTab"
        />
    </div>
    <div class="p-10 bg-gray2"></div>
    <div class="content  p-b-20">
        <div class="competitions p-25">
            <ul class="w-100 flex flex-wrap">
                <li
                    class="p-l-5 p-r-5 m-b-25"
                    v-for="competition in competitions"
                    :key="competition.id"
                >
                    <competition-card :competition-info="competition" />
                </li>
            </ul>
        </div>
        <pagination
            class="text-center m-b-20"
            :total="pagination.total"
            :current-page.sync="pagination.currentPage"
        />
    </div>
</div>
</template>

<script>
import Tabs from '@/components/Tabs'
import Pagination from '@/components/Pagination'
import CompetitionCard from '@/components/CompetitionCard'
import { getCompetitions } from '@/api/competition/competition'
import { mapState } from 'vuex'
export default {
    name: 'Competition',
    components: {
        Tabs,
        Pagination,
        CompetitionCard
    },
    data () {
        return {
            currentId: 1,
            competitions: [],
            pagination: {
                total: 0,
                currentPage: 1
            }
        }
    },
    computed: {
        ...mapState('commonData', ['competitionTabs']),
        fetchDataParams () {
            return {
                currentId: this.currentId,
                pagination: this.pagination
            }
        }
    },
    watch: {
        fetchDataParams: {
            handler () {
                this.fetchData()
            },
            deep: true
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        changeTab (tab) {
            console.log(tab, 'tab')
        },
        async fetchData () {
            const { data, page } = await getCompetitions()
            this.competitions = data
            this.pagination.total = page.total
            this.pagination.currentPage = page.current
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.tabs {
    background-color: $text-white;
}
.content {
    background-color: $text-white;
    .competitions {

    }
}
</style>
