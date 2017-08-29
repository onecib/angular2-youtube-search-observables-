/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { Http } from "@angular/http";
import { FormBuilder, Validators } from "@angular/forms";
import 'rxjs/Rx';
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';
  searchForm: any;
  results$: Observable<any>;
  public loginForm = this._formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
  constructor(private _formBuilder: FormBuilder,
    private _http: Http,
    public appState: AppState
  ) {
    const API_URL = 'https://www.googleapis.com/youtube/v3/search';
    const API_KEY = 'AIzaSyCS-c2VTGiwdnYt9YVM2HWK3GPueLXsGI4';

    this.searchForm = this._formBuilder.group({
      'search':['', Validators.required]
    });

    this.results$ = this.searchForm.controls.search.valueChanges
                      //.subscribe(res => console.log(res));
                      .debounceTime(500)
                      .switchMap(query => this._http.get(`${API_URL}?q=${query}&key=${API_KEY}&part=snippet`))
                      .map(res => res.json())
                      .map(res => res.items);    
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
  doLogin(event) {
    console.log(event);
    console.log(this.loginForm.value);
  }
}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
