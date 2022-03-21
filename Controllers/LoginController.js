const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




const Users = require('../Models/UserModel')




module.exports = async (request,response,next)=>{

    let errors = validationResult(request)
    let error = new Error()
    if(!errors.isEmpty()){
        
        error.status = 422
        error.message = errors.array().reduce((current,object)=> current+object.msg+ ", ","");
        next(error)
    }
    else{
      let user = await Users.findOne({email:request.body.email})
      if (!user) {
        return  response.status(400).send({
                    message:"Invalid email or password"
                })
      }

      async function checkpassword() {
        dbpassword = await user.password;
        const validpassword = bcrypt.compareSync( request.body.password, await dbpassword);
        if (!validpassword)
         return false;

        return true;
      }
    
      if (user && (await checkpassword())) {
        token = jwt.sign({ 
            id: user._id, 
            userType: user.userType },
            "jwttoken" 
        );

        response.status(200).send({
          message:"OK",
          token: await token,
          userType: user.userType,
          userId: user.UserID,
        }); 
    }

    else{
          response.status(400).send({
              message:"Invalid email or password"
          })
    } 

    }
}