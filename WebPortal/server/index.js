//importing packages
const express = require("express")
const cors= require("cors")
const bodyparser = require("body-parser")
const database = require("mysql")
const connect = express()
// used connect variable for connecting packages into express
connect.use(cors())
connect.use(bodyparser.json())
connect.use(express.json())
connect.use(express.static('public'))
connect.use(bodyparser.urlencoded({extended:true}))
// connected backend 
let databaseconnection = database.createConnection({
    host:"localhost" ,
    port:3306,
    user:"root",
    password:"Nishanth@2002", 
    database:"browser"        
})
// used databaseconnection for showing database connected
databaseconnection.connect(function(error){
  if(error){
      console.log(error);
  }
  else{
      console.log("Databases Connected");
  }
})

 // inserting value in data which is getting from front
connect.post('/insert',(request,response)=>{
  let {fname,lname,phone,email,city,state,password}=request.body
  let sql='insert into register (fname,lname,phone,email,username,password)values(?,?,?,?,?,?)'
  databaseconnection.query(sql,[fname,lname,phone,email,email,password],(error,result)=>{
    if(error){
      response.send({"status":"error"})
      console.log(error)
    }
    else{
      response.send({"status":"success"})
    } 
  })
 })

 //inserting students value into table studentdetails
 connect.post('/insertstudent',(request,response)=>{
  let {studentname,age,gender,studentcourse,phonenumber}=request.body
  let sql='insert into studentdetail (studentname,age,gender,studentcourse,phonenumber)values(?,?,?,?,?)'
  databaseconnection.query(sql,[studentname,age,gender,studentcourse,phonenumber],(error,result)=>{
    if(error){
      response.send({"status":"error"})
      console.log(error)
    }
    else{
      response.send({"status":"success"})
    } 
  })
 })
    
 // used to getdata from table
connect.get('/getdata',(request,response)=>{
  let sql='select * from studentdetail'
  databaseconnection.query(sql,(error,result)=>{
    if(error){
      response.send(error)
      console.log(error)
    }
    else{
      response.send(result)
    }
  })
})

 //used to login
 connect.post('/register',(request,response)=>{
  let {username,password}=request.body
  let sql='select * from register where username=?'
  databaseconnection.query(sql,[username],(error,result)=>{
    if(error){
      response.send({"status":"empty_set"})
    }
    else if(result.length>0){
      let dbusername=result[0].username
      let dbpassword=result[0].password
      let id=result[0].id
      if(dbusername===username && dbpassword===password){
        response.send({'status':'success','id':id})
      }
      else{ 
        response.send({'status':'invalid_user'})
      }
    }
    else{
      response.send({'status':'error'})
    }
  })
  })

  // used to created single data from user table
  connect.get('/getsingle/:id',(request,response)=>{
    let {id}=request.params
    let sql='select * from register where id=?'
    databaseconnection.query(sql,[id],(error,result)=>{
      if(error){
        response.send(error)
        console.log(error);
      }
      else{
        response.send(result)                                 
      }
    })
  })
  

  // used to created single data from user table
  connect.get('/studentsingle/:std_id',(request,response)=>{
    let {std_id}=request.params
    let sql='select * from studentdetail where std_id=?'
    databaseconnection.query(sql,[std_id],(error,result)=>{
      if(error){
        response.send(error)
        console.log(error);
      }
      else{
        response.send(result)                                 
      }
    })
  })

// used to delete data from user
connect.post('/delete',(request,response)=>{
  let std_id=request.body.std_id
  let sql='delete from studentdetail where std_id=?'
  databaseconnection.query(sql,[std_id],(error,result)=>{
    if(error){
      response.send({"status":"error"})
      console.log(error) 
    }
    else {
      response.send({"status":"success"})
     
    }
  })
  })
  //Used to Update values in StudentsDetail Table
  connect.put('/update/:std_id',(request,response)=>{
    let {std_id}=request.params
    let {studentname,age,gender,studentcourse,phonenumber}=request.body
    let sql='update studentdetail set studentname=?,age=?,gender=?,studentcourse=?,phonenumber=? where std_id=?'
    databaseconnection.query(sql,[studentname,age,gender,studentcourse,phonenumber,std_id],(error,result)=>{
      if(error){
        response.send({"status":"error"})
        console.log(error)
      }
      else{
        response.send({"status":"success"})
      }
    })
  })
  

//it will run on port 9597
connect.listen(9597,()=>{
    console.log("your server is running in port 9597")
  }   )