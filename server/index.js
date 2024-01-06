const ws = require('ws')

const wws = new ws.Server({
    port: 5000
}, () => {console.log('start server')})

wws.on('connection', function (ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch(message.event) {
            case 'connection':
                broadcast(message)
                break
            case 'message':
                broadcast(message)
                break
        }
    })
})

function broadcast(message) {
    wws.clients.forEach((client) => {
        client.send(JSON.stringify(message))
    })
}











