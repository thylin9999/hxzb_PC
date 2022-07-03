import { mapActions } from 'vuex'

export const modalMixin = {
    data () {
        return {
            modalUpdateKey: +new Date().getTime()
        }
    },
    methods: {
        ...mapActions('modal', ['openLoginDialog', 'closeLoginDialog']),
        openLoginDialogMixin () {
            this.modalUpdateKey = +new Date().getTime()
            this.openLoginDialog()
        },
        closeLoginDialogMixin () {
            this.modalUpdateKey = +new Date().getTime()
            this.closeLoginDialog()
        }
    }
}
