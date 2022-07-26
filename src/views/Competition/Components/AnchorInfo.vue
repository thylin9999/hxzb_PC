<template>
<div class="anchor-info flex justify-between align-center">
    <div class="user-info flex align-center">
        <span
            class="user-icon d-inline-block border-radius-50 bg-no-repeat bg-size-100 bg-center"
            :style="{
                backgroundImage: `url(${anchor.img})`
            }"
        ></span>
        <div class="flex flex-column m-l-5">
            <span class="text-14 font-12">{{ anchor.nick }}</span>
            <span class="text-gray2 scale-9">专业足球评说</span>
        </div>
    </div>
    <div class="operation flex align-center">
        <span class="icon d-inline-block bg-center bg-no-repeat bg-size-100"></span>
        <span class="enter-room pointer m-l-5 p-l-10 p-r-10" @click="goToLiveRoom">
            <span class="scale-9 font-12">进入直播间</span>
        </span>
    </div>
</div>
</template>

<script>
export default {
    name: 'AnchorInfo',
    props: {
        anchor: {
            // heat_num: 10070
            // img: "http://img.wuhaicj.com/62bf6b1b9607b.jpeg"
            // is_position: 2
            // live_status: 2
            // match_id: 2249267
            // nick: "海牛会员3"
            // room_id: "1000003"
            // username: null
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        goToLiveRoom () {
            const { href } = this.$router.resolve({
                path: '/liveRoom',
                query: { room_id: this.anchor.room_id }
            })
            window.open(href, '_blank')
        }
    }
}
</script>

<style lang="scss" scoped>
.user-info {
    .user-icon {
        background-color: #C9CFED;
        width: 30px;
        height: 30px;
    }
}
.operation {
    .icon {
        width: 12px;
        height: 16px;
        background-image: url('../../../assets/images/common/live.gif');
    }
    .enter-room{
        background-color: #FB7674;
        line-height: 17px;
        border-radius: 3px;
        color: #fff;
    }
}
</style>
