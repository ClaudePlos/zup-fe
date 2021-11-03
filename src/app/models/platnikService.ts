export class PlatnikService {
  constructor(public items: string[]) {
  }

  static newFrom(): PlatnikService {
    return new PlatnikService([]);
  }
}
