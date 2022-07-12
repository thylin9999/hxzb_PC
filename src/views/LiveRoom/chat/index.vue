<template src="./index.html"></template>

<script>
import { Message } from 'element-ui'

import { mapState } from 'vuex'

export default {
    props: {
        visitSend: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            connectTime: null,
            countdown: 5, // 倒计时 5秒重连
            timer: null,
            isLeave: false,
            isConnect: false,
            inpTxt: '',
            announcement: '',
            webSocket: null,
            value: '600',
            trumpet: require('@/assets/images/common/trumpet.png'),
            chatList: []
        }
    },
    watch: {
        isConnect (newVal) {
            if (!newVal && !this.isLeave) { // 非主动断线
                this.reConnect()
            }
            if (newVal) { // 连接成功 清楚重连定时器
                clearInterval(this.connectTime)
            }
        }
    },
    computed: {
        ...mapState('user', ['nickname', 'memberId', 'token'])
    },
    created () {
        this.connectWebSocket()
    },
    methods: {
        sendMessage () {
            if (!this.inpTxt.trim().length) return
            if (!this.token) {
                Message('请先登录')
            } else {
                this.send('1040')
            }
        },
        send (num) {
            if (num === '1040') { // 发言
                const sendCon = {
                    type: num,
                    room_id: this.$route.query.room_id,
                    member_id: this.memberId,
                    nickname: this.nickname,
                    msg: this.inpTxt
                }
                this.webSocket.send(JSON.stringify(sendCon))
                this.inpTxt = ''
            }
        },
        connectWebSocket () {
            const that = this
            // eslint-disable-next-line no-undef
            this.webSocket = new WebSocket(_requestWS)
            this.webSocket.onopen = function (e) {
                if (e.type === 'open') {
                    const sendCon = {
                        type: '1010',
                        room_id: that.$route.query.room_id,
                        nickname: that.nickname,
                        member_id: that.memberId
                    }
                    console.log('---websocke已连接成功---')
                    that.isConnect = true
                    that.webSocket.send(JSON.stringify(sendCon))
                }
            }
            this.webSocket.onmessage = function (evt) {
                if (!evt.data.includes('type')) return
                const obj = JSON.parse(evt.data)
                console.log(obj)
                let item = {}
                if (obj) {
                    switch (obj.type) {
                    case '1000': // 心跳检测
                        console.log(obj)
                        break
                    case '1010': // 用户进入直播间
                        item = {
                            type: '1010',
                            msg: '进入直播间',
                            member_id: obj.member_id ? obj.member_id : null, // 会员
                            nickname: obj.nickname
                        }
                        that.chatList.push(item)
                        that.$nextTick(() => {
                            that.$refs.element.scrollTop = 10000000
                        })
                        break
                    case '1040': // 普通发言
                        item = {
                            type: obj.type,
                            nickname: obj.nickname,
                            msg: obj.content.msg,
                            member_id: obj.member_id
                        }
                        that.chatList.push(item)
                        that.$nextTick(() => {
                            that.$refs.element.scrollTop = 10000000
                        })
                        break
                    case '1090': // 1090主播关闭直播
                        item = {
                            type: '1090',
                            msg: '系统提示：主播已下播'
                        }
                        that.chatList.push(item)
                        that.$nextTick(() => {
                            that.$refs.element.scrollTop = 10000000
                        })
                        break
                    case '1120': // 系统提示
                        item = {
                            type: '1120',
                            msg: obj.content.msg
                        }
                        that.chatList.push(item)
                        that.$nextTick(() => {
                            that.$refs.element.scrollTop = 10000000
                        })
                        break
                    case '2010': // 信息發送頻繁
                        item = {
                            type: '2010',
                            msg: obj.content
                        }
                        that.chatList.push(item)
                        that.$nextTick(() => {
                            that.$refs.element.scrollTop = 10000000
                        })
                        break
                    default: // 1110主播回来
                        break
                    }
                }
            }
            // 关闭链接
            this.webSocket.onclose = function () {
                console.log('webScoket  已经断开')
                if (!this.isLeave) that.isConnect = false
            }
        },
        closeWs () {
            this.webSocket.close()
        },
        reConnect () { // 断线重连
            this.connectTime = setInterval(() => {
                this.connectWebSocket()
                console.log('断线重连')
            }, 5000)
        }
    },
    beforeDestroy () {
        clearInterval(this.connectTime)
        this.isLeave = true // 主动离开 不需重连
        this.closeWs()
    }
}
</script>

<style scoped lang="scss">
  @import "./index";
</style>
