<h2>New Wedding Enquiry</h2>

<p><strong>Name:</strong> {{ $enquiry->customer_name }}</p>
<p><strong>Email:</strong> {{ $enquiry->customer_email }}</p>
<p><strong>Phone:</strong> {{ $enquiry->customer_phone }}</p>
<p><strong>Wedding City:</strong> {{ $enquiry->wedding_city }}</p>
<p><strong>Wedding Date:</strong> {{ $enquiry->wedding_date }}</p>

<br>

<a href="{{ url('/api/admin/enquiries/accept/'.$enquiry->id) }}" 
style="background:green;color:white;padding:10px 20px;text-decoration:none;">
Accept
</a>

<a href="{{ url('/api/admin/enquiries/reject/'.$enquiry->id) }}" 
style="background:red;color:white;padding:10px 20px;text-decoration:none;">
Reject
</a>