const express = require("express");

let app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

app.listen(PORT,function(){
    console.log("express server is set up to " + PORT);
});