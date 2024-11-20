import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const {dtoken} = req.headers;
        if (!dtoken) return res.status(400).json({ success: "false", message: "Not authorized" });

        const tokenDecode = jwt.verify(dtoken, process.env.JWT_SECRET_KEY);
        req.body.docId = tokenDecode.id;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: "false", message: error.message });
    }
}

export  default authDoctor;