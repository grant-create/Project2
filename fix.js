const db = require('./models')
db.notes.sync({ force: true}).then(()=>process.exit)