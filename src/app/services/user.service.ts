import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { User } from '../models';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _api: GenericService<User>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(item: User): Observable<User> {
    return this._api.create('teachers', item)
  }
  update(id: string, item: User): Observable<User> {
    return this._api.update(`teachers/${id}`, item)
  }
  get(id: any): Observable<User> {
    return this._api.get(`teachers/${id}`)
  }
  search(query: any): Observable<Page<User>> {
    return this._api.search('teachers', query)
  }
  remove(item: User): Observable<User> {
    return this._api.delete(`teachers/${item.id}`)
  }

}
