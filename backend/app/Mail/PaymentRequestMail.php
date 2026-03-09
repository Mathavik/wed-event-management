<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class PaymentRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $enquiry;

    public function __construct($enquiry)
    {
        $this->enquiry = $enquiry;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Wedding Booking Payment Request',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.payment_request'
        );
    }

    public function attachments(): array
    {
        return [];
    }
}