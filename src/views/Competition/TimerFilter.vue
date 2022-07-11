<template>
<div class="wrap-1200 box flex align-center bg-white overflow-hidden">
    <ul class="tabs flex align-center justify-center">
        <li
            v-for="tab in tabs"
            :key="tab.id"
            class="flex flex-column pointer align-center m-l-15 m-r-15"
            @click="changeTab(tab)"
            :class="{'is-active': tab.id === currentTab}"
        >
            <icon-png :icon="tab.id === currentTab ? tab.icon + '-active' : tab.icon" :width="26" :height="27"/>
            <span class="tab-name m-t-5">{{ tab.title }}</span>
        </li>
    </ul>
    <div class="date-list h-100 p-relative">
        <icon-png @click.native="prev" :class="{
            'is-active': leftMove
        }" class="prev pointer p-absolute" :width="14" :height="25" :icon="prevIcon"/>
        <icon-png @click.native="next" :class="{
            'is-active': rightMove
        }" class="next pointer p-absolute" :width="14" :height="25" :icon="nextIcon"/>
        <div class="date-box p-l-10 h-100 overflow-x-auto" ref="ulBox">
            <ul ref="matchUl" class="flex h-100 flex-no-wrap " :style="ulStyle">
                <li
                    v-for="date in dates"
                    :key="date.id"
                    :class="{'is-active': time === date.id}"
                    @click="changeTime(date)"
                    class="flex h-100 flex-column m-r-10 pointer justify-center text-center date-item align-center font-18 font-regular font-400"
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
            :picker-options="pickerOptions"
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
const isBetween = require('dayjs/plugin/isBetween')
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
            leftMove: false,
            rightMove: false,
            showTime: ''
        }
    },
    computed: {
        dates () {
            // 赛程往后14天，赛果，往前 7天
            const dates = []
            if (this.type === 1) {
                // 赛程
                for (let i = 0; i <= 14; i++) {
                    const date = dayjs().add(i, 'day')
                    dates.push({
                        id: dayjs(date).format('YYYY-MM-DD'),
                        date: dayjs(date).format('MM-DD'),
                        week: dayjs(date).isoWeekday(),
                        weekName: weekDay[dayjs(date).isoWeekday()]
                    })
                }
            } else {
                for (let i = 0; i <= 7; i++) {
                    const date = dayjs().subtract(i, 'day')
                    dates.unshift({
                        id: dayjs(date).format('YYYY-MM-DD'),
                        date: dayjs(date).format('MM-DD'),
                        week: dayjs(date).isoWeekday(),
                        weekName: weekDay[dayjs(date).isoWeekday()]
                    })
                }
            }
            return dates
        },
        ulStyle () {
            return {
                width: this.dates.length * 110 + 'px'
            }
        },
        pickerOptions () {
            return {
                disabledDate: date => {
                    // return
                    return !dayjs(date).isBetween(dayjs(this.dates[0].id), dayjs(this.dates[this.dates.length - 1].id), 'day', '[[')
                }
            }
        },
        prevIcon () {
            return this.leftMove ? 'common/prev' : 'common/prev-dis'
        },
        nextIcon () {
            return this.rightMove ? 'common/next' : 'common/next-dis'
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
        dayjs.extend(isBetween)
    },
    mounted () {
        this.$nextTick(() => {
            this.initScroll()
        })
    },
    methods: {
        initScroll () {
            this.$nextTick(() => {
                const wrapperInfo = this.$refs.ulBox.getBoundingClientRect()
                const wrapperWidth = wrapperInfo.width
                const innerUlInfo = this.$refs.matchUl.getBoundingClientRect()
                const innerUlWidth = innerUlInfo.width
                this.rightMove = this.$refs.ulBox.scrollLeft + wrapperWidth + 10 < innerUlWidth
                this.leftMove = this.$refs.ulBox.scrollLeft > 10
            })
        },
        changeTab (tab) {
            if (this.currentTab === tab.id) {
                return
            }
            this.$emit('setToday')
            this.currentTab = tab.id
            this.$emit('update:type', this.currentTab)
        },
        changeTime (date) {
            this.$emit('update:time', date.id)
        },
        selectTime (value) {
            const date = dayjs(new Date(value).getTime()).format('YYYY-MM-DD')
            this.$emit('update:time', date)
        },
        prev () {
            if (this.leftMove) {
                const left = this.$refs.ulBox.scrollLeft
                this.$refs.ulBox.scrollTo({
                    left: left - 250,
                    behavior: 'smooth'
                })
                setTimeout(() => {
                    this.initScroll()
                }, 300)
            }
        },
        next () {
            if (this.rightMove) {
                const left = this.$refs.ulBox.scrollLeft
                this.$refs.ulBox.scrollTo({
                    left: left + 250,
                    behavior: 'smooth'
                })
                setTimeout(() => {
                    this.initScroll()
                }, 300)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    height: 80px;
    border-radius: 3px;
}
.tabs {
    width: 230px;
    li {
        .tab-name{
            font-size: 20px;
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
    width: calc(100% - 320px);
    padding: 0 70px 0 35px;
    .prev {
        left: 0px;
        top: 30px;
    }
    .next {
        right: 30px;
        top: 30px;
    }
    .date-box {
        width: 100%;
        margin: 0 auto;
        ul {
            //width: 1800px;
        }
    }
   .date-box::-webkit-scrollbar {
     height: 5px;
   }

    .date-item {
        width: 100px;
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
