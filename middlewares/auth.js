export const auth = (req, res, next) => {
    if (req.session.userId || req.cookies.userEmail) {
        return next();
    } else {
        return res.redirect("/");
    }
}