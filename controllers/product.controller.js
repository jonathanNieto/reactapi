const path = require('path');
const fs = require('fs-extra');

const Product = require('../models/Product');


module.exports = {
    create_product_post: async (req, res, next) => {
        try {
            const product = new Product(req.body);
            if (req.file) {
                product.image = req.file.filename
            }
            await product.save();
            return res.status(200).json({
                success: true,
                message: 'Product created successfully.',
                product
            });
        } catch (error) {
            console.log({ error });
            if (error.hasOwnProperty('errors')) {
                let message = '';
                if (error.errors.hasOwnProperty('name')) {
                    message += error.errors.name.message + ';\n';

                }
                if (error.errors.hasOwnProperty('price')) {
                    message += error.errors.price.message + ';\n';
                }
                res.status(400).json({
                    success: false,
                    message
                });
            }
            next();
        }
    },

    get_all_products_get: async (req, res, next) => {
        try {
            const products = await Product.find();
            return res.status(200).json({
                success: true,
                products
            });
        } catch (error) {
            console.log({ error });
            next();
        }
    },

    get_one_product_get: async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product does not exist!'
                });
            }
            return res.status(200).json({
                success: true,
                product
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

    update_product_put: async (req, res, next) => {
        try {
            const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            if (!product) {
                if (req.file) await fs.unlink(path.join(__dirname, `/../uploads/${req.file.filename}`));
                
                return res.status(404).json({
                    success: false,
                    message: 'Product does not exist!'
                });
            }
            if (req.file && product) {
                if(product.image) await fs.unlink(path.join(__dirname, `/../uploads/${product.image}`));
                product.image = req.file.filename
                await product.save();
            }
            return res.status(200).json({
                success: true,
                product
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

    delete_product_delete: async (req, res, next) => {
        try {
            const product = await Product.findOneAndDelete({ _id: req.params.id });
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product does not exist!'
                });
            } else {
                await fs.unlink(path.join(__dirname, `/../uploads/${product.image}`));
            }
            return res.status(200).json({
                success: true,
                product
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

    search_product_post: async (req, res, next) => {
        try {
            const { query } = req.params;
            const products = await Product.find({ name: new RegExp(query, 'i') });
            console.log({products});
            if (products.length === 0) {
                console.log('no hay productos con esa busqueda: ', query);
                return res.json({
                    success: false,
                    message: 'Products do not exist!'
                });
            }
            return res.status(200).json({
                success: true,
                products
            });
        } catch (error) {
            console.log({error});
        }
    },
}