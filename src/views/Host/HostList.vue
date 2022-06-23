<template>
<div class="wrap-1450">
    <title-row icon="sport" title="全部直播" class="m-b-30 m-t-20">
        <more-button />
    </title-row>
    <div class="w-100">
        <ul class="flex flex-wrap justify-between">
            <li
                v-for="item in list"
                :key="item.id"
                class="m-b-30"
            >
                <live-broad-card
                    :info="item"
                />
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import TitleRow from '@/components/TitleRow'
import MoreButton from '@/components/MoreButton'
import LiveBroadCard from '@/components/LiveBroadCard'
import { getHosts } from '@/api/Host/Host'

export default {
    name: 'HostList',
    components: {
        TitleRow,
        MoreButton,
        LiveBroadCard
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
                const { data } = await getHosts()
                this.list = data
            } catch (e) {
                console.log('出错了')
            }
        }
    }
}
</script>

<style scoped>

</style>
