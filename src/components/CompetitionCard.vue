<template>
<div class="card">
    <div class="competition-mask w-100 bg-center bg-no-repeat"
        :style="{
            backgroundImage: `url(${competitionInfo.img})`
        }"
    >
        <div class="mask w-100 h-100 pointer" :style="maskBg" @click="goLiveRoom">

        </div>
    </div>
    <div class="competition-info p-l-10 p-r-10 font-regular">
        <div class="battle-info p-t-10 font-16 text-333 flex justify-between align-center font-regular">
            <span>{{ team1.name }}</span>
            <span>VS</span>
            <span>{{ team2.name }}</span>
        </div>
        <div class="host-info flex m-t-5 m-b-10 justify-between align-center font-regular text-gray font-14">
            <span>{{ hostInfo.name }}</span>
            <span>
            <svg-icon class="icon-10" icon-class="fire"></svg-icon>
            <span>{{ hostInfo.viewers.count }}</span>
        </span>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'CompetitionCard',
    props: {
        competitionInfo: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        hostInfo () {
            return this.competitionInfo.user
        },
        team1 () {
            return this.competitionInfo.team1
        },
        team2 () {
            return this.competitionInfo.team2
        },
        maskBg () {
            return {
                backgroundImage: `url(${process.env.VUE_APP_START_BUTTON})`
            }
        }
    },
    methods: {
        goLiveRoom () {
            // this.$router.push("/liveRoom")
            const { href } = this.$router.resolve({
                path: '/liveRoom',
                query: { room_id: 12345 }
            })
            window.open(href, '_blank')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.card {
    width: 220px;
    .competition-info {
        border: 1px solid $border-color1;
        border-top: none;
        .battle-info {
            line-height: 24px;
        }
        .host-info {
            line-height: 20px;
        }
    }
    .competition-mask {
        height: 120px;
        .mask {
            background-color: rgba(0,0,0,.7);
            display: none;
            background-size: auto;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
    &:hover {
        .competition-mask .mask {
            display: block;
        }
    }
}
</style>
