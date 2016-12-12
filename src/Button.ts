import { El } from './El';

export class Button extends El {
  constructor() {
    super();

    let button = document.createElement('button');
    button.id = 'ghgifz-button';
    button.type = 'button';
    button.className = 'btn btn-sm btn-plain';
    button.innerHTML = '🚀';

    this.el = button;
  }
};
