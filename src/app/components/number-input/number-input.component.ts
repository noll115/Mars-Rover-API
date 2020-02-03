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
  }
  
  OnInput(event) {
    let character = event.charCode;
    if (character == 101 || character == 69 || character == 46 || character == 43 || character == 45) {
      return false;
    }
    return true;
  }

  OnSubmit() {
    if (this.inputNumber == null) {
      this.inputNumber = 0;
    }
    this.inputNumber = Math.min(this.maxNum, this.inputNumber);
    this.submit.emit(this.inputNumber);
  }
}
