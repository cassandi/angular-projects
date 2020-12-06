import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppointment } from '../appointment.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  appointments$: Observable<any>;
  itemRef: AngularFireList<any>;

  constructor(private database: AngularFireDatabase) {
    this.itemRef = this.database.list('/appointments');
    this.appointments$ = this.itemRef.snapshotChanges().pipe(
      map((res) => {
        return res.map(value => {
          debugger
          const appointment: IAppointment = value.payload.val();
          const count = appointment.units.reduce((acc, curr) => {
            if (curr.type === 'room') {
              acc.beds += 1;
            }
            if (curr.type === 'bath') {
              acc.baths += 1;
            }
            return acc;
          }, {
            beds: 0,
            baths: 0
          });
          return `${count.beds} BD ${count.baths} BT`;
              })
      })
    )
  }

  getBadgeColor(appointment) {
    const status = appointment.payload.val().status;
    return status === 'incomplete' ? 'danger' : status === 'complete' ? 'success' : 'primary';
  }

  getBadgeLabel(appointment) {
    const status = appointment.payload.val().status;
    return status === 'incomplete' ? 'Incomplete' : status === 'complete' ? 'Completed' : 'Not Started';
  }

}
