const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    sign_in_user_post: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({
                    succes: false,
                    message: 'Credenciales incorrect@s'
                });
                next();
            } else {
                if (!bcrypt.compareSync(password, user.password)) {
                    await res.status(401).json({ succes: false, message: 'Credenciales incorrectas' });
                    next();
                } else {
                    const token = jwt.sign({
                            email: user.email,
                            name: `${user.name} ${user.lastname}`,
                            id: user._id
                        },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: '1h'
                        }
                    );

                    res.status(200).json({
                        succes: true,
                        token
                    });
                    next();
                }
            }
        } catch (error) {
            console.log({ error });
            res.json({ succes: false, message: 'Hubo un error' });
        }
    },

    sign_up_user_post: async (req, res, next) => {
        try {
            const { body } = req;
            const user = new User(body);
            user.password = await bcrypt.hash(body.password, 10);
            await user.save();
            res.json({
                succes: true,
                message: 'Usuario creado correctamente'
            })
        } catch (error) {
            console.log({ error });
            res.json({ succes: false, message: 'Hubo un error' });
        }
    },
}