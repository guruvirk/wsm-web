import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewTeachersComponent } from './pages/teacher/teachers/teachers.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProcessingIndicatorComponent } from './components/processing-indicator/processing-indicator.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditTeacherComponent } from './pages/teacher/edit-teacher/edit-teacher.component';
import { NewTeacherComponent } from './pages/teacher/new-teacher/new-teacher.component';
import { TeacherComponent } from './pages/teacher/teacher/teacher.component';
import { ClassesComponent } from './pages/class/classes/classes.component';
import { ClassComponent } from './pages/class/class/class.component';
import { SectionComponent } from './pages/section/section/section.component';
import { SectionsComponent } from './pages/section/sections/sections.component';


@NgModule({
  declarations: [
    AppComponent,
    PaginatorComponent,
    ProcessingIndicatorComponent,
    ViewTeachersComponent,
    EditTeacherComponent,
    NewTeacherComponent,
    TeacherComponent,
    LoginComponent,
    ClassesComponent,
    ClassComponent,
    SectionComponent,
    SectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatBadgeModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ProcessingIndicatorComponent]
})
export class AppModule { }
