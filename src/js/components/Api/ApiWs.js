class ApiWs {
  constructor() {
    this.ws = new WebSocket("wss://websockets-dz.herokuapp.com/ws");
  }

  nicnameAdd(data) {
    const objData = {
      method: "nicnameAdd",
      data: data,
    };
    this.ws.send(JSON.stringify(objData));
  }

  massedgeAdd(data) {
    const objData = {
      method: "massedgeAdd",
      data: data,
    };
    this.ws.send(JSON.stringify(objData));
  }

  nicnameReceive() {
    const objData = {
      method: "nicnameReceive",
    };
    this.ws.send(JSON.stringify(objData));
  }

  nicnameDelete(nicname) {
    nicname.method = "nicnameDelete";
    this.ws.send(JSON.stringify(objData));
  }

  wsEventMassage(formationChatMessages, formationNicknames) {
    this.ws.addEventListener("message", (e) => {
      const { data } = e;
      const response = JSON.parse(data);
      const { method, objData } = response;

      switch (method) {
        case "massedgeAdd":
          formationChatMessages(objData);
          return;
        case "nicnameReceive":
          formationNicknames(objData);
          return;
        case "delete":
          formationNicknames(objData);
          return;
        default:
          ctx.response.body = `Unknown method '${method}' in request parameters`;
          ctx.response.status = 400;
          break;
      }
    });
  }
}

const apiWs = new ApiWs();

export default apiWs;
