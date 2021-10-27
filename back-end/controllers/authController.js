//Import model
const User = require('../models/User');

//Import jwt cap quyen truy cap
const jwt = require('jsonwebtoken');

//Giai ma
const bcrypt = require('bcryptjs');
const { replaceOne } = require('../models/User');


//Ham bat dong bo
exports.register = async (req, res, next)=>{
    try{
        //Cho tao thanh cong luu vo bien user
        //rep.body = name, email, password
        req.body.role = 'customer';
        const user = await User.create(req.body);

        //Tao jwtvoi data va key
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);

        res.status(200).json({
            status: 'success',
            data: { token, userName: user.name }
        })
    } catch(error){
        next(error);
    }
}

exports.login = async (req, res, next)=>{
    try{
        const user = await User.findOne({email:req.body.email});

        if(!user){
            //Error: Email is not correct
            const err = new Error('Email is not correct');
            err.statusCode = 400;
            return next(err);
        }

        //req.body.password do nguoi dung nhap
        //user.password da duoc hash

        if(bcrypt.compareSync(req.body.password, user.password)){
            
            const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);

            res.status(200).json({
                status: 'success',
                data: { token, userName: user.name, role: user.role }
            })
        } else {
            //Error: Password is not correct
            const err = new Error('Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
    } catch (error){
        res.json(error);
    }
}

// Get current User
exports.getCurrentUser = async (req, res, next) =>{
    try{
        const data = {user: null}
        if(req.user){
            const user = await User.findOne({_id: req.user.userId});
            data.user = {userName: user.name, email: user.email, role: user.role}
        }
        res.status(200).json({
            status: 'success',
            data: data
        })
        
    } catch (error){
        res.json(error);
    }
}

// Get user info
exports.getCurentUserInfo = async (req, res, next) =>{
    try{
        const data = {user: null}
        if(req.user){
            const user = await User.findOne({_id: req.user.userId});
            data.user = {userName: user.name}

            res.status(200).json({
                status: 'success',
                data: {user}
            })
        }
        res.status(200).json({
            status: 'success',
            data: {data}
        })
        
    } catch (error){
        res.json(error);
    }
}

// Update current User
exports.updateCurrentUser = async (req, res, next) =>{
    try{
        const data = {user: null}
        if(req.user){
            const user = await User.findByIdAndUpdate(req.user.userId, {...req.body}, {new: true, runValidator: true});
            data.user = user;
        }
        res.status(200).json({
            status: 'success',
            data: data
        })
        
    } catch (error){
        res.json(error);
    }
}

//Get all user
exports.getAllUsers = async (req, res, next) =>{
    try{
        //Tim toan bo user
        const users = await User.find({});
        res.status(200).json({
            status:'success',
            results: users.length,
            data:{users}
        })
    } catch(error){
        res.json(error);
    }
}

// Change pass word
exports.changePassword = async (req, res, next)=>{
    try{
        const {userId} = req.user;
        const user = await User.findOne({_id: userId});

        //req.body.password do nguoi dung nhap
        //user.password da duoc hash

        if(bcrypt.compareSync(req.body.oldPassword, user.password)){
            if(req.body.newPassword == req.body.reNewPassword){

                const hashedPass = await bcrypt.hash(req.body.newPassword, 10);

                const user = await User.findByIdAndUpdate(userId, {password: hashedPass}, {new: true, runValidator: true});       
                res.status(200).json({
                    status: 'success',
                    data: {user}
                })
            } else{
                const err = new Error('Confirm password is not correct');
                err.statusCode = 400;
                return next(err);
            }
        } else {
            //Error: Password is not correct
            const err = new Error('Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
    } catch (error){
        res.json(error);
    }
}

//------------------------------------------For admin-------------------------------------
//Get all custormer
exports.getAllCustormers = async (req, res, next) =>{
    try{
        //Tim toan bo user
        const users = await User.find({role: 'customer'});
        res.status(200).json({
            status:'success',
            results: users.length,
            data:{users}
        })
    } catch(error){
        res.json(error);
    }
}

// get all business
exports.getAllBusinesses = async (req, res, next) =>{
    try{
        //Tim toan bo user
        const users = await User.find({role: 'business'});
        res.status(200).json({
            status:'success',
            results: users.length,
            data:{users}
        })
    } catch(error){
        res.json(error);
    }
}
