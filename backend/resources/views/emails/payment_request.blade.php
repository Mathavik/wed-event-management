<!-- <h2>Wedding Enquiry Accepted</h2>

<p>Hello {{ $enquiry->customer_name }},</p>

<p>Your enquiry has been accepted by the vendor.</p>

<p><strong>Wedding City:</strong> {{ $enquiry->wedding_city }}</p>
<p><strong>Wedding Date:</strong> {{ $enquiry->wedding_date }}</p>

<p>Please proceed with payment to confirm your booking.</p>

<p>Thank you</p> -->
<h2>Wedding Enquiry Accepted</h2>

<p>Hello {{ $enquiry->customer_name }},</p>

<p>Your enquiry has been accepted by the vendor.</p>

<p><strong>Wedding City:</strong> {{ $enquiry->wedding_city }}</p>
<p><strong>Wedding Date:</strong> {{ \Carbon\Carbon::parse($enquiry->wedding_date)->format('d M Y') }}</p>

<p>Please proceed with payment to confirm your booking.</p>

<!-- Pay Now button -->

<a href="http://localhost:3000/payment/{{ $enquiry->id }}" 
   style="display:inline-block; padding:10px 20px; background-color:blue; color:white; text-decoration:none; border-radius:5px; margin-top:10px;">
   Pay Now
</a>

<p>Thank you</p>