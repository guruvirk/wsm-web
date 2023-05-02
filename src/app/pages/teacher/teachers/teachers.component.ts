import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { Page, User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { IPager } from 'src/app/models/pager.interface';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { faPen, faEye, faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class ViewTeachersComponent implements OnInit, IPager<User> {

  @ViewChild('paginator', {})
  paginatorComponent: PaginatorComponent;

  filters: {
    isSelected: boolean,
    label: String
  }[];
  query = {
    limit: 2,
    sort: "new"
  };
  isLoading = false;
  isMobile: boolean;
  page: Page<User>;
  faPen = faPen;
  faEye = faEye;
  faPlus = faPlus;
  faRotateRight = faRotateRight;

  constructor(
    private api: UserService,
    private auth: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.get()
  }

  ngOnInit() {
  }

  get(queryOptions?: any) {
    this.isLoading = true
    if (this.filters && this.filters.length) {
      let options = []
      for (const filter of this.filters) {
        if (filter.isSelected) {
          options.push(filter.label.toLowerCase())
        }
      }
      if (options.length) {
        (this.query as any)["options"] = options
      } else {
        delete (this.query as any)["options"];
      }
    } else {
      delete (this.query as any)["options"];
    }
    if (queryOptions) {
      if (queryOptions.offset) {
        (this.query as any)['offset'] = queryOptions.offset
      } else {
        (this.query as any)['offset'] = 0
      }
    } else {
      (this.query as any)['offset'] = 0
    }
    this.api.search(this.query).subscribe(page => {
      this.page = page
      if (page.items && page.items.length) {
        let i = 0
        for (let item of page.items) {
          this.page.items[i] = (new User(item))
          i++
        }
      }
      this.page.totalPages = (page.total / page.limit)
      if (this.paginatorComponent) {
        this.paginatorComponent.calculatePages(this)
      }
      this.isLoading = false
    }, err => {
      this.isLoading = false;
    })
  }


  showPage(pageNo: number) {
    if (this.isLoading) {
      return;
    }
    if (pageNo === -2) {
      pageNo = 1;
      return;
    }

    if (pageNo === -1) {
      pageNo = (this.page.total / this.page.limit);
      return;
    }

    return this.get(this.convertToPageOption(pageNo));
  }

  private convertToPageOption(pageNo: number) {
    const options: any = {};
    if (this.page) {
      options.offset = (pageNo - 1) * this.page.limit;
      options.limit = this.page.limit;
      options.sort = this.page.sort;
    }
    return options;
  }

  new() {
    this.router.navigate(["teachers/new"])
  }

  edit(id: string) {
    this.router.navigate(["teachers/edit", id])
  }

  view(id: string) {
    this.router.navigate(["teachers", id])
  }

  reset() {
    this.get()
  }

}
