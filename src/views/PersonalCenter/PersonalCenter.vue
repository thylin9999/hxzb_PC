<template>
<div class="user-center wrap-1200 h-100 p-t-20">
   <div class="p-t-10 p-b-10 p-l-15 h-100 bg-white ">
       <person-header />
   </div>
    <div class="content">
        <div class="left-section"></div>
        <div class="right-info"></div>
    </div>
</div>
</template>

<script>
import PersonHeader from '@/views/PersonalCenter/PersonHeader'
export default {
    name: 'PersonalCenter',
    components: {
        PersonHeader
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.user-center{
    background-color: $background-gray2;
}
</style>
