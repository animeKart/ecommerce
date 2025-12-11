import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Category {
    name: string;
    slug: string;
    image: string;
}

@Component({
    selector: 'app-category-cards',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="w-full mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div *ngFor="let category of categories" 
          class="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg h-48 md:h-64 transition-transform duration-300 hover:scale-105">
          <img [src]="category.image" [alt]="category.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <h3 class="text-white text-lg md:text-xl font-bold tracking-wide">{{ category.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: ''
})
export class CategoryCardsComponent {
    // Static images - place your images in: src/assets/images/categories/
    categories: Category[] = [
        {
            name: 'Anime',
            slug: 'anime',
            image: 'assets/images/categories/anime.png'
        },
        {
            name: 'Abstract Art',
            slug: 'abstract-art',
            image: 'assets/images/categories/abstract-art.png'
        },
        {
            name: 'Spiritual',
            slug: 'spiritual',
            image: 'assets/images/categories/spiritual.png'
        },
        {
            name: 'Custom',
            slug: 'custom',
            image: 'assets/images/categories/custom.png'
        }
    ];
}
