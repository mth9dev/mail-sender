import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  get images() {
    return this.mailForm.get('images') as FormArray;
  }

  ngOnInit(): void {
    this.mailForm = this._fb.group({
      'firstName': [null, [Validators.required, Validators.pattern(/(?!^\s+$)^.*$/m)]],
      'lastName': [null, [Validators.required, Validators.pattern(/(?!^\s+$)^.*$/m)]],
      'email': [null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      'description': [null, [Validators.required, Validators.pattern(/(?!^\s+$)^.*$/m)]],
      'images': this._fb.array([]),
    })
  }

  onSubmit() {
    this.mailForm.markAllAsTouched();
    console.log(this.mailForm);
  }

  addImage(event: Event) {
    let fileList = (event.target as HTMLInputElement)?.files;
    let fileArray = Array.from(fileList!);
    for (let file of fileArray) {
      const reader = new FileReader();
      reader.onload = () => {
        let imageForm = this._fb.group({
          name: file.name,
          type: file.type,
          url: (reader.result as string),
        });
        this.images.push(imageForm)
      }
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number){
    this.images.removeAt(index);
  }

}
