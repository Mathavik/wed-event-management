<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_payments', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('enquiry_id');
            $table->string('customer_name');
            $table->string('customer_email');

            $table->decimal('amount', 10, 2);

            $table->string('bank');
            $table->string('card_last4');

            $table->timestamps();

            // optional foreign key
            $table->foreign('enquiry_id')
                  ->references('id')
                  ->on('enquiries')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_payments');
    }
};