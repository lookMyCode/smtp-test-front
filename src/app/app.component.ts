import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form!: FormGroup;
  output: any;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      fromName: new FormControl('', [Validators.required]),
      fromEmail: new FormControl('', [
        Validators.required, Validators.email
      ]),
      to: new FormControl('', [
        Validators.required, Validators.email
      ]),
      subject: new FormControl('', [Validators.required]),
      text: new FormControl('', []),
      html: new FormControl('', []),
      smtpHost: new FormControl('', [Validators.required]),
      smtpPort: new FormControl('', [Validators.required, Validators.min(1)]),
      smtpSecure: new FormControl('', []),
      smtpAuthUser: new FormControl('', [
        Validators.required, Validators.email
      ]),
      smtpAuthPass: new FormControl('', [Validators.required]),
    });
  }

  send() {
    const {value} = this.form;
    value.smtpPort = +value.smtpPort;
    value.smtpSecure = !!value.smtpSecure;

    this.http.post('http://46.41.149.97/api', value)
      .subscribe(
        res => this.output = JSON.stringify(res, null, 2),
        err => this.output = JSON.stringify(err, null, 2)
      );
  }
}
