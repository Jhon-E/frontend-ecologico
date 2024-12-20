class ApiOrder {
  constructor() {
    if (!ApiOrder.instance) {
      this.baseUrl = "http://localhost:8000";
      ApiOrder.instance = this;
    }
    return ApiOrder.instance;
  }

  async submitOrder(pedido) {
    const res = await fetch(`${this.baseUrl}/order`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(pedido),
    });

    return await res;
  }

  async getOrder(token) {
    const res = await fetch(`${this.baseUrl}/order?token=${token}`, {
      headers: {
        "Content-type": "application/json",
      }
    });

    return await res.json()
  }
}

const orderApi = new ApiOrder();
export default orderApi;
