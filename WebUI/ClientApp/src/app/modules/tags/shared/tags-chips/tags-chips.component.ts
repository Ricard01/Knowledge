import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { TagCategoryDto } from 'src/app/models';
// https://stackoverflow.com/questions/58282436/is-it-possible-to-use-mat-select-and-mat-chips-together

@Component({
  selector: 'app-tags-chips',
  templateUrl: './tags-chips.component.html',
  styleUrls: ['./tag-chips.component.scss']
})
export class TagsChipsComponent implements OnInit {

  @Input() formGroupName: string;
  @Input() tagList: TagCategoryDto[];
  form: FormGroup;


  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }


  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }


  onTagRemoved(tag: TagCategoryDto) {

    const currentTags = this.form.get("tags").value;

    this.removeFirst(currentTags, tag);

    // To trigger change detection
    this.form.setValue({ tags: currentTags });
    // this.form.patchValue({ tagName: currentTags});

  }


  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }


}
