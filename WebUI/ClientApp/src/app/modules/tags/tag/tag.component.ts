import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TagDto, CategoryDto, CreateTagCommand, UpdateTagCommand } from 'src/app/models';
import { CategorySelectionValidator } from 'src/app/shared/validators/category-selection.validator';
import { CategoriesService } from '../../categories/categories.service';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TagComponent implements OnInit {

  tagForm: FormGroup;
  title: string;
  id: number;
  name: string;
  creating: boolean = false;
  

  category: CategoryDto;
  categories: CategoryDto[];
  tag: TagDto;

  filteredOptions: Observable<CategoryDto[]>;

  @Output() event = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagsService,
    private categoryService: CategoriesService,
    private bsModalRef: BsModalRef) { }

  ngOnInit(): void {

    this.getCategories();
    this.initForm();

  }


  private initForm() {

    this.tagForm = this.formBuilder.group({
      name: [this.name, [RxwebValidators.notEmpty(), RxwebValidators.maxLength({ value: 30 })]],
      category: [{ value: this.category, disabled: !this.creating }, CategorySelectionValidator]
    });
  }


  get form() { return this.tagForm.controls }


  getCategories() {

    this.categoryService.getCategories().subscribe(resp => {

      this.categories = resp.categories;

      this.filteredOptions = this.tagForm.get("category").valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.categories.slice())
        );

    });

  }


  save() {

    if (this.tagForm.valid) {


      if (this.creating) {

        const tag: CreateTagCommand = { name: this.form.name.value, categoryId: this.form.category.value.id }

        this.tagService.create(tag).subscribe((res) => {

          this.tag = { id: Number(res), name: tag.name, category: this.form.category.value.name, categoryId: this.form.category.value.id };

          this.dispatchEvent(this.tag);

        });


      } else {

        const tag: UpdateTagCommand = { id: this.id, name: this.form.name.value, categoryId: this.category.id };

        this.tagService.update(tag).subscribe(res => {
          this.dispatchEvent();
        });

      }

    }



  }


  cancel() {
    this.bsModalRef.hide();
  }

  dispatchEvent(tag?: TagDto) {

    this.event.emit(tag);

    this.bsModalRef.hide();

  }


  private _filter(name: string): CategoryDto[] {

    const filterValue = name.toLowerCase();
    return this.categories.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  displayCategory(category: CategoryDto): string | undefined {
    return category ? category.name : undefined;
  }



}
