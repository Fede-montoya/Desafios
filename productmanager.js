const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            product.id = products.length + 1;
            products.push(product);
            await this._saveToFile(products);
            console.log("Producto agregado correctamente!");
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === productId);
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error);
        }
    }

    async updateProduct(productId, updatedFields) {
        try {
            let products = await this.getProducts();
            const index = products.findIndex(product => product.id === productId);
            if (index !== -1) {
                products[index] = { ...products[index], ...updatedFields };
                await this._saveToFile(products);
                console.log("Producto actualizado exitosamente!");
                return true;
            }
            console.error("Producto no encontrado con ID:", productId);
            return false;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return false;
        }
    }

    async deleteProduct(productId) {
        try {
            let products = await this.getProducts();
            products = products.filter(product => product.id !== productId);
            await this._saveToFile(products);
            console.log("Producto eliminado exitosamente!");
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }

    async _saveToFile(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }
}

// Ejemplo de uso
const manager = new ProductManager('products.json');

// Agregar un producto
manager.addProduct({
    title: 'Audi A3',
    description: 'Descripción del Audi A3',
    price: 50000,
    thumbnail: 'ruta/imagen_audi_a3.jpg',
    code: 'AUDI-A3',
    stock: 10
});

// Obtener todos los productos
manager.getProducts()
    .then(products => console.log("Todos los productos:", products))
    .catch(error => console.error("Error al obtener los productos:", error));

// Obtener un producto por ID
manager.getProductById(1)
    .then(product => console.log("Producto con ID 1:", product))
    .catch(error => console.error("Error al obtener el producto por ID:", error));

// Actualizar un producto
manager.updateProduct(1, { title: 'Nuevo Audi A3' })
    .then(success => {
        if (success) {
            console.log("Producto actualizado correctamente");
        } else {
            console.log("Producto no encontrado");
        }
    })
    .catch(error => console.error("Error al actualizar el producto:", error));

// Eliminar un producto
manager.deleteProduct(1)
    .catch(error => console.error("Error al eliminar el producto:", error));
