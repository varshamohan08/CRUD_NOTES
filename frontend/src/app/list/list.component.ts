import { Component, ViewChild } from '@angular/core';
import { BackendService } from '../backend.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  notes = []
  displayedColumns = ['position', 'title', 'body', 'action'];
  dataSource = new MatTableDataSource(this.notes);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private backend : BackendService,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }
  ngOnInit() {
    console.log('ngOnInIt');
    this.getNotes()
  }

  addNote() {
    this.router.navigate(["/add"])
  }

  editNote(id : string) {
    localStorage.setItem('note_id', id)
    this.router.navigate(["/edit"])
  }

  deleteNote(id : string){
    Swal.fire({  
      title: 'Are you sure want to delete?',  
      // text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        this.backend.deleteData('api/v1/notes/'+ id + '/').subscribe((res) => {
          if (res[0]['status'] === '1') {
            Swal.fire(  
              'Deleted!',  
              'The note has been deleted.',  
              'success'  
            ) 
            window.location.reload()
          }
          else {
            this.toastr.error('Invalid entry');
          }
        })
         
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
         
      }  
    })
    
  }
  getNotes() {
    console.log('getNotes');
    this.backend.getData('api/v1/notes/').subscribe((res) => {
      this.notes = res
      this.dataSource = new MatTableDataSource(this.notes);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  applyFilter(event : any) {
    let filterValue = (event.target as HTMLInputElement)?.value || '';
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
