<template>
<div class="header flex align-center ">
    <span class="logo d-inline-block bg-center bg-no-repeat"></span>
    <div class="user-info flex flex-column justify-center m-l-15">
        <span class="font-22 font-medium text-333 m-b-5 nickname">{{ nickname }}</span>
        <div class="font-14 font-regular user-phone">
            个人账号：{{ account}}
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'PersonHeader',
    computed: {
        ...mapState('user', ['nickname', 'account'])
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.logo {
    width: 75px;
    height: 75px;
    background-image: url('../../assets/images/user.png');
    border-radius: 50%;
}
.user-info {
    .nickname {
        line-height: 30px;
    }
    .user-phone {
        color: $text-color-64;
    }
}

</style>
