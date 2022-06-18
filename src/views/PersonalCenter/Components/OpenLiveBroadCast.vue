<template>
<div class="live-cast p-b-30">
    <header-title title="直播管理"/>
    <div class="content info font-16 font-regular text-333">
        <input-with-error
            class="m-b-20 m-t-25"
            showLabel
            :label="form.title.label"
            :error-info="errorInfo.title"
            :row-info.sync="form.title"
            @validate="validateRow"
            :key="form.title.updateKey"
        />
        <div class="row-outer flex align-center p-l-30 m-t-20 m-b-20">
            <span class="label">
                直播分类
            </span>
            <div class="content">
                <el-radio-group v-model="category">
                    <el-radio label="football">足球</el-radio>
                    <el-radio label="basketball">篮球</el-radio>
                    <el-radio label="other">其他</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="row-outer flex align-center p-l-30 m-t-20 m-b-20">
            <span class="label">
                直播类型
            </span>
            <div class="content">
                <el-radio-group v-model="liveType">
                    <el-radio label="all">全部</el-radio>
                </el-radio-group>
            </div>
        </div>
        <SelectWithError
            class="m-b-20 m-t-25"
            showLabel
            :label="form.match.label"
            :error-info="errorInfo.match"
            :row-info.sync="form.match"
            @validate="validateRow"
            :key="form.match.updateKey"
            :options="competitionOptions"
        />
        <UploadWithError
            class="m-b-30 m-t-25"
            showLabel
            :label="form.liveCover.label"
            :row-info.sync="form.liveCover"
            @changeFile="changeFile"
            :show-error="coverError"
        />
        <div class="row-outer flex align-center p-l-30 m-b-20">
            <span class="label">

            </span>
            <div class="save-button font-medium font-16">
                <span
                    class="font-16 p-t-5 p-b-5 p-l-10 p-r-10 pointer"
                    @click="submit"
                >获取直播流</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import HeaderTitle from '@/views/PersonalCenter/Components/HeaderTitle'
import InputWithError from '@/components/Form/InputWithError'
import SelectWithError from '@/components/Form/SelectWithError'
import UploadWithError from '@/components/Form/UploadWithError'
import { isRequire } from '@/utils/validator'
import { isEmpty, omit } from '@/utils/lodashUtil'
import { startLive } from '@/api/Host/Host'

export default {
    name: 'OpenLiveBroadCast',
    components: {
        HeaderTitle,
        InputWithError,
        SelectWithError,
        UploadWithError
    },
    data () {
        return {
            form: {
                title: {
                    label: '直播标题',
                    value: '',
                    key: 'title',
                    validators: [isRequire('直播标题')],
                    validateLabel: ['isRequire'],
                    updateKey: 'title-false'
                },
                match: {
                    label: '直播比赛',
                    value: '',
                    key: 'match',
                    validators: [isRequire('直播比赛')],
                    validateLabel: ['isRequire'],
                    updateKey: 'match-false'
                },
                liveCover: {
                    label: '直播封面',
                    value: '',
                    key: 'liveCover',
                    validators: [],
                    validateLabel: ['isRequire'],
                    updateKey: 'liveCover-false'
                }
            },
            liveType: 'all',
            category: 'football',
            errorInfo: {
                title: {},
                match: {}
            },
            coverError: false,
            competitionOptions: [
                {
                    id: 1,
                    value: 1,
                    label: '比赛1'
                },
                {
                    id: 2,
                    value: 2,
                    label: '比赛2'
                },
                {
                    id: 3,
                    value: 3,
                    label: '比赛3'
                }
            ]
        }
    },
    methods: {
        async submit () {
            const isValidate = this.validate()
            const isCoverValidate = !!this.form.liveCover.value
            if (isValidate && isCoverValidate) {
                const { data } = await startLive({
                    matchId: this.form.match.value,
                    liveType: this.liveType,
                    title: this.form.title.value,
                    liveCover: this.form.liveCover.value,
                    category: this.category
                })
                console.log(data, 'data')
            }
        },
        changeFile ({ fileName, url }) {
            this.coverError = !this.form.liveCover.value
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
@import '@/theme/default-vars.scss';
.row-outer {
    width: 470px;
    .label {
        width: 80px;
        margin-right: 45px;
    }
    .content {
        line-height: 40px;
        height: 40px;
    }
}
.save-button {
    span {
        background-color: $background-color1;
        color: $text-white;
        border-radius: 4px;
        &:hover {
            opacity: 0.7;
        }
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
            max-width: 470px;
            padding-left: 30px!important;
            .label {
                width: 80px;
                line-height: 40px;
                margin-right: 45px;

            }
            .input-section {
                background-color: transparent!important;
                border: 1px solid #E2E1E1;
                border-radius: 2px;
            }
            .error{
                left: 157px;
            }
        }
    }
}
</style>
