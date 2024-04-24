class ProductManager {
    constructor() {
        this.products = [];
        this.lastId = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Validar que el código del producto no esté repetido
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            console.error("El código del producto ya está en uso.");
            return;
        }

        // Incrementar el id autoincrementable
        this.lastId++;

        // Crear el nuevo producto
        const newProduct = {
            id: this.lastId,
            type: "auto",
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // Agregar el nuevo producto al arreglo de productos
        this.products.push(newProduct);

        console.log("Auto agregado correctamente:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Producto no encontrado.");
        }
        return product;
    }
}

// Ejemplo de uso:
const productManager = new ProductManager();

productManager.addProduct("Auto Sedán", "Descripción del auto Sedán", 25000, "sedan.jpg", "A001", 10);
productManager.addProduct("Auto SUV", "Descripción del auto SUV", 35000, "suv.jpg", "A002", 8);
productManager.addProduct("Auto Hatchback", "Descripción del auto Hatchback", 20000, "hatchback.jpg", "A001", 5); // Intentar agregar un auto con código repetido

console.log("Lista de autos:", productManager.getProducts());

console.log("Auto con id 2:", productManager.getProductById(2));
console.log("Auto con id 4:", productManager.getProductById(4)); 
// Intentar obtener un auto que no existe
