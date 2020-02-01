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
  currentChoice: String = "";
  numOfChoicesChosen: number = 0;
  dropDown:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  DropMenu() {
    //display choices
    this.dropDown = !this.dropDown;
  }

  ChoiceSelect(index:number){
    console.log(index);
  }

  ClearSelection(){

  }
  SelectAll(){
    
  }
}
