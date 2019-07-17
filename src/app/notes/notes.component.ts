import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Note} from "./model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  note: Note;
  showForm: boolean = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    //this.getAllNotebooks();
    this.getAllNotes();
  }

  getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res  => {
        this.notes = res.content;
      },
      err => {alert("Error occurred while downloading the ToDo;")}
    );
  }

  deleteNote(note: Note){
    if(confirm("Are you sure you want to delete this ToDo?")){
      this.apiService.deleteNote(note.id).subscribe(
        res =>{
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err=>{alert("An error has occurred deleting the ToDo");}
      );
    }
  }

  createNote(note: Note) {
    this.apiService.saveNote(note).subscribe(
      res => {
        this.showForm = false;
        this.getAllNotes();
      },
      err => {alert("An error occurred while saving the ToDo");}
    );
  }

  toggleShowForm() {
    this.note = {
      id: null,
      title: "",
      description: "",
      eventDate: ""
    };
    this.showForm = true;
  }

  updateNote(updatedNote: Note) {
    this.note = updatedNote;
    this.note.eventDate = this.note.eventDate.substring(0, 10);
    this.showForm = true;
  }

  /*updateNote(updatedNote: Note) {
    this.apiService.saveNote(updatedNote).subscribe(
      res => {
      },
      err => {alert("An error occurred while saving the note");}
    );
  }*/
}
