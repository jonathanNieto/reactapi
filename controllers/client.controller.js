const Client = require('../models/Client');


module.exports = {
    create_client_post: async (req, res, next) => {
        try {
            const client = new Client(req.body);
            await client.save();
            return res.status(200).json({
                success: true,
                message: 'Client created successfully.'
            });
        } catch (error) {
            console.log({ error });
            if (error.hasOwnProperty('errors')) {
                let message = '';
                if (error.errors.hasOwnProperty('email')) {
                    message += error.errors.email.message + ';\n';
                }
                if (error.errors.hasOwnProperty('name')) {
                    message += error.errors.name.message + ';\n';

                }
                if (error.errors.hasOwnProperty('lastname')) {
                    message += error.errors.lastname.message + ';\n';
                }
                res.status(400).json({
                    success: false,
                    message
                });
            }
            if (error.hasOwnProperty('code')) {
                if (error.code === 11000) {
                    res.status(400).json({
                        success: false,
                        message: 'Email already exists: ' + error.errmsg
                    });
                }
            }
            next();
        }
    },

    get_all_clients_get: async (req, res, next) => {
        try {
            const clients = await Client.find();
            return res.status(200).json({
                success: true,
                clients
            });
        } catch (error) {
            console.log({ error });
            next();
        }
    },

    get_one_client_get: async (req, res, next) => {
        try {
            const client = await Client.findById(req.params.id);
            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: 'Client does not exist!'
                });
            }
            return res.status(200).json({
                success: true,
                client
            });
        } catch (error) {
            console.log({ error });
            if (error.hasOwnProperty('name')) {
                if (error.name === 'CastError') {
                    res.status(404).json({
                        success: false,
                        message: 'Invalid ObjectId!'
                    });
                }
            }
            next();
        }
    },

    update_client_put: async (req, res, next) => {
        try {
            const client = await Client.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: 'Client does not exist!'
                });
            }
            return res.status(200).json({
                success: true,
                client
            });
        } catch (error) {
            console.log({ error });
            if (error.hasOwnProperty('name')) {
                if (error.name === 'CastError') {
                    res.status(404).json({
                        success: false,
                        message: 'Invalid ObjectId!'
                    });
                }
            }
            next();
        }
    },

    delete_client_delete: async (req, res, next) => {
        try {
            const client = await Client.findOneAndDelete({ _id: req.params.id });
            if (!client) {
                return res.status(404).json({
                    success: false,
                    message: 'Client does not exist!'
                });
            }
            return res.status(200).json({
                success: true,
                client
            });
        } catch (error) {
            console.log({ error });
            if (error.hasOwnProperty('name')) {
                if (error.name === 'CastError') {
                    res.status(404).json({
                        success: false,
                        message: 'Invalid ObjectId!'
                    });
                }
            }
            next();
        }
    },
}