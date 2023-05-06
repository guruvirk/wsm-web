import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';
import { ViewTeachersComponent } from './pages/teacher/teachers/teachers.component';
import { LoginComponent } from './pages/login/login.component';
import { EditTeacherComponent } from './pages/teacher/edit-teacher/edit-teacher.component';
import { NewTeacherComponent } from './pages/teacher/new-teacher/new-teacher.component';
import { TeacherComponent } from './pages/teacher/teacher/teacher.component';
import { ClassesComponent } from './pages/class/classes/classes.component';
import { ClassComponent } from './pages/class/class/class.component';
import { SectionsComponent } from './pages/section/sections/sections.component';
import { SectionComponent } from './pages/section/section/section.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'teachers', component: ViewTeachersComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'teachers/edit/:id', component: EditTeacherComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'teachers/new', component: NewTeacherComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'teachers/:id', component: TeacherComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'classes', component: ClassesComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'classes/:id', component: ClassComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'sections', component: SectionsComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'sections/:id', component: SectionComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
