<template>
    <ul class=" flex align-center">
        <li
            v-for="type in options"
            :key="type.id"
            @click="changeId(type)"
            class="m-r-10 item pointer font-16 text-center bg-center bg-no-repeat bg-size-100"
            :class="{'is-active': activeId === type.id }"
        >
            <span class="font-12 scale-9">{{ type.title }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MatchTypes',
    props: {
        activeId: {
            type: [String, Number],
            default: ''
        },
        options: {
            type: Array,
            default: () => ([])
        }
    },
    methods: {
        changeId (type) {
            this.$emit('update:activeId', type.id * 1)
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    width: 80px;
    line-height: 22px;
    background-image: url('../../assets/images/common/tab.png');
    color: #A0A0A0;
    &.is-active {
        background-image: url('../../assets/images/common/tab-active.png');
        color:#fff;
    }
}
</style>
