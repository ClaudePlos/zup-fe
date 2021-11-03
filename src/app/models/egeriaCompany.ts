import {EkModule} from './ekModule';

export class EgeriaCompany {
  constructor(public company: boolean,
              public modules: string[],
              public ekModule: EkModule,
              public hrGroups: string,
              public modelFunctionalityOn: string) {
  }

  static newFrom(): EgeriaCompany {
    return new EgeriaCompany(false, [], EkModule.newFrom(), '', '');
  }
}
