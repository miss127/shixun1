import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
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
  login() {
    if (!this.myForm.valid) {
      alert('请填写用户名和密码');
    }
    else {
      this.httpClient.post(this.baseUrl + 'users', this.myForm.value).subscribe((val: any) => {
        if (val.succ) {
          this.authService.login();
          this.router.navigate(['/room']);
          console.log(val.msg);
          var res = JSON.parse(JSON.stringify(val.msg));
          console.log(res[0].id);
          if (res[0].id.substring(0, 1) == 1) {
            this.app.hello3();
          }
          else if (res[0].id.substring(0, 1) == 0) {
            this.app.hello4();
          }
          this.app.getname(res[0].userName);
        }
        else {
          alert('用户名或密码错误');
        }
      })
    }

  }
}
