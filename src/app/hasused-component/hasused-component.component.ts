import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Room } from '../room';
@Component({
  selector: 'app-hasused-component',
  templateUrl: './hasused-component.component.html',
  styleUrls: ['./hasused-component.component.css']
})
export class HasusedComponentComponent implements OnInit {

  name: string;
  rooms$: Observable<Room>
  baseUrl = 'http://192.168.43.31:8080/';
  constructor(private app: AppComponent, private httpClient: HttpClient) {

  }
  init() {
    console.log("已预约界面刷新");
    this.rooms$ = <Observable<Room>>this.httpClient.get(this.baseUrl + 'room/hasused');
  }
  ngOnInit(): void {
    this.init();
  }
  prepare(roomid) {
    let user = this.app.sendname();
    console.log("roomid = " + roomid);
    console.log("user = " + user);
    // console.log('hello');
    this.httpClient.put(this.baseUrl + 'room/hasused', { roomid: roomid, user: user, starttime: null }).subscribe((val: any) => {
      if (val.succ) {
        alert('取消预约成功');
        console.log('取消预约成功');
        this.init();
      }
      else {
        alert('请不要取消别人的预约');
      }
    });
  }
  onOptionsSelected(x) {
    console.log(x);
  }
}
