import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { Class, Section } from 'src/app/models';
import { SectionService } from 'src/app/services/section.service';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-new-section',
  templateUrl: './new-section.component.html',
  styleUrls: ['./new-section.component.css']
})
export class NewSectionComponent implements OnInit {

  @Input()
  selectedClass: Class

  isLoading = false
  isMobile: boolean;
  section: Section = new Section({})

  classes: Class[]

  faArrowLeft = faArrowLeft;
  faFloppyDisk = faFloppyDisk;

  constructor(
    private api: SectionService,
    private classService: ClassService,
    private router: Router,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isLoading = true;
        this.classService.get(params['id']).subscribe(
          {
            next: (item) => {
              this.selectedClass = new Class(item)
              this.isLoading = false;
            },
            error: (err) => {
              this.isLoading = false;
            }
          }
        )
      } else {
        this.classService.search({}).subscribe(
          {
            next: (page) => {
              this.classes = page.items
              this.isLoading = false;
            },
            error: (err) => {
              this.isLoading = false;
            }
          }
        )
      }
    })
  }

  ngOnInit() {
  }

  back() {
    this.uxService.back()
  }

  create() {
    if (!this.section.name) {
      this.uxService.handleError("Name is Required")
      return
    }
    if(this.selectedClass) {
      this.section.class = this.selectedClass
    }
    this.isLoading = true;
    this.api.create(this.section).subscribe({
      next: (section) => {
        this.isLoading = false;
        this.uxService.showInfo("Section Created : " + section.code)
        this.router.navigate(["classes", section.class.id])
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
