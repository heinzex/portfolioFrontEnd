import { Component, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio.component';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Observable, filter, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent {
  proyectos!: Proyecto[];
  form: FormGroup;
  proyectoActual!: Proyecto;

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService
  ) {
    portfolioService.user
      .pipe(filter((user) => user !== null))
      .subscribe((user) => (this.proyectos = user!.proyecto));
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.maxLength(16)]],
      link: ['', [Validators.maxLength(20)]],
    });
  }

  onAdd() {
    var elem: Proyecto = {
      id: 0,
      nombre: this.form.get('titulo')?.value,
      descripcion: this.form.get('descripcion')?.value,
      link: this.form.get('link')?.value,
    };
    this.portfolioService.agregarProyecto(elem);
    this.proyectos.push(elem);
    (document.querySelector('#agregarProyecto') as HTMLElement).click();
  }

  onEdit() {
    var elem: Proyecto = {
      id: this.proyectoActual.id,
      nombre: this.form.get('titulo')?.value,
      descripcion: this.form.get('descripcion')?.value,
      link: this.form.get('link')?.value,
    };

    console.log(elem)

    this.portfolioService.editarProyecto(elem);
    this.proyectos = <Proyecto[]>this.proyectos.map(proyecto => {
      if(proyecto.id === elem.id){
        proyecto = elem;
      }
      return proyecto
    });
    (document.querySelector('#editarProyecto') as HTMLElement).click();
  }

  onDelete() {
    this.portfolioService.eliminarProyecto(this.proyectoActual.id.toString());
    this.proyectos = this.proyectos.filter(
      (elem) => elem !== this.proyectoActual
    );
    (document.querySelector('#eliminarProyecto') as HTMLElement).click();
  }

  preDel(elem: Proyecto) {
    this.proyectoActual = elem;
  }
  preEdit(elem: Proyecto) {
    this.form.reset
    this.form.get('titulo')?.setValue(elem.nombre);
    this.form.get('descripcion')?.setValue(elem.descripcion);
    this.form.get('link')?.setValue(elem.link);
    console.log(elem)
    this.proyectoActual = elem;
  }
  preAdd(){
    this.form.reset
  }
}
