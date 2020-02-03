import { Component, OnInit, Input, OnChanges, EventEmitter, SimpleChanges, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent implements OnInit, OnChanges {
  @Input() choices: string[];
  @Input() label: string;
  @Input() boxText: string;
  @Output() selected = new EventEmitter<string[]>();
  currentChoice: String = "";
  numOfChoicesChosen: number;
  dropDown: boolean = false;
  chosenArray: string[];

  constructor() { }

  ngOnInit() {
    this.numOfChoicesChosen = this.choices.length;
    this.SelectAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  DropMenu() {
    //display choices
    this.dropDown = !this.dropDown;
  }

  ChoiceSelect(index: number, event) {
    if (event.target.tagName === "INPUT") {
      let arrIndex = this.chosenArray.indexOf(this.choices[index]);
      if (arrIndex !== -1) {
        this.chosenArray.splice(arrIndex, 1);
      } else {
        this.chosenArray.push(this.choices[index]);
      }
      this.numOfChoicesChosen = this.chosenArray.length;
      this.selected.emit(this.chosenArray);
    }
  }

  isChecked(index: number) {
    return this.chosenArray.includes(this.choices[index]);
  }

  ClearSelection() {
    this.numOfChoicesChosen = 0;
    this.chosenArray = [];
  }
  SelectAll() {

    this.chosenArray = [...this.choices];
    this.numOfChoicesChosen = this.chosenArray.length;
    this.selected.emit(this.chosenArray);
  }
}
