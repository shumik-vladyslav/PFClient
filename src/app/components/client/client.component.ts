import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {config} from '../../app.config';
import {NgForm} from "@angular/forms";

declare var $: any;

export interface ClientData {
  id?: number;
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
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  model: ClientData;
  editMode: boolean;
  clientObserver = this.http.get(config.api_prefix + 'client').map(resp => resp.json().result);

  clientsList;

  constructor(private http: Http) { }

  ngOnInit() {
    this.updateClientsList();
  }

  updateClientsList() {
    this.clientObserver.take(1).subscribe(
      (result) => {
        this.clientsList = result;
        $('table').addClass('table');
      }
    );
  }

  onNewClient(form: NgForm) {
    form.resetForm();
    $('#preview').attr('src', config.default_human_img_url);
    $('#create-form').modal('toggle');
  }

  onSave(form: NgForm) {
    const model = form.value;
    model.last_modify_time = new Date().toISOString();

    let formData: FormData = new FormData();

    const keys = Object.keys(form.value);
    console.log('keys', keys);
    keys.forEach((k) => {
      formData.append(k, form.value[k]);
    });
    if (this.file) {
      formData.append('image', this.file, this.file.name);
    }

    let request;
    if (!this.editMode) {
      formData.append('creation', new Date().toISOString())
      request = this.http.post(config.api_prefix + 'client/', formData);
    } else {
      request = this.http.patch(config.api_prefix + 'client/', model);
    }

    request.subscribe(
      (result) => {console.log('ok', result); this.updateClientsList() },
      (err) => console.log('err', err)
    );

    form.reset();
    this.editMode = false;
  }

  onEdit(client, form: NgForm) {
    this.editMode = true;
    // this.model = client;
    client.image = null;
    form.setValue(client);
    $('#preview').attr('src', client.image_path);
    $('#create-form').modal('toggle');
  }

  onDelete(id) {
    this.http.delete(config.api_prefix + 'client/' + id).subscribe(
      (result) => {console.log('ok', result); this.updateClientsList() },
      (err) => console.log('err', err)
    );
  }

  onBlock (id, form: NgForm) {
    console.log('block', id, form.value);
    form.value.id= id;
    this.http.patch(config.api_prefix + 'client/block', form.value).subscribe(
      (result) => {console.log('ok', result); this.updateClientsList() },
      (err) => console.log('err', err)
    );
  }

  onUnblock(id) {
    console.log('unblock');
    this.http.patch(config.api_prefix + 'client/unblock', {id: id}).subscribe(
      (result) => {console.log('ok', result); this.updateClientsList() },
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
