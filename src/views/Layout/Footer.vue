<template>
<div class="footer text-white">
    <div class="wrap-1450 h-100 flex justify-between align-center">
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
            <div class="version-info font-12 font-regular">
                软件名称：海豹直播APP 版本V1.0 更新时间：2022.05.21 开发者：某某某科技有限公司 版权所有：某某某科技有限公司
            </div>
        </div>
        <div class="right-code flex align-center">
            <div class="download-buttons flex flex-column font-16 font-regular">
                <span class="w-100 text-center">IOS下载</span>
                <span class="w-100 text-center m-t-20">Android下载</span>
            </div>
            <div class="qrcode m-l-30">
                <div class="code"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Footer',
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
    background-color: #0F3F6A;
    .left-info{
        width: 740px;
    }
    .left-logo {
        width: 155px;
        margin-right: 75px;
    }
    .right-subs {
        .sub-item {
            width: 50px;
        }
        .icon {
            width: 45px;
            height: 45px;
            //border-radius: 50%;
            //background-color: $background-gray;
        }
    }
    .version-info{
        margin-top: 35px;
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
