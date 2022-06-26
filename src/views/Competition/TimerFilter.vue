<template>
<div class="wrap-1450">
<ul class="tabs">

</ul>
</div>
</template>

<script>
import IconPng from '@/components/IconPng'
export default {
    name: 'TimerFilter',
    components: {
        // IconPng
    },
    props: {
        time: {
            type: String,
            default: ''
        },
        type: {
            type: Number,
            default: 1
        }
    },
    tabs: [
        {
            id: 1,
            title: '赛程'
        },
        {
            id: 2,
            title: '赛果'
        }
    ]
}
</script>

<style scoped>

</style>
