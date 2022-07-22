import dayjs from 'dayjs'
export const globalMixin = {
    methods: {
        formatterDate (row, column, cellValue, index) {
            return cellValue ? dayjs(cellValue).format('YYYY-MM-DD HH:mm') : ''
        }
    }
}
