import { Config } from './config/config';
import { Button } from './components/button';
import { Popup } from './components/popup';
import { Gifs } from './lib/gifs';

function init() {
  document.addEventListener('DOMNodeInserted', (e) => {
    if (!(e.target instanceof Element)) {
      return;
    }

    attachGifButtonz();
  }, false);

  attachGifButtonz();
}

function shouldAppendButtonToId(id: string) {
  return Config.appendIDs.filter((prefix) => { return id.match('^' + prefix) }).length;
}

function attachGifButtonz() {
  const textareas = document.getElementsByTagName('textarea');
  for (let i=0; i<textareas.length; i++) {
    const textarea = textareas[i];
    if (!shouldAppendButtonToId(textarea.id)) {
      continue;
    }
    const id = Config.ghgifz + '-' + textarea.id;
    const existingButton = document.getElementById(id);
    if (existingButton) {
      if (existingButton.onclick) {
        continue;
      }
      existingButton.remove();
    }
    const button = new Button();
    button.id = id;
    button.onclick = () => {
      const popup = new Popup();
      popup.onremove = () => {
        textarea.focus();
      };
      popup.onselect = (gif) => {
        insertText(textarea, '![' + Config.tagLine + '](' + gif.large + ')\n');
        popup.remove();
      };
      popup.appendTo(document.body);
      popup.alignTo(button.element);

      const onload = () => {
        Gifs.gifs((gifs) => {
          popup.loadGifs(gifs);
        });
      };

      if (!Gifs.lastUpdated()) {
        Gifs.update(() => {
          onload();
        });
        return;
      }

      onload();
    };

    textarea.parentElement.appendChild(button.element);
    textarea.dataset[Config.ghgifz] = Config.yas;
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

init();
