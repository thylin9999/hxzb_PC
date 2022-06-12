import { mapActions } from 'vuex'

export const modalMixin = {
    methods: {
        ...mapActions('modal', ['openDialog', 'closeDialog']),
        openLoginDialog () {
            this.openDialog()
        },
        closeLoginDialog () {
            this.closeDialog()
        }
    }
}
