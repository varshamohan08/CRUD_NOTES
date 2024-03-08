import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  
  title=null
  body=null

  constructor(
    private backend : BackendService,
    private toastr : ToastrService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate([""])
  }

  createNote() {
    console.log('createNote');
    if (this.title === null || this.title === undefined || this.title === '') {
      this.toastr.error('Invalid title');
      return
    }
    if (this.body === null || this.body === undefined || this.body === '') {
      this.toastr.error('Invalid body');
      return
    }
    
    let dctData = {
      'title' : this.title,
      'body' : this.body
    }
    this.backend.postData('api/v1/notes/', dctData).subscribe((res) => {
      console.log(res);
      
      if (res[0]['status'] === '1') {
        this.router.navigate([""])
      }
      else {
        this.toastr.error('Invalid entry');
      }
    });
  }
}
