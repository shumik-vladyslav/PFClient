import {Component, Inject, OnInit} from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import {Http} from '@angular/http';
import {config} from '../../app.config';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/take';

declare var $: any;

export interface ChefData {
  id?: number;
  user_uid: number;
  average_rating: number;
  is_active: boolean;
  description: string;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  createdby: number;
  creation_time: string;
  last_modify_by: number;
  last_modify_time: string;
  password_lastmodify: string;
  images_iid: number;
  lon: number;
  lat: number;
}

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {

  defaultChefData: ChefData = {
    user_uid : 0,
    average_rating: 0,
    is_active: true,
    description: '',
    name: '',
    email: '',
    phone_number: '',
    password: '',
    createdby: 0,
    creation_time: '',
    last_modify_by: 0,
    last_modify_time: '',
    password_lastmodify: '',
    images_iid: 0,
    lon: 0,
    lat: 0
  }

  editMode = false;
  model: ChefData = this.defaultChefData;
  // chefs: ChefData[] = [
  //   {
  //     id: 0,
  //     user_uid: 2,
  //     average_rating: 6.7,
  //     is_active: false,
  //     description: 'opaopaop'
  //   },
  //   {
  //     id: 1,
  //     user_uid: 2,
  //     average_rating: 6.7,
  //     is_active: false,
  //     description: 'opaopaop'
  //   }
  // ];

  resetModel() {
    this.model = {
      user_uid : 0,
      average_rating: 0,
      is_active: true,
      description: '',
      name: '',
      email: '',
      phone_number: '',
      password: '',
      createdby: 0,
      creation_time: '',
      last_modify_by: 0,
      last_modify_time: '',
      password_lastmodify: '',
      images_iid: 0,
      lon: 0,
      lat: 0
    };
  }

  constructor(private http: Http) {
  }
  blockId;
  chefsObserver = this.http.get(config.api_prefix + 'chef').map(resp => resp.json().result);
  imageObserver =  this.http.get(config.api_prefix + 'utils/image').map(resp => resp.json().result);
  chefsList;

  ngOnInit() {
    // this.chefsObserver.subscribe(
    //   (res) => console.log('result', res)
    // );
    // $('.table').footable();

    this.updateChefsList();
  }

  updateChefsList() {
    this.chefsObserver.take(1).subscribe(
      (result) => {
        this.chefsList = result? result.filter( o => o.id): null;
        $('table').addClass('table');
      }
    );
  }

  onNewChef() {
    console.log('new chef');
    $('#create-form').modal('toggle');
    $('#preview').attr('src', config.default_human_img_url);
  }

  onSave( form: NgForm ) {
    console.log('on save');
    console.log('form value', form.value);

    const now = new Date().toISOString();
    form.value.last_modify_time = now;
    form.value.password_lastmodify = now;
    form.value.last_modify_by = 'ADMIN';
    form.value.createdby = 'ADMIN';

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
      formData.set('creation_time', new Date().toISOString());
      request = this.http.post(config.api_prefix + 'chef', formData);
    } else {
      request = this.http.patch(config.api_prefix + 'chef', formData);
    }

    request.subscribe(
      (result) => {console.log('ok', result); this.updateChefsList() },
      (err) => console.log('err', err)
    );
    this.resetModel();
    form.reset();
    this.editMode = false;
  }

  onDelete(id, userid) {
    console.log('on delete', id, userid);
    this.http.delete(config.api_prefix + `chef/${id}|${userid}`).subscribe(
      (result) => {console.log('ok', result); this.updateChefsList() },
      (err) => console.log('err', err)
    );
  }

  onEdit(chef, form: NgForm) {
    console.log('on edit');
    this.editMode = true;
    chef.image = null;

    $('#create-form').modal('toggle');
    $('#preview').attr('src', chef.image_path);
    this.editMode = true;

    form.setValue(chef);
  }

  // onDishes(id) {
  //   console.log('on dishes');
  //
  // }

  onBlock (id, form: NgForm) {
    console.log('block', id, form.value);
    form.value.id= id;
    this.http.patch(config.api_prefix + 'chef/block', form.value).subscribe(
      (result) => {console.log('ok', result); this.updateChefsList() },
      (err) => console.log('err', err)
    );
  }

  onUnblock(id) {
    console.log('unblock');
    this.http.patch(config.api_prefix + 'chef/unblock', {id: id}).subscribe(
      (result) => {console.log('ok', result); this.updateChefsList() },
      (err) => console.log('err', err)
    );
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

export default ChefComponent;
