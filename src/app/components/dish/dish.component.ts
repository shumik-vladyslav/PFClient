import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import {Http, RequestOptions, Headers} from '@angular/http';
import {config} from '../../app.config';
import {NgForm} from '@angular/forms';
import {Observable} from "rxjs/Observable";
import {forEach} from "@angular/router/src/utils/collection";

declare var $: any;

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  dishesObservablse;
  imageObserver =  this.http.get(config.api_prefix + 'utils/image').map(resp => resp.json().result);
  foodcatObserver =  this.http.get(config.api_prefix + 'utils/foodcatrgory').map(resp => resp.json().result);
  dishesList;
  model;
  editMode = false;
  chefId = -1;
  serverUrl = config.api_prefix;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http) {
  }

  resetModel() {
    this.model = {
      serviceprovider_spid: this.chefId,
      images_iid: 0,
      name: '',
      available: 1,
      creation: '',
      lastmodifytime: '',
      discription: '',
      price: 0,
      foodcatrgory_fcid: 0,
      image_path: ''
    };
  }

  ngOnInit() {
    this.resetModel();

    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          return;
        }
        this.chefId = id;
        this.dishesObservablse = this.http.get( `${config.api_prefix}chef/${id}/dish`).map(resp => resp.json().result);
        this.updateDishesList();
      }
    );
  }

  updateDishesList() {
    this.dishesObservablse.take(1).subscribe(
      (result) => {
        this.dishesList = result;
        $('table').addClass('table');
      }
    );
  }

  onNewDish(form: NgForm) {
    $('#preview').attr('src', config.default_dish_img_url);
    $('#create-form').modal('toggle');
    form.resetForm();
  }

  onSave( form: NgForm ) {
    console.log('on save');
    console.log('form value', form.value);
    console.log(this.model);

    form.value.serviceprovider_spid = this.chefId;
    form.value.lastmodifytime = new Date().toISOString();

    let formData: any = new FormData();
    if (this.file) {
      formData.append('image', this.file, this.file.name);
    }

    const keys = Object.keys(form.value);
    keys.forEach((k) => {
      formData.append(k, form.value[k]);
    });

    let request;
    if (!this.editMode) {
      formData.set('creation', new Date().toISOString());
      request = this.http.post(`${config.api_prefix}chef/${this.chefId}/dish`, formData);
    } else {
      request = this.http.patch(`${config.api_prefix}chef/${this.chefId}/dish`, formData);
    }

    request.subscribe(
      (result) => {console.log('ok', result); this.updateDishesList() },
      (err) => console.log('err', err)
    );
    this.resetModel();
    form.reset();
    this.editMode = false;
  }

  onDelete(id) {
    console.log('on delete', id);
    this.http.delete(`${config.api_prefix}dish/${id}`).subscribe(
      (result) => {console.log('ok', result); this.updateDishesList()},
      (err) => console.log('err', err)
    );
  }

  onEdit(dish, form:NgForm) {
    this.editMode = true;
    console.log('on edit', dish);
    // this.model = dish;
    dish.image = null;
    form.setValue(dish);
    $('#preview').attr('src', dish.image_path);
    $('#create-form').modal('toggle');
  }

  readURL(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const target: any = e.target;
      $('#preview').attr('src', target.result);
    }
    reader.readAsDataURL(file);
  }
  file: File;
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      this.readURL(this.file);
    }
  }
}

export default DishComponent;
