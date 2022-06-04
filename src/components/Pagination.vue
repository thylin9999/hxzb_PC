<template>
    <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="currentChange"
        :total="total">
    </el-pagination>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        total: {
            type: Number,
            default: 0
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 20
        }
    },
    methods: {
        currentChange (page) {
            console.log(page, 'page')
            this.$emit('update:currentPage', page)
            this.$emit('loadData')
        }
    }
}
</script>

<style scoped>

</style>
