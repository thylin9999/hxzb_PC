<template>
    <div class="footer text-white">
        <div class="wrap-1450 upper-section flex justify-between align-center">
            <div class="left-info flex flex-column">
                <div class="about-app w-100 flex align-center">
                    <div class="left-logo">
                        <img class="w-100" src="../../assets/images/common/logo.png" alt="">
                        <div class="font-16 m-t-10">
                            <span class="m-r-10">专业主播</span>
                            <span>独家赛事</span>
                        </div>
                    </div>
                    <ul class="right-subs flex-1 flex justify-between">
                        <li
                            class="sub-item flex flex-column align-center pointer"
                            v-for="item in descriptions"
                            :key="item.id"
                            @click="goToDescription(item)"
                        >
                            <div class="icon">
                                <svg-icon class="w-100 h-100" :icon-class="item.icon"></svg-icon>
                            </div>
                            <span class="font-12 m-t-15">{{ item.text }}</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="right-code flex align-center">
                <div class="download-buttons flex flex-column font-16 font-regular">
                    <span class="w-100 text-center">IOS下载</span>
                    <span class="w-100 text-center m-t-20">Android下载</span>
                </div>
                <div class="qrcode m-l-30">
                    <div class="code">
                        <Qrcode />
                    </div>
                </div>
            </div>
        </div>
        <div class="version-info m-t-15 p-b-15 wrap-1450 flex justify-between align-center font-12 font-regular">
            <span>桂ICP备19009876号</span>
            <span>桂网文（2019）5333-055号</span>
            <span>增值电信业务经营许可证:桂B2-20200107</span>
            <span>Copyright @ 2019-2022 海豹. ALL Rights Reserved</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Qrcode from '@/components/Qrcode'
export default {
    name: 'Footer',
    components: {
        Qrcode
    },
    data () {
        return {

        }
    },
    computed: {
        ...mapState('commonData', ['descriptions'])
    },
    methods: {
        goToDescription (item) {
            if (item.type) {
                this.$router.push({
                    name: item.type,
                    params: {
                        id: item.id
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.footer {
    height: 205px;
    background-color: $background-black;
    background-color: #0F3F6A;
    .upper-section {
        height: calc(100% - 50px);
    }
    .left-info{
        width: 900px;
    }
    .left-logo {
        width: 155px;
        margin-right: 75px;
    }
    .right-subs {
        .sub-item {
            width: 65px;
        }
        .icon {
            width: 55px;
            height: 55px;
            //border-radius: 50%;
            //background-color: $background-gray;
        }
    }
    .version-info{
        //margin-top: 35px;
    }
    .download-buttons {
        width: 145px;
        span {
            line-height: 35px;
            background-color: $background-color1;
        }
    }
    .qrcode {
        padding: 3px;
        .code {
            width: 125px;
            height: 125px;
            background-color: #eee;
        }
    }
}
::v-deep {
    .right-subs {
        .icon .svg-icon {
            width: 45px;
            height: 45px;
        }
    }
}
</style>
