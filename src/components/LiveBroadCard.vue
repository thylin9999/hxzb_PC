<template>
<div class="card">
    <div
        v-if="showTopImg"
        class="top-image bg-center p-relative bg-no-repeat bg-size-100"
        :style="{
            backgroundImage: `url(${topImg})`
        }"
    >
      <span class="font-600 p-absolute top-text" :class="`top${index+1}`">TOP{{ index + 1}}</span>
    </div>
    <div class="w-100 overflow-hidden">
      <div class="live-cover p-relative pointer  bg-center bg-no-repeat transition-3"
           :class="{
              'bg-size-100': hasCover,
              'bg-size-auto': !hasCover
           }"
           :style="{
            backgroundImage: `url(${cover})`
        }"
      >
          <div class="mask w-100 h-100 pointer p-relative" :style="maskBg" @click="goLiveRoom">

          </div>
      </div>
    </div>
    <div class="host flex  align-center p-t-10 p-b-10 bg-white p-l-10 p-r-15">
        <span
            class="avatar d-inline-block bg-center border-radius-50 bg-no-repeat bg-size-100"
            :style="{
                backgroundImage: info.img ? `url(${info.img})` : `url(${hostImg})`
            }"
        ></span>
        <div class="title font-medium m-l-5">
          <custom-span
              class="font-16 font-500 text-5e"
              :content="info.room_title"
          />
            <div class="name font-14 flex m-t-5 justify-between align-center">
                <span class="">{{ info.nick }}</span>

                <div class="views flex align-center">
                    <span
                        class="icon bg-center bg-no-repeat d-inline-block bg-size-100"
                    ></span>
                    <span class="m-l-5 font-15">{{ info.heat_num }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CustomSpan from '@/components/CustomSpan'
export default {
    name: 'LiveBroadCard',
    components: {
        CustomSpan
    },
    props: {
        info: {
            type: Object,
            default: () => ({})
        },
        index: {
            type: Number,
            default: 1
        },
        showTopImg: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasCover () {
            return !!this.info.live_cover
        },
        cover () {
            return this.hasCover ? this.info.live_cover : require('../assets/images/common/host-blank.png')
        },
        topImg () {
            const num = this.index > 4 ? 4 : this.index
            return require(`../assets/images/matches/top${num + 1}.png`)
        },
        maskBg () {
            return {
                backgroundImage: `url(${process.env.VUE_APP_START_BUTTON})`
            }
        },
        hostImg () {
            return require('../assets/images/common/host-avatar.png')
        }
    },
    methods: {
        goLiveRoom () {
            console.log(this.info, 'info')
            const { href } = this.$router.resolve({
                path: '/liveRoom',
                query: { room_id: this.info.room_id }
            })
            window.open(href, '_blank')
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    border-radius: 10px;
    overflow: hidden;
    width: 284px;
    .live-cover {
        height: 159px;
        background-color: #f2f2f2;
        .mask {
            background-color: rgba(0,0,0,.7);
            display: none;
            background-size: auto;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 3;
        }
      &:hover {
        transform: scale(1.2);
        .mask {
            display: block;
        }
      }
    }
    .host {
        .avatar{
            width: 50px;
            height: 50px;
            //background-image: url('../assets/images/common/host-avatar.png');
        }
        div.title {
            width: calc(100% - 55px);
            .name {
                color: #A0A0A0;
            }
        }
        .views {
            .icon {
                width: 14px;
                height: 17px;
                background-image: url('../assets/images/icons/hot.png');
            }
        }
    }
}
.top-image {
  margin: 0 auto 20px;
  width: 290px;
  height: 84px;
}
.top-text {
  font-size: 35px;
  line-height: 60px;
  left: 135px;
  top: 0;
}
.top1 {
  color: #FA8300;
}
.top2 {
  color: #598888;
}
.top3 {
  color: #B55D4A;
}
.top4 {
  color: #398BAC;
}
.top5 {
  color: #398BAC;
}

</style>
