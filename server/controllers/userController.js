const User = require("../models/userModel")
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username: username });
        if (usernameCheck) {
            return res.json({ msg: "Username already use", status: false })
        }
        const emailCheck = await User.findOne({ email: email });
        if (emailCheck) {
            return res.json({ msg: "Email already use", status: false })
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, username, password: hash,
        });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (err) {
        next(err)
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user= await User.findOne({ username: username });
        if (!user) {
            return res.json({ msg: "User not exist", status: false })
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid)
            return res.json({msg:"Incorrect Password or username",status:false})
        delete User.password
        return res.json({ status: true, user });
    }
    catch (err) {
        next(err);
    }
}

const setAvatar = async(req,res,next)=>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const  userData= await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        })
        return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
    }
    catch(err){
        next(err)
    }
}

const getAllUsers = async (req, res, next) => {
    try{
        const user = await User.findOne({_id:{$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json(user)
    }
    catch(ex){
        next(ex)
    }
}
module.exports = { register, login,setAvatar,getAllUsers };