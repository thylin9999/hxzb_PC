<template>
<div class="live-broad-cast">
    <div class="wrap-1800">
        <MatchListRow />
    </div>
    <hot-recommend class="wrap-1800"/>
    <div class="w-100 banner m-b-30 bg-no-repeat bg-center bg-size-100" :style="{
        backgroundImage: `url(${banner})`
    }"></div>
    <host-list class="wrap-1800"/>
</div>
</template>

<script>
import MatchListRow from '@/views/Competition/MatchListRow'
import HotRecommend from '@/components/HotRecommend'
import HostList from '@/views/Host/HostList'
export default {
    name: 'HostIndex',
    components: {
        MatchListRow,
        HotRecommend,
        HostList
    },
    data () {
        return {
            banner: require('../../assets/images/matches/banner.png')
        }
    }
}
</script>

<style lang="scss" scoped>
.banner {
    height: 300px;
    margin-top: 55px;
}
::v-deep {
    .live-broad-cast {
        .left-list {
           padding: 30px 0 ;
        }
    }
}
</style>
