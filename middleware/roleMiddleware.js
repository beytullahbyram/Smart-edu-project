module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (roles.includes(userRole)) {
            next()
        } else {
            res.status(401)
        }
    }
}


// module.exports = (roles) = & gt; {
//     return (req, res, next) = & gt; {
//         User.findById(req.session.userID, (err, user) => {
//                 if (user & amp; & amp; roles.includes(user.role)) {
//                     next();
//                 } else {
//                     res.status(404).send('Girilmez)}
//                     });
//             };
//         };