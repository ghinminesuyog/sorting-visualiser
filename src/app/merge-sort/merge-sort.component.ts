import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-merge-sort',
  templateUrl: './merge-sort.component.html',
  styleUrls: ['./merge-sort.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MergeSortComponent implements OnInit {

  minimumCount = 0;
  maximumCount = 0;
  arrayOfNumbers: number[] = [];

  unsortedColor = 'red';
  sortingColour = 'blue';
  sortedColour = 'green';

  constructor() { }

  ngOnInit() {
    const arrayContainerWidth = document.getElementById('array-elements-container').clientWidth;
    const count = arrayContainerWidth / 10;
    this.minimumCount = 4;
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
    return Math.random() * (max - min) + min;
  }

  bubbleSort(array, startIndex, iterationCounter) {
    setTimeout(() => {
      if (startIndex < array.length - 1 && iterationCounter > 0) {
        const previousElement = document.getElementById(`${startIndex - 1}th-element`);
        const currentElement = document.getElementById(`${startIndex}th-element`);
        const nextElement = document.getElementById(`${startIndex + 1}th-element`);

        if (previousElement) {
          previousElement.style.backgroundColor = this.unsortedColor;
        }
        if (startIndex === 0) {
          const lastElement = document.getElementById(`${array.length - 1}th-element`);
          lastElement.style.backgroundColor = this.unsortedColor;

          const secondLastElement = document.getElementById(`${array.length - 2}th-element`);
          secondLastElement.style.backgroundColor = this.unsortedColor;
        }

        currentElement.style.backgroundColor = this.sortingColour;
        nextElement.style.backgroundColor = this.sortingColour;

        if (array[startIndex] > array[startIndex + 1]) {
          const temp = array[startIndex];
          array[startIndex] = array[startIndex + 1];
          array[startIndex + 1] = temp;
        }
        currentElement.style.height = `${array[startIndex]}px`;
        nextElement.style.height = `${array[startIndex + 1]}px`;

        startIndex += 1;
        if (startIndex == array.length - 1) {
          const lastElement = document.getElementById(`${array.length - 1}th-element`);
          lastElement.style.backgroundColor = this.sortedColour;
        }
        this.bubbleSort(array, startIndex, iterationCounter);
      } else if (startIndex === array.length - 1) {
        iterationCounter -= 1;
        startIndex = 0;
        array.splice(array.length - 1, 1)
        this.bubbleSort(array, startIndex, iterationCounter)
      } else if (iterationCounter === 0) {
        const firstElement = document.getElementById(`0th-element`);
        firstElement.style.backgroundColor = this.sortedColour;
      }
    }, 1000);

  }

  startSorting() {
    this.bubbleSort(this.arrayOfNumbers, 0, this.arrayOfNumbers.length);
  }

  countChangesEvent(change: MatSliderChange) {
    this.removeArrayElements();
    this.createArrayElements(change.value);
  }

}
