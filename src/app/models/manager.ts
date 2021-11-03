export class Manager {
  constructor(public manager: string,
              public fillWorker: string,
              public contactPhone: string) {
  }

  static newFrom(): Manager {
    return new Manager('', '', '');
  }
}
