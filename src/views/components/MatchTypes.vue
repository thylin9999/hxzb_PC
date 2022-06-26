<template>
    <ul class=" flex align-center">
        <li
            v-for="type in types"
            :key="type.id"
            @click="changeId(type)"
            class="m-r-10 item pointer font-16 text-center bg-center bg-no-repeat bg-size-100"
            :class="{'is-active': activeId === type.id }"
        >
            <span>{{ type.title }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MatchTypes',
    props: {
        hostId: {
            type: [String, Number],
            default: ''
        }
    },
    data () {
        return {
            types: [
                {
                    id: 1,
                    title: '正在热播',
                    key: 'living'
                },
                {
                    id: 2,
                    title: '足球热播',
                    key: 'football'
                },
                {
                    id: 3,
                    title: '篮球热播',
                    key: 'basketball'
                },
                {
                    id: 4,
                    title: '电竞热播',
                    key: 'eSports'
                },
                {
                    id: 5,
                    title: '其他',
                    key: 'other'
                }
            ],
            activeId: 1
        }
    },
    created () {
        this.activeId = this.hostId
    },
    methods: {
        changeId (type) {
            this.activeId = type.id
            this.$emit('update:hostId', this.activeId)
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    width: 100px;
    line-height: 30px;
    background-image: url('../../assets/images/common/tab.png');
    color: #A0A0A0;
    &.is-active {
        background-image: url('../../assets/images/common/tab-active.png');
        color: #3C3F5B;
    }
}
</style>
