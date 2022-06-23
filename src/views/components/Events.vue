<template>
<div class="wrap-1450">
    <title-row
        icon="star"
        title="精彩有礼"
    />
    <div class="w-100 events m-t-25">
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
                },
                {
                    id: 3,
                    cover: require('../../assets/images/home/events/3.png')
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.event-item {
    width: 465px;
    height: 245px;
}
.events {
    padding-bottom: 55px;
}
</style>
