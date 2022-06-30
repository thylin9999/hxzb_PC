<template>
  <div id="app" :class="{'overflow-hidden': showDialog }">
    <router-view :key="updateKey"/>
  </div>
</template>
<script >
import { mapState } from 'vuex'
import { getFlowedHosts } from '@/api/Host/Host'

export default {
    name: 'App',
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
        reload () {
            this.updateKey = +new Date().getTime()
        },
        async init () {
            try {
                const res = await getFlowedHosts()
                console.log(res)
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
