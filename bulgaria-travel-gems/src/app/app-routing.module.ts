import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/not-found' },
  { path: 'not-found', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
