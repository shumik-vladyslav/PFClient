import { Component, OnInit } from '@angular/core';
import {config} from "../../app.config";
import {Http} from "@angular/http";
import {NgForm} from "@angular/forms";

declare var $: any;

export interface GenReqData {
  id?: number;
  consumer_cid: number;
  req_time: string;
  req_details: string;
  req_subject: string;
  status: number;
  lon: number;
  lat: number;
}

@Component({
  selector: 'app-genreq',
  templateUrl: './genreq.component.html',
  styleUrls: ['./genreq.component.css']
})
export class GenreqComponent implements OnInit {
  model: GenReqData;
  editMode: boolean;
  genReqObserver = this.http.get(config.api_prefix + 'genreq').map(resp => resp.json().result);
  cunsomerObserver = this.http.get(config.api_prefix + 'utils/consumer').map(resp => resp.json().result);
  statusObserver =  this.http.get(config.api_prefix + 'utils/status').map(resp => resp.json().result);
  genReqList;

  resetModel() {
    this.model = {
      consumer_cid: 0,
      req_time: '',
      req_details: '',
      req_subject: '',
      status: 0,
      lon: 0,
      lat: 0
    };
  }

  updateGenReqList() {
    this.genReqObserver.take(1).subscribe(
      (result) => {
        this.genReqList = result;
        $('table').addClass('table');
      }
    );
  }

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.updateGenReqList();
    this.resetModel();
  }

  onNewGenreq(form: NgForm) {
    form.resetForm();
    console.log('new genreq');
    $('#create-form').modal('toggle');
  }

  onSave(form: NgForm) {
    this.model = form.value;
    this.model.req_time = new Date().toISOString();
    let request = this.http.post(config.api_prefix + 'genreq', this.model);
    if (this.editMode) {
      request = this.http.patch(config.api_prefix + 'genreq', this.model);
    }

    request.subscribe(
      (result) => {console.log('ok', result); this.updateGenReqList() },
      (err) => console.log('err', err)
    );
    this.resetModel();
    form.resetForm();
    this.editMode = false;
  }

  onEdit(genreq, form: NgForm) {
    this.editMode = true;
    form.setValue(genreq);
    $('#create-form').modal('toggle');
  }

  onDelete(id) {
    console.log('on delete', id);
    this.http.delete(config.api_prefix + 'genreq/' + id).subscribe(
      (result) => {console.log('ok', result); this.updateGenReqList() },
      (err) => console.log('err', err)
    );
  }
}
