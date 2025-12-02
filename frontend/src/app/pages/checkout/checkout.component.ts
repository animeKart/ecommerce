import { Component, inject, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [StripeCardComponent],
  templateUrl: './checkout.component.html',
  styles: ``
})
export class CheckoutComponent {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  stripeService = inject(StripeService);
  apiService = inject(ApiService);

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  pay() {
    const name = 'John Doe';
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          console.log(result.token.id);
          alert('Payment Successful Token: ' + result.token.id);
        } else if (result.error) {
          console.log(result.error.message);
          alert('Payment Failed: ' + result.error.message);
        }
      });
  }
}
