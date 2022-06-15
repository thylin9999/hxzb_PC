import { url } from '@/api/Common/url'
import request from '../request'

export function uploadImage (formData) {
    return request({
        method: 'post',
        url: url.uploadImage,
        data: formData
    })
}
