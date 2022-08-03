import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-merge-sort',
  templateUrl: './merge-sort.component.html',
  styleUrls: ['./merge-sort.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MergeSortComponent implements OnInit {

  arrayOfNumbers: number[] = []
  constructor() { }

  ngOnInit() {
    this.createArrayElements()
  }

  createArrayElements() {
    this.arrayOfNumbers = [100, 40,50, 100, 30];
    const arrayContainer = document.getElementById('array-elements-container');
    for (let i = 0; i < this.arrayOfNumbers.length; i++) {
      const node = document.createElement('div');
      node.id = `${i}th-element`
      node.classList.add('array-element');
      node.style.height = this.arrayOfNumbers[i] + 'px';
      arrayContainer.appendChild(node);
    }
  }

  bubbleSort(array, startIndex, iterationCounter) {
    setTimeout(() => {
      if (startIndex < array.length - 1 && iterationCounter > 0) {
        console.log(array, array[startIndex], array[startIndex + 1]);
        const previousElement = document.getElementById(`${startIndex - 1}th-element`);
        const currentElement = document.getElementById(`${startIndex}th-element`);
        const nextElement = document.getElementById(`${startIndex + 1}th-element`);

        if (previousElement) {
          previousElement.style.backgroundColor = 'red';
        }
        if (startIndex === 0) {
          const lastElement = document.getElementById(`${array.length - 1}th-element`);
          lastElement.style.backgroundColor = 'red';

          const secondLastElement = document.getElementById(`${array.length - 2}th-element`);
          secondLastElement.style.backgroundColor = 'red';
        }

        currentElement.style.backgroundColor = 'yellow';
        nextElement.style.backgroundColor = 'yellow';

        if (array[startIndex] > array[startIndex + 1]) {
          const temp = array[startIndex];
          array[startIndex] = array[startIndex + 1];
          array[startIndex + 1] = temp;
        }
        currentElement.style.height = `${array[startIndex]}px`;
        nextElement.style.height = `${array[startIndex+1]}px`;

        startIndex += 1;
        this.bubbleSort(array, startIndex, iterationCounter)
      } else if (startIndex === array.length - 1) {
        iterationCounter -= 1;
        startIndex = 0;
        this.bubbleSort(array, startIndex, iterationCounter)
      }

    }, 1000);

  }

  startSorting() {
    this.bubbleSort(this.arrayOfNumbers, 0, this.arrayOfNumbers.length);
  }

}
