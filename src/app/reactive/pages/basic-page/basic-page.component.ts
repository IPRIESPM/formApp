import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
})
export class BasicPageComponent implements OnInit {
  // myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], []),
  // });
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  rtx5090 = {
    name: 'RTX 5090',
    price: 9999,
    inStorage: 5,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //this.myForm.reset(this.rtx5090);
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este cambio es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log('Form is valid!');
    this.myForm.reset({ name: '', price: 0, inStorage: 0 });
  }
}
