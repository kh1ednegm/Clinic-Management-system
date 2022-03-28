
const bcrypt = require('bcrypt')


const Employee = require('../Models/EmployeeModel')
const User = require('../Models/UserModel')

// Create Employee
exports.AddEmployee = async (request,response,next)=>{


    let body = request.body

    try {
        
        let emp = await Employee.create({
            empName:body.empName,
            empBirthDate:body.empBirthDate,
            empGender:body.empGender,
            empAddress:body.empAddress,
            empPhoneNumber:body.empPhoneNumber,
            empRole:body.empRole,
            empImage:body.image
        })
    
        if(emp){

            if(body.empRole == 'Receptionist'){

                let hashedpassword = await bcrypt.hash(body.password,await bcrypt.genSalt(10))
                
                try {
                    
                    let user = await User.create({
                        email:body.empEmail,
                        password:hashedpassword,
                        userType:"receptionist",
                        UserID:emp._id,
                    })

                    if(user)
                {
                    response.status(200).send({message:"OK",data:emp})
                }

                } catch (e) {
                    fs.unlinkSync(`images/${emp.empImage}`)
                    await Employee.findByIdAndDelete(emp._id)
                    const err = new Error("Email is duplicated")
                    err.status = 400
                    next(err)
                }
                  
            }

            else
            {

                response.status(200).send({message:"OK",data:emp})
            }
            
        }


    } catch (err) {
        next(err)
    }
}

// Edit Employee
exports.EditEmployee = async (request,response,next)=>{



    let body = request.body

    try {
        
        let emp = await Employee.findByIdAndUpdate({_id:body._id},{
            empName:body.empName,
            empAddress:body.empAddress,
            empPhoneNumber:body.empPhoneNumber,
        })

        if (emp) {
            response.status(200).send({message:"OK"})
        }
        else{

            const err = new Error("Faild")
            err.status = 400
            next(err)
        }


    } catch (err) {
        next(err)
    }
}


// Delete emplyoee
exports.DeleteEmployee = async (request,response,next)=>{

    try {
        let body = request.body
        console.log(body);

        let emp = await Employee.findByIdAndDelete(body._id)
        if(emp){
            
            if(emp.emop_role == "reception"){
                await User.findOneAndDelete({UserID:emp._id})

            }
            
            response.status(200).send({message:"OK"})

        }
        else{

            const err = new Error("Employee is Not Found")
            err.status = 400
            next(err)
        }

    } catch (err) {
        next(err)
    }
}

// Get employee by id
exports.GetEmployeeByID = async (request,response,next)=>{


    try {
        


        let body = request.body

        let emp = await Employee.findById(body._id)

        if(emp){
            response.status(200).send({message:"OK",data:emp})
        }
        else{
            const err = new Error("Employee is Not Found")
            err.status = 400
            next(err)
        }
    } catch (err) {
        next(err)
    }
}


// GET all employees
exports.GetAllEmployees = async (request,response,next)=>{


    let emps = await Employee.find({})
  
    response.status(200).send({message:"OK",data:emps})
} 