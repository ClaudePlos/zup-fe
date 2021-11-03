export class Worker {
  constructor(public id: number,
              public surname: string,
              public name: string,
              public personalNumber: string,
              public startWorkDate: string) {
  }

  static newFrom(): Worker{
    return new Worker(null, '', '', '', '');
  }
}
