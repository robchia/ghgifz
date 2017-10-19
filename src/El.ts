
export class El {
  private _onremove: any

  element: HTMLElement;

  get id(): string {
    return this.element.id;
  }

  set id(newId: string) {
    this.element.id = newId;
  }

  get onclick(): any {
    return this.element.onclick;
  }

  set onclick(f: any) {
    this.element.onclick = f;
  }

  get onremove(): any {
    return this._onremove;
  }

  set onremove(f: any) {
    this._onremove = f;
  }

  constructor() {
  }

  appendTo(node: Node) {
    node.appendChild(this.element);
  }

  remove() {
    this.element.remove();

    if (this._onremove) {
      this._onremove();
    }
  }

  isHidden() {
    return this.element.style.display != 'block';
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
};
