<template>
<div class="card">
    <div class="w-100 overflow-hidden">
      <div class="live-cover pointer  bg-center bg-no-repeat transition-3"
           :class="{
              'bg-size-100': hasCover,
              'bg-size-auto': !hasCover
           }"
           :style="{
            backgroundImage: `url(${cover})`
        }"
      >
      </div>
    </div>
    <div class="host flex justify-between align-center p-t-10 p-b-10 bg-white p-l-15 p-r-15">
        <span class="avatar d-inline-block bg-center bg-no-repeat bg-size-100"></span>
        <div class="title font-medium ">
          <custom-span
              class="font-20 font-500 text-5e"
              :content="info.room_title"
          />
            <div class="name font-15 flex m-t-5 justify-between align-center">
                <span class="">{{ info.nick }}</span>

                <div class="views flex align-center">
                    <span class="icon bg-center bg-no-repeat d-inline-block bg-size-100"></span>
                    <span class="m-l-5">{{ info.heat_num }}</span>
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
        }
    },
    computed: {
        hasCover () {
            return !!this.info.img
        },
        cover () {
            return this.hasCover ? this.info.img : require('../assets/images/common/host-blank.png')
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    border-radius: 10px;
    overflow: hidden;
    width: 340px;
    height: 265px;
    .live-cover {
        height: 190px;
        background-color: #f2f2f2;
      &:hover {
        transform: scale(1.2);
      }
    }
    .host {
        .avatar{
            width: 54px;
            height: 54px;
            background-image: url('../assets/images/common/host-avatar.png');
        }
        div.title {
            width: calc(100% - 84px);
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
</style>
