class ApiCategories {
    constructor() {
      if (!ApiCategories.instance) {
        this.baseUrl = "http://localhost:8000";
        ApiCategories.instance = this;
      }
      return ApiCategories.instance;
    }
  
    async getCategories() {
      const categories = fetch(`${this.baseUrl}/categories`, {
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 401) {
            console.error(res);
          }
          return res.json();
        })
        .then((res) => res);
  
      return await categories;
    }
  
  }
  
  const apiCategories = new ApiCategories();
  export default apiCategories;