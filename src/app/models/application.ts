import {Worker} from './worker';
import {Localization} from './localization';
import {Manager} from './manager';
import {Services} from './services';
import {EgeriaCompany} from './egeriaCompany';


export class Application {
  private constructor(
    public worker: Worker,
    public startWorkDate: string,
    public endWorkDate: string,
    public localization: Localization,
    public manager: Manager,
    public services: Services,
    public egeriaCompany: EgeriaCompany,
    public additionalEquipments: [],
    public additionalEquipmentsAddress: string
  ) {
  }

  static newFrom(): Application {
    return new Application(Worker.newFrom(),
      '',
      '',
      Localization.newFrom(),
      Manager.newFrom(),
      Services.newFrom(),
      EgeriaCompany.newFrom(),
      [],
      '');
  }

  static newFromWorker(worker: Worker): Application {
    return new Application(worker,
      '',
      '',
      Localization.newFrom(),
      Manager.newFrom(),
      Services.newFrom(),
      EgeriaCompany.newFrom(),
      [],
      '');
  }
}
