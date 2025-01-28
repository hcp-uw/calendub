const admin = require("./firebase-admin");

const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No ID token provided" });
  }

  try {
    console.log("Verifying token");
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    console.log("Token verified");
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token", error });
  }
};

module.exports = verifyToken;
