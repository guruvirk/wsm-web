import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';
import { UxService } from './ux.service';
import { Page } from '../models';
import { Section } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private _api: GenericService<Section>;

  constructor(private http: HttpClient,
    private roleService: RoleService,
    private uxService: UxService) {
    this._api = new GenericService(this.http, this.roleService, this.uxService);
  }

  create(item: Section): Observable<Section> {
    return this._api.create('sections', item)
  }
  update(id: string, item: Section): Observable<Section> {
    return this._api.update(`sections/${id}`, item)
  }
  get(id: any): Observable<Section> {
    return this._api.get(`sections/${id}`)
  }
  search(query: any): Observable<Page<Section>> {
    return this._api.search('sections', query)
  }
  remove(item: Section): Observable<Section> {
    return this._api.delete(`sections/${item.id}`)
  }

}
