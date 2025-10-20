import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const AdminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(400).json({ message: 'No Authentication token found..' });
    }

    const token = authHeader.split(" ")[1];
    console.log("token:", token);

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode", decode);

    
    if (decode.UserCheck.role.toLowerCase() !== "admin") {
      return res.status(403).json({ message: ' You are not  admin! ' });
    }

    req.user = decode.UserCheck; 

    next();
  } catch (error) {
    res.status(500).json({ message: error.message || ' error' });
  }
};

export default AdminAuth;
