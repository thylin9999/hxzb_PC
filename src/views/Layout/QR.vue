<template>
    <canvas ref="canvas"></canvas>
</template>

<script>

import QrCodeWithLogo from 'qr-code-with-logo'

export default {
    props: {
        widthT: {
            type: Number,
            default: 90
        },
        url: {
            type: String,
            default: 'http://h5.wuhaicj.com'
        }
    },
    name: '',
    data () {
        return {
            canvas: null
        }
    },
    mounted () {
        this.canvas = this.$refs.canvas
    },
    updated () {
        if (!this.canvas) this.canvas = this.$refs.canvas
    },
    watch: {
        canvas (newVal) {
            if (newVal) this.weChatQrCode()
        },
        widthT (newVal) {
            this.weChatQrCode()
        },
        url (newVal) {
            this.weChatQrCode()
        }
    },
    methods: {
        weChatQrCode () {
            this.$nextTick(() => {
                const canvas = this.$refs.canvas
                canvas && QrCodeWithLogo.toCanvas({
                    canvas: canvas,
                    content: this.url,
                    width: this.widthT,
                    logo: {
                        src: require('@/assets/logo.png'),
                        radius: 0
                    }
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
