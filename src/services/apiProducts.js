class ApiProducts {
  constructor() {
    if (!ApiProducts.instance) {
      this.baseUrl = "http://localhost:8000";
      ApiProducts.instance = this;
    }
    return ApiProducts.instance;
  }

  async getProducts() {
    const response = await fetch(`${this.baseUrl}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  async submitProduct(
    nombre,
    precio,
    stock,
    categoria,
    descripcion,
    imagen,
    nombreUser,
    emailUser
  ) {
    const data = {
      nombre,
      precio,
      stock,
      categoria,
      descripcion,
      imagen,
      nombreUser,
      emailUser,
    };
    try {
      const response = await fetch(`${this.baseUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  async getProduct(id) {
    const product = await fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    return product;
  }

  async getProductsBySeller(nombre, email) {
    const product = await fetch(`${this.baseUrl}/products/seller`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ nombre, email }),
    });
    return await product.json();
  }
}

const apiProducts = new ApiProducts();
export default apiProducts;
