require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log(`>>> user exist, chọn 1 email khác: ${email}`);
            return null;
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "User"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Email/Password không hợp lệ"
                }
            } else {
                const payload = {
                    email: user.email,
                    name: user.name,
                    role: user.role || 'User'
                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        let result = await User.find({}).select("-password");
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const ensureAdminExists = async () => {
    try {
        // ensure dotenv loads .env from current working directory
        try {
            const path = require('path');
            require('dotenv').config({ path: path.join(process.cwd(), '.env') });
        } catch (e) {
            // ignore
        }
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminEmail || !adminPassword) {
            console.log('>>> Admin credentials not provided in .env');
            return;
        }

        let admin = await User.findOne({ email: adminEmail });
        if (!admin) {
            const hashPassword = await bcrypt.hash(adminPassword, saltRounds);
            admin = await User.create({
                name: 'Admin',
                email: adminEmail,
                password: hashPassword,
                role: 'Admin'
            });
            console.log(`>>> Admin user created: ${adminEmail}`);
        } else {
            console.log(`>>> Admin user already exists: ${adminEmail}`);
        }
    } catch (error) {
        console.log('>>> ensureAdminExists error: ', error);
    }
}

module.exports = {
    createUserService, loginService, getUserService, ensureAdminExists
}