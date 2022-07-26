<template>
<div class="list w-100 m-t-15">
    <ul class="w-100 flex flex-wrap">
        <li
            v-for="type in types"
            :key="type.leagueId"
            class="type-item text-center"
        >
            <custom-span class="w-100" :content="type.nameChsShort" />
        </li>
    </ul>
</div>
</template>

<script>
import { getLeagues } from '@/api/competition/competition'
import CustomSpan from '@/components/CustomSpan'
export default {
    name: 'Leagues',
    components: {
        CustomSpan
    },
    props: {
        type: {
            type: [Number, String],
            default: 1
        }
    },
    data () {
        return {
            types: []
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            try {
                const { data } = await getLeagues(this.type)
                data.unshift({
                    leagueId: null,
                    nameChsShort: '全部'
                })
                this.types = data
            } catch (e) {
                console.log('出错饿了')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.type-item{
    color: #ccc;
    width: 80px;
    line-height: 30px;
    background-color: #F1F2F5;
    margin: 4px;
}
</style>
