import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../firbease-service/firebase.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, FormsModule, MatProgressBarModule],
    providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  public fire = inject(FirebaseService);
  loading: boolean = false;
  birthDate: Date | null = new Date(this.fire.singleUserDetail.birthDate);
  user = new User();


  ngOnInit(): void {
    console.log(this.fire.singleUserDetail.birthDate)
    this.user = new User(this.fire.singleUserDetail); 
    console.log(this.user)
  }

  saveUser(){
    this.loading = true;
    if (this.birthDate) {
    this.user.birthDate = this.birthDate.getTime();
    }
    //console.log('current user', this.user)
    this.fire.updateUser(this.user);
    this.loading = false;
    this.closeDialog();
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
}
