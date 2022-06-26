<template>
<div class="wrap-1450">
    <div class="p-relative">
        <title-row icon="sport" title="全部直播" class="m-b-30 m-t-20">
            <more-button />
        </title-row>
        <match-types
            class="match-types p-absolute"
            :host-id.sync="hostId"
        />
    </div>
    <div class="w-100">
        <ul class="flex flex-wrap hosts">
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
import MatchTypes from '@/views/components/MatchTypes'
import { getHosts } from '@/api/Host/Host'

export default {
    name: 'HostList',
    components: {
        TitleRow,
        MoreButton,
        LiveBroadCard,
        MatchTypes
    },
    data () {
        return {
            list: [],
            hostId: 1
        }
    },
    created () {
        this.fetchData()
    },
    watch: {
        hostId () {
            this.fetchData()
        }
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

<style lang="scss" scoped>
.hosts{
    li {
        margin-right: 30px;
    }
    li:nth-child(4n) {
        margin-right: 0;
    }
}
.match-types {
    left: 200px;
    top: 5px;
}
</style>
