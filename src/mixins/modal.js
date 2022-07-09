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
            this.openLoginDialog()
            // setTimeout(() => {
            //     console.log('2323322323')
            //     this.modalUpdateKey = +new Date().getTime()
            // }, 300)
        },
        closeLoginDialogMixin () {
            // setTimeout(() => {
            //     this.modalUpdateKey = +new Date().getTime()
            // }, 300)
            this.modalUpdateKey = +new Date().getTime()
            this.closeLoginDialog()
        }
    }
}
