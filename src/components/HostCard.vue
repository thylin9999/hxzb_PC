<template>
<div class="box flex flex-column  ">
    <div class="avatar w-100 flex justify-between align-center">
        <div class="icon h-100 bg-center bg-no-repeat bg-size-100"
             :style="{
                backgroundImage: `url(${cover})`
             }"
        ></div>
        <div class="flex w-100 m-l-25 h-100 right-section flex-end flex-column align-center">
            <HotValue
                class="w-100 m-b-10"
                :value="hostInfo.heat_num"
            />
            <SubscribeButton
                class="w-100 font-16 text-center"
                :is-subscribe="hostInfo.isSubscribe"
                @click.native="subscribe(hostInfo)"
            />
        </div>
    </div>
    <div class="info font-medium ">
        <custom-span
            class="name m-b-15"
            :content="hostInfo.name"
        />
        <custom-span
            class="description font-500 font-18"
            :content="hostInfo.description"
        />
    </div>
</div>
</template>

<script>
import CustomSpan from '@/components/CustomSpan'
import HotValue from '@/components/HotValue'
import SubscribeButton from '@/components/SubscribeButton'
export default {
    name: 'HostCard',
    components: {
        CustomSpan,
        HotValue,
        SubscribeButton
    },
    props: {
        hostInfo: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        hasAvatar () {
            return !!this.hostInfo.avatar
        },
        cover () {
            return this.hasAvatar ? this.hostInfo.avatar : require('../assets/images/common/host-avatar.png')
        }
    },
    methods: {
        subscribe (hostInfo) {
            // 是否订阅的
            console.log(hostInfo, 'hostInfo')
        }
    }
}
</script>

<style lang="scss" scoped>
.avatar {
    height: 90px;
    .icon {
        width: 90px;
    }
    .right-section {
        width: calc(100% - 115px);
    }
}
::v-deep {
    .info {
        margin-top: 35px;
        .name {
            font-size: 24px;
            color: #5E5E5E;
        }
        .description {
            color: #A0A0A0;
        }
    }
}
</style>
