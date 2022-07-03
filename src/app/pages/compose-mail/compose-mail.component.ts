import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {

  mailForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.mailForm = this._fb.group({
      'firstName': [null, [Validators.required, Validators.pattern(/(?!^\s+$)^.*$/m)]],
      'lastName': [null, [Validators.required, Validators.pattern(/(?!^\s+$)^.*$/m)]],
      'email': [null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      'description': [null, [Validators.required, Validators.pattern(/(?!^\s+$)^.*$/m)]],
    })
  }

  onSubmit() {
    this.mailForm.markAllAsTouched();
    console.log(this.mailForm);
  }

}
