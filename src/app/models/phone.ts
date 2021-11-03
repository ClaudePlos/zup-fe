export class Phone {
  constructor(public phone: string) {
  }

  static newFrom(): Phone {
    return new Phone('')
  }
}


