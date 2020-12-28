import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// import { MENUS, PRODUCTS } from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  // menus = MENUS;
  // products = PRODUCTS;
  hello = 1;
  name = "";
  constructor(private authService: AuthService) {
  }
  hello1() {
    this.hello = 1;
  }
  hello2() {
    this.hello = 2;
  }
  hello3() {
    this.hello = 3;
  }
  hello4() {
    this.hello = 4;
  }
  getname(userName) {
    this.name = userName;
  }
  sendname() {
    return this.name;
  }
  logout() {
    this.authService.logout();
  }
}
