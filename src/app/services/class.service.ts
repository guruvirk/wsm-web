import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { Class } from '../models';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private _api: GenericService<Class>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(item: Class): Observable<Class> {
    return this._api.create('classes', item)
  }
  update(id: string, item: Class): Observable<Class> {
    return this._api.update(`classes/${id}`, item)
  }
  get(id: any): Observable<Class> {
    return this._api.get(`classes/${id}`)
  }
  search(query: any): Observable<Page<Class>> {
    return this._api.search('classes', query)
  }
  remove(item: Class): Observable<Class> {
    return this._api.delete(`classes/${item.id}`)
  }

}
