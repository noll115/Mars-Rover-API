import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit {
  @Input() label = "test";
  @Input() maxNum: number = 0;
  inputNumber: number = 0;
  @Output() submit = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    this.submit.emit(this.inputNumber);
  }

  OnInput(event) {
    let character = event.charCode;
    if (character == 101 || character == 69 || character == 46 || character == 43 || character == 45) {
      return false;
    }
    return true;
  }

  OnSubmit() {
    if (this.inputNumber > this.maxNum) {
      this.inputNumber = this.maxNum;
    }
    this.submit.emit(this.inputNumber);
  }
}
