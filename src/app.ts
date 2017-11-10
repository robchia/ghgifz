import { Button } from './components/button';
import { Popup } from './components/popup';
import { Config } from './config/config';
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

function update(cb: () => void) {
  const lastUpdated = Gifs.lastUpdated();
  const diff = (new Date()).getTime() - lastUpdated.getTime();
  const shouldUpdate = diff > (3600 * 10);
  if (!lastUpdated || shouldUpdate) {
    Gifs.currentVersion((version: string) => {
      const localVersion = Gifs.localVersion();
      const newerVersionAvailable = !localVersion || (localVersion !== version);
      if (newerVersionAvailable) {
        Gifs.update(cb);
      } else {
        cb();
      }
    });
  } else {
    cb();
  }
}

function shouldAppendButtonToId(id: string) {
  return Config.appendIDs.filter((prefix) => id.match('^' + prefix)).length;
}

function attachGifButtonz() {
  const textareas = document.getElementsByTagName('textarea');
  for (const textarea of textareas as any) {
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

      update(() => {
        onload();
      });
    };

    textarea.parentElement.appendChild(button.element);
    textarea.dataset[Config.ghgifz] = Config.yas;
  }
}

function insertText(textarea: HTMLTextAreaElement, text: string) {
  if (textarea.selectionStart || textarea.selectionStart === 0) {
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const scrollTop = textarea.scrollTop;

    if (startPos > 0) {
      text = '\n' + text;
    }

    const prefix = textarea.value.substring(0, startPos);
    const suffix = textarea.value.substring(endPos, textarea.value.length);
    textarea.value = prefix + text + suffix;
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
