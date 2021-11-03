import {CostPosition} from "./costPosition";

export class Localization {
  constructor(public costPosition: CostPosition,
              public otherOfficeLocalization: string
  ) {
  }

  static newFrom(): Localization {
    return new Localization(null, '');
  }
}
