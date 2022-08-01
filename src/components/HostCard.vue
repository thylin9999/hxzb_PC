<template>
<div class="flex host-card">
    <div class="avatar w-100 flex justify-between align-center">
        <div class="icon  h-100 bg-center bg-no-repeat bg-size-100"
             :style="{
                backgroundImage: `url(${cover})`
             }"
        ></div>
        <div class="info h-100 m-l-10 font-medium flex flex-column justify-between">
            <custom-span
                class="name  font-16 font-400 text-333"
                :content="hostInfo.anchor_name"
            />
            <custom-span
                class="description font-500 font-12"
                :content="hostInfo.sign || '爱生活爱小区'"
            />
        </div>
    </div>
    <div class="flex w-100 m-l-25  h-100 right-section flex-end align-center">
        <span class="unsubscribe-button pointer d-inline-block font-regular font-12 text-center" @click="subscribe">取消关注</span>
    </div>
</div>
</template>

<script>
import CustomSpan from '@/components/CustomSpan'
import { mapState } from 'vuex'
import { followHost } from '@/api/Host/Host'
import { Message } from 'element-ui'

export default {
    name: 'HostCard',
    components: {
        CustomSpan
    },
    props: {
        hostInfo: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        ...mapState('user', ['token']),
        hasAvatar () {
            return !!this.hostInfo.logo
        },
        cover () {
            return this.hasAvatar ? this.hostInfo.logo : require('../assets/images/common/host-avatar.png')
        }
    },
    methods: {
        async subscribe () {
            // 是否订阅的
            if (this.token && this.hostInfo.isSubscribe) {
                // 取消订阅
                const { msg } = await followHost(this.hostInfo.member_id)
                Message.success(msg)
                this.$emit('refresh')
            } else {
                // 未订阅
                this.openLoginDialog()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.host-card {
    background: #F1F2F5;
}
.avatar {
    height: 40px;
    .icon {
        width: 40px;
        background-color: #F1F2F5;
        border-radius: 3px;
    }
    .right-section {
        width: calc(100% - 115px);
    }
}
.unsubscribe-button{
    width: 65px;
    height: 21px;
    line-height: 21px;
    border: 1px solid #939393;
    border-radius: 3px;
    font-weight: 300;
    color: #939393;
}
::v-deep {
    .info {
        .description {
            color: #8e8e8e;
        }
    }
}
</style>
