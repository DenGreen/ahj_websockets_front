import api from "../Api/Api";
import apiWs from "../Api/ApiWs";

export default class Chat {
  constructor(nicname) {
    this.nicname = nicname.name;
    this.dbNicknames = null;
    this.dbMesseges = null;
    this.formationChat();
    this.requestMessageNicname();
    this.fieldOutputForm = document.querySelector('.field-output__form');
    this.submittingForm = this.submittingForm.bind(this);
    this.deletingUser = this.deletingUser.bind(this);
    this.formationChatMessages = this.formationChatMessages.bind(this);
    this.fieldOutputForm.addEventListener('submit', this.submittingForm);
    window.addEventListener("unload", this.deletingUser);
    apiWs.wsEventMassage(this.formationChatMessages);
  }

  async deletingUser() {
    const data = {name: this.nicname};
    await api.subscriptions.delete(data);
  }

  async requestMessageNicname() {
    this.dbNicknames = await api.massedge.receiveNic();
    this.dbMesseges = await api.massedge.receiveMas();
    this.formationChatMessages(this.dbMesseges);
    this.formationNicknames(this.dbNicknames);
    
  }

  submittingForm(e) {
    e.preventDefault();
    const data = {};
    data.name = this.nicname;
    data.messege = this.fieldOutputForm.elements[0].value;
    this.fieldOutputForm.elements[0].value = '';
    apiWs.massedgeAdd(data);
    // this.formationChatMessages([await api.massedge.add(data)]);
  }

  formationChat() {
    const body = document.querySelector('body');

    body.insertAdjacentHTML(
        "beforeend",
        `<div class="chat">
    
        <div class="chat__users">
        </div>
    
        <div class="chat__field-output">
          <div class="field-output__messages">
          </div>
    
          <form class="field-output__form">
            <input class="form__massege" name="massege">
            <button class="form__btn">Отправить</button>
          </form>
        </div>
      </div>`
    );
  }

  formationNicknames(dbNicknames) {
    const chatUsers = document.querySelector(".chat__users");

    dbNicknames.forEach((value) => {
        if (value.name == this.nicname) {
          chatUsers.insertAdjacentHTML(
            "beforeend",
            `<div class="chat__user">
                  <span class="chat__user-circle"></span>
                  <span class="user__nickname --nickname-yau">You</span>
              </div>`
          );
          return;
        }
  
        chatUsers.insertAdjacentHTML(
          "beforeend",
          `<div class="chat__user">
                <span class="chat__user-circle"></span>
                <span class="user__nickname">${value.name}</span>
            </div>`
        );
      });
  }
  
  formationChatMessages(dbMesseges) {
    const fieldOutputMessages = document.querySelector(
      ".field-output__messages"
    );

    dbMesseges.forEach((value) => {
      if (value.name == this.nicname) {
        fieldOutputMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="messages__massage --massage-flex-end">
                <div class="massage__wrapper --massage-you">
                    <span class="massage__nickname">You</span>
                    <span class="massege__data">${value.data}</span>
                </div>
                <div class="massge">${value.messege}</div>
            </div>`
        );
        return;
      }

      fieldOutputMessages.insertAdjacentHTML(
        "beforeend",
        `<div class="messages__massage">
            <div class="massage__wrapper">
                <span class="massage__nickname">${value.name}</span>
                <span class="massege__data">${value.data}</span>
            </div>
            <div class="massge">${value.messege}</div>
        </div>`
      );
    });

    fieldOutputMessages.scrollTop = fieldOutputMessages.scrollHeight;
  }
}
