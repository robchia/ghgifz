export class Gif {
  public readonly id: string;
  public readonly title: string;
  public readonly thumb: string;
  public readonly large: string;

  constructor(id: string, title: string, thumb: string, large: string) {
    this.id = id;
    this.title = title;
    this.thumb = thumb;
    this.large = large;
  }
}
