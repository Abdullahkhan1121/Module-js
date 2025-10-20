import fs from 'node:fs';
import { title } from 'node:process';
import User from '../models/usersModel.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let index = async (req, res) => {
    try {
        let user = await User.find();
        if (user) {
            res.status(200).json({ message: "All Users!", user: user });
        } else {
            res.status(404).json({ message: "No User found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

let SignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let UserCheck = await User.findOne({ email: email })
        if (UserCheck) {
            res.status(200).json({ message: "User Already Exist", user: UserCheck });

        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10)
            let newuser = new User(
                {
                    username,
                    email,
                    password: hashedPassword
                }
            )
            let adduser = await newuser.save();

            if (adduser) {
                res.status(200).json({ message: "SignUp Successfully", user: adduser });
            } else {
                res.status(404).json({ message: "No product found" });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}


let Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let UserCheck = await User.findOne({ email: email })
        if (UserCheck) {

            const CheckPassword = bcrypt.compareSync(password, UserCheck.password)
            if (CheckPassword) {
                const token = await jwt.sign({UserCheck} , process.env.JWT_SECRET , {expiresIn: '1h'})
                res.status(200).json({ message: "Login Success", user: UserCheck , token:token});

            }

        }
        else {
            res.status(200).json({ message: "Invalid Credential", user: UserCheck });


        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

let DeleteUser = async (req, res) => {
    try {
        const { id} = req.params;
        let UserDelete = await User.findByIdAndDelete(id)
        if (UserDelete) {
                res.status(200).json({ message: "User Delete Successfully", user: UserDelete });

        

        }
        else {
            res.status(200).json({ message: "Invalid Credential", user: UserCheck });


        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}


const UserController = {
    index,
    SignUp,
    Login,
    DeleteUser
}


export default UserController;