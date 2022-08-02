import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryDto, CreateCategoryCommand, UpdateCategoryCommand } from 'src/app/models';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;
  title: string;
  id?: number;
  name?: string;
  creating?: boolean = false;

  category: CategoryDto;

  @Output() event = new EventEmitter;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoriesService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {
    this.categoryForm = this.formBuilder.group({
      name: [this.name, [RxwebValidators.notEmpty(), RxwebValidators.maxLength({ value: 60 })]]
    });
  }


  get form() { return this.categoryForm.controls }


  save() {

    if (this.categoryForm.valid) {

      if (this.creating) {

        const category: CreateCategoryCommand = { name: this.form.name.value };

        this.categoryService.create(category).subscribe(res => {

          this.category = { id: Number(res), name: category.name };

          this.dispatchEvent(this.category);


        });

      } else {

        const category: UpdateCategoryCommand = { id: this.id, name: this.form.name.value };

        this.categoryService.update(category).subscribe(res => {


          this.dispatchEvent(category);

        });

      }


    }


  }


  cancel() {
    this.bsModalRef.hide()
  }


  dispatchEvent(category: CategoryDto) {

    this.event.emit(category);

    this.bsModalRef.hide();

  }


}
