import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<LoadingIndicatorComponent>,
  ) { }

  ngOnInit(): void {
  }

}
