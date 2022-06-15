<template>
<div class="edit-avatar">
    <HeaderTitle title="修改头像" />
    <div class="upload-div flex">
        <div class="preview m-r-10" v-if="url">
            <el-image
                class="w-100 h-100"
                :src="url"
                fit="contain"></el-image>
        </div>
        <div class="upload-button h-100 flex flex-end flex-column">
            <upload-with-tip @changeFile="changeFile"/>
        </div>
    </div>
    <div class="buttons m-t-30">
        <ConfirmButton title="保存"/>
        <CancelButton class="m-l-15" title="取消"/>
    </div>
</div>
</template>

<script>
import HeaderTitle from '@/views/PersonalCenter/Components/HeaderTitle'
import UploadWithTip from '@/components/UploadWithTip'
import ConfirmButton from '@/components/ConfirmButton'
import CancelButton from '@/components/CancelButton'
import { uploadImage } from '@/api/Common'
import { statusCode } from '@/utils/statusCode'

export default {
    name: 'editAvatar',
    components: {
        HeaderTitle,
        UploadWithTip,
        ConfirmButton,
        CancelButton
    },
    data () {
        return {
            file: null,
            url: ''
        }
    },
    methods: {
        async changeFile (file) {
            const formData = new FormData()
            formData.append('file', file)
            console.log(file, formData)
            const { data } = await uploadImage(formData)
            console.log(data, 'data')
            if (data.code === statusCode.success) {
                this.url = data.url
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-avatar {
    margin-left: 50px;
    margin-top: 30px;
}
.upload-div{

    height: 100px;
}
.preview{
    width: 100px;
    height: 100px;
}
.upload-button {
    width: 200px;
    vertical-align: bottom;
}
</style>
