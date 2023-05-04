import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, filter, map } from 'rxjs';
import { ExpEdu } from 'src/app/models/exp-edu';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-exp-edu',
  templateUrl: './exp-edu.component.html',
  styleUrls: ['./exp-edu.component.css'],
})
export class ExpEduComponent implements OnInit {
  exp: ExpEdu[] = [];
  edu: ExpEdu[] = [];
  form: FormGroup;
  expeduActual!: ExpEdu;
  esExp!: boolean;
  isLogin:boolean = this.auth.isLogin;

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private auth: AuthService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      informacion: [''],
      icono: ['', [Validators.required]],
      desde: ['', [Validators.required]],
      hasta: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.portfolioService.user
    .pipe(filter((user) => user !== null))
    .subscribe((user) => {
      user!.expEdu.forEach((elem) => {
        if (elem.esExp) {
          if (this.exp.findIndex(e => e.id === elem.id) === -1) {
            this.exp.push(elem);
          }
        } else {
          if (this.edu.findIndex(e => e.id === elem.id) === -1) {
            this.edu.push(elem);
          }
        }
      });
    });
  }

  onAdd() {
    var dates =
      this.form.get('desde')?.value + ' _ ' + this.form.get('hasta')?.value;
    var datesFinal = this.cambiarFechaFinal(dates);
    var elem: ExpEdu = {
      id: 0,
      nombre: this.form.get('nombre')?.value,
      tiempo: datesFinal,
      informacion: this.form.get('informacion')?.value,
      icono: this.form.get('icono')?.value,
      esExp: this.esExp,
    };
    if (this.esExp) {
      this.exp.push(elem);
    } else {
      this.edu.push(elem);
    }
    this.portfolioService.agregarExpEdu(elem);
    (document.querySelector('#agregarExpEdu') as HTMLElement).click();
  }

  onEdit() {
    var dates =
      this.form.get('desde')?.value + ' _ ' + this.form.get('hasta')?.value;
    var datesFinal = this.cambiarFechaFinal(dates);
    var elem: ExpEdu = {
      id: this.expeduActual.id,
      nombre: this.form.get('nombre')?.value,
      tiempo: datesFinal,
      esExp: this.esExp,
      icono: this.form.get('icono')?.value,
      informacion: this.form.get('informacion')?.value,
    };
    this.portfolioService.editarExpEdu(elem);
    if (this.esExp) {
      this.exp = <ExpEdu[]>this.exp.map((expedu) => {
        if (expedu.id === elem.id) {
          expedu = elem;
        }
        return expedu;
      });
    } else {
      this.edu = <ExpEdu[]>this.edu.map((expedu) => {
        if (expedu.id === elem.id) {
          expedu = elem;
        }
        return expedu;
      });
    }
    (document.querySelector('#editarExpEdu') as HTMLElement).click();
  }

  onDelete() {
    this.portfolioService.eliminarExpEdu(this.expeduActual.id.toString());
    if (this.esExp) {
      this.exp = this.exp.filter((elem) => elem !== this.expeduActual);
    } else {
      this.edu = this.edu.filter((elem) => elem !== this.expeduActual);
    }
    (document.querySelector('#eliminarExpEdu') as HTMLElement).click();
  }

  preAdd(tipo: boolean) {
    this.esExp = tipo;
    this.form.reset();
  }

  preDel(elem: ExpEdu) {
    this.expeduActual = elem;
  }
  preEdit(elem: ExpEdu) {
    this.form.reset();
    this.esExp = elem.esExp;
    var dates = this.cambiarFechaBase(elem.tiempo);
    this.form.get('nombre')?.setValue(elem.nombre);
    this.form.get('icono')?.setValue(elem.icono);
    this.form.get('informacion')?.setValue(elem.informacion);
    this.form.get('desde')?.setValue(dates[0]);
    this.form.get('hasta')?.setValue(dates[1]);
    this.expeduActual = elem;
  }

  cambiarFechaBase(fechas: string): string[] {
    var dates = fechas.split(' - ');
    var desderaw = dates[0].split('/');
    var hastaraw = dates[1].split('/');
    var desde = desderaw[2] + '-' + desderaw[1] + '-' + desderaw[0];
    var hasta = hastaraw[2] + '-' + hastaraw[1] + '-' + hastaraw[0];
    var datesFinal = [desde, hasta];
    return datesFinal;
  }

  cambiarFechaFinal(fechas: string): string {
    var dates = fechas.split(' _ ');
    var desderaw = dates[0].split('-');
    var hastaraw = dates[1].split('-');
    var desde = desderaw[2] + '/' + desderaw[1] + '/' + desderaw[0];
    var hasta = hastaraw[2] + '/' + hastaraw[1] + '/' + hastaraw[0];
    return desde + ' - ' + hasta;
  }
}
