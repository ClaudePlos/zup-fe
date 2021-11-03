import {AfterViewChecked, AfterViewInit, Component, NgModule, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Application} from '../../models';
import ZupState from '../../store/state';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {Worker} from '../../models';
import * as TaskAction from '../../store/action';
import {Localization} from '../../models/localization';
import {FormControl, NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit, OnDestroy {

  appForm: NgForm;

  @ViewChild('app', {static: true}) set content(appForm: NgForm) {
    this.appForm = appForm;
  }

  state: Observable<ZupState>;
  dataSubscription: Subscription;

  loading: boolean;

  services: string[] = ['POCZTA', 'MAPI', 'QLIK', 'task.naprzod.pl', 'EZD', 'e-learning', 'i.naprzod.pl'];
  modules: string[] = ['KG', 'GM', 'NZ', 'ST', 'CKK', 'CSS', 'GR', 'SP', 'ZK', 'EK'];
  additionalEquipments: string[] = ['telefon', 'komputer + monitor', 'laptop', 'telefon stacjonarny'];

  worker: Worker = Worker.newFrom();
  localizations: Localization[] = [];
  application: Application = Application.newFromWorker(this.worker);


  constructor(private store: Store<{ zupStore: ZupState }>) {
    this.state = store.pipe(select('zupStore'));
  }


  ngOnInit(): void {
    this.dataSubscription = this.state.pipe(
      map(data => {
          this.application = {...this.application, worker: data.newApplicationWorker};
          this.localizations = data.localizations;
          this.loading = data.loading;
        }
      )
    ).subscribe();

    this.store.dispatch(TaskAction.GetCostPositions({payload: {isLoading: true}}));

    this.onChanges();
  }


  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  getWorkerFromEgeria(personalNumber: string): void {
    this.store.dispatch(TaskAction.GetWorkerAction({payload: {isLoading: true, personalNumber}}));
  }

  onChanges(): void {
    const c = this.appForm.controls['company'];
    console.log(c.value);
  }

}
