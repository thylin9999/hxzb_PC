<template>
<div class="subscribe-page">
    <online-broadcast />
    <not-subscribe-broadcast />
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
