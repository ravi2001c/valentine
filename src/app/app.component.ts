import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'valentine';
  noX = 300;
  noY = 300;
  accepted = false;

  burstArray = new Array(20);

  moveNo() {
    this.noX = Math.random() * (window.innerWidth - 120);
    this.noY = Math.random() * (window.innerHeight - 60);
  }

  accept() {
    this.accepted = true;
  }
}
