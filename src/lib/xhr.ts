import { XMLHttpRequest } from 'xmlhttprequest';

export class XHR {
  public get(url: string, cb: (status: number, response: string) => void) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      cb(xhr.status, xhr.responseText);
    };
    xhr.send();
  }
}
