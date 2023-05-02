import { Component } from '@angular/core';
import { faInstagram, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Tenant, User } from './models';
import { Router } from '@angular/router';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Wisdom School Managment';
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faFacebook = faFacebook;
  faRightFromBracket = faRightFromBracket;
  faBars = faBars;
  currentUser: User;
  currentTenant: Tenant;

  constructor(public auth: RoleService,
    private roter: Router) {
    this.auth.userChanges.subscribe((user: User) => {
      this.currentUser = user;
    });
    this.auth.tenantChanges.subscribe((tenant: Tenant) => {
      this.currentTenant = tenant;
    });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser();
    this.currentTenant = this.auth.currentTenant();

    if (!this.currentUser.id) {
      this.roter.navigate(["login"])
    }
  }

  logout() {
    this.auth.logout()
  }
}
