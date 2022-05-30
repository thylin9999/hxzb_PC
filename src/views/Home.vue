<template>
  <div class="home">
      <div class="title p-10">{{ $t('Home.home')}}</div>
<!--      <vue-com-test-alvin />-->
      <time-line />
  </div>
</template>

<script>
// @ is an alias to /src
import TimeLine from './TestComs/TimeLine'
export default {
    name: 'Home',
    components: {
        TimeLine
    }
}
</script>
<style lang="scss" scoped>
.title {
    font-family: SourceHanSansCN-Regular;
}
</style>
