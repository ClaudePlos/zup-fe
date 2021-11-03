import {Component, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zup-fe';

  @ViewChild('drawer') drawer: any;
  public selectedItem: string = '';

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 768px)')
    .pipe(map((result: BreakpointState) => result.matches));


  constructor(private breakpointObserver: BreakpointObserver) {
  }

  closeSideNav(sidenav: MatSidenav) {
    if(sidenav.mode === "over"){
      this.drawer.close();
    }
  }
}
