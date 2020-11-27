import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFlash } from './flash.model';

function generateId(): number {
  return Math.floor(Math.random() * 1000);
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: generateId(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: generateId()
  }, {
    question: 'Question 3',
    answer: 'Answerr 3',
    show: false,
    id: generateId()
  }];

  flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);

  addFlash(flash): void {
    this.flashs.push({
      id: generateId(),
      ...flash
    });
    this.flashs$.next(this.flashs);
  }

  toggleFlash(id: number): void {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  deleteFlash(id: number): void {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      ...this.flashs.slice(index + 1)
    ];
    this.flashs$.next(this.flashs);
  }

  updateFlash(id, flash: IFlash): void {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        ...flash,
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect'): void {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

}
