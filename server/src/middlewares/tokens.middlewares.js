import jsontokenweb from "jsonwebtoken"
import responseHandler from "../handles/response.handler.js"
import userModel from "../models/user.model.js"

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers.authorization;

        if(bearerHeader){
            const  token = bearerHeader.split(" ")[1];
            return jsontokenweb.verify(
                token,
                process.env.TOKEN_SECRET
            );
        }
        return false;
    } catch (error) {
        return false;
    }
};

const auth = async (req, res, next ) => {
    const tokenDecoded = tokenDecode(req);
    if (!tokenDecoded) return  responseHandler.unauthorize(res)

    const user = await userModel.findById(tokenDecoded.data);
    if(!user) return responseHandler.unauthorize(res)
    req.user = user
    next();
};

export default {auth, tokenDecode};
