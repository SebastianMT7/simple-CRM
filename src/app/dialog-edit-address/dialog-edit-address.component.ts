import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../firbease-service/firebase.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    FormsModule, MatProgressBarModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogEditAddressComponent>);
  public fire = inject(FirebaseService);
  loading: boolean = false;
  user = new User();


  ngOnInit(): void {
    //console.log(this.fire.singleUserDetail.birthDate)
    this.user = new User(this.fire.singleUserDetail); 
    //console.log(this.user)
  }

  saveUser(){
    this.loading = true;
    this.fire.updateUser(this.user);
    this.loading = false;
    this.closeDialog();
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
}
