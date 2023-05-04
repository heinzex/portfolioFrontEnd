import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, filter, map } from 'rxjs';
import { Skill } from 'src/app/models/skill';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  skills!: Skill[];
  skillActual!: Skill;
  form: FormGroup;
  isLogin:boolean = this.auth.isLogin;

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private auth: AuthService
  ) {
    this.form = this.formBuilder.group({
      sector: ['', [Validators.required]],
      porcentaje: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.portfolioService.user
      .pipe(filter((user) => user !== null))
      .subscribe((user) => (this.skills = user!.skill));
  }

  onAdd() {
    var elem: Skill = {
      id: 0,
      sector: this.form.get('sector')?.value,
      porcentaje: this.form.get('porcentaje')?.value ,
    };

    this.skills.push(elem);

    this.portfolioService.agregarSkill(elem);
    (document.querySelector('#agregarSkill') as HTMLElement).click();
  }

  onEdit() {
    console.log(this.skillActual)
    console.log(this.skillActual.id)
    var elem: Skill = {
      id: this.skillActual.id,
      sector: this.form.get('sector')?.value,
      porcentaje: this.form.get('porcentaje')?.value,
    };
    this.portfolioService.editarSkill(elem);
    this.skills = <Skill[]>this.skills.map((skill) => {
      if (skill.id === elem.id) {
        skill = elem;
      }
      return skill;
    });

    (document.querySelector('#editarSkill') as HTMLElement).click();
  }

  onDelete() {
    this.portfolioService.eliminarExpEdu(this.skillActual.id.toString());
    this.skills = this.skills.filter((elem) => elem !== this.skillActual);
    (document.querySelector('#eliminarSkill') as HTMLElement).click();
  }

  preAdd() {
    this.form.reset();
  }

  preDel(elem: Skill) {
    this.skillActual = elem;
  }

  preEdit(elem: Skill) {
    this.form.reset();
    this.form.get('sector')?.setValue(elem.sector);
    this.form.get('porcentaje')?.setValue(elem.porcentaje);
    this.skillActual = elem;
    console.log(elem)
    console.log(this.skillActual)
  }
}
