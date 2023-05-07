import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { Page } from '../models';
import { Student } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _api: GenericService<Student>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(item: Student): Observable<Student> {
    return this._api.create('students', item)
  }
  update(id: string, item: Student): Observable<Student> {
    return this._api.update(`students/${id}`, item)
  }
  get(id: any): Observable<Student> {
    return this._api.get(`students/${id}`)
  }
  search(query: any): Observable<Page<Student>> {
    return this._api.search('students', query)
  }
  remove(item: Student): Observable<Student> {
    return this._api.delete(`students/${item.id}`)
  }

}
