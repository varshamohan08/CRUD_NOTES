import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent {

  note_id = localStorage.getItem('note_id')
  title=null
  body=null

  constructor(
    private backend : BackendService,
    private toastr : ToastrService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.getDetails()
  }

  getDetails() {
    this.backend.getData('api/v1/notes/'+ this.note_id + '/').subscribe((res) => {
      console.log(res);
      
      this.body = res.body
      this.title = res.title
      
    })
  }

  cancel() {
    this.router.navigate([""])
  }

  editNote() {
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
      'id' : this.note_id,
      'title' : this.title,
      'body' : this.body
    }
    this.backend.putData('api/v1/notes/', dctData).subscribe((res) => {
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
