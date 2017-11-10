import { El } from './element';

export class Button extends El {
  constructor() {
    super();

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ghgifz-btn';
    button.innerHTML = '🚀';

    this.element = button;
  }
}
