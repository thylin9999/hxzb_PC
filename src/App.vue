<template>
  <div id="app" :class="{'overflow-hidden': showDialog }">
    <router-view :key="updateKey"/>
      <ModalLogin />
  </div>
</template>
<script >
import { mapState, mapActions } from 'vuex'
import ModalLogin from '@/views/User/ModalLogin'
export default {
    name: 'App',
    components: {
        ModalLogin
    },
    data () {
        return {
            updateKey: +new Date().getTime()
        }
    },
    provide () {
        return {
            reload: this.reload
        }
    },
    computed: {
        ...mapState('modal', ['showDialog']),
        ...mapState('user', ['token'])
    },
    watch: {
        token: {
            handler () {
                if (this.token) {
                    this.init()
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions('user', ['getUserInfo']),
        reload () {
            this.updateKey = +new Date().getTime()
        },
        async init () {
            try {
                await this.getUserInfo()
            } catch (e) {
                console.log('出错了')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#app {
    height: 100%;
}
</style>
