import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { Student } from 'src/app/models';
import { StudentService } from 'src/app/services/student.service';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  isLoading = false
  isMobile: boolean
  student: Student

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
              this.student = new Student(item)
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
}
