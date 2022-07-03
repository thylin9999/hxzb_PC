<template>
    <div  class="mask" :key="modalUpdateKey" v-if="showDialog" >
        <div  class="modal" @click.stop>
            <span class="close-button p-absolute">
                <slot name="close"/>
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
    width: 100%;
    height: 100%;
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
