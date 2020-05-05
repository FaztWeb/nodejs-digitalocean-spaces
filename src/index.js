const app = require("./server");

app.listen(app.get("port"));

console.log("Server on port 3000");
