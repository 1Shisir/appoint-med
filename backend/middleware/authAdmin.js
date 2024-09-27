import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers;
        if (!atoken) return res.status(400).json({ success: "false", message: "Not authorized" });

        const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET_KEY);
        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ success: "false", message: "Not authorized" });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: "false", message: error.message });
    }
}

export  default authAdmin;