import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    this.http.get('https://angular-portafolio-c0b55.firebaseio.com/productos_idx.json')
    .subscribe((resp:Producto[]) => {
      console.log(resp);
    });
  }
}
