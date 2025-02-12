import jwt from 'jsonwebtoken';

//ADMIN AUTHENTICATION MIDDLEWARE
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return req.json({ success: false, message: "Not Authorized" })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return req.json({ success: false, message: "Not Authorized" })
        }
        next()
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: e.message })
    }
}
export default authAdmin;