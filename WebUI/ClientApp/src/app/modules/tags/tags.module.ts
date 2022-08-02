import { NgModule } from '@angular/core';
import { TagsRoutingModule } from './tags-routing.module';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Componets
import { TagListComponent } from './tag-list/tag-list.component';
import { TagComponent } from './tag/tag.component';
import { TagsChipsComponent } from './shared/tags-chips/tags-chips.component';



@NgModule({
  declarations: [
    TagListComponent,
    TagComponent,
    TagsChipsComponent,
  ],
  imports: [
    SharedModule,
    TagsRoutingModule,
  ],
  exports: [TagsChipsComponent]
})
export class TagsModule { }
