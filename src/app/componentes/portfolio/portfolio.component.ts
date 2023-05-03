import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { User } from 'src/app/models/user';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  user!: User;
  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.user
      .pipe(filter((user) => user !== null))
      .subscribe((user) => {
        this.user = user!;
      });
  }
}
