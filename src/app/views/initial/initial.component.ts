import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/entitys/ClientModel';
import { ExcelFile } from 'src/app/entitys/ExcelFileModel';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { ProductComponent } from '../product/product.component';
import { Chart, registerables  } from 'chart.js'
Chart.register(...registerables)
@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent {
  @ViewChild("meuCanvas", { static: true }) elemento!: ElementRef;
   form!: FormGroup;
    user!: Client;
    file!: File;
    client!: Client;
   

  constructor (private formBuilder: FormBuilder, private clientService: ClientServiceService,  public dialog: MatDialog) {
   
    
  }

 
 
  ngOnInit(): void {
   this.form = this.formBuilder.group({
   
     file:['']
   
   })
   this.getLoggedUser()

   var myChart = new Chart("piechart", {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec' ],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 22, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductComponent, {
     
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }
  
  public getLoggedUser(){
  this.clientService.getLoggedUser().subscribe(
    userlogged => {
      this.client = userlogged;
    
    }
  ); 
  }
  

  onChange(event: any) {
    this.file = event.target.files[0];
}
  uploadFile(){
    this.clientService.uploadFile(this.file).subscribe(
      result => console.log(result)
    )
  }
}
