import { ExpEdu } from "./exp-edu";
import { Perfil } from "./perfil";
import { Proyecto } from "./proyecto";
import { Skill } from "./skill";
import { Social } from "./social";

export interface User {
    id:number;
    usuario:string;
    contraseña:string;
    email:string;
    perfil:Perfil;
    expEdu:Array<ExpEdu>;
    skill:Array<Skill>;
    proyecto:Array<Proyecto>;
    social:Social;
}
