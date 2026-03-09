<h2>Your Booking Accepted</h2>

<p>Hello {{ $enquiry->customer_name }}</p>

<p>
Vendor accepted your wedding enquiry.
Please complete the payment to confirm booking.
</p>

<a href="https://yourwebsite.com/payment/{{ $enquiry->id }}"
style="background:blue;color:white;padding:10px 20px;text-decoration:none;">
Pay Now
</a>