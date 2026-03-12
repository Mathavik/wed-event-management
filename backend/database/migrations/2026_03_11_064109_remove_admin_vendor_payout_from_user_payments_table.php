<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_payments', function (Blueprint $table) {
            $table->dropColumn(['admin_commission', 'vendor_amount', 'payout_status']);
        });
    }

    public function down(): void
    {
        Schema::table('user_payments', function (Blueprint $table) {
            $table->decimal('admin_commission', 10, 2)->nullable();
            $table->decimal('vendor_amount', 10, 2)->nullable();
            $table->string('payout_status')->nullable();
        });
    }
};