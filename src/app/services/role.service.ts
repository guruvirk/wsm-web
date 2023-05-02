import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from '../models';
import { LocalStorageService } from './local-storage.service';
import { GenericService } from './generic.service';
import { IAuth } from './auth.interface';
import { Tenant } from '../models/tenant.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UxService } from './ux.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements IAuth {

  private _authApi: GenericService<any>;
  private _tenantApi: GenericService<Tenant>;
  private _upload: GenericService<string>;
  private _user: User
  private _tenant: Tenant
  private _userSubject = new Subject<User>();
  private _tenantSubject = new Subject<Tenant>();

  public tenantChanges = this._tenantSubject.asObservable();
  public userChanges = this._userSubject.asObservable();

  constructor(private localDb: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private uxService: UxService) {
    this._authApi = new GenericService(this.http, this, this.uxService);
    this._tenantApi = new GenericService(this.http, this, this.uxService);
    this._upload = new GenericService(this.http, this, this.uxService);
    this.setTenant()
  }

  loginWithEmail(email: any, password: any) {
    this._authApi.create('teachers/login', {
      email: email,
      password: password
    }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this._tenant = user.tenant;
      this.localDb.update('tenant', this._tenant);
      this._tenantSubject.next(this._tenant)
      this.uxService.showInfo("Succefully Logged In")
      this.router.navigate([""])
    })
  }

  loginWithPhone(phone: any, password: any) {
    this._authApi.create('teachers/login', {
      phone: phone,
      password: password
    }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this._tenant = user.tenant;
      this.localDb.update('tenant', this._tenant);
      this._tenantSubject.next(this._tenant)
      this.uxService.showInfo("Succefully Logged In")
      this.router.navigate([""])
    })
  }

  loginWithCode(code: any, password: any) {
    this._authApi.create('teachers/login', {
      code: code,
      password: password
    }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this._tenant = user.tenant;
      this.localDb.update('tenant', this._tenant);
      this._tenantSubject.next(this._tenant)
      this.uxService.showInfo("Succefully Logged In")
      this.router.navigate([""])
    })
  }

  confirm(phone: any, otp: any) {
    this._authApi.create('teachers/confirm', { phone: phone, otp: otp }).subscribe(user => {
      this._user = user;
      this.localDb.update('user', this._user);
      this._userSubject.next(this._user)
      this._tenant = user.tenant;
      this.localDb.update('tenant', this._tenant);
      this._tenantSubject.next(this._tenant)
      this.uxService.showInfo("Registered Succefully")
      this.router.navigate([""])
    })
  }

  register(user: any): Observable<User> {
    return this._authApi.create('users', user)
  }

  updateTenant(tenant: any): Observable<Tenant> {
    return this._authApi.update('tenants/' + tenant.id, tenant)
  }

  getLocalUser(): User {
    if (this.localDb.get("localUser")) {
      return new User(this.localDb.get("localUser"))
    } else {
      this.localDb.update('localUser', new User({
        localKey: Math.random().toString(36).substring(7)
      }));
      return this.getLocalUser()
    }
  }

  changeCode(user: any, code: any): Observable<any> {
    return this._authApi.create('teachers/changeCode', { user: user, code: code })
  }

  sendOtp(phone: any): Observable<any> {
    return this._authApi.create('teachers/sendOtp', { phone: phone })
  }

  changePasswordWithOtp(phone: any, otp: any, password: any): Observable<any> {
    return this._authApi.create('teachers/changePasswordWithOtp', { user: { phone: phone }, otp: otp, password: password })
  }

  changePassword(user: any, password: any, newPassword: any): Observable<any> {
    return this._authApi.create('teachers/changePassword', { user: user, password: password, newPassword: newPassword })
  }

  codeExists(code: String): Boolean {
    let result = true
    this._authApi.get(`teachers/codeExists/${code}`).subscribe(response => {
      if (!response || response.exists == undefined) {
        result = true
      }
      result = !response.exists
    })
    return result
  }

  phoneExists(phone: number): Boolean {
    let result = true
    this._authApi.get(`teachers/phoneExists/${phone}`).subscribe(response => {
      if (!response || response.exists == undefined) {
        result = true
      }
      result = !response.exists
    })
    return result
  }

  currentTenant(): Tenant {
    if (this._tenant) {
      return this._tenant;
    }

    const savedTenant = this.localDb.get('tenant');

    if (!savedTenant) {
      return new Tenant()
    }

    this._tenant = new Tenant(savedTenant)

    return this._tenant;

  }

  currentUser(): User {

    if (this._user && !this._user.session) {
      this._user = new User()
      return new User()
    }

    if (this._user) {
      return this._user;
    }

    const savedUser = this.localDb.get('user');

    if (!savedUser || !savedUser.session) {
      this._user = new User()
      return new User()
    }

    this._user = new User(savedUser)

    return this._user;
  }

  hasPermission(permissions: string | string[]): boolean {
    if (!permissions || Array.isArray(permissions) && !permissions.length) {
      return true;
    }

    const currentUser = this.currentUser();
    if (!currentUser) { return false; }

    if (!currentUser.permissions || !currentUser.permissions.length) { return false; }

    if (typeof permissions === 'string') {
      return !!currentUser.permissions.find((item) => item.toLowerCase() === permissions.toLowerCase());
    }

    for (const permission of permissions) {
      const value = currentUser.permissions.find((item) => item.toLowerCase() === permission.toLowerCase());
      if (value) {
        return true;
      }
    }

    return false;
  }

  setTenant() {

    const code = environment.tenant

    this._tenantApi.get('tenants/' + code).subscribe(tenant => {
      this.localDb.update('tenant', tenant);
      this._tenant = tenant
      this._tenantSubject.next(this._tenant)
    })

  }

  changeUser(user: User) {
    if (!user.session) {
      user.session = this._user.session
    }
    this.localDb.update('user', user);
    this._user = user
    this._userSubject.next(this._user)
  }

  refreshUser() {
    let user = this.currentUser()
    this._authApi.get(`teachers/my`).subscribe(item => {
      user.permissions = item.permissions
      this.localDb.update('user', user);
      this._user = user
      this._userSubject.next(this._user)
    })
  }

  upload(file: File): Observable<string> {
    return this._upload.upload(`upload`, file)
  }

  updateMyUser(user: User): Observable<User> {
    return this._authApi.update(`teachers/my`, user)
  }

  logout() {
    this._authApi.get(`teachers/logout/${this._user.session.id}`).subscribe()
    const tenant = this.localDb.get('tenant');
    this.localDb.clear();
    this.localDb.update('tenant', tenant);
    this._userSubject.next(new User());
    this._user = new User();
    this.uxService.showInfo("Logged Out Succefully")
    this.router.navigate(["/"])
  }

}
