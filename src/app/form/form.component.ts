import { expressionType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  link = ''

  constructor() { }

  ngOnInit(): void {
  }

  generate(){
    console.log(this.link);
  }

}
