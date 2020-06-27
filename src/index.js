const app = require("./server");
require('./database');

app.listen(app.get("port"));

console.log("Server on port 3000");
