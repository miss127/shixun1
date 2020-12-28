import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { Route, RouterModule, Routes, ChildActivationEnd } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { ProductlistComponentComponent } from './productlist-component/productlist-component.component';
import { ProductManagementComponentComponent } from './product-management-component/product-management-component.component';
import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { RoomComponenetComponent } from './room-componenet/room-componenet.component';
import { NotusedComponentComponent } from './notused-component/notused-component.component';
import { HasusedComponentComponent } from './hasused-component/hasused-component.component';
import { IsusedComponentComponent } from './isused-component/isused-component.component';
import { Room509ComponentComponent } from './room509-component/room509-component.component';
import { Room709ComponentComponent } from './room709-component/room709-component.component';
import { Room711ComponentComponent } from './room711-component/room711-component.component';
import { Room713ComponentComponent } from './room713-component/room713-component.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PersonalMessageComponentComponent } from './personal-message-component/personal-message-component.component';
const mgtChildrenRoutes: Routes = [
  { path: 'product-management', component: ProductManagementComponentComponent },
  { path: 'productlist', component: ProductlistComponentComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];
const roomChildrenRoutes: Routes = [
  { path: 'isused', component: IsusedComponentComponent },
  { path: 'notused', component: NotusedComponentComponent },
  { path: 'hasused', component: HasusedComponentComponent },
  { path: '', redirectTo: 'notused', pathMatch: 'full' }
];
const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },
  { path: 'room509', component: Room509ComponentComponent },
  { path: 'room709', component: Room709ComponentComponent },
  { path: 'room711', component: Room711ComponentComponent },
  { path: 'room713', component: Room713ComponentComponent },
  { path: 'user-management', component: UserManagementComponentComponent },
  {
    path: 'room', component: RoomComponenetComponent,
    children: roomChildrenRoutes,
    canActivate: [LoginGuard]
  },
  {
    path: 'management', component: ManagementComponentComponent,
    children: mgtChildrenRoutes,
    canActivate: [LoginGuard]
  }

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    ManagementComponentComponent,
    ProductManagementComponentComponent,
    ProductlistComponentComponent,
    UserManagementComponentComponent,
    RegisterComponentComponent,
    RoomComponenetComponent,
    NotusedComponentComponent,
    HasusedComponentComponent,
    IsusedComponentComponent,
    Room509ComponentComponent,
    Room709ComponentComponent,
    Room711ComponentComponent,
    Room713ComponentComponent,
    PersonalMessageComponentComponent,
    // NgxEchartsModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginGuard, AuthService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
