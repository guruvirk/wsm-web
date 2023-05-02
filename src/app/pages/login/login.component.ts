import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phone: Number | null
  password: String
  email: string
  code: Number | null
  isLoading = false
  isMobile: boolean;
  isPassVisible = false;

  constructor(private auth: RoleService,
    private router: Router,
    private uxService: UxService) { 
      if (window.screen.width < 781) {
        this.isMobile = true
      }
    }

  ngOnInit() {
    if (this.auth.currentUser().id) {
      this.router.navigate([""])
    }
  }

  back() {
    this.uxService.back()
  }

  login() {
    if (!this.phone && !this.email && !this.code) {
      this.uxService.handleError("Code or Mobile No or Email is Required")
      return
    }
    if (!this.password) {
      this.uxService.handleError("Password is Required")
      return
    }
    if (this.code) {
      this.auth.loginWithCode(this.code, this.password)
    }
    if (this.phone) {
      this.auth.loginWithPhone(this.phone, this.password)
    }
    if (this.email) {
      this.auth.loginWithEmail(this.email, this.password)
    }
  }

  empty(item: string) {
    if(item != "email") {
      this.email = ''
    }
    if(item != "phone") {
      this.phone = null
    }
    if(item != "code") {
      this.code = null
    }
  }

}
