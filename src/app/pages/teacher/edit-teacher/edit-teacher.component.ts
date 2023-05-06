import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  user: User

  permissionsControl = new FormControl('');
  permissions: string[] = ['admin', 'accounts', 'students'];

  expertiesControl = new FormControl('');
  experties: string[] = ['Physics', 'Chemistry', 'Maths', 'Sports', 'English', 'Hindi'];

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

  save() {
    if (!this.user.firstName || !this.user.lastName) {
      this.uxService.handleError("First Name and Last Name is Required")
      return
    }
    this.isLoading = true;
    this.api.update(this.user.id, this.user).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.uxService.showInfo("Tacher Updated")
        this.router.navigate(["teachers"])
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
