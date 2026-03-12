<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admin_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_payment_id'); // link to user payment
            $table->decimal('admin_commission', 10, 2);
            $table->decimal('vendor_amount', 10, 2);
            $table->string('payout_status')->default('pending'); // pending / paid
            $table->timestamps();

            $table->foreign('user_payment_id')->references('id')->on('user_payments')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_payments');
    }
};