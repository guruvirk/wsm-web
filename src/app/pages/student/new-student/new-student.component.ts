import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { Class, Section, Student } from 'src/app/models';
import { StudentService } from 'src/app/services/student.service';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ClassService } from 'src/app/services/class.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  user: Student = new Student({})

  @Input()
  selectedSection: Section

  classes: Class[]
  sections: Section[]

  faArrowLeft = faArrowLeft;
  faFloppyDisk = faFloppyDisk;

  constructor(
    private api: StudentService,
    private sectionService: SectionService,
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
        this.sectionService.get(params['id']).subscribe(
          {
            next: (item) => {
              this.selectedSection = new Section(item)
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
    if (!this.user.firstName || !this.user.lastName) {
      this.uxService.handleError("First Name and Last Name is Required")
      return
    }
    if (this.selectedSection) {
      this.user.section = this.selectedSection
      this.user.class = this.selectedSection.class
    }
    this.isLoading = true;
    this.api.create(this.user).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.uxService.showInfo("Student Created : " + user.code)
        if (this.selectedSection) {
          this.router.navigate(["sections", this.selectedSection.id])
        }
        this.router.navigate(["students"])
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
