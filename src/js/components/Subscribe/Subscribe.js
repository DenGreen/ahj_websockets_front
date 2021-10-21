import api from '../Api/Api';
import Chat from '../Chat/Chat';
import apiWs from "../Api/ApiWs";

export default class Subscribe {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this.element = element;

    this.onSubscribe = this.onSubscribe.bind(this);

    this.element.addEventListener('submit', this.onSubscribe);
  }

 /*  async */ onSubscribe(e) {
    e.preventDefault();

    const data = {};

    this.element.elements.forEach((elem) => {
      if (!elem.name) return;
      data[elem.name] = elem.value;
    });

    try {
      apiWs.nicnameAdd(data);
      // await api.subscriptions.add(data);
      this.element.classList.add("--hidden");
      new Chat(data);
    } catch (error) {
      alert("Псевдоним уже занят. Введите другой псевдоним");
    }
  }
}