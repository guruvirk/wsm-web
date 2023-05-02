import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  user: User = new User({})

  faArrowLeft = faArrowLeft;
  faFloppyDisk = faFloppyDisk;

  constructor(
    private api: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private uxService: UxService) {
    if (window.screen.width < 781) {
      this.isMobile = true
    }
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isLoading = true;
        this.api.get(params['id']).subscribe({
          next: (user) => {
            this.user = new User(user)
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
          }
        })
      }
    })
  }

  ngOnInit() {
  }

  back() {
    this.uxService.back()
  }
}
