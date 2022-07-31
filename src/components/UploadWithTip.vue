<template>
<div class="box flex flex-column ">
    <div class="p-relative upload-span pointer text-center">
        <span class="font-regular  w-100 font-12  text-center scale-9">上传本地文图片</span>
        <input type="file"
               class="opacity-0 w-100 p-absolute h-100 d-inline-block"
               style="left: 0;top:0;"
               @change="submit"
        />
    </div>
    <span class="font-regular tips p-absolute m-t-5 font-12 text-333">{{ tips }}</span>
</div>
</template>

<script>
export default {
    name: 'UploadWithTip',
    props: {
        tips: {
            type: String,
            default: '仅支持上传.png.jpg.jpeg格式的文件'
        }

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
    width: 90px;
    height: 22px;
    border: 1px solid #727272;
    border-radius: 2px;
    color: #727272;
    &:hover {
        opacity: 0.7;
    }
}
.tips{
    top: 30px;
    left: 100px;
    width: 200px;
    line-height: 15px;
}
</style>
