const auth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ message: "Login Required" });
  };
  
  export default auth;