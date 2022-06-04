if (process.env.VUE_APP_MOCK) {
    require('mockjs')
    require('./modules/host')
    require('./modules/competition')
    require('./modules/user')
    require('./modules/permission')
}
