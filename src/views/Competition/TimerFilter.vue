<template>
<div class="w-100 box flex align-center bg-white overflow-hidden">
    <div class="date-list w-100 h-100 p-relative">
        <span class="prev flex align-center justify-center p-absolute text-center"
              @click="prev"
              :class="{
                  'is-active': rightMove
              }"
        >
          <icon-png  class=" pointer" :width="6" :height="11" :icon="prevIcon"/>
        </span>
        <span class="next flex align-center justify-center p-absolute text-center"
              @click="next"
              :class="{
                  'is-active': rightMove
              }"
        >
           <icon-png  class=" pointer " :width="6" :height="11" :icon="nextIcon"/>
        </span>

        <div class="date-box h-100 overflow-x-auto" ref="ulBox">
            <ul ref="matchUl" class="flex h-100 align-center flex-no-wrap " :style="ulStyle">
                <li
                    v-for="date in dates"
                    :key="date.id"
                    :class="{'is-active': time === date.id}"
                    @click="changeTime(date)"
                    class="flex h-100 font-400 flex-column pointer justify-center text-center date-item align-center font-regular font-400"
                >
                    <span class="font-20  font-regular date">{{ date.date}}</span>
                    <span class="m-t-5 week">{{ date.weekName}}</span>
                    <span class="week" v-if="time === date.id">(120场)</span>
                </li>
            </ul>
        </div>
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
                width: this.dates.length * 105 + 'px'
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
    height: 110px;
    border-radius: 3px;
}

.date-list {
    padding: 0 55px;
    .prev, .next {
      width: 23px;
      height: 60px;
      line-height: 60px;
      top: 25px;
      background-color: #BFC3D8;
    }
    .prev {
      left: 15px;
    }
    .next {
        right: 15px;
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
        width: 105px;
        height: 75px;
        color: #142563;
        border-radius: 10px;
        .date{
          color: #232323;
        }
        .week {
          color: #828282;
          font-size: 14px;
        }
        &.is-active,&:hover {
          background: linear-gradient(0deg, #3B5FFF, #A2B3FF);
          .date{
            color: #fff;
          }
          .week {
            color: #DBDBDB;
          }
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
