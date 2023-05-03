import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Perfil } from 'src/app/models/perfil';
import { Social } from 'src/app/models/social';
import { User } from 'src/app/models/user';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  user!: User;
  perfil!: Perfil;
  social!: Social;
  form: FormGroup;
  paises: any[] = [];
  provincias: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private router: Router,
    private http: HttpClient,
  ) {
    this.form = this.formBuilder.group({
      nombre: [''],
      fotoPerfil: [''],
      fotoFondo: [''],
      telefono: [''],
      informacionExtra: [''],
      acercaDe: [''],
      pais: [''],
      provincia: [''],
      fechaNacimiento: [''],
      instagram: [''],
      twitter: [''],
      facebook: [''],
      youtube: [''],
    });
  }

  ngOnInit(): void {
    this.portfolioService.user
      .pipe(filter((user) => user !== null))
      .subscribe((user) => {
        this.user = user!;
        this.perfil = user!.perfil;
        this.social = user!.social;
      });

    var headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    this.http
      .get('https://www.universal-tutorial.com/api/countries/', { headers })
      .subscribe((data: any) => {
        this.paises = data;
      });
    this.http
      .get<any[]>(
        `https://www.universal-tutorial.com/api/states/${this.perfil.pais}`
      )
      .subscribe((data: any) => {
        this.provincias = data;
      });
  }

  onEdit() {
    this.perfil.nombre = this.form.get('nombre')?.value;
    this.perfil.fotoPerfil = this.form.get('fotoPerfil')?.value;
    this.perfil.fotoFondo = this.form.get('fotoFondo')?.value;
    this.perfil.telefono = this.form.get('telefono')?.value;
    this.perfil.informacionExtra = this.form.get('informacionExtra')?.value;
    this.perfil.acercaDe = this.form.get('acercaDe')?.value;
    this.perfil.pais = this.form.get('pais')?.value;
    this.perfil.provincia = this.form.get('provincia')?.value;
    this.perfil.fechaNacimiento = this.cambiarFechaFinal(
      this.form.get('fechaNacimiento')?.value
    );
    this.portfolioService.editarPerfil(this.perfil);
    (document.querySelector('#editarPerfil') as HTMLElement).click();
  }

  onSocialEdit() {
    this.social.instagram = this.form.get('instagram')?.value;
    this.social.twitter = this.form.get('twitter')?.value;
    this.social.facebook = this.form.get('facebook')?.value;
    this.social.youtube = this.form.get('youtube')?.value;
    this.portfolioService.editarSocial(this.social);
    (document.querySelector('#editarSocial') as HTMLElement).click();
  }

  preSocialEdit() {
    console.log(this.user);
    this.form.get('instagram')?.setValue(this.social.instagram);
    this.form.get('twitter')?.setValue(this.social.twitter);
    this.form.get('facebook')?.setValue(this.social.facebook);
    this.form.get('youtube')?.setValue(this.social.youtube);
  }

  preEdit() {
    this.form.get('nombre')?.setValue(this.perfil.nombre);
    this.form.get('fotoPerfil')?.setValue(this.perfil.fotoPerfil);
    this.form.get('fotoFondo')?.setValue(this.perfil.fotoFondo);
    this.form.get('telefono')?.setValue(this.perfil.telefono);
    this.form.get('informacionExtra')?.setValue(this.perfil.informacionExtra);
    this.form.get('acercaDe')?.setValue(this.perfil.acercaDe);
    this.form.get('pais')?.setValue(this.perfil.pais);
    this.form.get('provincia')?.setValue(this.perfil.provincia);
    this.onPaisSelect(this.perfil.pais);
    this.form
      .get('fechaNacimiento')
      ?.setValue(this.cambiarFechaBase(this.perfil.fechaNacimiento));
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onScroll(event: MouseEvent, sectionId: string, labelRef: HTMLElement) {
    const allLabels = document.querySelectorAll('.line');
    allLabels.forEach((label) => {
      label.classList.remove('activeSection');
    });
    labelRef.classList.add('activeSection');
    event.preventDefault();
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  }

  onPaisSelect(pais: string): void {}

  cambiarFechaBase(fecharaw: string): string {
    var fechasraw = fecharaw.split('/');
    var fecha = fechasraw[2] + '-' + fechasraw[1] + '-' + fechasraw[0];
    return fecha;
  }

  cambiarFechaFinal(fecharaw: string): string {
    var fechasraw = fecharaw.split('-');
    var fecha = fechasraw[2] + '/' + fechasraw[1] + '/' + fechasraw[0];
    return fecha;
  }
}
