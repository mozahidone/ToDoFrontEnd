import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Note} from "../notes/model/note";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = window["cfgApiBaseUrl"] + "/api";
  public ALL_NOTEBOOKS_URL = `${this.BASE_URL}/notebooks/all`;
  private SEND_FEEDBACK_URL = `${this.BASE_URL}/feedback`;
  private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}/notebooks`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}/notebooks/`;
  private ALL_NOTES_URL = `${this.BASE_URL}/todo`;
  private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}/todo/byNotebook/`;
  private SAVE_UPDATE_NOTE_URL = `${this.BASE_URL}/todo`;
  private DELETE_NOTE_URL = `${this.BASE_URL}/todo/`;

  constructor(private http: HttpClient) {

  }

  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return this.http.post(this.SEND_FEEDBACK_URL, feedback);
  }

  deleteNotebook(id: string): Observable<any> {
    return this.http.delete(this.DELETE_NOTEBOOK_URL + id);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.ALL_NOTES_URL);
  }

  getNotesByNotebook(notebookId: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL + notebookId);
  }

  saveNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.SAVE_UPDATE_NOTE_URL, note);
  }

  deleteNote(noteId:string):Observable<any>{
    return this.http.delete(this.DELETE_NOTE_URL + noteId);
  }
}
