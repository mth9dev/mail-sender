import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {

  mailForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _mailService: MailService,
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

  async onSubmit() {
    this.mailForm.markAllAsTouched();
    if (this.mailForm.invalid) {
      return;
    }

    var images = this.prepareImagesToSend(this.images);
    try {
      var message = await this._mailService.sendMail({
        to: this.mailForm.get('email')?.value,
        body: this.mailForm.get('description')?.value,
        firstName: this.mailForm.get('firstName')?.value,
        lastName: this.mailForm.get('lastName')?.value,
        attachments: images,
      });
    }
    catch(err) {

    }
    finally {

    }
  }

  addImage(event: Event) {
    let fileList = (event.target as HTMLInputElement)?.files;
    let fileArray = Array.from(fileList!);
    for (let file of fileArray) {
      // skip if the file is not image.
      if (!file.type.includes('image')) {
        continue;
      }
      // do the following if the file is image.
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

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  /*
   *  this func transform images' form array into
   *  the attachment array to use in Email.send method.
   */
  prepareImagesToSend(imageFormArray: FormArray) {
    return imageFormArray.controls.map(el => {
      return {
        name: el.get('name')?.value,
        data: el.get('url')?.value,
      }
    })
  }

}
