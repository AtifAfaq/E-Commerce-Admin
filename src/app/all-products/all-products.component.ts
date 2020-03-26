import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  allProducts = [];
  allUsers = [];
  constructor(public service: DataShiftingService,
    public router: Router) {

  }

  ngOnInit() {
    this.allProducts = this.service.allProducts;
    if (this.allProducts.length == 0) {
      debugger;
      this.router.navigate(['/home']);
    }
  }


}
