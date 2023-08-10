import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/entitys/ClientModel';
import { ExcelFile } from 'src/app/entitys/ExcelFileModel';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { ProductComponent } from '../product/product.component';
import { Chart, registerables  } from 'chart.js'
import { OrderEntity } from 'src/app/entitys/OrderEntityModel';
import { toPercentage } from 'chart.js/dist/helpers/helpers.core';
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
   listOrder: OrderEntity[] = []

  constructor (private formBuilder: FormBuilder, private clientService: ClientServiceService,  public dialog: MatDialog) {
   
    
  }

 
 
  ngOnInit(): void {
   this.form = this.formBuilder.group({
   
     file:['']
   
   })
   
   this.getLoggedUser()
   this.dads(8)
   
  }
  createChart(monthlyValues: number[], monthlyProfit: number[] ){
    var myChart = new Chart("piechart", {
      type: 'bar',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec' ],
          datasets: [{
              label: 'Revenue',
              data: monthlyValues,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.3)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
          },
          {
            label: 'Products',
              data: monthlyProfit,
              backgroundColor: [
                  'rgba(15, 129, 2, 0.3)'
              ],
              borderColor: [
                  'rgba(15, 129, 2, 1)',
              ],
              borderWidth: 1
          }
        
        ]
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
  createChart3(monthlyProfit: number[], monthlyProduct: number[], monthlyTaxes: number[] ){
    var myChart = new Chart("piechart3", {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec' ],
          datasets: [{
              label: 'Taxes',
              data: monthlyTaxes,
              backgroundColor: [
                  'rgb(255, 0, 0, 0.3)'
              ],
              borderColor: [
                  'rgb(255, 0, 0, 1)',
              ],
              borderWidth: 1
          },
          {
            label: 'Profit',
              data: monthlyProfit,
              backgroundColor: [
                  'rgb(0, 0, 255, 0.3)'
              ],
              borderColor: [
                  'rgb(0, 0, 255)',
              ],
              borderWidth: 1
          },
          {
            label: 'Sales',
              data: monthlyProduct,
              backgroundColor: [
                  'rgb(255, 165, 0, 0.3)'
              ],
              borderColor: [
                  'rgb(255, 165, 0, 1)',
              ],
              borderWidth: 1
          }
        
        ]
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
  createChart2(totalRevenue: number, totalProfit: number, totalTaxes:number){
    var myChart = new Chart("piechart2", {
      type: 'doughnut',
      data: {
          labels: [ 'Profit', 'Taxes'],
          datasets: [{
              label: 'Datas',
              data: [ totalProfit, totalTaxes],
              backgroundColor: [
                  'rgba(65, 59, 102, 1)',
                  'rgba(165, 89, 182, 1)',   
                  'rgba(125, 39, 62, 1)'          
              ],
              borderWidth: 1
          }
        ]
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

  

  public dads(selectedMonth: number){
    var value = 0;
    var totalRevenue = 0;
    var totalProfit = 0;
    var totalTaxes = 0;
    
    this.clientService.getLoggedUser().subscribe(
      userlogged => {
       
        const monthlyProduct = new Array<number>(12).fill(0);
        const monthlyValues = new Array<number>(12).fill(0);
        const monthlyProfit = new Array<number>(12).fill(0);
        const monthlyTaxes = new Array<number>(12).fill(0);
        const datas: number[] = [];    
        userlogged.orderEntityList.forEach(order => {
          totalRevenue += order.totalPrice;
          totalProfit += order.totalCommissionValue;
          totalTaxes += order.totalTaxesValue;
        })
        datas.push(totalRevenue, totalProfit, totalTaxes);
        for (let month = 0; month < 12; month++) {
          userlogged.orderEntityList.forEach(order => {
            const dateString = order.salesData;
            const dateObject = new Date(dateString);
            const orderMonth = dateObject.getMonth();
            
           
            
            if (orderMonth === month) {
              monthlyValues[month] += order.totalPrice;
              monthlyProfit[month] += order.totalCommissionValue
              monthlyProduct[month] += order.productsAmount
              monthlyTaxes[month] += order.totalTaxesValue
            }
          });
        }
        this.createChart(monthlyValues, monthlyProfit )
        this.createChart2(totalRevenue, totalProfit, totalTaxes)
        this.createChart3(monthlyProfit, monthlyProduct, monthlyTaxes)
      }
    ); 
      
    
   
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
    
      return userlogged;
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
