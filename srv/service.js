module.exports = async function () {
    this.before('CREATE', 'Files', req => {
        debugger
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
    })

    this.before('READ', 'Files', req => {
        debugger
        //check content-type
        console.log('content-type: ', req.headers['content-type'])
    })
}