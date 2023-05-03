import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componentes/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { PortfolioService } from './servicios/portfolio.service';
import { InterceptorService } from './servicios/interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { NavComponent } from './componentes/portfolio/nav/nav.component';
import { PerfilComponent } from './componentes/portfolio/perfil/perfil.component';
import { ExpEduComponent } from './componentes/portfolio/exp-edu/exp-edu.component';
import { SkillComponent } from './componentes/portfolio/skill/skill.component';
import { ProyectoComponent } from './componentes/portfolio/proyecto/proyecto.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortfolioComponent,
    NavComponent,
    PerfilComponent,
    ExpEduComponent,
    SkillComponent,
    ProyectoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    [DatePipe],
    PortfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
