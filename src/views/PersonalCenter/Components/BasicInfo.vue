<template>
<div class="header">
    <header-title title="基本资料"/>
    <div class="info font-16 font-regular text-333">
        <input-with-error
            class="m-b-20 m-t-25"
            showLabel
            :label="form.nickname.label"
            :error-info="errorInfo.nickname"
            :row-info.sync="form.nickname"
            @validate="validateRow"
            :key="form.nickname.updateKey"
        />
<!--        <div class="row-outer flex align-center p-l-30 m-t-20 m-b-20">-->
<!--            <span class="label">-->
<!--                性别-->
<!--            </span>-->
<!--            <div class="content">-->
<!--                <el-radio-group v-model="userInfo.sex">-->
<!--                    <el-radio :label="3">保密</el-radio>-->
<!--                    <el-radio :label="1">男</el-radio>-->
<!--                    <el-radio :label="2">女</el-radio>-->
<!--                </el-radio-group>-->
<!--            </div>-->
<!--        </div>-->
        <textarea-with-error
            class="m-b-30"
            showLabel
            :label="form.sign.label"
            :error-info="errorInfo.sign"
            :row-info.sync="form.sign"
            @validate="validateRow"
            :key="form.sign.updateKey"
        />
<!--        <div class="row-outer flex align-center p-l-30 m-t-20 m-b-20">-->
<!--                <span class="label">-->
<!--                    {{ form.birth.label }}-->
<!--                </span>-->
<!--            <div class="content flex-1">-->
<!--                <el-date-picker-->
<!--                    class="time-picker w-100"-->
<!--                    v-model="form.birth.value"-->
<!--                    type="date"-->
<!--                    format="yyyy-MM-dd"-->
<!--                    :picker-options="pickerOptions"-->
<!--                    placeholder="选择日期">-->
<!--                </el-date-picker>-->
<!--            </div>-->
<!--        </div>-->
        <div class="upload-div flex p-l-30 p-t-10">
           <span class="label">
                头像:
            </span>
            <div class="flex-column p-relative">
                <div class="preview m-r-20" >
                    <div
                        class="template-img border-radius-50 bg-center bg-size-100 bg-no-repeat w-100 h-100"
                        :style="{
                    backgroundImage: `url(${placementUrl})`
                }"
                        v-if="!url"></div>
                    <el-image
                        v-else
                        class="w-100 h-100 border-radius-50"
                        :src="url"
                        fit="cover"></el-image>
                </div>
                <div class="upload-button m-t-10 flex flex-end flex-column">
                    <upload-with-tip @changeFile="changeFile"/>
                </div>
            </div>
        </div>
        <div class="update-info flex">
            <UpdateInfo
                type="phone"
                :info="account"
            />
            <UpdateInfo class="update-pwd"/>
        </div>
        <div class="row-outer flex flex-end p-l-30 m-t-20 m-b-20">
            <div class="save-button font-medium font-16">
                <ConfirmButton class="w-100 h-100 d-inline-block w-100 text-center  font-medium font-16" title="保存" @click.native="saveInfo"/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import HeaderTitle from '@/views/PersonalCenter/Components/HeaderTitle'
import UpdateInfo from '@/views/PersonalCenter/Components/UpdateInfo'
import InputWithError from '@/components/Form/InputWithError'
import UploadWithTip from '@/components/UploadWithTip'
import TextareaWithError from '@/components/Form/TextareaWithError'
import ConfirmButton from '@/components/ConfirmButton'
import { mapState, mapActions } from 'vuex'
import { editUserInfo } from '@/api/user'
import { isRequire } from '@/utils/validator'
import { isEmpty, omit } from '@/utils/lodashUtil'
import { statusCode } from '@/utils/statusCode'
import { Message } from 'element-ui'
import dayjs from 'dayjs'
import { uploadImage } from '@/api/Common'
export default {
    name: 'BasicInfo',
    components: {
        HeaderTitle,
        InputWithError,
        TextareaWithError,
        UploadWithTip,
        ConfirmButton,
        UpdateInfo
    },
    data () {
        return {
            form: {
                nickname: {
                    label: '我的昵称:',
                    value: '',
                    key: 'nickname',
                    validators: [isRequire('昵称')],
                    validateLabel: ['isRequire'],
                    updateKey: 'nickname-false'
                },
                sign: {
                    label: '个人简介:',
                    value: '',
                    key: 'sign',
                    validators: [],
                    validateLabel: [],
                    updateKey: 'sign-false'
                }
            },
            errorInfo: {
                nickname: {},
                sign: {},
                birth: {}
            },
            userInfo: {
                nickname: '',
                signature: ''
            },
            file: null,
            url: ''
        }
    },
    computed: {
        ...mapState('user', ['nickname', 'sign', 'account', 'token', 'avatar']),
        pickerOptions () {
            return {
                disabledDate: date => {
                    return dayjs().isBefore(dayjs(date), 'day')
                }
            }
        },
        placementUrl () {
            return this.avatar ? this.avatar : require('../../../assets/images/common/avart.png')
        }
    },
    mounted () {
        this.userInfo = {
            nickname: this.nickname,
            signature: this.sign
        }
        this.form.nickname.value = this.nickname
        this.form.sign.value = this.sign
    },
    methods: {
        ...mapActions('user', ['getUserInfo']),
        async saveInfo () {
            const isValidate = this.validate()
            if (!isValidate) return
            const loadingBox = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            try {
                const { code, msg } = await editUserInfo(this.finalData())
                if (code === statusCode.success) {
                    Message.success(msg)
                    this.getUserInfo()
                } else {
                    Message.error(msg)
                }
            } catch (e) {
                console.log('出错了')
            } finally {
                loadingBox.close()
            }
        },
        finalData () {
            return {
                'nickname': this.form.nickname.value,
                'sign': this.form.sign.value,
                'avatar': this.url
            }
        },
        validate () {
            const res = []
            Object.keys(this.form).forEach(key => {
                res.push(this.validateRow(key))
            })
            return res.every(x => x)
        },
        validateRow (key) {
            console.log(key, 'key')
            this.form[key].validators.forEach(validator => {
                const { message, type } = validator(this.form[key].value)
                if (message) {
                    this.errorInfo[key][type] = message
                } else {
                    this.errorInfo[key] = omit(this.errorInfo[key], type, message)
                }
            })
            this.changeKey(key)
            return isEmpty(this.errorInfo[key])
        },
        changeKey (key) {
            const flag = JSON.parse(this.form[key].updateKey.split('-')[1])
            this.form[key].updateKey = `${key}-${!flag}`
        },
        async changeFile (file) {
            const formData = new FormData()
            formData.append('file', file)
            const { data, code, msg } = await uploadImage(formData)
            if (code === statusCode.success) {
                this.url = data.url
                Message.success(msg)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.row-outer {
    width: 520px;
    .label {
        width: 90px;
        padding-right: 10px;
        font-size: 14px;
        color: #727272;
    }
    .content {
        line-height: 40px;
        height: 40px;
    }

}
.upload-div{
    height: 100px;
    .label {
        width: 90px;
        padding-right: 10px;
        text-align: right;
        font-size: 14px;
        color: #727272;
    }
    .preview{
        width: 75px;
        height: 75px;
    }
}
.update-info {
    margin-top: 45px;
    .update-pwd {
        margin-left: 35px;
    }
}
::v-deep {
    .row-outer {
        .el-input__inner {
            line-height: 40px;
            height: 40px;
        }
        .save-button {
            width: 138px;
            height: 45px;
            line-height: 45px;
            border-radius: 3px;
            font-size: 16px;
            font-family: PingFang-SC-Medium;
            .confirm {
                background: linear-gradient(90deg, #3B5FFF, #A2B3FF);
            }
        }
    }
    .info {
        .row-inner {
            max-width: 520px;
            padding-left: 30px!important;
            .label {
                width: 90px;
                line-height: 40px;
                padding-right: 10px;
                text-align: right;
                font-size: 14px;
                color: #727272;
            }
            .input-section {
                background-color: transparent!important;
                border: 1px solid #E2E1E1;
                border-radius: 2px;
            }
            .error{
                left: 107px;
            }
        }
    }
    .time-picker{
        width: 100% !important;
        .el-input__inner {
            line-height: 40px;
            height: 40px;
        }
    }
    .el-input__icon{
        line-height: 40px!important;
    }
}
</style>
