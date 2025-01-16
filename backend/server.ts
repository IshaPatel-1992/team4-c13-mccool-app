import express from 'express'
import quickSearchController from '.'

const port = process.env.PORT || 3000
const app = express()

//app.use(showRequests)
//app.use(express.static('../public_html'))
app.use(express.json())

app.use('/api/quickSearchBar, quickSearchController)

const server = app.listen(port, () => {
    console.log('Server listening on port ' + port)
})

server.on('close',() => {
    console.log('Closing mongo connection')
    disconnectDb()
})
