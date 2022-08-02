import { Component, ViewChild } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDto } from 'src/app/models';
import { IButtonContainerSettings } from 'src/app/shared/models/button-container';
import { CategoryComponent } from '../category/category.component';
import { ModalContainerComponent } from 'src/app/shared/components/modal-container/modal-container.component';
import { SnackbarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  settingsButton = {
    fn: this.create.bind(this),
    icon: 'add',
    text: 'New'

  } as IButtonContainerSettings


  displayedColumns: string[] = ['name', 'options'];
  dataSource: MatTableDataSource<CategoryDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  bsModalRef: BsModalRef;


  category: CategoryDto;


  constructor(private categoriesService: CategoriesService, private modalService: BsModalService, private snackbarService: SnackbarService) {

    this.getCategories();

  }


  getCategories() {
    this.categoriesService.getCategories().subscribe(resp => {

      this.dataSource = new MatTableDataSource(resp.categories);

      this.dataSource.sort = this.sort;

      this.dataSource.paginator = this.paginator;

    });
  }


  create() {
    const initialState = { title: 'Create', creating: true };

    this.bsModalRef = this.modalService.show(CategoryComponent, { initialState });

    this.bsModalRef.content.event.subscribe(res => {

      this.snackbarService.success('Category was created successfully');

      // add the  object to top
      this.dataSource.data.unshift(res);

      //  add the  object to bottom
      // this.dataSource.data.push(res);

      this.dataSource.data = this.dataSource.data;

    });

  }


  edit(id: number, name: string) {

    const initialState = { title: 'Edit', id: id, name: name };

    this.bsModalRef = this.modalService.show(CategoryComponent, { initialState });

    this.bsModalRef.content.event.subscribe(() => {

      this.snackbarService.success('Category was updated successfully');

      this.getCategories();

    })

  }


  delete(id: number, name: string) {

    const initialState = { module: 'Category', name: name };

    this.bsModalRef = this.modalService.show(ModalContainerComponent, { initialState, class: 'modal-dialog-centered' });

    this.bsModalRef.content.event.subscribe(() => {

      this.categoriesService.delete(id).subscribe( () => {
          this.snackbarService.success('Category was deleted successfully');
          this.dataSource.data = this.dataSource.data.filter((value) => {
            return value.id != id;
          });
       

      });

    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}


