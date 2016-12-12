import { Button } from './Button';
import { Panel } from './Panel';
import { gifs } from './gifs';

const PANEL_ID = 'ghgifz-panel';

function isPRFiles() {
  return window.location.href.match(/https?:\/\/github\.com\/.*\/pull\/.*?\/files/);
}

function el(id: string): Element {
  return document.getElementById(id);
}

function elNode(node: Element, className: string): Element {
  const el = node.getElementsByClassName(className);
  if (!el) {
    return null;
  }

  return el[0];
}

function attachButton(button: Button) {
  const container = elNode(el('submit-review'), 'form-actions');
  if (!container) {
    return;
  }

  button.appendTo(container);
}

function attachPanel(panel: Panel) {
  const container = elNode(el('submit-review'), 'form-actions');
  if (!container) {
    return;
  }

  panel.appendTo(container.parentElement);
}

function insertText(el, text) {
  if (el.selectionStart || el.selectionStart === 0) {
    let startPos = el.selectionStart;
    let endPos = el.selectionEnd;
    let scrollTop = el.scrollTop;

    if (startPos > 0) {
      text = '\n' + text;
    }

    el.value = el.value.substring(0, startPos) + text + el.value.substring(endPos, el.value.length);
    el.focus();
    el.selectionStart = startPos + text.length;
    el.selectionEnd = startPos + text.length;
    el.scrollTop = scrollTop;
  } else {
    el.value += text;
    el.focus();
  }
}

const panel = new Panel(gifs);
panel.handler = (gif) => {
  let textarea = document.getElementById('pull_request_review_body');
  if (!textarea) {
    return;
  }

  insertText(textarea, '![SHHHHIP IT!](' + gif.large + ')\n');

  panel.hide();
};

const button = new Button();
button.el.onclick = () => {
  if (panel.isHidden()) {
    panel.show();
  } else {
    panel.hide();
  }
};

if (isPRFiles()) {
  attachButton(button);
  attachPanel(panel);
}

document.addEventListener('DOMNodeInserted', (e) => {
  if (isPRFiles()) {
    if (el(PANEL_ID) || !(e.target instanceof Element)) {
      return;
    }

    attachButton(button);
    attachPanel(panel);
  }
}, false);
