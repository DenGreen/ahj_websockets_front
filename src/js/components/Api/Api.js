class Api {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
  
      this.subscriptions = {
        add: (data) => this.post('/subscriptions/add', data),
        delete: (phone) => this.delete(`/subscriptions/delete/${phone}`),
      };

      this.massedge = {
        add: (data) => this.post('/massedge/add', data),
      };
    }
  
    async api(url, settings) {
      const response = await fetch(this.baseUrl + url, settings);
  
      if (!response.ok) {
        throw new Error(`Api Request Error: ${response.statusText}`);
      }
  
      const json = await response.json();
  
      return json;
    }
  
    async post(url, postData) {
      return this.api(url, {
        method: 'post',
        body: JSON.stringify(postData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    }
  
    async delete(url) {
      return this.api(url, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
        },
      });
    }
  }
  
  const api = new Api('http://localhost:7070');
  
  export default api;