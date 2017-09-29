import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {config} from '../../app.config';
import {Http} from '@angular/http';

@Component({
  selector: 'app-dish-details',
  template: `
    <th><img id="preview" [src]="dish?.image_path" alt="preview image" width="96" height="96"/></th>
    <table class="table">
      <tbody>
      <tr>
        <th>Image Path</th>
        <td>{{dish?.image_path}}</td>
      </tr>
      <tr>
        <th>Id</th>
        <td>{{dish?.id}}</td>
      </tr>
      <tr>
        <th>Name</th>
        <td>{{dish?.name}}</td>
      </tr>
      <tr>
        <th>Category</th>
        <td>{{dish?.cat_name}}</td>
      </tr>
      <tr>
        <th>Avalible</th>
        <td>{{dish?.available}}</td>
      </tr>
      <tr>
        <th>Creation</th>
        <td>{{dish?.creation}}</td>
      </tr>
      <tr>
        <th>Last Modify</th>
        <td>{{dish?.lastmodifytime}}</td>
      </tr>
      <tr>
        <th>Price</th>
        <td>{{dish?.price}}</td>
      </tr>
      <tr>
        <th>Chef id</th>
        <td>{{dish?.serviceprovider_spid}}</td>
      </tr>
      </tbody>
    </table>
  `
})

export class DishDetailsComponent implements OnInit {
  dish;
  serverUrl = config.api_prefix;
  constructor(private http: Http,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          return;
        }
        this.http.get( `${config.api_prefix}dish/${id}`).map(resp => resp.json().result[0]).subscribe(
          (obj) => {
            console.log(obj);
            this.dish = obj;
          }
        );
      }
    );
  }
}
