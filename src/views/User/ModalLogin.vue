<template>
    <el-dialog
        :visible="showLoginDialog"
        custom-class="modal-dialog"
        append-to-body
        destroy-on-close
        lock-scroll
        close-on-click-modal
        close-on-press-escape
    >
        <span class="close-button p-absolute">
            <span  @click="closeModal">
                <i class="el-icon-close font-20 pointer"></i>
            </span>
        </span>
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
                    <div v-if="showCode && isRegister" class="row row-inner code-input m-b-20 flex p-relative">
                        <div class="input-section flex align-center flex-1 p-l-15" >
                            <svg-icon class="icon-14" icon-class="safe"></svg-icon>
                            <el-input
                                class="input  flex-1"
                                placeholder="请输入验证码"
                                v-model="form.code.value"
                                @blur="validateRow('code')"
                            />
                            <div class="code h-100 pointer text-center" :class="{'not-allowed opacity-7': isSend}" v-if=showCode @click="getCode">
                                <span class="font-14 line-height-20 font-medium">{{ codeText }}</span>
                            </div>
                        </div>
                        <span class="p-absolute error font-12 ">{{ errorInfo.code.isRequire }}</span>
                    </div>
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
                <div class="submit m-t-15 text-center">
                    <submit-button
                        class="w-100 font-16 d-inline-block text-center"
                        :title="title" @click.native="submit"
                        :loading="isLoading"
                    />
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Qrcode from '@/components/Qrcode'
import SubmitButton from '@/components/SubmitButton'
import InputWithError from '@/components/Form/InputWithError'
import { isRequire, phone } from '@/utils/validator'
import { omit, isEmpty } from '../../utils/lodashUtil'
import { statusCode } from '@/utils/statusCode'
import { Message } from 'element-ui'
import { register, getCode } from '@/api/user'

export default {
    name: 'Login',
    components: {
        Qrcode,
        SubmitButton,
        InputWithError
    },
    data () {
        return {
            form: {
                account: {
                    label: '手机号',
                    value: '',
                    key: 'account',
                    icon: 'phone',
                    validators: [isRequire('手机号'), phone],
                    validateLabel: ['isRequire', 'phone'],
                    updateKey: 'account-false'
                },
                code: {
                    label: '验证码',
                    value: '',
                    key: 'code',
                    icon: 'safe',
                    validators: [isRequire('验证码')],
                    validateLabel: ['isRequire'],
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
            isRegister: false,
            isSend: false,
            isResetPassword: false,
            isLoading: false,
            leftTime: 60,
            timer: null
        }
    },
    computed: {
        ...mapState('modal', ['showLoginDialog']),
        title () {
            return this.isRegister ? '注册' : '登录'
        },
        showCode () {
            console.log(process.env.VUE_APP_NEED_CODE, 'VUE_APP_NEED_CODE')
            return true
        },
        style () {
            return {
                height: this.isRegister ? '370px' : '350px'
            }
        },
        codeText () {
            return this.isSend ? `${this.leftTime}s` : '获取验证码'
        }
    },
    watch: {
        isSend () {
            if (this.isSend) {
                this.timer = setInterval(() => {
                    if (this.leftTime <= 0) {
                        clearInterval(this.timer)
                        this.isSend = false
                        this.leftTime = 60
                    } else {
                        this.leftTime--
                    }
                }, 1000)
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
                if (this.isRegister) {
                    params.code = this.form.code.value
                }
                const result = await request(params)
                const { code, msg } = this.isRegister ? result : result
                if (code === statusCode.success) {
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
                        // this.$router.push({ path: '/' })
                    }
                } else {
                    Message({
                        message: msg,
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
        async getCode () {
            if (this.isSend) return
            const isValidate = this.validateRow('account')
            // 获取验证码操作
            if (isValidate) {
                this.isSend = true
                const { msg, code } = await getCode({
                    mobile: this.form.account.value
                })
                if (code === statusCode.success) {
                    Message.success(msg)
                }
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
        },
        closeModal () {
            this.initForm()
            this.isRegister = false
            this.isSend = false
            this.isResetPassword = false
            this.isLoading = false
            this.leftTime = 60
            this.timer = null
            this.closeLoginDialogMixin()
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

.code-input {
    .input-section {
        background-color: $background-input;
        height: 45px;
    }
    .error {
        left: 0;
        top: 100%;
        color: $text-error;
    }
    .code {
        width: 100px;
        background-color: #E67A40;
        color: $text-white;
        line-height: 45px;
        &.is-send{
            background-color: #eee;
        }
    }
}

.close-button {
    right: 10px;
    top: 10px;
}
::v-deep {
    .code-input {
        .el-input__inner {
            border: none!important;
            background-color: transparent;
            line-height: 45px;
            height: 45px;
            font-size: 14px;
            font-family: PingFang-SC-Regular;
        }
    }
    .el-dialog {
        width: 640px;
        margin: 0!important;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .el-dialog__header {
        display: none;
    }
    .el-dialog__body {
        width: 640px!important;
        padding: 0!important;
    }
}
</style>
