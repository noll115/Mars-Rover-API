import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent implements OnInit {
  @Input() choices: string[];
  @Input() checkBoxes: boolean = false;
  @Input() label: string;
  @Input() boxText: string;
  @Input() dChoice:string;
  currentChoice: String = "";
  numOfChoicesChosen: number = 0;
  constructor() { }

  ngOnInit() {
    this.currentChoice = this.dChoice;
  }

  OnClick() {
    //display choices
  }

}
