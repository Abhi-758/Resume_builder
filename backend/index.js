require('dotenv').config();
const app = require('./app')
const connectdb = require('./config/dbConnection');



connectdb()
.then(function() {
  const port = process.env.PORT || 6000
  app.listen(port,function() {
    console.log(`Server running successfully on port ${port}`)
  })
})
.catch(function(error) {
  console.log(error instanceof Error ? error.message : "Error connecting to the db")
})

// (You can add more endpoints: save/resume CV, etc.)

