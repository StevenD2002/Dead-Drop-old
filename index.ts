const express = require("express")
const app = express()
const Gun = require("gun")
const port = 3000
app.use(Gun.serve)

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

Gun({ web: server })
