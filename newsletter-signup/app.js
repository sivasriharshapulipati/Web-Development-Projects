//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const request  = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/bbb2e3de81";
    const options = {
        method:"post",
        auth:"harsha1:027d2af33e351cd0c96bb791694af22c-us17"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/sucess.html");
        }else{
            req.send(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res) {
    res.redirect("/")
    
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is up on 3000");
});


// 027d2af33e351cd0c96bb791694af22c-us17

// audiance id bbb2e3de81.