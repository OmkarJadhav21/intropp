import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ai-drop',
  templateUrl: './ai-drop.component.html',
  styleUrls: ['./ai-drop.component.scss']
})
export class AiDropComponent implements OnInit {
  private notSuggested = ["Apple", "Pear", "Banana", "Strawberry", "Orange"];
  public aiForm: FormGroup;
  private mainData = [];
  public fruitsData = [];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.aiForm = this.fb.group({
      info: [null],
      answer: [null]
    });
    this.getDropdownData();
  }
  submitForm() {
    if (this.aiForm.valid) {
      const selectedInfo = this.aiForm.getRawValue().info.trim().toLowerCase();
      const selectedAnswer = this.aiForm.getRawValue().answer.trim();
      const ind = this.mainData.findIndex(ele => ele.prop === selectedInfo);
      ind === -1 ? this.createNewProp(selectedInfo, selectedAnswer) : this.updateExisting(ind, selectedAnswer);
      this.aiForm.reset();
      alert('Data submitted !');
    }
  }
  public updateDropDown() {
    this.getDropdownData();
  }
  private getDropdownData() {
    const suggestions: string[] = this.getSuggested();
    const removeSuggested = this.notSuggested.filter(ele => !suggestions.includes(ele))

    this.fruitsData = [
      {
        name: 'Suggested',
        relevant: suggestions
      },
      {
        name: 'Other',
        relevant: removeSuggested
      }
    ];
  }
  private createNewProp(info: string, answer: string) {
    this.mainData.push(
      {
        prop: info.toLowerCase(),
        operationalData: [answer]
      }
    );
  }
  private updateExisting(index: number, answer: string) {
    const isHaveFruit = this.mainData[index].operationalData.includes(answer);
    !isHaveFruit ? this.mainData[index].operationalData.push(answer) : '';
  }



  getSuggested() {
    if (this.aiForm) {
      if (this.aiForm.getRawValue().info) {
        if (this.mainData.find(ele => ele.prop === this.aiForm.getRawValue().info.trim().toLowerCase())) {
          return this.mainData.find(ele => ele.prop === this.aiForm.getRawValue().info.trim().toLowerCase()).operationalData;
        }
        return [];
      }
      return [];
    }
    return [];
  }
}