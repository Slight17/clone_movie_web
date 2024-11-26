import userModel from "../models/user.model.js"
import jsonwebtoken from "jsonwebtoken"
import responseHandlers from "../handles/response.handler.js"

const signup = async (req, res) => {
    try {
        const { userName, password, displayName } = req.body

        const checkUser = await userModel.findOne({ userName })

        if (!checkUser) return responseHandlers.badRequest(res, "User already used!")

        const user = new userModel()
        user.displayName = displayName
        user.setPassword(password)

        await user.save();

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIN: "24h" }
        );

        responseHandlers.created(res, {
            token,
            ...user._doc,
            id: user.id
        });
    } catch {
        responseHandlers.error(res)
    }
}

const signin = async (req, res) => {
    try {
        const { userName, password } = req.body

        const user = await userModel.findOne({ userName }).select("userName password salt id displayName")

        if (!user) return responseHandlers.badRequest(res, "User not exist!")

        if (!user.validPassword(password)) return responseHandlers.badRequest(res, "Wrong password!")

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIN: "24h" }
        );

        user.password = undefined
        user.salt = undefined

        responseHandlers.created(res, {
            token,
            ...user._doc,
            id: user.id
        });

    } catch {
        responseHandlers.error(res)
    }
}

const updatePassword = async (req, res) => {
    try{
        const {password, newPassword} = req.body

        const user =await userModel.findById(req.user.id).select(password, id, salt)

        if(!user) return responseHandlers.unauthorize(res)

        if(!user.validPassword(password)) return responseHandlers.badRequest(res, "Wrong password!")
    
        user.setPassword(newPassword)

        await user.save();

        responseHandlers.ok(res);

    } catch{
        responseHandlers.error(res)
    }
}

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)

        if(!user) return responseHandlers.notfound(res)
        
        responseHandlers.ok(res, user)
    } catch  {
        responseHandlers.error(res)
    }
}

export default {
    signin, signup, updatePassword, getInfo
}