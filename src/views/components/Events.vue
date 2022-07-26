<template>
<div class="w-100">
    <title-row
        icon="gift-event"
        title="精彩有礼"
    />
    <div class="w-100 events m-t-15">
        <ul class="flex justify-between">
            <li
                class="event-item bg-center bg-no-repeat bg-size-100"
                v-for="event in events"
                :key="event.id"
                :style="{
                    backgroundImage: `url(${event.cover})`
                }"
            >
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import TitleRow from '@/components/TitleRow'
export default {
    name: 'Events',
    components: {
        TitleRow
    },
    data () {
        return {
            events: [
                {
                    id: 1,
                    cover: require('../../assets/images/home/events/1.png')
                },
                {
                    id: 2,
                    cover: require('../../assets/images/home/events/2.png')
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.event-item {
    width: 595px;
    height: 200px;
    background-color: #C9CFED;
    border-radius: 3px;
}
.events {
    padding-bottom: 55px;
}
</style>
