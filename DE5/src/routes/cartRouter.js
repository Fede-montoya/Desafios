import { Router } from "express";
const router = Router();

import CartManager from "../app.js/cartManager.js";


const cartManager = new CartManager('./src/data/carts.json');

router.post("/:idCart/product/:idProd", async (req, res, next) => {
   try {
      const { idProd } = req.params;
      const { idCart } = req.params;
      const response = await cartManager.saveProductToCart(idCart, idProd);
      res.json(response)
   } catch (error) {
    next(error)
   }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await cartManager.createCart();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:idCart", async (req, res, next) => {
  try {
    const {idCart} = req.params
    res.json(await cartManager.getCartById(idCart))
  } catch (error) {
    next(error);
  }
});

export default router;