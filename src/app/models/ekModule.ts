export class EkModule {
  constructor(public groups: string[],
              public modelFunctionalityOn: string) {
  }

  static newFrom(): EkModule {
    return new EkModule([], '');
  }
}
