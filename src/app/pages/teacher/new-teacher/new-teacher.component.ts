import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrls: ['./new-teacher.component.css']
})
export class NewTeacherComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  user: User = new User({})

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
    this.isLoading = true;
    this.api.create(this.user).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.uxService.showInfo("Tacher Created : " + user.code)
        this.router.navigate(["teachers"])
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
