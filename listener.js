const app = require("./app.js")

app.listen(9090,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Listening on port 8080");
    }
});