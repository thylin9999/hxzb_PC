<template>
<div class="list">
    <ul class="flex w-100 align-center">
        <li
            v-for="host in hosts"
            :key="host.id"
            class="card text-center pointer m-l-15 m-r-15"
        >
            <div
                class="icon m-b-15 bg-center bg-no-repeat bg-size-100"
                :style="{
                backgroundImage: `url(${host.logo})`
                }"
            ></div>
            <CustomSpan :content="host.anchor_name" />
        </li>
    </ul>
</div>
</template>

<script>
import { getOfflineHost } from '@/api/Host/Host'
import CustomSpan from '@/components/CustomSpan'
export default {
    name: 'OfflineHosts',
    components: {
        CustomSpan
    },
    data () {
        return {
            hosts: []
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            try {
                const { data } = await getOfflineHost()
                this.hosts = data
            } catch (e) {
                console.log('出错了')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    width: 100px;
    .icon{
        width: 55px;
        height: 55px;
        margin: 0 auto;
        background-color: #C9CFED;
        border-radius: 10px;
    }
}
</style>
