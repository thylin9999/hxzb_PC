<template>
    <modal >
        <div
            v-loading.body="isLoading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            class="box w-100 flex align-center bg-white" :style="style">
            <div class="left-section h-100  flex flex-column justify-center align-center">
                <span class="font-14 font-regular"> 扫码下载app</span>
                <div class="qrcode-box m-t-15 m-b-20">
                    <qrcode />
                </div>
                <div class="logo w-100 bg-center bg-no-repeat m-t-30"></div>
            </div>
            <div class="right-form h-100 bg-white ">
                <div
                    class="title text-center m-t-30"
                    :class="{'m-b-15': isRegister, 'm-b-30': !isRegister}">
                    <span class="font-regular font-500 font-18">{{ title }}</span>
                </div>
                <div class="form">
                    <input-with-error
                        class="m-b-20"
                        :label="form.account.label"
                        :error-info="errorInfo.account"
                        :icon="form.account.icon"
                        :row-info.sync="form.account"
                        @validate="validateRow"
                        :key="form.account.updateKey"
                    />
                    <input-with-error
                        v-if="showCode && isRegister"
                        class="m-b-20"
                        :label="form.code.label"
                        :error-info="errorInfo.code"
                        :icon="form.code.icon"
                        :row-info.sync="form.code"
                        :is-send-code="isSend"
                        @validate="validateRow"
                        @getCode="getCode"
                        :show-code="true"
                        :key="form.code.updateKey"
                    />
                    <input-with-error
                        class="m-b-20"
                        :label="form.password.label"
                        :error-info="errorInfo.password"
                        :icon="form.password.icon"
                        :row-info.sync="form.password"
                        @validate="validateRow"
                        :key="form.password.updateKey"
                    />
                </div>
                <div class="button-text font-14 line-height-20 ">
                    <template v-if="!isRegister">
                        <div class="flex justify-between align-center">
                            <span class="pointer" @click="changeType(1)">立即注册</span>
                            <span @click="forgetPassword"  class="pointer">忘记密码</span>
                        </div>
                    </template>
                    <template v-else>
                        <span class="pointer" @click="changeType(2)">去登录</span>
                    </template>
                </div>
                <div class="submit m-t-15">
                    <submit-button :text="title" @click.native="submit"/>
                </div>
            </div>
        </div>
    </modal>
</template>
<script>
import { mapActions } from 'vuex'
import Modal from '@/components/Modal'
import Qrcode from '@/components/Qrcode'
import SubmitButton from '@/components/SubmitButton'
import InputWithError from '@/components/Form/InputWithError'
import { isRequire, phone } from '@/utils/validator'
import { omit, isEmpty } from '../../utils/lodashUtil'
import { statusCode } from '@/utils/statusCode'
import { Message } from '../../utils/messageBox'
import { register } from '@/api/user'

export default {
    name: 'Login',
    components: {
        Modal,
        Qrcode,
        SubmitButton,
        InputWithError
    },
    data () {
        return {
            isRegister: false,
            form: {
                account: {
                    label: '账号',
                    value: '',
                    key: 'account',
                    icon: 'phone',
                    validators: [isRequire('账号'), phone],
                    validateLabel: ['isRequire', 'phone'],
                    updateKey: 'account-false'
                },
                code: {
                    label: '验证码',
                    value: '',
                    key: 'code',
                    icon: 'safe',
                    validators: [isRequire('验证码')],
                    validateLabel: ['isRequire', 'phone'],
                    updateKey: 'code-false'
                },
                password: {
                    label: '密码',
                    value: '',
                    key: 'password',
                    icon: 'lock',
                    validators: [isRequire('密码')],
                    validateLabel: ['isRequire'],
                    updateKey: 'password-false'
                }
            },
            errorInfo: {
                account: {},
                code: {},
                password: {}
            },
            isSend: false,
            isResetPassword: false,
            isLoading: false
        }
    },
    computed: {
        title () {
            return this.isRegister ? '注册' : '登录'
        },
        showCode () {
            console.log(process.env.VUE_APP_NEED_CODE, 'VUE_APP_NEED_CODE')
            return false
        },
        style () {
            return {
                height: this.isRegister ? '370px' : '350px'
            }
        }
    },
    methods: {
        ...mapActions('user', ['login']),
        initForm () {
            Object.keys(this.form).forEach(key => {
                this.form[key].value = ''
                this.errorInfo[key] = {}
            })
        },
        async submit () {
            const isValidate = this.validate()
            if (isValidate) {
                this.isLoading = true
                const request = this.isRegister ? register : this.login
                const params = {
                    account: this.form.account.value,
                    password: this.form.password.value
                }
                const result = await request(params)
                console.log(result, 'result')
                const res = this.isRegister ? result.data : result
                if (res.code === statusCode.success) {
                    // 登录成功
                    if (this.isRegister) {
                        this.initForm()
                        this.form.account.value = params.account
                        this.changeType(2)
                        Message({
                            message: '注册成功',
                            type: 'success'
                        })
                    } else {
                        // 这里要保存用户的信息
                        this.closeLoginDialog()
                        this.initForm()
                        this.$router.push({ path: '/' })
                    }
                } else {
                    Message({
                        message: res.msg,
                        type: 'error'
                    })
                    this.form.password.value = ''
                    this.errorInfo.password = {}
                }
                this.isLoading = false
            }
        },
        validate () {
            const res = []
            Object.keys(this.form).forEach(key => {
                if (key === 'code') {
                    if (this.isRegister && this.showCode) {
                        res.push(this.validateRow(key))
                    }
                } else {
                    res.push(this.validateRow(key))
                }
            })
            return res.every(x => x)
        },
        validateRow (key) {
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
        getCode () {
            const isValidate = this.validateRow('account')
            // 获取验证码操作
            if (isValidate) {
                this.isSend = true
            }
        },
        changeKey (key) {
            const flag = JSON.parse(this.form[key].updateKey.split('-')[1])
            this.form[key].updateKey = `${key}-${!flag}`
        },
        changeType (type) {
            this.isRegister = type === 1
        },
        forgetPassword () {
            this.isRegister = true
            this.isResetPassword = true
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.box {
    border-radius: 4px;
}
.left-section {
    width: 230px;
    background: linear-gradient(129deg, #F0F2FF 0%, #CCD1FF 100%);
    .qrcode-box {
        width: 120px;
        height: 120px;
    }
    .logo{
        background-image: url('../../assets/images/common/logo.png');
        background-size: contain;
        height: 40px;
    }
}
.right-form {
    width: calc(100% - 230px);
    padding: 0 40px;
    .title {
        color: $text-color-73;
    }
    .button-text {
        color: $background-color1;
    }
}
</style>
