import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {
  //登录表单
  hello: number;
  myForm: FormGroup;
  i: AppComponent;
  //  用户名
  userName: AbstractControl;
  //密码
  password: AbstractControl;
  name$: Observable<string>;
  baseUrl = 'http://192.168.43.31:8080/';
  constructor(private app: AppComponent, private authService: AuthService, private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    app.hello2();
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  ngOnInit(): void {
  }

  onSubmit(value: any) {
    console.log(value);

  }
  gethello() {
    return this.hello;
  }
  register() {
    if (!this.myForm.valid) {
      alert('请填写用户名和密码');
    }
    else {
      this.httpClient.put(this.baseUrl + 'userregister', this.myForm.value).subscribe((val: any) => {
        if (val.succ) {
          if (this.myForm.valid) {
            this.authService.login();
            this.router.navigate(['/login']);
            this.app.hello3();
          }
        }
        else {
          alert('用户名或密码错误');
        }
      })
    }
  }
}
