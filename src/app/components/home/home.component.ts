import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentService } from '../service/payment.service';
import { Router } from '@angular/router';

declare var Razorpay: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isModelOpen: boolean = false;
  constructor(private service:PaymentService, private router: Router){}

  form: FormGroup = new FormGroup({
    fullname: new FormControl('Shubham Lohar'),
    contact: new FormControl('7769038180'),
    email: new FormControl('shubhamlohar952@gmail.com'),
    amount: new FormControl('1998'),
  })


  paymentForm(){
    this.service.placeOrder(this.form.value).subscribe(
      response=>{
        console.log(response);
        this.openTransactionModal(response);
        this.isModelOpen = true;
      },
      error => {
        console.log(error);
      }
    )
  }

  openTransactionModal(response: any){
    var option = {
      "orderId" : response.orderId,
      "key": response.key, // Enter the Key ID generated from the Dashboard
      "amount": response.amount,
      "currency": response.currency,
      "name" : "Code Crafter Services",
      "description": "Payment of online shops",
      "image": "https://cdn.pixabay.com/photo/2021/07/10/14/31/online-shopping-6401553_1280.png",
      "handler" : (response: any) => {
        this.processResponse(response);
      },
      "modal": {
        "ondismiss": (res: any) => {
          this.isPaymentClosed();
          this.handlePaymentFailure();
        }
      },
      "prefill" : {
        name: this.form.get("fullname")?.value,
        email: this.form.get("email")?.value,
        contact: this.form.get("contact")?.value
      },
      "notes" : {
        address: "Online Shoping"
      },
      "theme" : {
        color: "#F37254"
      }
    };

    var razorpayOprion = new Razorpay(option);
    razorpayOprion.open();
  }

  isPaymentClosed(){
    this.isModelOpen = false;
  }

  handlePaymentFailure(){
    this.isPaymentClosed();
    this.router.navigate(['/failed']); // Navigate to failure page on payment failure
  }

  processResponse(resp: any){
    console.log(resp);
    if(resp.razorpay_payment_id){
      this.isPaymentClosed();
      this.router.navigate(['/success']);
    }
    else{
      this.isPaymentClosed();
      this.router.navigate(['/failed']);
    }
  }
}
