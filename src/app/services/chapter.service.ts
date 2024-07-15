import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Question } from '../model/question';
import { ChapterMeta } from '../model/chapter.meta';
import { Answer } from '../model/answer';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }

  getChaptersMeta(): Observable<ChapterMeta[]> {
    return this.http.get<ChapterMeta[]>('/assets/chapters.meta.json');
  }

  getQuestions(chapterNumber: string): Observable<Question[]> {
    return this.http.get<Question[]>('/assets/chapter_' + chapterNumber + '/chapter_' + chapterNumber + '.json')
  }

  getAnswers(chapterNumber: string): Observable<Answer[]> {
    return this.http.get<Answer[]>('/assets/chapter_' + chapterNumber + '/answers_chapter_' + chapterNumber + '.json')
  }


  // REVIEW ROUTE HERE FOR GH


}
