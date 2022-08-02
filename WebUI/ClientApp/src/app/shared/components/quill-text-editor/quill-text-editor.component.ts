import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { QuillConfiguration } from './quill-configuration';

@Component({
  selector: 'app-quill-text-editor',
  templateUrl: './quill-text-editor.component.html',
  styleUrls: ['./quill-text-editor.component.scss']
})

// Build a rich text editor in Angular with ngx-quill
// https://dev.to/trungk18/build-a-rich-text-editor-in-angular-with-ngx-quill-4i6d
// https://blog.almightytricks.com/2020/10/19/ngx-quill-free-wysiwyg-editor/#Conclusion

export class QuillTextEditorComponent implements OnInit {
  @Input() formGroupName: string;

  @Output() quillEvent = new EventEmitter<string>();

  form: FormGroup;


  quillConfiguration = QuillConfiguration;

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {

    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;

  }

  onSelectionChanged = (event) => { }
  contentChanged(content: string) {

    this.quillEvent.emit(content);

  }


}



  // If dont want theme on paste
  // editorInit(quill: any){
  //   quill.clipboard.addMatcher(Node.ELEMENT_NODE, function(node, delta){
  //     delta.forEach(e => {
  //       if(e.attributes){
  //         e.attributes.color = '';
  //         e.attributes.background = '';
  //       }
  //     });
  //     return delta;
  //   });
  // }