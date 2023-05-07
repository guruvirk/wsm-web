import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { Class, Section, Student } from 'src/app/models';
import { StudentService } from 'src/app/services/student.service';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  user: Student

  classes: Class[]
  sections: Section[]

  faArrowLeft = faArrowLeft;
  faFloppyDisk = faFloppyDisk;

  constructor(
    private api: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isLoading = true;
        this.api.get(params['id']).subscribe(
          {
            next: (item) => {
              this.user = new Student(item)
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

  update() {
    if (!this.user.firstName || !this.user.lastName) {
      this.uxService.handleError("First Name and Last Name is Required")
      return
    }
    this.isLoading = true;
    this.api.update(this.user.id, this.user).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.uxService.showInfo("Student Updated : " + user.code)
        this.uxService.back()
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
