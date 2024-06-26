const CartService = require('../services/cartService');
const cartService = new CartService();

class CartController {
    async getCarts (req, res, next) {
        try {
            const carts = await cartService.getCarts();

            return res.status(200).json(carts);
        } catch (error) {
            next (error);
        }
    }

    async getCartById (req, res, next) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);

            return res.status(200).json(cart);
        } catch (error) {
            next (error);
        }
    }

    async createCart (req, res, next) {
        try {
            const newCart = await cartService.createCart();

            return res.status(201).json(newCart);
        } catch (error) {
            next (error);
        }
    }

    async updateCart (req, res, next) {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartService.updateCart(cid, pid);
            
            return res.status(200).json(updatedCart);
        } catch (error) {
            next (error);
        }
    }
}

module.exports = CartController;