import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { PortfolioGuard } from './portfolio.guard';

const routes: Routes = [
  {path: '', pathMatch:'full',redirectTo: '/login'},
  {path: 'login', component: LoginComponent},
  {path: 'portfolio', component: PortfolioComponent, canActivate:[PortfolioGuard]},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
