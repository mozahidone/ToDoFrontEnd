import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Note} from "./model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

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
      err => {alert("Error occurred while downloading the notes;")}
    );
  }

  deleteNote(note: Note){
    if(confirm("Are you sure you want to delete this note?")){
      this.apiService.deleteNote(note.id).subscribe(
        res =>{
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err=>{alert("An error has occurred deleting the note");}
      );
    }
  }

  createNote() {
    let newNote:Note = {
      id: null,
      title: "New Note",
      description: "Write some text in here"
    };

    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {alert("An error occurred while saving the note");}
    );
  }

  updateNote(updatedNote: Note) {
    this.apiService.saveNote(updatedNote).subscribe(
      res => {
      },
      err => {alert("An error occurred while saving the note");}
    );
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
