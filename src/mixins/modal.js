import { mapActions } from 'vuex'

export const modalMixin = {
    data () {
        return {
            modalUpdateKey: +new Date().getTime()
        }
    },
    methods: {
        ...mapActions('modal', ['openDialog', 'closeDialog']),
        openLoginDialog () {
            this.openDialog()
        },
        closeLoginDialog () {
            this.modalUpdateKey = +new Date().getTime()
            this.closeDialog()
        }
    }
}
