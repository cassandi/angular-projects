import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IFlash } from './flash.model';
import { NgForm } from '@angular/forms';
import { FlashService } from './flash.service';

function generateId(): number {
  return Math.floor(Math.random() * 1000);
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('flashForm', {static: true}) flashForm: NgForm;

  title = 'ng-flashcards';
  editing = false;
  editingId: number;
  flashs;
  flash: IFlash = {
    id: null,
    question: '',
    answer: '',
    show: null
  };
  subscription: any;

  constructor(private flashService: FlashService) {
    this.flashs = this.flashService.flashs;
  }

  ngOnInit() {
    this.subscription = this.flashService.flashs$.subscribe(flashs => {
      this.flashs = flashs;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  trackByFlashId(index, flash): number {
    return flash.id;
  }

  handleToggleCard(id: number): void {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number): void {
    this.flashService.deleteFlash(id);
  }

  handleEdit(id: number): void {
    this.editing = true;
    this.editingId = id;
    const flash = this.flashs.find(flash => flash.id === id);
    this.flash.question = flash.question;
    this.flash.answer = flash.answer;
  }

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleRememberedChange({id, flag}): void {
    this.flashService.rememberedChange(id, flag);
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }

  handleClear(): void {
    this.flash.question = '';
    this.flash.answer = '';
    this.flashForm.reset();
  }

}
