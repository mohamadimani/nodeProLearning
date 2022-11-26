const http = require('http')
const { listenerCount } = require('process')
console.log('mani')


const server = http.createServer((req, res) => {

    res.writeHead('200', {
        'content-type': 'text/html',
        'server': 'nodejs'
    })
    res.end('end of the proccess!')
})

server.listen(3000, (err) => {
    if (err) console.log(err)
    console.log('server is running on port 3000')
})