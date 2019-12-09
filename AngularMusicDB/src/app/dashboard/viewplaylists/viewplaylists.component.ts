import { Component, OnInit, AfterViewChecked } from '@angular/core';

declare var M: any;

@Component({
  selector: 'app-viewplaylists',
  templateUrl: './viewplaylists.component.html',
  styleUrls: ['./viewplaylists.component.css']
})
export class ViewplaylistsComponent implements OnInit ,AfterViewChecked{
  ngAfterViewChecked(): void {
   
  }

  constructor() { }

  ngOnInit() {
    
  }

}
