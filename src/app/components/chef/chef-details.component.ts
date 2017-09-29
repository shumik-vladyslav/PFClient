import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {config} from '../../app.config';
import {Http} from '@angular/http';

@Component({
  selector: 'app-chef-details',
  template: `
    <th><img id="preview" [src]="chef?.image_path" alt="preview image" width="96" height="96"/></th>
    <table class="table">
      <tbody>
      <tr>
        <th>Block</th>
        <td>{{chef?.block}}</td>
      </tr>
      <tr>
        <th *ngIf="chef?.block">Block Reason</th>
        <td>{{chef?.blockreason}}</td>
      </tr>
      <tr>
        <th>Id</th>
        <td>{{chef?.id}}</td>
      </tr>
      <tr>
        <th>User Id</th>
        <td>{{chef?.user_uid}}</td>
      </tr>
      <tr>
        <th>Average rating</th>
        <td>{{chef?.average_rating}}</td>  
      </tr>
      <tr>
        <th>Is Active</th>
        <td>{{chef?.is_active}}</td>
      </tr>
      <tr>
        <th>Description</th>
        <td>{{chef?.description}}</td>
      </tr>
      <tr>
        <th>Name</th>
        <td>{{chef?.name}}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{{chef?.email}}</td>
      </tr>
      <tr>
        <th>Phone number</th>
        <td>{{chef?.phone_number}}</td>
      </tr>
      <tr>
        <th>Password</th>
        <td>{{chef?.password}}</td>
      </tr>
      <tr>
        <th>Created By</th>
        <td>{{chef?.createdby}}</td>
      </tr>
      <tr>
        <th>Creation time</th>
        <td>{{chef?.creation_time}}</td>
      </tr>
      <tr>
        <th>Last modify by</th>
        <td>{{chef?.last_modify_by}}</td>
      </tr>
      <tr>
        <th>Last modify time</th>
        <td>{{chef?.last_modify_time}}</td>
      </tr>
      <tr>
        <th>Password lastmodify</th>
        <td>{{chef?.password_lastmodify}}</td>
      </tr>
      <tr>
        <th>Image iid</th>
        <td>{{chef?.images_iid}}</td>
      </tr>
      <tr>
        <th>Longitude</th>
        <td>{{chef?.lon}}</td>
      </tr>
      <tr>
        <th>Latitude</th>
        <td>{{chef?.lat}}</td>
      </tr>
      <tr>
        <th>Image Path</th>
        <td>{{chef?.image_path}}</td>
      </tr>
      </tbody>
    </table>
  `
})
export class ChefDetailsComponent implements OnInit {
  chef;
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
        this.http.get( `${config.api_prefix}chef/${id}`).map(resp => resp.json().result[0]).subscribe(
          (obj) => {
            console.log(obj);
            this.chef = obj;
          }
        );
      }
    );
  }
}
