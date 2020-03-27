import { Component, OnInit } from '@angular/core';
import { DataShiftingService } from './../data-shifting.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product = {};
  constructor(public service: DataShiftingService) { }

  ngOnInit() {
    this.product = this.service.product;
    console.log(this.product)
  }

}
