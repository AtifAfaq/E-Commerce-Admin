import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShiftingService {
  user = {};
  allProducts = [];
  allUsers = [];
  product = {};
  allCategorys = [];
  allReviews = [];

  constructor() {

  }
}
