import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-room509-component',
  templateUrl: './room509-component.component.html',
  styleUrls: ['./room509-component.component.css']
})
export class Room509ComponentComponent implements OnInit {
  led$ = null;
  light1 = '';
  light2 = '';
  light3 = '';
  AC = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  xAxis = [];
  xAxis1 = [];
  temps = [];
  humds = [];
  chartOption = {
    title: {
      text: '温度跟踪图'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['温度']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boudaryGap: false,
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '温度',
        type: 'line',
        stack: '度',
        areaStyle: { normal: {} },
        data: []
      }
    ]
  };
  updateOption = {};

  chartOption1 = {
    title: {
      text: '湿度跟踪图'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['湿度']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boudaryGap: false,
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '湿度',
        type: 'line',
        stack: '%',
        areaStyle: { normal: {} },
        data: []
      }
    ]
  };
  updateOption1 = {};
  roomid = '509';
  status$: Observable<string>;
  baseUrl = 'http://192.168.43.31:8080/';
  constructor(private httpclient: HttpClient) {
  }
  ngOnInit(): void {
    this.getstatues();
    this.getwd();
    this.getsd();
  }
  Onlight1() {
    this.light1 = 'on';
    this.httpclient.put(this.baseUrl + 'device/led', { roomid: this.roomid, deviceName: 'light1', deviceStatus: this.light1 }).subscribe((val: any) => {
      if (val.succ) { }
    });
    console.log('turn on light1');
  }
  Offlight1() {
    this.light1 = 'off';
    this.httpclient.put(this.baseUrl + 'device/led', { roomid: this.roomid, deviceName: 'light1', deviceStatus: this.light1 }).subscribe((val: any) => {
      if (val.succ) { }
    });
    console.log('turn off light1');
  }
  Onlight2() {
    this.light2 = 'on';
    this.httpclient.put(this.baseUrl + 'device/led', { roomid: this.roomid, deviceName: 'light2', deviceStatus: this.light2 }).subscribe((val: any) => {
      if (val.succ) { }
    });
    console.log('turn on light2');
  }
  Offlight2() {
    this.light2 = 'off';
    this.httpclient.put(this.baseUrl + 'device/led', { roomid: this.roomid, deviceName: 'light2', deviceStatus: this.light2 }).subscribe((val: any) => {
      if (val.succ) { }
    });
    console.log('turn off light2');
  }
  Onlight3() {
    this.light3 = 'on';
    this.httpclient.put(this.baseUrl + 'device/led', { roomid: this.roomid, deviceName: 'light3', deviceStatus: this.light3 }).subscribe((val: any) => {
      if (val.succ) { }
    });
    console.log('turn on light3');
  }
  Offlight3() {
    this.light3 = 'off';
    this.httpclient.put(this.baseUrl + 'device/led', { roomid: this.roomid, deviceName: 'light3', deviceStatus: this.light3 }).subscribe((val: any) => {
      if (val.succ) { }
    });
    console.log('turn off light3');
  }
  OnAC() {
    this.AC = 'on';
    this.httpclient.put(this.baseUrl + 'device/led', { roomid: this.roomid, deviceName: 'AC', deviceStatus: this.AC }).subscribe((val: any) => {
      if (val.succ) { }
    });
    console.log('turn on AC');
  }
  OffAC() {
    this.AC = 'off';
    this.httpclient.put(this.baseUrl + 'device/led', { roomid: this.roomid, deviceName: 'AC', deviceStatus: this.AC }).subscribe((val: any) => {
      if (val.succ) { }
    });
    console.log('turn off AC');
  }
  getstatues() {
    console.log("正在get");
    timer(2000, 2000).subscribe(
      () => {
        this.httpclient.get(this.baseUrl + 'device/509')
          .subscribe((res) => {
            let re = JSON.parse(JSON.stringify(res));
            for (let c of re) {
              if (c.deviceName == "light1") {
                this.light1 = c.deviceStatus;
              }
              if (c.deviceName == "light2") {
                this.light2 = c.deviceStatus;
              }
              if (c.deviceName == "light3") {
                this.light3 = c.deviceStatus;
              }
              if (c.deviceName == "AC") {
                this.AC = c.deviceStatus;
              }
            }
          });
      });
  }
  getwd() {
    timer(2000, 2000).subscribe(
      () => {
        this.httpclient.get(this.baseUrl + 'wd/509').subscribe(
          (value: any) => {
            if (value.length > 0) {
              let i = 0;
              for (let item of value) {
                const dHours = item.time.substring(0, 2);
                const dMinutes = item.time.substring(3, 5);
                const dSeconds = item.time.substring(6, 8);
                this.xAxis[i] = dHours + ':' + dMinutes + ':' + dSeconds;
                this.temps[i] = (item.temp);
                // this.humds[i] = (item.humd);
                i++;
              }
              this.updateOption = {
                xAxis: [{
                  data: this.xAxis
                }],
                series: [{
                  data: this.temps
                }]
              }
            }
          }
        )
      }
    )
  }
  getsd() {
    timer(2000, 2000).subscribe(
      () => {
        this.httpclient.get(this.baseUrl + 'sd/509').subscribe(
          (value: any) => {
            if (value.length > 0) {
              let i = 0;
              for (let item of value) {
                const dHours = item.time.substring(0, 2);
                const dMinutes = item.time.substring(3, 5);
                const dSeconds = item.time.substring(6, 8);
                this.xAxis1[i] = dHours + ':' + dMinutes + ':' + dSeconds;
                this.humds[i] = (item.humd);
                i++;
              }
              this.updateOption1 = {
                xAxis: [{
                  data: this.xAxis1
                }],
                series: [{
                  data: this.humds
                }]
              }
            }
          }
        )
      }
    )
  }
}
