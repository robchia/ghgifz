import { Button } from './Button';
import { Popup } from './Popup';
import { gifs } from './gifs';

const GHGIFZ = 'ghgifz';
const YAS = 'yas';
const APPEND_IDS = ['new_inline_comment_diff_diff', 'pull_request_review_body', 'new_comment_field'];

function shouldAppendButtonToId(id: string) {
  return APPEND_IDS.filter((prefix) => { return id.match('^' + prefix) }).length;
}

function attachGifButtonz() {
  const textareas = document.getElementsByTagName('textarea');
  for (let i=0; i<textareas.length; i++) {
    const textarea = textareas[i];
    if (!shouldAppendButtonToId(textarea.id)) {
      continue;
    }
    const id = GHGIFZ + '-' + textarea.id;
    if (document.getElementById(id)) {
      continue;
    }
    const button = new Button();
    button.id = id;
    button.onclick = () => {
      const popup = new Popup();
      popup.onremove = () => {
        textarea.focus();
      };
      popup.handler = (gif) => {
        insertText(textarea, '![SHHHHIP IT!](' + gif.large + ')\n');
        popup.remove();
      };
      popup.appendTo(document.body);
      popup.alignTo(button.element);
      popup.loadGifs(gifs);
    };

    textarea.parentElement.appendChild(button.element);
    textarea.dataset[GHGIFZ] = YAS;
  }
}

function insertText(textarea: HTMLTextAreaElement, text: string) {
  if (textarea.selectionStart || textarea.selectionStart === 0) {
    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    let scrollTop = textarea.scrollTop;

    if (startPos > 0) {
      text = '\n' + text;
    }

    textarea.value = textarea.value.substring(0, startPos) + text + textarea.value.substring(endPos, textarea.value.length);
    textarea.focus();
    textarea.selectionStart = startPos + text.length;
    textarea.selectionEnd = startPos + text.length;
    textarea.scrollTop = scrollTop;
  } else {
    textarea.value += text;
    textarea.focus();
  }
}

document.addEventListener('DOMNodeInserted', (e) => {
  if (/*$(PANEL_ID) || */!(e.target instanceof Element)) {
    return;
  }

  attachGifButtonz();
}, false);

attachGifButtonz();
