<template>
    <div class="row row-inner flex p-relative">
        <div v-if="showLabel" class="label">
            <span>{{ label }}</span>
        </div>
        <div class=" flex align-center flex-1" >
            <div
                v-if="rowInfo.value"
                class="show-image"
                :style="{
                    backgroundImage: `url(${fileUrl})`
                }"
            >
                <span class="delete-mask d-inline-block w-100 h-100 text-center">
                    <i @click="deletePic" class="el-icon-delete font-16 text-white"></i>
                </span>
            </div>
            <div class="upload-div p-relative" v-else>
                <span class="upload-button text-center p-absolute w-100 h-100 d-inline-block">
                    <i class="el-icon-plus "></i>
                </span>
                <input class="d-inline-block opacity-0 w-100 h-100" type="file" @change="beforeSubmit">
            </div>
        </div>
        <span v-if="showError" class="p-absolute error font-12 ">直播封面不能为空</span>
    </div>
</template>

<script>
import { uploadImage } from '@/api/Common'

export default {
    name: 'SelectWithError',
    props: {
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
        showError: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            fileName: '',
            fileUrl: ''
        }
    },
    computed: {
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
        }
    },
    methods: {
        async beforeSubmit (e) {
            const file = e.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            const res = await uploadImage(formData)
            this.fileUrl = res.url
            this.$emit('update:rowInfo', {
                ...this.rowInfo,
                value: res.url
            })
            this.$emit('changeFile', res.url)
        },
        deletePic () {
            this.fileUrl = ''
            this.$emit('update:rowInfo', {
                ...this.rowInfo,
                value: ''
            })
            this.$emit('changeFile', '')
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
.show-image {
    width: 100px;
    height: 100px;
    .delete-mask {
        display: none;
        line-height: 100px;
        background-color: rgba(0,0,0,0.7);
    }
    &:hover{
        .delete-mask {
            display: inline-block;
        }
    }
}
.upload-div {
    width: 100px;
    height: 100px;
    .upload-button {
        left: 0;
        top: 0;
        border: 1px dashed #E2E1E1;
        line-height: 100px;
        .el-icon-plus {
            font-size: 30px;
            color: #E2E1E1;
        }
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
