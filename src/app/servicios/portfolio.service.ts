import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from './auth.service';
import { Proyecto } from '../models/proyecto';
import { Skill } from '../models/skill';
import { ExpEdu } from '../models/exp-edu';
import { Perfil } from '../models/perfil';
import { Social } from '../models/social';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private url: string = 'http://portfolio-sody.onrender.com//api';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  get user(): Observable<User | null> {
    return this.auth.user;
  }

  agregarPerfil(perfil: Perfil) {
    this.http.post(this.url + '/perfil/crear', perfil).subscribe();
  }

  editarPerfil(perfil: Perfil) {
    this.http.put(this.url + '/perfil/editar', perfil).subscribe();
  }

  editarSocial(social: Social) {
    this.http.put(this.url + '/social/editar', social).subscribe();
  }

  eliminarPerfil(id: string) {
    this.http.delete(this.url + '/perfil/eliminar?id=' + id).subscribe();
  }

  agregarExpEdu(expedu: ExpEdu) {
    this.http.post(this.url + '/expedu/crear', expedu).subscribe();
  }

  editarExpEdu(expedu: ExpEdu) {
    this.http.put(this.url + '/expedu/editar', expedu).subscribe();
  }

  eliminarExpEdu(id: string) {
    this.http.delete(this.url + '/expedu/eliminar?id=' + id).subscribe();
  }

  agregarProyecto(proyecto: Proyecto) {
    this.http.post(this.url + '/proyecto/crear', proyecto).subscribe();
  }

  editarProyecto(proyecto: Proyecto) {
    this.http.put(this.url + '/proyecto/editar', proyecto).subscribe();
  }

  eliminarProyecto(id: string) {
    this.http.delete(this.url + '/proyecto/eliminar?id=' + id).subscribe();
  }

  agregarSkill(skill: Skill) {
    this.http.post(this.url + '/skill/crear', skill).subscribe();
  }

  editarSkill(skill: Skill) {
    this.http.put(this.url + '/skill/editar', skill).subscribe();
  }

  eliminarSkill(id: string) {
    this.http.delete(this.url + '/skill/eliminar?id=' + id).subscribe();
  }
}
