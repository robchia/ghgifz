import { El } from './El';

export class Button extends El {
  constructor() {
    super();

    let button = document.createElement('button');
    button.type = 'button';
    button.className = 'ghgifz-btn';
    button.innerHTML = '🚀';

    this.element = button;
  }
};
