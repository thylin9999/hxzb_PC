<template>
<div class="wrap-1450 box flex align-center bg-white">
    <ul class="tabs flex align-center justify-center">
        <li
            v-for="tab in tabs"
            :key="tab.id"
            class="flex flex-column pointer align-center m-r-30 m-l-30"
            @click="changeTab(tab)"
            :class="{'is-active': tab.id === currentTab}"
        >
            <icon-png :icon="tab.id === currentTab ? tab.icon + '-active' : tab.icon" :width="31" :height="32"/>
            <span class="tab-name m-t-5">{{ tab.title }}</span>
        </li>
    </ul>
    <div class="date-list h-100 p-relative">
        <icon-png class="prev pointer p-absolute" :width="27" :height="50" icon="common/prev"/>
        <icon-png class="next pointer p-absolute" :width="27" :height="50" icon="common/next"/>
        <div class="date-box h-100 overflow-x-auto">
            <ul class="flex h-100 flex-no-wrap ">
                <li
                    v-for="date in dates"
                    :key="date.id"
                    :class="{'is-active': time === date.id}"
                    @click="changeTime(date)"
                    class="flex h-100 flex-column pointer justify-center text-center date-item align-center font-22 font-regular font-400"
                >
                    <span>{{ date.date}}</span>
                    <span class="m-t-5">{{ date.weekName}}</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="calender p-relative h-100 flex flex-column pointer justify-center align-center">
        <icon-png icon="icons/filter" :width="22" :height="22"/>
        <span class="title m-t-10 font-16 font-regular font-400">筛选</span>
        <el-date-picker
            class="w-100 h-100 opacity-0 p-absolute time-picker"
            v-model="showTime"
            type="date"
            @change="selectTime"
            placeholder="选择日期">
        </el-date-picker>
    </div>
</div>
</template>

<script>
import IconPng from '@/components/IconPng'
import dayjs from 'dayjs'
import { weekDay } from '@/utils/utils'
const isoweek = require('dayjs/plugin/isoWeek')
export default {
    name: 'TimerFilter',
    components: {
        IconPng
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
    data () {
        return {
            currentTab: 1,
            tabs: [
                {
                    id: 1,
                    title: '赛程',
                    icon: 'icons/calender'
                },
                {
                    id: 2,
                    title: '赛果',
                    icon: 'icons/result'
                }
            ],
            showTime: ''
        }
    },
    computed: {
        dates () {
            const today = dayjs()
            const dates = []
            const startDate = dayjs(today).subtract(7, 'day')
            for (let i = 0; i < 15; i++) {
                const date = dayjs(startDate).add(i, 'day')
                dates.push({
                    id: dayjs(date).format('YYYY-MM-DD'),
                    date: dayjs(date).format('MM-DD'),
                    week: dayjs(date).isoWeekday(),
                    weekName: weekDay[dayjs(date).isoWeekday()]
                })
            }
            return dates
        }
    },
    watch: {
        time: {
            handler () {
                this.showTime = new Date(this.time)
            },
            immediate: true
        }
    },
    created () {
        dayjs.extend(isoweek)
    },
    methods: {
        changeTab (tab) {
            this.currentTab = tab.id
            this.$emit('update:type', this.currentTab)
        },
        changeTime (date) {
            this.$emit('update:time', date.id)
        },
        selectTime (value) {
            const date = dayjs(new Date(value).getTime()).format('YYYY-MM-DD')
            this.$emit('update:time', date)
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    height: 107px;
    border-radius: 10px;
}
.tabs {
    width: 245px;
    li {
        .tab-name{
            font-size: 25px;
            font-weight: 600;
            color: #919191;

        }
        &.is-active {
            .tab-name {
                color: #01114B;
            }
        }
    }

}
.date-list {
    width: calc(100% - 335px);
    padding: 0 35px;
    .prev {
        left: 60px;
        top: 30px;
    }
    .next {
        right: 60px;
        top: 30px;
    }
    .date-box {
        width: 840px;
        margin: 0 auto;
        ul {
            width: 1800px;
        }

    }
    .date-item {
        width: 120px;
        color: #142563;
        border-bottom: 3px solid transparent;
        &.is-active,&:hover {
            border-color: #161C94;
        }
    }
}
.calender{
    width: 90px;
    box-shadow: -2px 0 2px rgba(0,0,0,0.5);
    border-radius: 10px;
    .title {
        color: #10234B;
    }
    .time-picker {
        left: 0;
        top: 0;
        z-index: 2;
    }
}
</style>
