import { OptionProductComponent } from './../option-product.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AttributeOptionService } from '../../../services/attribute-option.service';
import { AttributeService } from '../../../services/attribute.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-option-product',
  templateUrl: './add-option-product.component.html',
  styleUrl: './add-option-product.component.css'
})
export class AddOptionProductComponent implements OnInit {
  addOptionForm: FormGroup;
  attributes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private attributeService: AttributeService,
    private attributeOptionService: AttributeOptionService,
    private optionProductComponent:OptionProductComponent,
    private router: Router
  ) {
    this.addOptionForm = this.fb.group({
      optionName: ['', Validators.required],
      attributeId: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadAttributes();
  }

  loadAttributes(): void {
    this.attributeService.searchAttributes({ PageNumber: 1, PageSize: 100 })
      .subscribe(
        (response) => {
          this.attributes = response.data;
        },
        (error) => {
          console.error('Error loading attributes:', error);
        }
      );
  }

  onSubmit(): void {
    if (this.addOptionForm.valid) {
      const newOption = this.addOptionForm.value;

      this.attributeOptionService.addAttributeOption(newOption).subscribe(
        (response) => {
          console.log('Option added successfully:', response);
          this.router.navigate(['/admin/option']).then(() => {
            this.optionProductComponent.loadOptions();
          });
        },
        (error) => {
          alert("Option name đã có")
          console.error('Error adding option:', error);
        }
      );
    }
  }
}