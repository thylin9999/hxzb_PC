<template>
    <div class="mask" v-if="showDialog" @click.prevent="closeLoginDialog">
        <div  class="modal" @click.stop>
            <span class="close-button p-absolute" @click="closeLoginDialog">
                <svg-icon class="icon-16" icon-class="safe"></svg-icon>
            </span>
            <slot/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Modal',
    computed: {
        ...mapState('modal', ['showDialog'])
    }
}
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    overflow: hidden;
    background-color: rgba(0,0,0,0.5);
}
.modal {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    width: 640px;
    .close-button {
        right: 10px;
        top: 10px;
    }
}
</style>
