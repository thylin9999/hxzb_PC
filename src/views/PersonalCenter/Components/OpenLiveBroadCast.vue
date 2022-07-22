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
                <el-radio-group v-model="category" @change="changeCategory">
                    <el-radio
                        v-for="item in categoryOptions"
                        :key="item.id"
                        :label="item.id"
                        :value="item.key"
                    >{{item.text}}</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="row-outer league-type-row flex align-center p-l-30 m-t-20 m-b-20" >
            <span class="label">
                直播类型
            </span>
            <div class="content">
                <el-radio-group v-model="liveType" @change="changeLeagueType">
                    <el-radio
                        v-for="type in leagueTypeOptions"
                        :key="type.id"
                        :label="type.id">{{ type.label}}</el-radio>
                </el-radio-group>
            </div>
        </div>
        <SelectWithError
            v-if="needValidateMatch"
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
        <div class="row-outer flex align-center p-l-30 m-b-20" v-if="!obs">
            <span class="label">

            </span>
            <div class="save-button font-medium font-16" >
                <span
                    class="font-16 p-t-5 p-b-5 p-l-10 p-r-10 pointer"
                    @click="getAddress"
                >获取推流地址</span>

            </div>
        </div>
        <div v-else class="font-medium font-16 obs p-b-25">
            <div>OBS推流地址：{{obs.url }}</div>
            <div>OBS串流秘钥：{{obs.key}}</div>
        </div>
        <div class="row-outer flex align-center p-l-30 m-b-20">
            <span class="label">

            </span>
            <div class="save-button font-medium font-16">
                <span
                    class="font-16 p-t-5 p-b-5 p-l-10 p-r-10 pointer"
                    @click="beforeSubmit"
                >{{ buttonString }}</span>
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
import { startLive, getOBSAddress, closeLive } from '@/api/Host/Host'
import { getLeagues, getMatchList } from '@/api/competition/competition'
import { Message } from 'element-ui'
import { statusCode } from '@/utils/statusCode'
import { mapState } from 'vuex'
import dayjs from 'dayjs'
export default {
    name: 'OpenLiveBroadCast',
    inject: ['reload'],
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
                    value: null,
                    key: 'match',
                    validators: [],
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
            leagueTypeOptions: [
                {
                    id: 'all',
                    label: '全部',
                    value: 'all'
                }
            ],
            category: 1,
            errorInfo: {
                title: {},
                match: {}
            },
            coverError: false,
            competitionOptions: [],
            obs: null,
            openBroadcastSuccess: false // 是否开播成功
        }
    },
    computed: {
        ...mapState('commonData', ['broadcastTypes']),
        needValidateMatch () {
            return [1, 2].includes(this.category)
        },
        buttonString () {
            return this.openBroadcastSuccess ? '结束直播' : '直播开播'
        },
        categoryOptions () {
            return this.broadcastTypes.filter(x => {
                return !(x.id === 5) // 过滤掉 正在热播
            })
        }
    },
    created () {
        this.fetchData(true)
    },
    watch: {
        category: {
            handler () {
                if (this.category) {
                    this.form.title.value = ''
                    this.form.match.value = ''
                    this.errorInfo.match = {}
                    this.getLeagues()
                }
            },
            immediate: true
        }
        // liveType () {
        //     this.fetchData()
        // }
    },
    methods: {
        beforeSubmit () {
            if (this.openBroadcastSuccess) {
                // 结束直播
                this.closeLive()
            } else {
                this.submit()
            }
        },
        async closeLive () {
            try {
                const { code, msg } = await closeLive()
                if (code === statusCode.success) {
                    Message.success(msg)
                    this.reload()
                }
            } catch (e) {
                console.log('出错了')
            }
        },
        async fetchData (isFirst) {
            const loadingBox = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            try {
                const { data, code, msg } = await getMatchList({
                    leagueType: this.category,
                    leagueId: this.liveType === 'all' ? null : this.liveType,
                    pageSize: 2000,
                    pageNumber: 1,
                    day: dayjs().format('YYYY-MM-DD')
                })
                if (code === statusCode.success) {
                    this.competitionOptions = data.list.reduce((all, item) => {
                        const showLabel = `${item.leagueChsShort} ${item.homeChs} ${item.matchId ? 'VS' : ''} ${item.awayChs}`
                        all.push({
                            ...item,
                            id: item.matchId,
                            value: item.matchId,
                            label: showLabel
                        })
                        return all
                    }, [])
                    if (isFirst) {
                        this.getAddress(isFirst)
                    }
                } else {
                    Message.error(msg)
                }
            } catch (e) {
                console.log('出错了')
            } finally {
                loadingBox.close()
            }
        },
        async getAddress (isFirst) {
            const { data, code, msg } = await getOBSAddress()
            if (code === statusCode.success) {
                this.obs = data
                if (data.live_status === 2) {
                    this.openBroadcastSuccess = true
                    this.form.title.value = data.room_title
                    this.form.liveCover.value = data.live_cover
                    this.form.match.value = data.match_id
                    this.liveType = data.league_id
                }
            } else {
                Message.error(msg)
            }
        },
        async submit () {
            const isValidate = this.validate()
            this.changeFile()
            const isCoverValidate = !!this.form.liveCover.value
            if (!isValidate || !isCoverValidate) return
            if (!this.obs) {
                Message.error('请先获取推流地址，再点击开播！')
                return
            }
            const params = {
                liveType: this.liveType,
                title: this.form.title.value,
                liveCover: this.form.liveCover.value,
                category: this.category
            }
            if (this.needValidateMatch) {
                params.matchId = this.form.match.value
            }
            const { code, data } = await startLive(params)
            if (code === statusCode.success) {
                Message.success('开播成功')
                this.openBroadcastSuccess = true
                console.log(data, 'data')
            }
        },
        changeFile () {
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
        changeCategory () {
            if (this.needValidateMatch) {
                this.fetchData()
            } else {
                this.competitionOptions = []
            }
        },
        changeLeagueType () {
            this.fetchData()
        },
        async getLeagues () {
            try {
                this.leagueTypeOptions = [
                    {
                        id: 'all',
                        label: '全部',
                        value: 'all'
                    }
                ]
                const { data, code } = await getLeagues(this.category)
                if (code === statusCode.success) {
                    data.forEach(item => {
                        this.leagueTypeOptions.push({
                            ...item,
                            id: item.leagueId,
                            value: item.leagueId,
                            label: item.nameChsShort
                        })
                    })
                }
            } catch (e) {
                console.log('出错了')
            }
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
        //height: 40px;
    }
}
.league-type-row {
    width: 100% !important;
    .content {
        width: calc(100% - 150px);
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
            //height: 40px;
        }
        .save-button {
            width: 145px;
            font-size: 16px;
            font-family: PingFang-SC-Medium;
        }
        .el-radio {
            line-height: 40px;
            width: 70px;
            display: inline-block;
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
            .el-input__icon {
                line-height: 30px;
            }
            .error{
                left: 157px;
            }
        }
    }
}
</style>
