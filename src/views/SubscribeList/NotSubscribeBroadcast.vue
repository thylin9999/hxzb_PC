<template>
<div class="wrap-1200 p-t-15 p-l-15 bg-white">
    <tab-title title="暂未开通" />
    <div class="list" v-loading="isLoading">
        <div v-if="tableData.length" class="host-list">
            <ul v-if="tableData.length" class="w-100 flex flex-wrap">
                <li
                    class="m-l-5 m-r-5 p-t-15 p-b-15"
                    v-for="host in tableData"
                    :key="host.id"
                >
                    <host-card
                        :host-info="host"
                    />
                </li>
            </ul>
        </div>
        <el-empty v-else :image-size="108"></el-empty>
    </div>
</div>
</template>

<script>
import TabTitle from '@/components/TabTitle'
import HostCard from '@/components/HostCard'
import { getHosts } from '@/api/Host/Host'

export default {
    name: 'NotSubscribeBroadcast',
    components: {
        TabTitle,
        HostCard
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
            const res = await getHosts()
            this.isLoading = false
            this.tableData = res.data
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-empty {
        padding: 0!important;
    }
}
</style>
