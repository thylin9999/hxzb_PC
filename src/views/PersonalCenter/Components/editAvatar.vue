<template>
<div class="edit-avatar">
    <HeaderTitle title="修改头像" />
    <div class="upload-div flex p-l-30 p-t-10">
        <div class="preview m-r-10" >
            <div class="template-img bg-center bg-no-repeat w-100 h-100" v-if="!url"></div>
            <el-image
                v-else
                class="w-100 h-100"
                :src="url"
                fit="contain"></el-image>
        </div>
        <div class="upload-button h-100 flex flex-end flex-column">
            <upload-with-tip @changeFile="changeFile"/>
        </div>
    </div>
    <div class="buttons m-t-30 p-l-30">
        <ConfirmButton @click.native="submit" title="保存"/>
        <CancelButton @click.native="cancel" class="m-l-15" title="取消"/>
    </div>
</div>
</template>

<script>
import HeaderTitle from '@/views/PersonalCenter/Components/HeaderTitle'
import UploadWithTip from '@/components/UploadWithTip'
import ConfirmButton from '@/components/ConfirmButton'
import CancelButton from '@/components/CancelButton'
import { uploadImage } from '@/api/Common'
import { editUserInfo } from '@/api/user'
import { statusCode } from '@/utils/statusCode'
import { Message } from 'element-ui'
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
            const { data, code } = await uploadImage(formData)
            if (code === statusCode.success) {
                this.url = data.url
            }
        },
        cancel () {
            this.$router.push('/')
        },
        async submit () {
            if (this.url) {
                const { code, msg } = await editUserInfo({
                    avatar: this.url
                })
                if (code === statusCode.success) {
                    Message.success(msg)
                }
            } else {
                Message.error('请先上传头像再保存！')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
.template-img{
    background-image: url('../../../assets/images/common/avart.png');
    background-size: contain;
}
</style>
