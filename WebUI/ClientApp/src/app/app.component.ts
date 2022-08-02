import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {

    ReactiveFormConfig.set({
      "internationalization": {
        "dateFormat": "dmy",
        "seperator": "/"
      },
      "validationMessage": {
        "maxLength": "Maximo {{1}} characters are allowed.",
        "required": "this field is required",
        "notEmpty": "Not Empty2"
      }
    });

  }

}
