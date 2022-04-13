import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  ReactiveForm!: FormGroup;
  closeResult = '';
  get f() {
    return this.ReactiveForm.controls;
  }
  correctFileType = false;
  noFileInput = false;
  genders = [
    { id: '1', value: 'Male' },
    { id: '2', value: 'Female' },
  ];
  isSubmitted = false;
  Category: any = ['General', 'SC/ST', 'OBC'];
  technology: Array<string> = [];
  profilePhoto!: String;
  Imageloaded: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.technology = ['C', 'C++', 'Java', 'Python', 'JavaScript'];
    this.buildForm();
  }

  buildForm(): void {
    this.ReactiveForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      gender: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
      ]),
      contact: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[6-9]\\d{9}'),
      ]),
      category: new FormControl(null, Validators.required),
      selectedTechnology: new FormArray([], [Validators.required]),
      profilePhoto: new FormControl(null, Validators.required),
    });
  }

  onValidate() {
    this.isSubmitted = true;
  }
  onSubmit() {
    this.ReactiveForm.value.profilePhoto=this.profilePhoto;
    console.log(this.ReactiveForm.value);
    this.dataService.userData = this.ReactiveForm.value;
  }

  technologySelected(event: Event, technology: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const formArray = this.getSelectedTechnologyFormArray();
    if (isChecked) {
      formArray.push(new FormControl(technology));
    } else {
      const index = formArray.controls.findIndex(
        (item) => item.value === technology
      );
      formArray.removeAt(index);
    }
  }
  getSelectedTechnologyFormArray(): FormArray {
    return this.ReactiveForm.get('selectedTechnology') as FormArray;
  }
  onImageChangeFromFile($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      var length = $event.target.files.length;
      if (length === 0) {
        this.noFileInput = true;
      }
      for (let i = 0; i < length; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          const mime = event.target.result.split(';')[0].split(':')[1];
          if (['image/jpeg', 'image/png', 'image/jpg+xml'].includes(mime)) {
            this.profilePhoto = event.target.result as String;
            this.changeDetector.detectChanges();
            this.correctFileType = true;
          } else {
            this.correctFileType = false;
          }
        };
        reader.readAsDataURL($event.target.files[i]);
      }
    }
  }
  handleImageLoad() {
    this.Imageloaded = true;
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
