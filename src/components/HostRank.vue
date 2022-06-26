<template>
<div class="wrap-1450">
    <title-row
        icon="gift"
        title="主播排行"
        class="m-b-30 m-t-20"
    >
        <more-button class="m-r-15"/>
    </title-row>
    <div class="host-section flex justify-between align-center p-t-20 p-b-20 m-t-25 m-b-25 bg-white w-100">
        <div class="first-three">
            <ul class="prizes flex align-center justify-between">
                <li
                    v-for="(host, index) in firstRank"
                    :key="host.id"
                    class="rank-item flex flex-column justify-center align-center"
                >
                    <div class="icon p-relative bg-center flex justify-center align-center bg-no-repeat bg-size-100" :class="`rank-${index}`">
                        <div class="avatar  bg-center bg-no-repeat bg-size-100"></div>
                        <span class="p-absolute bg-center bg-no-repeat bg-size-100 name font-14 d-inline-block w-100 text-center" >{{ host.name }}</span>
                    </div>
                    <span class="text-888 m-t-15 m-b-10 w-100 text-ellipsis">{{ host.description }}</span>
                    <submit-button :subscribed="host.isSubscribe" />
                </li>
            </ul>
        </div>
        <div class="left-host w-100">
            <ul class="w-100">
                <li
                    v-for="host in leftRank"
                    :key="host.id"
                    class="flex justify-between host-item align-center"
                >
                    <div class="left-section flex align-center">
                        <div class="icon m-r-10 bg-no-repeat bg-center bg-size-100"></div>
                         <div class="flex host-info flex-column ">
                             <span class="font-16 host-name font-regular">{{ host.name }}</span>
                             <span class="w-100 text-888 text-ellipsis font-14">{{ host.description }}</span>
                         </div>
                    </div>
                    <submit-button :subscribed="host.isSubscribe" />
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import TitleRow from '@/components/TitleRow'
import MoreButton from '@/components/MoreButton'
import SubmitButton from '@/components/SubmitButton'
import { getHostRank } from '@/api/Host/Host'

export default {
    name: 'HostRank',
    components: {
        TitleRow,
        MoreButton,
        SubmitButton
    },
    data () {
        return {
            hosts: []
        }
    },
    computed: {
        firstRank () {
            return this.hosts.slice(0, 3)
        },
        leftRank () {
            return this.hosts.slice(3)
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            try {
                const { data } = await getHostRank()
                this.hosts = data
            } catch (e) {
                console.log('出错了')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.host-section {
    height: 250px;

    .first-three {
        width: 895px;
        border-right: 1px solid #B9B9B9;
        padding: 0 75px;
        .rank-item {
            width: 225px;
        }
        .rank-0 {
            background-image: url('../assets/images/host/gold.png');
            .name {
                background-image: url('../assets/images/host/gold-name.png');
                color: #907A10;
            }
        }
        .rank-1 {
            background-image: url('../assets/images/host/silver.png');
            .name {
                background-image: url('../assets/images/host/silver-name.png');
                color: #7B7B7B;
            }
        }
        .rank-2 {
            background-image: url('../assets/images/host/bronze.png');
            .name {
                background-image: url('../assets/images/host/bronze-name.png');
                color: #A76830;
            }
        }
        .avatar {
            width: 105px;
            height: 105px;
            background-image: url('../assets/images/common/host-avatar.png');
        }
        .icon {
            width: 118px;
            height: 130px;
        }
        .name {
            bottom: -10px;
            width: 118px;
            height: 38px;
            line-height: 35px;
        }
    }
    .left-host {
        padding: 25px 35px 25px 40px;
        .host-item {
            margin: 12.5px 0;
        }
        .left-section {
            .host-info {
                //width: 225px;
            }
            .host-name{
                line-height: 24px;
                color: #444343;
            }
            .icon {
                width: 50px;
                height: 50px;
                background-image: url('../assets/images/common/host-avatar.png');
            }
        }
    }
}
</style>
