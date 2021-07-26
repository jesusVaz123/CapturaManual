// import { AquirerService } from './../../service/aquirer.service';
import { Component, OnInit } from '@angular/core';
// import { acquirer } from 'src/app/model/acquirer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adquiriente',
  templateUrl: './adquiriente.component.html',
  styleUrls: ['./adquiriente.component.css']
})
export class AdquirienteComponent implements OnInit {

  // adquirienteSelected: string;
  // listAdquiriente: acquirer[];

  // constructor(private aquirerService: AquirerService, private router: Router) { }

  ngOnInit() {
    //this.aquirerService.getAquirer().subscribe(response => this.listAdquiriente = response);
  }

  // btnAccept() {
  //   localStorage.clear();
  //   localStorage.setItem('menu','main');
  //   this.router.navigate(['/home']);
  // }

}
