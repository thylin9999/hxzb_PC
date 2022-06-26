<template>
<div class="wrap-1800 p-t-15 ">
    <title-row class="title-row m-b-25" icon="un-live" title="未开播" />
    <div class="list bg-white p-t-15 p-b-25" v-loading="isLoading">
        <div v-if="tableData.length" class="host-list">
            <ul v-if="tableData.length" class="w-100 flex flex-wrap">
                <li
                    class=" p-t-25 p-b-25 item"
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
import TitleRow from '@/components/TitleRow'
import HostCard from '@/components/HostCard'
import { getSubscribeHost } from '@/api/Host/Host'

export default {
    name: 'NotSubscribeBroadcast',
    components: {
        TitleRow,
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
            try {
                this.isLoading = true
                const res = await getSubscribeHost({})
                this.tableData = res.data
                console.log(this.tableData, 'asdf111')
            } catch (e) {
                console.log('出错了')
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    min-height: 300px;
    .item {
        width: 290px;
        padding-left: 85px;
    }
}
::v-deep {
    .el-empty {
        padding: 0!important;
    }
    .title-row {
        .icon {
            width: 24px!important;
        }
    }
}
</style>
