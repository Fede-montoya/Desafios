const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    products: {
        type: [
            {
                product_id: { 
                    type: Schema.Types.ObjectId, 
                    ref: 'products' 
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
})

const cartModel = model('carts', cartSchema);

module.exports = cartModel;