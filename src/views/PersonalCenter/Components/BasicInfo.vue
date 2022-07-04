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
        <div class="row-outer flex align-center p-l-30 m-t-20 m-b-20">
            <span class="label">
                性别
            </span>
            <div class="content">
                <el-radio-group v-model="userInfo.sex">
                    <el-radio :label="3">保密</el-radio>
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </div>
        </div>
        <input-with-error
            class="m-b-30"
            showLabel
            :label="form.sign.label"
            :error-info="errorInfo.sign"
            :row-info.sync="form.sign"
            @validate="validateRow"
            :key="form.sign.updateKey"
        />
<!--        <input-with-error-->
<!--            class="m-b-30 "-->
<!--            showLabel-->
<!--            :label="form.birth.label"-->
<!--            :error-info="errorInfo.birth"-->
<!--            :row-info.sync="form.birth"-->
<!--            @validate="validateRow"-->
<!--            :key="form.birth.updateKey"-->
<!--        />-->
        <div class="row-outer flex align-center p-l-30 m-t-20 m-b-20">
                <span class="label">
                    {{ form.birth.label }}
                </span>
            <div class="content flex-1">
                <el-date-picker
                    class="time-picker w-100"
                    v-model="form.birth.value"
                    type="date"
                    format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
        </div>
        <div class="row-outer flex align-center p-l-30 m-t-20 m-b-20">
            <span class="label">

            </span>
            <div class="save-button font-medium font-16">
                <submit-button class=" d-inline-block w-100 text-center  font-medium font-16" title="保存" @click.native="saveInfo"/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import HeaderTitle from '@/views/PersonalCenter/Components/HeaderTitle'
import SubmitButton from '@/components/SubmitButton'
import InputWithError from '@/components/Form/InputWithError'
import { mapState, mapActions } from 'vuex'
import { editUserInfo } from '@/api/user'
import { isRequire } from '@/utils/validator'
import { isEmpty, omit } from '@/utils/lodashUtil'
import { statusCode } from '@/utils/statusCode'
import { Message } from 'element-ui'
import dayjs from 'dayjs'
export default {
    name: 'BasicInfo',
    components: {
        HeaderTitle,
        SubmitButton,
        InputWithError
    },
    data () {
        return {
            form: {
                nickname: {
                    label: '昵称',
                    value: '',
                    key: 'nickname',
                    validators: [isRequire('昵称')],
                    validateLabel: ['isRequire'],
                    updateKey: 'nickname-false'
                },
                sign: {
                    label: '签名',
                    value: '',
                    key: 'sign',
                    validators: [],
                    validateLabel: [],
                    updateKey: 'sign-false'
                },
                birth: {
                    label: '生日',
                    value: '',
                    key: 'birth',
                    validators: [],
                    validateLabel: [],
                    updateKey: 'birth-false'
                }
            },
            errorInfo: {
                nickname: {},
                sign: {},
                birth: {}
            },
            userInfo: {
                nickname: '',
                sex: null,
                signature: '',
                birthday: ''
            }
        }
    },
    computed: {
        ...mapState('user', ['nickname', 'birth', 'sign', 'gender', 'token']),
        pickerOptions () {
            return {
                disabledDate: date => {
                    return dayjs().isBefore(dayjs(date), 'day')
                }
            }
        }
    },
    mounted () {
        this.userInfo = {
            nickname: this.nickname,
            signature: this.sign,
            birthday: this.birth,
            sex: this.gender
        }
        this.form.nickname.value = this.nickname
        this.form.sign.value = this.sign
        this.form.birth.value = this.birth
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
                'birth': dayjs(this.form.birth.value).format('YYYY-MM-DD'),
                'sign': this.form.sign.value,
                'avatar': '',
                'gender': this.userInfo.sex
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
        }
    }
}
</script>

<style lang="scss" scoped>
.row-outer {
    width: 520px;
    .label {
        width: 32px;
        margin-right: 45px;
    }
    .content {
        line-height: 40px;
        height: 40px;
    }

}
::v-deep {
    .row-outer {
        .el-input__inner {
            line-height: 40px;
            height: 40px;
        }
        .save-button {
            width: 145px;
            font-size: 16px;
            font-family: PingFang-SC-Medium;
        }
    }
    .info {
        .row-inner {
            max-width: 520px;
            padding-left: 30px!important;
            .label {
                width: 32px;
                line-height: 40px;
                margin-right: 45px;

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
