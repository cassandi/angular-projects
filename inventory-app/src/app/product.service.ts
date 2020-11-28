import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IProduct {
  id: number;
  name: string;
  active: boolean;
  expirationDate: string;
  description: string;
  type: string;
  features?: string[];
}

function generateId() {
  return Math.floor(Math.random() * 1000);
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[] = [
    {
      id: generateId(),
      name: 'IPhone X',
      active: false,
      description: 'Like Brand New',
      expirationDate: '01/15/2019',
      type: 'mobile'
    },
    {
      id: generateId(),
      name: 'IPhone 4',
      active: true,
      description: 'Useless',
      expirationDate: '01/15/2014',
      type: 'mobile'
    },
    {
      id: generateId(),
      name: 'IPhone 6',
      active: true,
      description: 'Alright',
      expirationDate: '01/15/2016',
      type: 'mobile'
    },
    {
      id: generateId(),
      name: 'IPhone 7',
      active: true,
      description: 'Alright',
      expirationDate: '01/15/2017',
      type: 'mobile'
    },
    {
      id: generateId(),
      name: 'IPhone 5',
      active: true,
      description: 'Broken',
      expirationDate: '01/15/2015',
      type: 'mobile'
    },
    {
      id: generateId(),
      name: 'IPhone 8',
      active: true,
      description: 'Fine',
      expirationDate: '01/15/2018',
      type: 'mobile'
    },
    {
      id: generateId(),
      name: 'IPhone 9',
      active: true,
      description: 'Good',
      expirationDate: '01/15/2019',
      type: 'mobile'
    },
    {
      id: generateId(),
      name: 'IPhone 11',
      active: true,
      description: 'Great',
      expirationDate: '01/15/2020',
      type: 'mobile'
    },
    {
      id: generateId(),
      name: 'IPhone 12',
      active: true,
      description: 'Coming Soon',
      expirationDate: '01/15/2021',
      type: 'mobile'
    },
];
products$ = new BehaviorSubject<IProduct[]>(this.products);
  constructor() { }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    this.products = [
      ...this.products.slice(0, index),
      ...this.products.slice(index + 1),
    ];
    this.products$.next(this.products);
  }

  addProduct(product) {
    this.products = [
      {
        id: generateId(),
        ...product,
      },
      ...this.products,
    ];
    this.products$.next(this.products);
  }

  editProduct(id, product) {
    const index = this.products.findIndex(p => p.id === id);
    this.products = [
      ...this.products.slice(0, index),
      {
        id,
        ...product,
      },
      ...this.products.slice(index + 1),
    ];
    this.products$.next(this.products);
  }
}
