<template>
<div class="footer text-white">
    <div class="wrap-1450 ">
        <div class="section-1 w-100 flex justify-center align-center">
            <div class="links flex justify-between align-center">
                <div class="left-web">
                    <div class="title">
                        <icon-png
                            :width="21"
                            :height="22"
                            :icon="'footer/navigation'"
                        />
                        <span class="font-medium m-l-10 font-20 font-500 text-white">网站导航</span>
                    </div>
                    <div class="row m-t-10 flex font-16 flex-column align-center justify-between">
                        <div class="flex w-100 justify-between align-center">
                            <span>三级标题</span>
                            <span>三级标题</span>
                            <span>三级标题</span>
                        </div>
                        <div class="flex w-100 justify-between align-center">
                            <span>三级标题</span>
                            <span>三级标题</span>
                            <span>三级标题</span>
                        </div>
                        <div class="flex w-100 justify-between align-center">
                            <span>三级标题</span>
                            <span>三级标题</span>
                            <span>三级标题</span>
                        </div>
                    </div>
                </div>
                <div class="help">
                    <div class="title">
                        <icon-png
                            :width="17"
                            :height="23"
                            :icon="'footer/help'"
                        />
                        <span class="font-medium m-l-10 font-20 font-500 text-white">直播帮助</span>
                    </div>
                    <div class="row m-t-10 flex font-16 flex-column align-center ">
                        <div class="flex w-100  align-center">
                            <span>开播教程</span>
                            <span class="m-l-30">直播协议</span>
                        </div>
                        <div class="flex w-100  align-center">
                            <span>直播规范</span>
                            <span class="m-l-30">开播工具</span>
                        </div>
                    </div>
                </div>
                <div class="contact">
                    <div class="title">
                        <icon-png
                            :width="22"
                            :height="22"
                            :icon="'footer/contact'"
                        />
                        <span class="font-medium m-l-10 font-20 font-500 text-white">联系我们</span>
                    </div>
                    <div class="row m-t-10 flex font-16 flex-column align-center justify-between">
                        <div class="flex w-100 justify-between align-center">
                            <span>邮箱方式：123123QQ.com</span>
                        </div>
                        <div class="flex w-100 justify-between align-center">
                            <span>邮箱方式：123123QQ.com</span>
                        </div>
                        <div class="flex w-100 justify-between align-center">
                            <span>邮箱方式：123123QQ.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-2 m-t-30 text-center flex align-center justify-center">
            <div class="about-us flex justify-between  align-center font-16">
                <span>关于我们</span>
                <span>用户协议</span>
                <span>隐私政策</span>
            </div>
        </div>
        <div class="section-3 flex justify-center align-center">
            <div class="flex justify-between align-center font-16">
                <span>桂ICP备19009876号</span>
                <span>桂网文（2019）5333-055号</span>
                <span>增值电信业务经营许可证:桂B2-20200107</span>
                <span>Copyright @ 2019-2022 海豹. ALL Rights Reserved</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import IconPng from '@/components/IconPng'
import { mapState } from 'vuex'
export default {
    name: 'Footer',
    components: {
        IconPng
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
    background-color: #0F3F6A;
    padding-top: 50px;
    padding-bottom: 90px;
    .section-1 {
        .links {
            width: 1200px;
        }
        .help{
            padding-left: 200px;
        }
        .row {
            padding-left: 30px;
            width: 370px;
            line-height: 18px;
            color: #cfcfcf;
            font-weight: 300;
        }
    }
    .about-us {
        width: 400px;
        line-height: 18px;
        color: #cfcfcf;
        font-weight: 300;
    }
    .section-3 {
        line-height: 18px;
        color: #cfcfcf;
        font-weight: 300;
        div {
            width: 1300px;
        }
    }
}
</style>
