<template>
    <div class="live-cast p-b-30">
        <header-title title="直播预约"/>
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
                        <el-radio label="eSport">电竞</el-radio>
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

            <div class="row-outer flex align-center p-l-30 m-t-20 m-b-20">
                <span class="label">
                    比赛时间
                </span>
                <div class="content flex-1">
                    <el-date-picker
                        class="time-picker w-100"
                        v-model="showTime"
                        type="date"
                        @change="selectTime"
                        format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        placeholder="选择日期">
                    </el-date-picker>
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
<!--            <UploadWithError-->
<!--                class="m-b-30 m-t-25"-->
<!--                showLabel-->
<!--                :label="form.liveCover.label"-->
<!--                :row-info.sync="form.liveCover"-->
<!--                @changeFile="changeFile"-->
<!--                :show-error="coverError"-->
<!--            />-->
            <div class="row-outer flex align-center p-l-30 m-b-20">
            <span class="label">

            </span>
                <div class="save-button font-medium font-16">
                <span
                    class="font-16 p-t-5 p-b-5 p-l-10 p-r-10 pointer"
                    @click="submit"
                >直播预约</span>
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
import { bookMatches } from '@/api/Host/Host'
import { getMatchScheduleByDay } from '@/api/competition/competition'
import { matchTypeMap } from '@/utils/utils'
import { Message } from 'element-ui'
import { statusCode } from '@/utils/statusCode'
import dayjs from 'dayjs'
export default {
    name: 'BookLiveBroadCast',
    components: {
        HeaderTitle,
        InputWithError,
        SelectWithError
        // UploadWithError
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
            competitionOptions: [],
            showTime: dayjs().format('YYYY-MM-DD')

        }
    },
    computed: {
        pickerOptions () {
            return {
                disabledDate: date => {
                    return dayjs(date).isBefore(dayjs())
                }
            }
        },
        leagueId () {
            return matchTypeMap[this.category]
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async  fetchData () {
            try {
                const { code, data } = await getMatchScheduleByDay({
                    date: dayjs(this.showTime).format('YYYY-MM-DD')
                })
                if (code === statusCode.success) {
                    this.competitionOptions = data.reduce((all, item) => {
                        all.push({
                            ...item,
                            id: item.matchId,
                            value: item.matchId,
                            label: item.leagueChsShort
                        })
                        return all
                    }, [])
                    console.log(data, 'data')
                }
            } catch (e) {
                console.log('出错了')
            }
        },
        selectTime () {
            this.fetchData()
        },
        async submit () {
            const isValidate = this.validate()
            if (!isValidate) return
            const { code, data, msg } = await bookMatches(this.form.match.value)
            if (code === statusCode.success) {
                Message.success('开播成功')
                console.log(data, 'data')
            } else {
                Message.error(msg)
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
    width: 570px;
    .label {
        width: 80px;
        margin-right: 45px;
    }
    .content {
        line-height: 40px;
        height: 40px;
    }
}
.obs {
    margin-left: 155px;
    line-height: 25px;
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
            max-width: 570px;
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
