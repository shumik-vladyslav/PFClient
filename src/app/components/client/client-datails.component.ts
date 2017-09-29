import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {config} from '../../app.config';
import {Http} from '@angular/http';

@Component({
  selector: 'app-dish-details',
  template: `
    <th><img id="preview" [src]="client?.image_path" alt="preview image" width="96" height="96"/></th>
    <table class="table">
      <tbody>
      <tr>
        <th>Block</th>
        <td>{{client?.block}}</td>
      </tr>
      <tr>
        <th *ngIf="client?.block">Block Reason</th>
        <td>{{client?.blockreason}}</td>
      </tr>
      <tr>
        <th>Id</th>
        <td>{{client?.id}}</td>
      </tr>
      <tr>
        <th>Name</th>
        <td>{{client?.name}}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{{client?.email}}</td>
      </tr>
      <tr>
        <th>Phone</th>
        <td>{{client?.phone_number}}</td>
      </tr>
      <tr>
        <th>Password</th>
        <td>{{client?.password}}</td>
      </tr>
      <tr>
        <th>Created By</th>
        <td>{{client?.createdby}}</td>
      </tr>
      <tr>
        <th>Creation time</th>
        <td>{{client?.creation_time}}</td>
      </tr>
      <tr>
        <th>Last Modify By</th>
        <td>{{client?.last_modify_by}}</td>
      </tr>
      <tr>
        <th>Last Modify Time</th>
        <td>{{client?.last_modify_time}}</td>
      </tr>
      <tr>
        <th>Password Last Modify</th>
        <td>{{client?.password_lastmodify}}</td>
      </tr>
      <tr>
        <th>Images Url</th>
        <td>{{client?.image_path}}</td>
      </tr>
      <tr>
        <th>Longitude</th>
        <td>{{client?.lon}}</td>
      </tr>
      <tr>
        <th>Latitude</th>
        <td>{{client?.lat}}</td>
      </tr>
    </table>
  `
})

export class ClientDetailsComponent implements OnInit {
  client;
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
        this.http.get( `${config.api_prefix}client/${id}`).map(resp => resp.json().result[0]).subscribe(
          (obj) => {
            console.log(obj);
            this.client = obj;
          }
        );
      }
    );
  }
}
