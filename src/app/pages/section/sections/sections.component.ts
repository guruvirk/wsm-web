import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { Class, Page, Section } from 'src/app/models';
import { SectionService } from 'src/app/services/section.service';
import { IPager } from 'src/app/models/pager.interface';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { faPen, faEye, faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit, IPager<Section> {

  @Input()
  selectedClass: Class

  @ViewChild('paginator', {})
  paginatorComponent: PaginatorComponent;

  filters: {
    isSelected: boolean,
    label: String
  }[];
  query = {
    limit: 10,
    sort: "new"
  };
  isLoading = false;
  isMobile: boolean;
  page: Page<Section>;
  faPen = faPen;
  faEye = faEye;
  faPlus = faPlus;
  faRotateRight = faRotateRight;

  constructor(
    private api: SectionService,
    private auth: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
  }

  ngOnInit() {
    this.get()
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
    if (this.selectedClass) {
      (this.query as any)["class"] = this.selectedClass.id
    }
    this.api.search(this.query).subscribe(page => {
      this.page = page
      if (page.items && page.items.length) {
        let i = 0
        for (let item of page.items) {
          this.page.items[i] = (new Section(item))
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

  view(id: string) {
    this.router.navigate(["sections", id])
  }

  edit(id: string) {
    this.router.navigate(["sections", "edit", id])
  }

  reset() {
    this.get()
  }

  new() {
    this.router.navigate(["sections", "new"])
  }

}
