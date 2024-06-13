class ApiAuth {
  constructor() {
    if (!ApiAuth.instance) {
      this.baseUrl = "http://localhost:8000";
      ApiAuth.instance = this;
    }
    return ApiAuth.instance;
  }

  async getUserData(token) {
    const key = `Bearer ${token}`;
    if (token) {
      const userData = fetch(`${this.baseUrl}/auth/profile`, {
        headers: {
          "Content-type": "application/json",
          Authorization: key,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            console.error(res);
          }
          return res.json();
        })
        .then((res) => res);

      return await userData;
    } else {
      console.log("No hay sesión de usuario.");
    }
  }

  async loginService({ email, password }) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res);
    return response;
  }
  async signInService({ nombre, email, avatar, password }) {
    const data = {
      nombre,
      email,
      avatar,
      password,
      rol: 1,
    };
    const response = await fetch(`${this.baseUrl}/auth`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateRol(rol, nombre, email) {
    const res = await fetch(`${this.baseUrl}/auth/rol`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({rol, nombre, email}),
    });

    return res;
  }
}

const auth = new ApiAuth();
export default auth;
