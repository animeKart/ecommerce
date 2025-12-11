import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="w-full mb-12" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
            <div class="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                <div class="w-full h-full relative">
                    <div *ngFor="let slide of slides; let i = index" class="absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out" [class.opacity-0]="currentSlide() !== i" [class.opacity-100]="currentSlide() === i" [class.z-10]="currentSlide() === i">
                        <img [src]="slide" [alt]="'Slide ' + (i + 1)" class="w-full h-full object-cover">
                    </div>
                </div>
                <button class="absolute top-1/2 -translate-y-1/2 left-6 bg-white bg-opacity-90 hover:bg-opacity-100 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 shadow-lg" (click)="previousSlide()" aria-label="Previous slide">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-black"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button class="absolute top-1/2 -translate-y-1/2 right-6 bg-white bg-opacity-90 hover:bg-opacity-100 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 shadow-lg" (click)="nextSlide()" aria-label="Next slide">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-black"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
                <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    <span *ngFor="let slide of slides; let i = index" class="w-3 h-3 rounded-full border-2 border-white cursor-pointer transition-all duration-300" [class.bg-white]="currentSlide() === i" [class.bg-opacity-50]="currentSlide() !== i" [class.w-8]="currentSlide() === i" [class.rounded-md]="currentSlide() === i" (click)="goToSlide(i)"></span>
                </div>
            </div>
        </div>
    `,
    styles: ''
})
export class CarouselComponent implements OnInit, OnDestroy {
    currentSlide = signal(0);
    private intervalId: any;

    // Static images - place your images in: src/assets/images/carousel/
    slides = [
        'assets/images/carousel/img1.png',
        'assets/images/carousel/img2.png',
        'assets/images/carousel/img3.png',
        'assets/images/carousel/img4.png',
        'assets/images/carousel/img5.png'
    ];

    ngOnInit() {
        this.startAutoSlide();
    }

    ngOnDestroy() {
        this.stopAutoSlide();
    }

    startAutoSlide() {
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoSlide() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    nextSlide() {
        this.currentSlide.set((this.currentSlide() + 1) % this.slides.length);
    }

    previousSlide() {
        this.currentSlide.set(
            this.currentSlide() === 0 ? this.slides.length - 1 : this.currentSlide() - 1
        );
    }

    goToSlide(index: number) {
        this.currentSlide.set(index);
    }

    onMouseEnter() {
        this.stopAutoSlide();
    }

    onMouseLeave() {
        this.startAutoSlide();
    }
}
