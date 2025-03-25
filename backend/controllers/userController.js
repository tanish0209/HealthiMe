import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import razorpay from 'razorpay';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
// API TO REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a Valid Email Address" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a password of minimum length 8 characters" });
        }
        //Hashing user Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name, email, password: hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API FOR USER LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Does Not Exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Password does not match" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
//API TO GET USER PROFILE DATA
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
//API TO UPDATE USER PROFILE
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, dob, gender, address } = req.body;
        const imageFile = req.file;
        console.log(req.body)
        console.log(req.file)

        if (!name || !dob || !phone || !gender) {
            return res.json({ success: false, message: "Missing Details" })
        }
        console.log("🔄 Updating user profile in DB...");
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });
        console.log("✔ User profile updated successfully!");
        if (imageFile) {
            try {
                console.log("📤 Uploading image to Cloudinary...");
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                    resource_type: "image",
                });
                console.log("✅ Image uploaded:", imageUpload);

                const imageURL = imageUpload.secure_url;
                await userModel.findByIdAndUpdate(userId, { image: imageURL });

            } catch (cloudinaryError) {
                console.error("❌ Cloudinary Upload Error:", cloudinaryError);
                return res.status(500).json({ success: false, message: "Image upload failed" });
            }
        }
        return res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API TO BOOK APPPOINTMENT
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available" })
        }
        let slots_booked = docData.slots_booked;
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot is already booked" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await
            userModel.findById(userId).select('-password');
        delete docData.slots_booked;
        const appointmentData = {
            userId, docId, slotDate, slotTime, userData, doctorData: docData, amount: docData.fees, date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ success: true, message: "Appointment Booked Successfully" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
//API TO GET USER APPOINTMENTS FOR FRONTEND
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API TO CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "You are not authorized to cancel this appointment" })
        } else {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            //releasing doctor slot
            const { docId, slotDate, slotTime } = appointmentData;
            const doctorData = await doctorModel.findById(docId).select('-password');
            let slots_booked = doctorData.slots_booked;
            slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
            await doctorModel.findByIdAndUpdate(docId, { slots_booked });
            res.json({ success: true, message: "Appointment Cancelled Successfully" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });
//API TO MAKE PAYMENT OF APPOINTMNET USING RAZORPAY
// const paymentRazorpay = async (req, res) => {

// }

//API TO MAKE PAYMENT OF APPOINTMENT
const makePayment = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        const doctorData = await doctorModel.findById(docId).select('-password');
        const amount = doctorData.fees;
        await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
        return res.json({ success: true, message: `Payment of $ ${amount} successful` });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, makePayment }