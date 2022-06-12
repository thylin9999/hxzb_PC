<template>
<div class="row flex p-relative">
    <div v-if="showLabel" class="label">
        <span></span>
    </div>
    <div class="input-section flex align-center flex-1 p-l-15">
        <svg-icon class="icon-14" :icon-class="icon"></svg-icon>
        <el-input
            class="input  flex-1"
            :type="inputType"
            :placeholder="placeholder"
            v-model="rowInfo.value"
            @blur="submit"
            @change="submit"
        />
        <div class="code h-100 text-center" v-if=showCode @click="getCode">
            <span class="font-14 line-height-20 font-medium">{{ codeText }}</span>
        </div>
    </div>
    <span class="p-absolute error font-12 ">{{ errorMessage}}</span>
</div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
    name: 'InputWithError',
    props: {
        icon: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        showLabel: {
            type: Boolean,
            default: false
        },
        rowInfo: {
            type: Object,
            default: () => ({})
        },
        errorInfo: {
            type: Object,
            default: () => ({})
        },
        showCode: {
            type: Boolean,
            default: false
        },
        isSendCode: {
            type: Boolean,
            default: false
        }

    },
    data () {
        return {
            leftTime: 60,
            timer: null
        }
    },
    watch: {
        isSendCode () {
            if (this.isSendCode) {
                this.timer = setInterval(() => {
                    if (this.leftTime <= 0) {
                        clearInterval(this.timer)
                    } else {
                        this.leftTime--
                    }
                }, 1000)
            }
        }
    },
    computed: {
        isPassword () {
            return this.rowInfo.key === 'password'
        },
        inputType () {
            return this.isPassword ? 'password' : 'text'
        },
        errorMessage () {
            const errors = this.rowInfo.validateLabel.reduce((all, key) => {
                if (this.errorInfo[key]) {
                    all.push(this.errorInfo[key])
                }
                return all
            }, [])
            return errors[0]
        },
        placeholder () {
            return `请输入${this.label}`
        },
        codeText () {
            return this.isSendCode ? `${this.leftTime}s` : '获取验证码'
        }
    },
    methods: {
        submit: debounce(function () {
            this.$emit('validate', this.rowInfo.key)
        }, 200),
        getCode () {
            this.$emit('getCode')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
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
::v-deep {
    .el-input__inner {
        border: none!important;
        background-color: transparent;
        line-height: 45px;
        height: 45px;
        font-size: 14px;
        font-family: PingFang-SC-Regular;
    }
}
</style>
