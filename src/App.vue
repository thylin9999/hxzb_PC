<template>
  <div id="app" :class="{'overflow-hidden': showDialog }">
    <router-view/>
  </div>
</template>
<script >
import { mapState } from 'vuex'
export default {

    name: 'App',
    computed: {
        ...mapState('modal', ['showDialog'])
    }

}
</script>
<style lang="scss" scoped>
#app {
    height: 100%;
}
</style>
