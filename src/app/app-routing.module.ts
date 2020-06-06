import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component'
import { RidebookingComponent } from './ridebooking/ridebooking.component'
import { LoadbookingComponent } from './loadbooking/loadbooking.component'
import { TryComponent } from './try/try.component'
import { AboutusComponent } from './aboutus/aboutus.component'
import { ContactusComponent } from './contactus/contactus.component'


const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {
  //   path: 'home', component: HomeComponent,
  //   runGuardsAndResolvers: 'always',
  // },
  { path:'',component:TryComponent },
  { path:'aboutus', component:AboutusComponent },
  { path:'contactus', component:ContactusComponent },
  { path: 'home', component:HomeComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'ridebooking', component: RidebookingComponent },
  { path: 'loadbooking', component: LoadbookingComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
