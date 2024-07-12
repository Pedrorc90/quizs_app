import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { Chapter } from '../model/chapter';
import { Question } from '../model/question';
import { ChapterService } from '../services/chapter.service';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-chapter-content',
  standalone: true,
  imports: [MatChipsModule, FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatRadioModule],
  templateUrl: './chapter-content.component.html',
  styleUrl: './chapter-content.component.css'
})
export class ChapterContentComponent implements OnInit {

  chapter: Chapter = { chapterNumber: 0, title: "", score: 0, currentQuestion: 0 };

  myChoice!: string;

  choices!: string[];

  currentQuestionContent!: Question;



  constructor(private activatedRoute: ActivatedRoute, private chapterService: ChapterService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.chapter.chapterNumber = params["id"];
    });


    this.chapterService.getQuestions(this.chapter.chapterNumber.toString()).subscribe((resp: any) => {
      this.chapter.questions = resp.questions;
      this.currentQuestionContent = this.chapter.questions![this.chapter.currentQuestion]

    })

  }



}
