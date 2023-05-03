import { Component } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Perfil } from 'src/app/models/perfil';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  perfil!: Perfil;

  constructor(portfolioService: PortfolioService) {
    portfolioService.user
      .pipe(filter((user) => user !== null))
      .subscribe((user) => (this.perfil = user!.perfil));
  }
}
