import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-merge-sort',
  templateUrl: './merge-sort.component.html',
  styleUrls: ['./merge-sort.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MergeSortComponent implements OnInit {

  minimumCount = 4;
  maximumCount = 4;
  itemCount = 0;

  minimumDelay = 10;
  maximumDelay = 1000;
  delayCountStep = 100;
  delayCount = 10;

  arrayOfNumbers: number[] = [];

  unsortedColor = 'red';
  sortingColour = 'blue';
  sortedColour = 'green';

  sortStyles = [
    'Bubble Sort',
    'Selection Sort'
  ];

  isSorting = false;

  constructor() { }

  ngOnInit() {
    this.getMaximumCountForArrayItems();
    this.createArrayElements(this.minimumCount);
  }

  getMaximumCountForArrayItems() {
    const arrayContainerWidth = document.getElementById('array-elements-container').clientWidth;
    const count = arrayContainerWidth / 10;
    this.maximumCount = count;
  }

  removeArrayElements() {
    const arrayContainer = document.getElementById('array-elements-container');
    arrayContainer.innerHTML = '';
  }
  createArrayElements(count: number) {
    this.getRandomArrayOfNumbers(count);

    const arrayContainer = document.getElementById('array-elements-container');
    for (let i = 0; i < this.arrayOfNumbers.length; i++) {
      const node = document.createElement('div');
      node.id = `${i}th-element`
      node.classList.add('array-element');
      node.style.height = this.arrayOfNumbers[i] + 'px';
      arrayContainer.appendChild(node);
    }
  }

  getRandomArrayOfNumbers(count) {
    this.arrayOfNumbers = [];

    const screenHeight = window.screen.availHeight * window.devicePixelRatio;
    const headerHeight = document.getElementById('algo-header').offsetHeight;

    const targetMaxHeight = screenHeight - headerHeight - 80;

    for (let i = 0; i < count; i++) {
      const randomNumber = this.getRandomNumber(targetMaxHeight / 3, targetMaxHeight);
      this.arrayOfNumbers.push(randomNumber);
    }
  }

  getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  async bubbleSort(array) {
    try {
      for (let j = 0; j < array.length; j++) {
        for (let i = 0; i < array.length - 1 - j; i++) {
          const currentElement = document.getElementById(`${i}th-element`);
          const nextElement = document.getElementById(`${i + 1}th-element`);
          currentElement.style.backgroundColor = this.sortingColour;
          nextElement.style.backgroundColor = this.sortingColour;
          if (array[i] > array[i + 1]) {
            const temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;

            currentElement.style.height = `${array[i]}px`;
            nextElement.style.height = `${array[i + 1]}px`;
          }
          await this.delay();
          currentElement.style.backgroundColor = this.unsortedColor;
          nextElement.style.backgroundColor = this.unsortedColor;
        }
        const lastElement = document.getElementById(`${array.length - 1 - j}th-element`);
        lastElement.style.backgroundColor = this.sortedColour;
      }
      this.isSorting = false;
    } catch (error) {
      this.isSorting = false;
    }
  }

  async selectionSort(array) {
    try {
      for (let j = 0; j < array.length; j++) {
        for (let i = j; i < array.length; i++) {
          const element1 = document.getElementById(`${i}th-element`);
          const element2 = document.getElementById(`${j}th-element`);
          element1.style.backgroundColor = this.sortingColour;
          element2.style.backgroundColor = this.sortingColour;
          if (array[j] > array[i]) {
            const temp = array[j];
            array[j] = array[i];
            array[i] = temp;

            element1.style.height = `${array[i]}px`;
            element2.style.height = `${array[j]}px`;
          }
          await this.delay();
          element1.style.backgroundColor = this.unsortedColor;
          element2.style.backgroundColor = this.unsortedColor;
        }
        const firstElement = document.getElementById(`${j}th-element`);
        firstElement.style.backgroundColor = this.sortedColour;
      }
      this.isSorting = false;
    } catch (error) {
      this.isSorting = false;
    }
  }

  delay() {
    return new Promise(resolve => {
      setTimeout(() => { resolve('') }, this.delayCount);
    })
  }

  startSorting(sortStyle: string) {
    this.isSorting = true;
    switch (sortStyle) {
      case 'Bubble Sort':
        this.bubbleSort(this.arrayOfNumbers);
        break;
      case 'Selection Sort':
        this.selectionSort(this.arrayOfNumbers);
        break;
      default:
        break;
    }
  }

  countChangesEvent(change: MatSliderChange) {
    this.removeArrayElements();
    this.createArrayElements(change.value);
  }

  reset() {
    this.isSorting = false;
    this.itemCount = this.minimumCount;
    this.delayCount = this.minimumDelay;
    this.getMaximumCountForArrayItems();
    this.removeArrayElements();
    this.createArrayElements(this.minimumCount);
  }

}
