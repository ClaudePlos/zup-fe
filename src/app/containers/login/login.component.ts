import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import ZupState from "../../store/state";
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import * as TaskAction from "../../store/action";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  state: Observable<ZupState>;

  constructor(private store: Store<{ zupStore: ZupState }>, private route: ActivatedRoute, private router: Router) {
    this.state = store.pipe(select('zupStore'));
  }

  ngOnInit(): void {
    this.getUserLogin();
  }

  getUserLogin(): void {
    this.route.paramMap
      .subscribe(params => {
          console.log(params.get('userLogin'));
          this.store.dispatch(TaskAction.SetLoggedUser({payload: {userLogin: params.get('userLogin')}}));
          this.store.dispatch(TaskAction.GetUserPhone({payload: {isLoading: true, userName: params.get('userLogin')}}));
        }
      );
    this.router.navigate(['/zupui/new']);
  }

  ngOnDestroy(): void {
  }


}
