import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from './Device';
@Component({
  selector: 'app-product-management-component',
  templateUrl: './product-management-component.component.html',
  styleUrls: ['./product-management-component.component.css']
})
export class ProductManagementComponentComponent implements OnInit {

  myForm: FormGroup;
  deviceName: AbstractControl;
  id: AbstractControl;
  deviceState: AbstractControl;
  notes: AbstractControl;
  devices$: Observable<Device>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentDevice: Device;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group(
      {
        'id': [''],
        'deviceName': [''],
        'deviceState': [''],
        'notes': ['']
      }
    );
    this.id = this.myForm.controls['id'];
    this.deviceName = this.myForm.controls['deviceName'];
    this.deviceState = this.myForm.controls['deviceState'];
    this.notes = this.myForm.controls['notes'];
  }
  init() {
    this.myForm.controls['id'].setValue("");
    this.myForm.controls['deviceName'].setValue("");
    this.myForm.controls['deviceState'].setValue("");
    this.myForm.controls['notes'].setValue("");
  }
  search() {
    if (this.id.value) {
      this.devices$ = <Observable<Device>>this.httpClient.get(this.baseUrl + 'devices/' + this.id.value);
    }
    else {
      this.devices$ = <Observable<Device>>this.httpClient.get(this.baseUrl + 'devices');
    }
  }
  add() {
    if (this.deviceName.value.length == 0) {
      alert('设备名不能为空');
      this.init();
      this.search();
    }
    else {
      this.httpClient.post(this.baseUrl + 'device', this.myForm.value).subscribe((val: any) => {
        if (val.succ) {
          alert('添加成功！');
          this.init();
          this.search();
        }
        else {
          alert('id已存在，添加失败！');
          this.init();
          this.search();
        }
      })
    }
  }
  select(s: Device) {
    this.currentDevice = s;
    this.myForm.setValue(this.currentDevice);
  }
  delete() {
    if (!this.currentDevice) {
      alert('必须先选择用户！');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'devices/' + this.currentDevice.id).subscribe((val: any) => {
        if (val.succ) {
          alert('删除成功');
          this.init();
          this.search();
        }
      })
    }
  }
  update() {
    if (!this.currentDevice) {
      alert('必须先选择用户！');
    }
    else {
      if (this.deviceName.value.length == 0) {
        alert('设备名不能为空');
        this.init();
        this.search();
      }
      else {
        if (this.currentDevice.id != this.myForm.controls['id'].value) {
          alert('不能修改id');
          this.init();
          this.search();
        }
        this.httpClient.put(this.baseUrl + 'device', this.myForm.value).subscribe((val: any) => {
          if (val.succ) {
            alert('修改成功');
            this.init();
            this.search();
          }
        })
      }
    }
  }
  ngOnInit(): void {
    this.devices$ = <Observable<Device>>this.httpClient.get(this.baseUrl + 'devices');
  }
}
