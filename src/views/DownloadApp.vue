<template>
<div class="box bg-no-repeat flex w-100 flex-end align-center">
    <div class="info flex flex-column">
        <span class="app-name font-regular">海牛直播</span>
        <span class="sub-title font-medium">专业体育比赛直播</span>
        <ul class="w-100 flex description justify-between align-center font-regular">
            <li>高颜值主播</li>
            <li>海量比赛数据</li>
            <li>大咖相聚聊天</li>
        </ul>
        <div class="flex justify-between app-download">
            <ul class="apps flex flex-column text-center text-white">
                <li class="ios ">
                   <svg-icon class="icon-20" icon-class="ios"></svg-icon>
                    iOS
                </li>
                <li class="android">
                    <svg-icon class="icon-20" icon-class="android"></svg-icon>
                    Android
                </li>
            </ul>
            <div>
                <div class="qrcode bg-white">
                    <div class="code w-100 h-100 bg-gray2">
                        <qrcode />
                    </div>
                </div>
                <span class="download-label w-100 d-inline-block text-center">扫描二维码下载</span>
            </div>
        </div>
    </div>
    <div class="right-pic"></div>
</div>
</template>

<script>
import Qrcode from '@/components/Qrcode'
export default {
    name: 'DownloadApp',
    components: {
        Qrcode
    }
}
</script>

<style lang="scss" scoped>
.box {
    background: linear-gradient(180deg, #FFFFFF 0%, #E3E9FD 100%);
    height: 39.1vw;
}
.right-pic {
    width: 56.7vw;
    height: 39.1vw;
    background-image: url('../assets/images/download/pic.png');
    background-size: 100% 100%;
    background-position: center;
}
.info {
    width: 24.5vw;
    .app-name {
        font-size: 2.9vw;
        line-height: 4.1vw;
        color: #627FF5;
    }
    .sub-title {
        font-size: 2.9vw;
        line-height: 4.1vw;
        color: #232D42;
        margin-top: 0.42vw;
    }
    .description {
        margin-top: 0.96vw;
        color: #919CB1;
        font-size: 0.625vw;
    }
    .app-download {
        margin-top: 3.3vw;
        .download-label {
            font-size: 0.83vw;
            color: #6C778B;
            margin-top: 0.625vw;
        }
    }
    .apps {
        width: 13.5vw;
        li{
            height: 4.1vw;
            line-height: 4.1vw;
            background: #232D42;
            border-radius: 8px;
            margin-bottom: 1.46vw;
            font-size: 1.25vw;
        }
    }
    .qrcode {
        //padding: 0.625vw;
        width: 9.5vw;
        height: 9.5vw;
    }
}

::v-deep {
    .apps {
        .svg-icon {
            vertical-align: sub;
        }
    }
}
</style>
