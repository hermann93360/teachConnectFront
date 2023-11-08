import {Injectable} from '@angular/core';
import {Offer} from "./model/Offer";
import {School} from "./model/School";
import {Teacher} from "./model/Teacher";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  public teachers = [
    new Teacher(
      "Jean Dupont",
      "Mathématiques, Physique",
      "Doctorat en Physique Théorique",
      "Enseignement secondaire, Recherche appliquée",
      "L3, M1, M2",
      "jean.dupont@example.com",
      "password",
      "+33123456789",
      "https://linkedin.com/in/jeandupont",
      "Disponible à partir de septembre 2023",
      "Prestation",
      "Conférencier régulier dans des conférences scientifiques",
      "EFREI Paris, Lycée Louis-le-Grand"
    ),
    new Teacher(
      "Marie Curie",
      "Chimie, Biologie",
      "Doctorat en Biochimie",
      "Enseignement universitaire, Laboratoires de recherche",
      "L2, L3, M1",
      "marie.curie@example.com",
      "password",
      "+33123456790",
      "https://linkedin.com/in/mariecurie",
      "Disponible immédiatement",
      "Salarié",
      "Participation à des publications scientifiques internationales",
      "Université Pierre et Marie Curie, Collège de France"
    ),
  ];

  public offers = [
    new Offer(
      "Informatique, Développement logiciel",
      "Cours en ligne avec une flexibilité d'horaires",
      "Janvier 2024 - Juin 2024",
      "Recherche d'un profil dynamique capable de s'adapter à une classe virtuelle",
      [this.teachers[0], this.teachers[1]]
    ),
    new Offer(
      "Littérature, Histoire",
      "Cours en présentiel, nécessité d'adapter les horaires selon les évènements scolaires",
      "Septembre 2023 - Juin 2024",
      "Cherche professeur passionné par la littérature mondiale et l'histoire moderne",
      [] // Liste initialement vide, sera peuplée avec les professeurs intéressés
    ),
  ];

  public schools = [
    new School(
      "Lycée International de Paris",
      "loginParis",
      "password",
      [this.offers[0], this.offers[1]]
    ),
    new School(
      "Collège Montaigne",
      "loginMontaigne",
      "password",
      []
    ),
  ];

  public currentRoleLogged = -1
  public currentTeacherLogged!: Teacher;
  public currentSchoolLogged!: School;
  public currentOfferDetails!: Offer;

  constructor() {
    this.teachers = this.getObject("teachers") != null ? this.getObject("teachers") : this.teachers;
    this.schools = this.getObject("schools") != null ? this.getObject("schools") : this.schools;
    this.offers = this.getObject("offers") != null ? this.getObject("offers") : this.offers;


    if(localStorage.getItem("role") != null && localStorage.getItem("login") != null){
      if(localStorage.getItem("role") == '1') {
        this.currentTeacherLogged = this.teachers.filter(teacher => teacher.email === localStorage.getItem("login"))[0];
      }else{
        this.currentSchoolLogged = this.schools.filter(school => school.login === localStorage.getItem("login"))[0];
      }
      // @ts-ignore
      this.currentRoleLogged  = localStorage.getItem("role") === 'school' ? 0 : 1;

    }
  }

  saveObject(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getObject(key: string): any | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeObject(key: string): void {
    localStorage.removeItem(key);
  }

  public teacherLogin(email: string, password: string): any {
    const teacher = this.teachers.filter(teacher => teacher.email === email && teacher.password === password);

    if(teacher.length == 0) {
      return [];
    }else{
      this.currentTeacherLogged = teacher[0]
      this.currentRoleLogged = 1;
      localStorage.setItem("login", this.currentTeacherLogged.email)
      localStorage.setItem("role", "teacher")
      return teacher;
    }
  }

  public publishOffer(value: any){
    const offer = new Offer(
      value['skills'],
      value['constraint'],
      value['period'],
      value['notes'],
      []
    )

    this.offers.push(offer)
    this.currentSchoolLogged.offer.push(offer);

    this.saveObject("offers", this.offers);
    this.saveObject("schools", this.schools);

  }

  public schoolLogin(email: string, password: string): any {


    const school = this.schools.filter(teacher => teacher.login === email && teacher.password === password);

    if(school.length == 0) {
      return []
    }else{
      this.currentSchoolLogged = school[0];
      this.currentRoleLogged = 0;
      localStorage.setItem("login", this.currentSchoolLogged.login)
      localStorage.setItem("role", "school")
      return school;
    }
  }

  getPublishOfferForSchool(){
    return this.currentSchoolLogged.offer;
  }


  registerSchool(value: any) {
    const school = new School(
      value['name'],
      value['email'],
      value['password'],
      []
    )

    this.schools.push(school);
    this.currentSchoolLogged = school;
    this.currentRoleLogged = 0
    this.saveObject("schools", this.schools);
    console.log(this.schools)

  }

  registerTeacher(value: any) {
    const teacher = new Teacher(
      value['name'],
      value['skills'],
      value['graduate'],
      value['interest'],
      value['wishLevel'],
      value['email'],
      value['password'],
      value['phone'],
      value['website'],
      value['availability'],
      value['wishContractType'],
      value['otherDataAboutTeacher'],
      value['references']
    )

    this.teachers.push(teacher);
    this.currentTeacherLogged = teacher;
    this.currentRoleLogged = 1;
    this.saveObject("teachers", this.schools);
    console.log(this.teachers)

  }

  setCurrentOffer(skills: string) {
    console.log(this.offers)
    this.currentOfferDetails = this.offers.filter(offer => offer.skills === skills)[0];
  }
}

