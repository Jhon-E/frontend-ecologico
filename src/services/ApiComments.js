class ApiComents {
  constructor() {
    if (!ApiComents.instance) {
      this.baseUrl = "http://localhost:8000";
      ApiComents.instance = this;
    }
    return ApiComents.instance;
  }

  async getCommentsByProduct(id) {
    const response = await fetch(`${this.baseUrl}/comments/${id}`, {
      headers: {
        "Content-type": "application/json",
      },
    })

    return response;
  }

  async submitComment(token, id_producto, contenido, date) {
    const data = {
      token,
      id_producto,
      contenido,
      date
    };
    const response = await fetch(`${this.baseUrl}/comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res);

    return response;
  }
}

const apiComentarios = new ApiComents();
export default apiComentarios;
