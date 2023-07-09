const {createPool}=require("mysql2");

const db=createPool({
 host: 'localhost',
  user: 'root',
  password: 'Braa734150508',
  port: 3306,
  database:'finalproject'
})

db.getConnection((erroe,connection)=>{
    if(erroe){
        console.log(erroe)
    }
    console.log("connected")
})

module.exports=db;
