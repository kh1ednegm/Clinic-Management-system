
const bcrypt = require('bcrypt')


const Employee = require('../Models/EmployeeModel')
const User = require('../Models/UserModel')

// Create Employee
exports.AddEmployee = async (request,response,next)=>{


    let body = request.body

    try {
        
        let emp = await Employee.create({
            name:body.name,
            birthday:body.birthday,
            gender:body.gender,
            address:body.address,
            phoneno:body.phoneno,
            emop_role:body.emop_role,
            image:body.image
        })
    
        if(emp){

            if(body.emop_role == 'receptionist'){

                let hashedpassword = await bcrypt.hash(body.password,await bcrypt.genSalt(10))
                
                try {
                    
                    let user = await User.create({
                        email:body.email,
                        password:hashedpassword,
                        userType:"receptionist",
                        UserID:emp._id,
                    })

                    if(user)
                {
                    response.status(200).send({message:"OK",data:emp})
                }

                } catch (e) {
                    fs.unlinkSync(`images/${doctor.image}`)
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
            name:body.name,
            address:body.address,
            phoneno:body.phoneno,
        })

        if (emp) {
            response.status(200).response({message:"OK",data:emp})
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

        let emp = await Employee.findByIdAndDelete(body._id)
        if(emp){
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


    try {
        let emps = await Employee.find({})

        
        if(emps){
            response.status(200).send({message:"OK",data:emps})
        }
        else{
            const err = new Error("There're no employees")
            err.status = 400
            next(err)
        }

    } catch (err) {
        next(err)
    }
} 