<template>
<div class="subscribe-page p-t-20">
    <online-broadcast />
    <not-subscribe-broadcast class="m-t-20" />
    <recommend-and-rank />
</div>
</template>

<script>
import OnlineBroadcast from '@/views/SubscribeList/OnlineBroadcast'
import NotSubscribeBroadcast from '@/views/SubscribeList/NotSubscribeBroadcast'
import RecommendAndRank from '@/components/RecommendAndRank'
export default {
    name: 'SubscribeList',
    components: {
        OnlineBroadcast,
        NotSubscribeBroadcast,
        RecommendAndRank
    }
}
</script>

<style scoped>

</style>
