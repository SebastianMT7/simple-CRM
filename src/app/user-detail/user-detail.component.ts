import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firbease-service/firebase.service';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.class';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  // private router = inject(Router);
  public fire = inject(FirebaseService);
  readonly dialog = inject(MatDialog);

 
  ngOnInit(): void {
    this.getUserId();
    this.fire.getUserDetails();    
  }

  // getUserId() {
  //   this.route.paramMap.subscribe(paramMap => {
  //     this.userId = paramMap.get('id');
  //   })
  //   console.log('Id', this.userId)
  // }

  getUserId() {
    this.route.params.subscribe(params => {
      this.fire.singleUserlId = params['id'];
    })
    console.log('Id', this.fire.singleUserlId)
  }

  editUserDetail(){
    this.dialog.open(DialogEditUserComponent);
  }

  editAdress(){
    this.dialog.open(DialogEditAddressComponent);
  }
}
