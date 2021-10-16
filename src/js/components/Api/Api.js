class Api {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
  
      this.subscriptions = {
        add: (data) => this.post('/subscriptions/add', data),
        delete: (data) => this.delete('/subscriptions/delete', data),
      };

      this.massedge = {
        add: (data) => this.post('/massedge/add', data),
        receiveMas: () => this.get('/massedge/receive'),
        receiveNic: () => this.get('/nicname/receive'),
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
  
    async delete(url, postData) {
      return this.api(url, {
        method: 'post',
        body: JSON.stringify(postData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        keepalive: true,
      });
    }

    async get(url) {
      return this.api(url, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      });
    }
  }
  
  const api = new Api('https://websockets-dz.herokuapp.com/');
  
  export default api;
