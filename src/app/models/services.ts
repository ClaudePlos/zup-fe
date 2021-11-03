import {PlatnikService} from './platnikService';

export class Services{
  constructor(public servicesItems: string[],
              public platnikServiceItems: PlatnikService) {
  }

  static newFrom(): Services{
    return new Services([], PlatnikService.newFrom());
  }
}
