const Order = require('../models/Order');


module.exports = {
    create_order_post: async (req, res, next) => {
        try {
            const order = new Order(req.body);
            await order.save();
            return res.status(200).json({
                success: true,
                message: 'Order created successfully.',
                order
            });
        } catch (error) {
            console.log({ error });
            /* if (error.hasOwnProperty('errors')) {
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
            } */
            next();
        }
    },

    get_all_orders_get: async (req, res, next) => {
        try {
            const orders = await Order.find({}, '-__v')
                .populate('client', '-__v')
                .populate('products.product', '-__v');

            return res.status(200).json({
                success: true,
                orders
            });
        } catch (error) {
            console.log({ error });
            next();
        }
    },

    get_one_order_get: async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id, '-__v')
                .populate('client', '-__v')
                .populate('products.product', '-__v');

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order does not exist!'
                });
            }
            return res.status(200).json({
                success: true,
                order
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

    update_order_put: async (req, res, next) => {
        try {
            const order = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
                .populate('client', '-__v')
                .populate('products.product', '-__v');

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order does not exist!'
                });
            }
            return res.status(200).json({
                success: true,
                order
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

    delete_order_delete: async (req, res, next) => {
        try {
            const order = await Order.findOneAndDelete({ _id: req.params.id })
                .populate('client', '-__v')
                .populate('products.product', '-__v');
            
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order does not exist!'
                });
            }
            return res.status(200).json({
                success: true,
                order
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