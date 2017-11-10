
export class El {
  private onremoveF: any;

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
    return this.onremoveF;
  }

  set onremove(f: any) {
    this.onremoveF = f;
  }

  public appendTo(node: Node) {
    node.appendChild(this.element);
  }

  public remove() {
    this.element.remove();

    if (this.onremoveF) {
      this.onremoveF();
    }
  }

  public isHidden() {
    return this.element.style.display !== 'block';
  }

  public show() {
    this.element.style.display = 'block';
  }

  public hide() {
    this.element.style.display = 'none';
  }
}
