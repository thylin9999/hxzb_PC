<template src="./index.html"></template>

<script>
// import { Input, Loading } from 'element-ui'
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
    created () {
        this.connectWebSocket()
    },
    methods: {
        sendMessage () {
            if (!this.inpTxt.trim().length) return
            if (!this.userInfo) {
                this.send('1043')
            } else {
                this.send('1040')
            }
        },
        send (num, obj, trumpet) {
            const userInfoItem = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
            if (num === '1040') { // 发言
                const sendCon = {
                    type: num,
                    trumpet: trumpet ? 2 : 1, // 1，正常发言  2，贵族喇叭
                    room_id: this.$route.query.room_id,
                    member_id: localStorage.userInfo ? JSON.parse(localStorage.userInfo).member_id : '',
                    userInfo: userInfoItem,
                    msg: this.inpTxt
                }
                this.webSocket.send(JSON.stringify(sendCon))
                this.inpTxt = ''
            }
            if (num === '1043') { // 发言
                const sendCon = {
                    type: num,
                    trumpet: trumpet ? 2 : 1, // 1，正常发言  2，贵族喇叭
                    room_id: this.$route.query.room_id,
                    msg: this.inpTxt
                }
                this.webSocket.send(JSON.stringify(sendCon))
                this.inpTxt = ''
            }
            if (num === '1042') { // 发言
                const sendCon = {
                    type: num,
                    speak_id: obj.id,
                    trumpet: 1, // 1，正常发言  2，贵族喇叭
                    room_id: this.$route.query.room_id,
                    member_id: localStorage.userInfo ? JSON.parse(localStorage.userInfo).member_id : '',
                    userInfo: userInfoItem || null,
                    msg: obj.content
                }
                this.webSocket.send(JSON.stringify(sendCon))
            }
        },
        connectWebSocket () {
            // const that = this
            console.log('GLOBAL')
            // console.log(GLOBAL)
            // this.webSocket = new WebSocket(`${GLOBAL.ws}`)
            // this.webSocket.onopen = function (e) {
            //     if (e.type === 'open') {
            //         const sendCon = {
            //             type: '1010',
            //             room_id: that.$route.query.room_id,
            //             member_id: that.userInfo && that.userInfo.member_id || '',
            //             userInfo: that.userInfo || null
            //         }
            //         console.log('---websocke已连接成功---')
            //         that.isConnect = true
            //         that.webSocket.send(JSON.stringify(sendCon))
            //     }
            // }
            // this.webSocket.onmessage = function (evt) {
            //     const obj = JSON.parse(evt.data)
            //     const item = {}
            //     if (obj) {
            //         // switch (obj.type) {
            //         // case '1000': // 心跳检测
            //         //     console.log(obj)
            //         //     break
            //         // case '1010': // 用户进入直播间
            //         //     that.updateManage(obj)
            //         //     item = {
            //         //         type: '1010',
            //         //         member_id: obj.member_id ? obj.member_id : null, // 会员
            //         //         noble_level: obj.noble_level, // 贵族
            //         //         is_manage: obj.is_manage, // 管理员
            //         //         is_anchor: JSON.parse(localStorage.getItem('room_info')).member_id == obj.member_id, // 主播
            //         //         super_manage: obj.super_manage, // 超管
            //         //         msg: '进入直播间',
            //         //         nickname: obj.nickname,
            //         //         userInfo: obj.content.userInfo
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     break
            //         // case '1020': // 离开直播间
            //         //     break
            //         // case '1030': // 送礼物
            //         //     if (Number(obj.cost * obj.number) >= 520) {
            //         //         that.svgaList.push(obj.animation)
            //         //         if (!that.isShowGiftSvga) { // 没有正在展示动画  立即展示
            //         //             that.sendGiftMv()
            //         //         }
            //         //     }
            //         //     item = {
            //         //         type: obj.type,
            //         //         nickname: obj.nickname,
            //         //         gift_name: obj.gift_name,
            //         //         thumb: obj.thumb,
            //         //         number: obj.number,
            //         //         member_id: obj.member_id,
            //         //         noble_level: obj.noble_level,
            //         //         is_manage: obj.is_manage,
            //         //         is_anchor: JSON.parse(localStorage.getItem('room_info')).member_id == obj.member_id, // 主播
            //         //         super_manage: obj.super_manage,
            //         //         userInfo: obj.content.user_info
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     break
            //         // case '1040': // 普通发言
            //         //     item = {
            //         //         type: obj.type,
            //         //         nickname: obj.nickname,
            //         //         msg: obj.content.msg,
            //         //         member_id: obj.member_id,
            //         //         noble_level: obj.noble_level,
            //         //         is_manage: obj.is_manage,
            //         //         is_anchor: JSON.parse(localStorage.getItem('room_info')).member_id == obj.member_id, // 主播
            //         //         super_manage: obj.super_manage,
            //         //         userInfo: obj.content.userInfo,
            //         //         trumpet: obj.content.trumpet
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     that.updateManage(obj)
            //         //     that.$emit('sendDankamu', item)
            //         //     break
            //         // case '1041': // 贵族喇叭
            //         //     item = {
            //         //         title: ` 喇叭消息： 【${obj.content.userInfo.nickname}】 ${obj.content.msg}`,
            //         //         msg: ` 喇叭消息： 【${obj.content.userInfo.nickname}】 ${obj.content.msg}`,
            //         //         trumpet: obj.content.trumpet
            //         //     }
            //         //     that.$emit('sendDankamu', item)
            //         //     break
            //         // case '1050': // 主播进入直播间
            //         //     break
            //         // case '1060': // 踢出直播间
            //         //     item = {
            //         //         type: '1060',
            //         //         msg: '被踢出直播间',
            //         //         nickname: obj.nickname
            //         //     }
            //         //     if (that.userInfo.member_id === obj.member_id) {
            //         //         that.$message({
            //         //             type: 'warning',
            //         //             message: '您已被踢出直播间'
            //         //         })
            //         //         that.$router.push({ name: 'home' })
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     break
            //         // case '1070': // 禁言xxx
            //         //     item = {
            //         //         type: '1070',
            //         //         msg: obj.content.msg
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     break
            //         // case '1071': // 禁言xxx
            //         //     item = {
            //         //         type: '1071',
            //         //         msg: '系统消息：' + obj.nickname + ' 已被禁言'
            //         //         // nickname: obj.nickname,
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     break
            //         // case '1080': // 开通/续费 贵族
            //         //     item = {
            //         //         type: '1080',
            //         //         msg: '系统提示：' + obj.content.msg,
            //         //         noble_icon: obj.noble_icon
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     that.$emit('sendDankamu', item)
            //         //     break
            //         // case '1090': // 1090主播关闭直播
            //         //     item = {
            //         //         type: '1090',
            //         //         msg: '系统提示：主播已下播'
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     that.$emit('changeLiveStatus', 1)
            //         //     break
            //         // case '1100': // 1100主播离开
            //         //     break
            //         // case '1120': // 系统提示
            //         //     item = {
            //         //         type: '1120',
            //         //         msg: '系统提示：' + obj.content.msg
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     break
            //         // case '1130': // 公告
            //         //     that.announcement = obj.msg || obj.content.msg
            //         //     break
            //         // case '1180': // 设为房管
            //         //     item = {
            //         //         type: '1180',
            //         //         msg: '被设为房管',
            //         //         nickname: obj.nickname
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     break
            //         // case '1181': // 移除房管
            //         //     that.updateManage(obj)
            //         //     break
            //         // case '2010': // 信息發送頻繁
            //         //     item = {
            //         //         type: '2010',
            //         //         msg: obj.content
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     break
            //         // case '3010': // 贵族没有喇叭数量
            //         //     item = {
            //         //         type: '3010',
            //         //         msg: obj.content
            //         //     }
            //         //     that.chatList.push(item)
            //         //     that.$nextTick(() => {
            //         //         that.$refs.element.scrollTop = 10000000
            //         //     })
            //         //     break
            //         // case '4032': // PC直播间指数
            //         //     console.log(obj.content)
            //         //     item = {
            //         //         type: '4032'
            //         //     }
            //         //     that.$emit('changeOdds', obj.content)
            //         //     break
            //         // case '6000': // 其他地方登陆
            //         //     that.$message({
            //         //         type: 'warning',
            //         //         duration: '1500',
            //         //         message: '登录已失效，请重新登录'
            //         //     })
            //         //     const timer = setTimeout(() => {
            //         //         that.$store.commit('logout', { type: 1 })
            //         //         clearTimeout(timer)
            //         //     }, 1500)
            //         //     break
            //         // default: // 1110主播回来
            //         //     break
            //         // }
            //     }
            // }
            // 关闭链接
            // this.webSocket.onclose = function () {
            //     console.log('webScoket  已经断开')
            //     if (!this.isLeave) that.isConnect = false
            // }
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
        this.isShowGiftSvga = false
        this.svgaList = []
    }
}
</script>

<style scoped lang="scss">
  @import "./index";
</style>
