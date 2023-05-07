import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UxService } from '../../../services/ux.service';
import { Section } from 'src/app/models';
import { SectionService } from 'src/app/services/section.service';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.css']
})
export class EditSectionComponent implements OnInit {

  isLoading = false
  isMobile: boolean;
  section: Section

  faArrowLeft = faArrowLeft;
  faFloppyDisk = faFloppyDisk;

  constructor(
    private api: SectionService,
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
              this.section = new Section(item)
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
    if (!this.section.name) {
      this.uxService.handleError("Name is Required")
      return
    }
    this.isLoading = true;
    this.api.update(this.section.id, this.section).subscribe({
      next: (section) => {
        this.isLoading = false;
        this.uxService.showInfo("Section Update : " + section.name)
        this.router.navigate(["classes", section.class.id])
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
