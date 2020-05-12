import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  readonly courses: string[] =
  ['Breakfast', 'Lunch', 'Dinner', 'Starters', 'Soup', 'Main Course', 'Side Dish', 'Dessert',
  'Snacks', 'Drinks'];
  readonly occasions: string[] = ['Party', 'Date Night', 'Easter', 'Thanksgiving', 'Christmas'];
  readonly cuisines: string[] =
  ['American', 'British', 'Chinese', 'French', 'Hungarian', 'Indian', 'Italian', 'Japanese',
  'Mexican', 'Middle Eastern', 'Spanish'];
  readonly specials: string[] = ['Vegetarian', 'Low-Carb', 'Dairy-Free', 'Gluten-Free'];

  @Input() selectedCourses: string[];
  @Output() selectedCoursesChange = new EventEmitter();

  @Input() selectedOccasions: string[];
  @Output() selectedOccasionsChange = new EventEmitter();

  @Input() selectedCuisines: string[];
  @Output() selectedCuisinesChange = new EventEmitter();

  @Input() selectedSpecials: string[];
  @Output() selectedSpecialsChange = new EventEmitter();

  @Output() categoryChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // Course
  addCourse(event: any) {
    if(this.selectedCourses.indexOf(event.target.value) === -1){
      this.selectedCourses.push(event.target.value);
      this.selectedCoursesChange.emit(this.selectedCourses);
      this.categoryChange.emit();
    }
    event.target.value = 'default';
  }
  removeCourse(course: string) {
    this.selectedCourses = this.selectedCourses.filter(c => c !== course);
    this.selectedCoursesChange.emit(this.selectedCourses);
    this.categoryChange.emit();
  }

  // Occasion
  addOccasion(event: any) {
    if(this.selectedOccasions.indexOf(event.target.value) === -1){
      this.selectedOccasions.push(event.target.value);
      this.selectedOccasionsChange.emit(this.selectedOccasions);
      this.categoryChange.emit();
    }
    event.target.value = 'default';
  }
  removeOccasion(occasion: string) {
    this.selectedOccasions = this.selectedOccasions.filter(c => c !== occasion);
    this.selectedOccasionsChange.emit(this.selectedOccasions);
    this.categoryChange.emit();
  }

  // Cuisine
  addCuisine(event: any) {
    if(this.selectedCuisines.indexOf(event.target.value) === -1){
      this.selectedCuisines.push(event.target.value);
      this.selectedCuisinesChange.emit(this.selectedCuisines);
      this.categoryChange.emit();
    }
    event.target.value = 'default';
  }
  removeCuisine(cuisine: string) {
    this.selectedCuisines = this.selectedCuisines.filter(c => c !== cuisine);
    this.selectedCuisinesChange.emit(this.selectedCuisines);
    this.categoryChange.emit();
  }

  // Special
  addSpecial(event: any) {
    if(this.selectedSpecials.indexOf(event.target.value) === -1){
      this.selectedSpecials.push(event.target.value);
      this.selectedSpecialsChange.emit(this.selectedSpecials);
      this.categoryChange.emit();
    }
    event.target.value = 'default';
  }
  removeSpecial(special: string) {
    this.selectedSpecials = this.selectedSpecials.filter(c => c !== special);
    this.selectedSpecialsChange.emit(this.selectedSpecials);
    this.categoryChange.emit();
  }

}
