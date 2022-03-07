const catodb = require('../main.js')


catodb.fetch('CatoDB',{table: "cats"})
catodb.fetch('CatoDB',{table: "test"})
catodb.fetch({table: "test", row: 1})
