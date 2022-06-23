<template>
<div class="card">
    <div class="live-cover w-100 bg-center bg-no-repeat bg-size-100"
        :style="{
            backgroundImage: `url(${info.cover})`
        }"
    >
    </div>
    <div class="host flex justify-between align-center p-t-10 p-b-10 bg-white p-l-15 p-r-15">
        <span class="avatar d-inline-block bg-center bg-no-repeat bg-size-100"></span>
        <div class="title font-medium ">
            <span class="title w-100 d-inline-block font-20 font-500 text-5e text-ellipsis">阿是砥砺奋进阿加莎代发拉萨代发</span>
            <div class="name font-15 flex m-t-5 justify-between align-center">
                <span class="">{{ info.host.name }}</span>
                <div class="views flex align-center">
                    <span class="icon bg-center bg-no-repeat d-inline-block bg-size-100"></span>
                    <span class="m-l-5">{{ info.views }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'LiveBroadCard',
    props: {
        info: {
            type: Object,
            default: () => ({})
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
