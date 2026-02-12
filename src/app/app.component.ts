import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {

  @ViewChild('containerRef') containerRef!: ElementRef;
  @ViewChild('confettiCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;

  accepted = false;
  noX = 120;
  noY = 0;

  heartArray = new Array(20);
  burstArray = new Array(30);

  ngAfterViewInit() {
    this.startHearts();
  }

  detectMouse(event: MouseEvent) {
    const yesBtn = document.querySelector('.yes') as HTMLElement;
    const noBtn = document.querySelector('.no') as HTMLElement;

    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();

    const distance = Math.hypot(
      event.clientX - noRect.left,
      event.clientY - noRect.top
    );

    if (distance < 120) {
      const maxX = this.containerRef.nativeElement.offsetWidth - 150;
      const maxY = this.containerRef.nativeElement.offsetHeight - 80;

      this.noX = Math.random() * maxX - yesRect.left + 100;
      this.noY = Math.random() * maxY - yesRect.top;
    }
  }

  accept() {
    this.accepted = true;
    this.bgMusic.nativeElement.play();
    this.launchConfetti();
  }

  startHearts() {
    // floating handled in CSS animation
  }

  launchConfetti() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 100,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "pink";
      pieces.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y++, p.r, 0, Math.PI * 2, true);
        ctx.fill();
        if (p.y > canvas.height) p.y = 0;
      });
      requestAnimationFrame(draw);
    }

    draw();
  }
}
