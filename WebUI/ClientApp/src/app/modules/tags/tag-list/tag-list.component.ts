import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TagDto } from 'src/app/models';
import { ModalContainerComponent } from 'src/app/shared/components/modal-container/modal-container.component';
import { IButtonContainerSettings } from 'src/app/shared/models/button-container';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TagComponent } from '../tag/tag.component';
import { TagsService } from '../tags.service';


@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})


export class TagListComponent {
  // Sample RowGroup https://stackblitz.com/edit/angular-material-table-row-grouping-expand-sort-g3lsrm?file=src%2Fapp%2Fapp.component.ts
  // Dialog https://blog.angular-university.io/angular-material-dialog/

  settingsButton = {
    fn: this.create.bind(this),
    icon: 'add',
    text: 'New'
  } as IButtonContainerSettings;

  displayedColumns: string[] = ['id', 'name', 'category', 'options'];
  dataSource = new MatTableDataSource<TagDto>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  groupOptions: string[] = ['name', 'category'];
  groupingColumn;

  isDisabled: boolean = false;

  reducedGroups = [];

  allData: any[];


  tag: TagDto;

  constructor(private tagsService: TagsService, private modalService: BsModalService, private bsModalRef: BsModalRef, private snackbarService: SnackbarService) {

    this.getTags();

  }


  getTags() {
    this.tagsService.getTags().subscribe(resp => {

      this.allData = resp.tags;

      this.dataSource = new MatTableDataSource(resp.tags);

      this.dataSource.sort = this.sort;

      this.dataSource.paginator = this.paginator;

    });
  }

  create() {

    const initialState = { title: 'Create', creating: true, }

    this.bsModalRef = this.modalService.show(TagComponent, { initialState });

    this.bsModalRef.content.event.subscribe(res => {

      this.snackbarService.success('Tag was created successfully');
      this.dataSource.data.unshift(res);

      this.dataSource.data = this.dataSource.data;

    });

  }


  edit(tag: TagDto) {
    let category = { id: tag.categoryId, name: tag.category };

    const initialState = { title: 'Edit', id: tag.id, name: tag.name, categoryName: tag.category, categoryId: tag.categoryId, category: category };

    this.bsModalRef = this.modalService.show(TagComponent, { initialState });

    this.bsModalRef.content.event.subscribe(() => {
      this.snackbarService.success('Tag was updated successfully');
      this.getTags();
    });
  }


  delete(id: number, name: string, category: string) {

    const initialState = { module: 'Tag', name: name, categoryName: category };

    this.bsModalRef = this.modalService.show(ModalContainerComponent, { initialState, class: 'modal-dialog-centered' });

    this.bsModalRef.content.event.subscribe(() => {

      this.tagsService.delete(id).subscribe(() => {

        this.snackbarService.success('Tag was deleted successfully');

        this.dataSource.data = this.dataSource.data.filter((value) => {
          return value.id != id;
        });
       

      });

    });
  }



  //#region MatTable List

  /*  Rebuilds the datasource after any change to the criterions */
  buildDataSource() {

      if(this.groupingColumn) {

      this.isDisabled = true; // If rows is group by any column then i disable the sort and filter.

      this.dataSource = this.groupBy(this.groupingColumn, this.allData, this.reducedGroups);

      return;
    }

    this.isDisabled = false;

    this.getTags();
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */

  groupBy(column: string, data: any[], reducedGroups?: any[]) {
    if (!column) return data;
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) collapsedGroups = [];
    const customReducer = (accumulator, currentValue) => {
      let currentGroup = currentValue[column];
      if (!accumulator[currentGroup])
        accumulator[currentGroup] = [
          {
            groupName: `${column} ${currentValue[column]}`,
            value: currentValue[column],
            isGroup: true,
            reduced: collapsedGroups.some(
              group => group.value == currentValue[column]
            )
          }
        ];

      accumulator[currentGroup].push(currentValue);

      return accumulator;
    };
    let groups = data.reduce(customReducer, {});
    let groupArray = Object.keys(groups).map(key => groups[key]);
    let flatList = groupArray.reduce((a, c) => {
      return a.concat(c);
    }, []);

    return flatList.filter(rawLine => {
      return (
        rawLine.isGroup ||
        collapsedGroups.every(group => rawLine[column] != group.value)
      );
    });
  }

  /**
   * Since groups are on the same level as the data,
   * this function is used by @input(matRowDefWhen)
   */
  isGroup(index, item): boolean {
    return item.isGroup;
  }

  /**
   * Used in the view to collapse a group
   * Effectively removing it from the displayed datasource
   */
  reduceGroup(row) {
    row.reduced = !row.reduced;
    if (row.reduced) this.reducedGroups.push(row);
    else
      this.reducedGroups = this.reducedGroups.filter(
        el => el.value != row.value
      );

    this.buildDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //#endregion



}
