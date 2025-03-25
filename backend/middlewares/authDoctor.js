import jwt from 'jsonwebtoken';

//DOCTOR AUTHENTICATION MIDDLEWARE
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers
        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized" })
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.body.docId = token_decode.id;
        next()
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: e.message })
    }
}
export default authDoctor;