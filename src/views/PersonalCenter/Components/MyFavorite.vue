<template>
<div class="box">
    <header-title title="我关注的直播"/>
    <div class="hosts m-t-15">
        <ul class="list flex flex-wrap">
            <li
                v-for="host in list"
                :key="host.id"
                class="host-item m-r-10 m-b-10"
            >
                <HostCard class="w-100 h-100 p-t-10 p-b-10 p-l-15 p-r-15" :host-info="host" />
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import HeaderTitle from '@/views/PersonalCenter/Components/HeaderTitle'
import { getFlowedHosts } from '@/api/Host/Host'
import HostCard from '@/components/HostCard'
import { statusCode } from '@/utils/statusCode'
import { Message } from 'element-ui'
export default {
    name: 'MyFavorite',
    components: {
        HeaderTitle,
        HostCard
    },
    data () {
        return {
            list: []
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            try {
                const { data, code, msg } = await getFlowedHosts()
                if (code === statusCode.success) {
                    this.list = [].concat(data.start_live, data.stop_live)
                } else {
                    Message.error(msg)
                }
            } catch (e) {
                console.log('出错了')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    min-height: 500px;
    height: 100%;
}
.host-item{
    width: 285px;
    height: 60px;
}
</style>
