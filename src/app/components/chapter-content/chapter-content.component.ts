import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Chapter } from '../../model/chapter';
import { Question } from '../../model/question';
import { ChapterService } from '../../services/chapter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { Answer } from '../../model/answer';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LineBreakPipe } from "../../pipes/line-break.pipe";

@Component({
  selector: 'app-chapter-content',
  standalone: true,
  imports: [
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    LineBreakPipe
  ],
  templateUrl: './chapter-content.component.html',
  styleUrl: './chapter-content.component.css'
})
export class ChapterContentComponent implements OnInit {

  answersValues: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
  chapter: Chapter = { chapterNumber: 0, title: "", score: 0, currentQuestion: 0 };

  currentQuestionContent!: Question;
  currentAnswerContent!: Answer;

  currentRadioOption: number = -1;
  currentCheckBoxSelectedOption: boolean[] = [];

  responses: number[] = [];
  score: number = 0;

  colorQuestionList: number[] = new Array().fill(0);

  showExplanation: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private chapterService: ChapterService) { }

  ngOnInit(): void {
    this.fillChapterNumber();
    this.populateQuestions();
    this.populateAnswers();
  }

  fillChapterNumber() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.chapter.chapterNumber = params["id"];
      this.chapterService.getChaptersMeta().subscribe((res: any) => {
        this.chapter.title = res.chapters[this.chapter.chapterNumber - 1].title;
      });
      this.chapter.currentQuestion = params["question"] ? Number(params["question"] - 1) : 0;
    });
  }

  populateQuestions() {
    this.chapterService.getQuestions(this.chapter.chapterNumber.toString()).subscribe((resp: any) => {
      this.chapter.questions = resp.questions;
      this.currentQuestionContent = this.chapter.questions![this.chapter.currentQuestion]
      console.log(this.currentQuestionContent)
    })
  }

  populateAnswers() {
    this.chapterService.getAnswers(this.chapter.chapterNumber.toString()).subscribe((resp: any) => {
      this.chapter.answers = resp.answers;
      this.currentAnswerContent = this.chapter.answers![this.chapter.currentQuestion];
      console.log(this.currentAnswerContent)
    })
  }

  verifyAnswer() {
    (this.currentAnswerContent.answers.length > 1) ? this.evaluateAnswerCheckboxButton() : this.evaluateAnswersRadioButton();
    this.showExplanation = true;
    localStorage.setItem("responses", JSON.stringify(this.responses));
  }

  evaluateAnswersRadioButton() {
    if (this.currentRadioOption != -1 && this.answersValues[this.currentRadioOption] == this.currentAnswerContent.answers[0]) {
      this.colorQuestionList[this.chapter.currentQuestion] = 1;
      this.responses[this.chapter.currentQuestion] = 1;
      this.score++;
      console.log("OK")
    } else {
      this.responses[this.chapter.currentQuestion] = -1;
      this.colorQuestionList[this.chapter.currentQuestion] = -1;
      console.log("NOT OK")
    }
  }

  evaluateAnswerCheckboxButton() {
    let counterRightAnswers: number = 0;
    let extractedAnswers: string[] = [];

    this.currentCheckBoxSelectedOption.forEach((option: boolean, index: number) => (option) ? extractedAnswers[index] = this.answersValues[index] : option)

    this.currentAnswerContent.answers.forEach((answer) => {
      if (extractedAnswers.includes(answer)) {
        counterRightAnswers++;
      }
    });

    if (this.currentAnswerContent.answers.length == counterRightAnswers) {
      this.responses[this.chapter.currentQuestion] = 1;
      this.colorQuestionList[this.chapter.currentQuestion] = 1;
      this.score++;
      console.log("OK")
    } else {
      this.responses[this.chapter.currentQuestion] = -1;
      this.colorQuestionList[this.chapter.currentQuestion] = -1;
      console.log("NOT OK")
    }



  }

  onChangedCheckBoxItem(checked: boolean, index: number) {
    this.currentCheckBoxSelectedOption[index] = checked;
  }

  prevQuestion() {
    this.chapter.currentQuestion--;
    this.resetQuestion();
  }

  nextQuestion() {
    this.chapter.currentQuestion++;
    this.resetQuestion();
  }

  resetQuestion() {
    this.currentQuestionContent = this.chapter.questions![this.chapter.currentQuestion]
    this.currentAnswerContent = this.chapter.answers![this.chapter.currentQuestion];
    this.currentRadioOption = -1;
    this.showExplanation = false;
  }

  evaluateColor(index: number) {
    if (this.colorQuestionList[index] == 1) return 'background-color:#008000d6'
    if (this.colorQuestionList[index] == -1) return 'background-color:#ff00008f'
    return '';
  }

}
