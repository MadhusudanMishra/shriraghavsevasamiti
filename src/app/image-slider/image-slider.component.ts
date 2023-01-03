import { Component, OnInit } from '@angular/core';
import {Subscription, timer} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  private imageSliderOptions:any;
  public currentSelectedIndex:number = 0;
  private timerSubscription: Subscription = new Subscription(); 
  public selectedImageInfo:any= {
    image: '',
    heading: '',
    content: '',
    linkId: ''
  }

  constructor() { }

  ngOnInit(): void {
    this.imageSliderOptions = this._sliderOPtions();
    this.selectedImageInfo = this.imageSliderOptions[this.currentSelectedIndex];
    this.initSlider();
  }

  public goToSliderIndex (index:number) {
    index = (index + this.imageSliderOptions.length)%this.imageSliderOptions.length;
    this.selectedImageInfo = this.imageSliderOptions[index];
    this.currentSelectedIndex = index;
  }

  private initSlider () {
    this.timerSubscription = timer(0, 5000).pipe( 
      map(() => { 
        this.goToSliderIndex(++this.currentSelectedIndex);
      }) 
    ).subscribe();
  }

  private _sliderOPtions () {
    return [{
      image: 'assets/s1.jpeg',
      heading: 'Donate and give clean water',
      content: 'Just $20 can provide a person with clean drinking water. 100% funds water projects for people in need.',
      linkId: ''
    }, {
      image: 'assets/s2.jpeg',
      heading: 'Buy the WordPress Version',
      content: 'Charitas is a simple and clean but still professional WordPress template that is best suited for Charity, NGO, Foundations, etc.',
      linkId: ''
    }, {
      image: 'assets/s3.jpeg',
      heading: 'Give water give life',
      content: '$3 a month could help stop children dying from drinking dirty water.',
      linkId: ''
    }, {
      image: 'assets/s4.jpeg',
      heading: 'Let\'s build something incredible',
      content: 'Help build a future for 12,000 schoolchildren. Become part of the Madagascar Schools Appeal.',
      linkId: ''
    }]
  }
  ngOnDestroy () {
    this.timerSubscription.unsubscribe(); 
  }

}
