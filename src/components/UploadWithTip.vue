<template>
<div class="box flex flex-column ">
    <div class="p-relative upload-span pointer ">
        <span class="font-regular  w-100 font-14 p-absolute text-white text-center">上传</span>

        <input type="file"
               class="opacity-0 w-100 h-100 d-inline-block"
               @change="submit"
        />
    </div>
    <span class="font-regular m-t-5 font-12 text-333">{{ tips }}</span>
</div>
</template>

<script>
export default {
    name: 'UploadWithTip',
    props: {
        tips: {
            type: String,
            default: '(仅支持jpg、jpeg、png)'
        }
        // accepts: {
        //     type: Array,
        //     default: () => []
        // }
    },
    methods: {
        submit (e) {
            console.log(e.target.files, 'file')
            const file = e.target.files[0]
            this.$emit('changeFile', file)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.upload-span{
    width: 100px;
    background-color: $background-color1;
    height: 30px;
    border-radius: 2px;
    &:hover {
        opacity: 0.7;
    }
    span {
        left: 0;
        top: 0;
        line-height: 30px;
    }
}
</style>
