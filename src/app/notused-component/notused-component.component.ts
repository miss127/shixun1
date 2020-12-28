import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-notused-component',
  templateUrl: './notused-component.component.html',
  styleUrls: ['./notused-component.component.css']
})
export class NotusedComponentComponent implements OnInit {
  roomid: string;
  name: string;
  rooms$: Observable<string>
  baseUrl = 'http://192.168.43.31:8080/';
  constructor(private app: AppComponent, private httpClient: HttpClient) {

  }


  init() {
    console.log("未预约界面刷新")
    this.rooms$ = <Observable<string>>this.httpClient.get(this.baseUrl + 'room/notused');
  }
  ngOnInit(): void {
    this.init();
  }
  prepare(roomid, value) {
    let sttime = (<number>value - 1) * 2 + 8;
    let user = this.app.sendname();
    console.log("roomid = " + roomid);
    console.log("value = " + sttime);
    console.log("user = " + user);
    // console.log('hello');
    this.httpClient.put(this.baseUrl + 'room/notused', { roomid: roomid, user: user, starttime: sttime }).subscribe((val: any) => {
      if (val.succ) {
        alert('预约成功');
        this.init();
      }
    });
  }
  onOptionsSelected(x) {
    console.log(x);
  }
}
