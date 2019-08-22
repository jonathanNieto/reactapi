const jwt = require('jsonwebtoken');

module.exports = {
    is_authenticated: async (req, res, next) => {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            /* const error = new Error('No autenticado');
            error.statusCode = 401;
            throw error; */
            return res.status(401).json({ message: 'No autorizado' });
        } 

        //get token
        const token = authHeader.split(' ')[1];
        let verifyToken;
        try {
            verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        } catch (error) {
            /* error.statusCode = 500;
            throw error; */
            return res.status(500).json({ message: 'No autorizado' });
        }

        if (!verifyToken) {
            /* const error = new Error('No autenticado');
            error.statusCode = 401;
            throw error; */
            return res.status(401).json({ message: 'No autorizado' });
        }
        next();
    },
}