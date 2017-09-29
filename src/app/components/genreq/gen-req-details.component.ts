import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {config} from '../../app.config';
import {Http} from '@angular/http';

@Component({
  selector: 'app-dish-details',
  template: `
    <table class="table">
      <tbody>
      <tr>
        <th>Id</th>
        <td>{{genreq?.id}}</td>
      </tr>
      <tr>
        <th>Cunsomer Id</th>
        <td>{{genreq?.consumer_cid}}</td>
      </tr>
      <tr>
        <th>Request Time</th>
        <td>{{genreq?.req_time}}</td>
      </tr>
      <tr>
        <th>Request Details</th>
        <td>{{genreq?.req_details}}</td>
      </tr>
      <tr>
        <th>Subject</th>
        <td>{{genreq?.req_subject}}</td>
      </tr>
      <tr>
        <th>Status</th>
        <td>{{genreq?.status}}</td>
      </tr>
      <tr>
        <th>Longitude</th>
        <td>{{genreq?.lon}}</td>
      </tr>
      <tr>
        <th>Latitude</th>
        <td>{{genreq?.lat}}</td>
      </tr>
    </table>
  `
})

export class GenReqDetailsComponent implements OnInit {
  genreq;
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
        this.http.get( `${config.api_prefix}genreq/${id}`).map(resp => resp.json().result[0]).subscribe(
          (obj) => {
            console.log(obj);
            this.genreq = obj;
          }
        );
      }
    );
  }
}
