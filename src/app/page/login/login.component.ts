import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Spring Mvc Angular Tutorial';
 
  // Object to save the response returned from the service.
  myresponse: any;
 
  // Url to fetch the employee records from the spring application.
  readonly APP_URL = 'http://localhost:8080/arquitectura';
 
  constructor(private _http: HttpClient) { }

  ngOnInit() {
    console.log("Iniciando Login","..");
     this._http.get('http://localhost:8080/arquitectura/home').subscribe(
      data => {
        this.myresponse = data;
        console.log("Prueba Login",this.myresponse);
      },
      error => {
        console.log('Error occured', error);
      }
    );
  	
  }

}
