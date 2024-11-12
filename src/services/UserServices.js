const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const { genneralAccessToken, genneralRefreshToken } = require("./JwtServices");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        try {
            // Check if the user already exists
            const checkUser = await User.findOne({ email: email });
            if (checkUser) { // If user is found
                return resolve({
                    status: 'ERR',
                    message: 'The email is already' // More explicit message
                });
            }

           
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name, 
                email, 
                password: hash, 
                phone
            });

            // If user is created successfully
            if (createdUser) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                });
            }
        } catch (e) {
            console.error("Error in createUser:", e); // Log the error for debugging
            return reject(e); 
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {email, password} = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null) {
                resolve ({
                    status: 'ERR',
                    message: 'The user it not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if(!comparePassword) {
                resolve ({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve ({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e); 
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id })
            if(checkUser === null) {
                resolve ({
                    status: 'OK',
                    message: 'The user it not defined'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true})
            resolve ({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser 
            })
        } catch (e) {
            reject(e); 
        }
    });
};

const deleteUser = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({ 
                    _id: id 
                })
                if(checkUser === null) {
                    resolve ({
                        status: 'OK',
                        message: 'The user it not defined'
                    })
                }
                await User.findByIdAndDelete(id)
                resolve ({
                    status: 'OK',
                    message: 'Delete user success',
                })
            } catch (e) {
                reject(e); 
            }
        });
};

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: ids})
            resolve ({
                status: 'OK',
                message: 'Delete many user success',
            })
        } catch (e) {
            reject(e); 
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve ({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e); 
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ 
                _id: id 
            })
            if(user === null) {
                resolve ({
                    status: 'OK',
                    message: 'The user it not defined'
                })
            }
            resolve ({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        } catch (e) {
            reject(e); 
        }
    });
};







module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
    
};
