<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_providerss', function (Blueprint $table) {
            // allow providers to offer multiple services
            $table->dropForeign(['service_id']);
            $table->unsignedBigInteger('service_id')->nullable()->change();
            $table->foreign('service_id')->references('id')->on('services')->nullOnDelete();

            // store detailed pricing info as JSON
            if (!Schema::hasColumn('service_providerss', 'service_pricing')) {
                $table->json('service_pricing')->nullable()->after('service_id');
            }

            // album information (names and photo URLs)
            if (!Schema::hasColumn('service_providerss', 'albums')) {
                $table->json('albums')->nullable()->after('portfolio_count');
            }
        });
    }

    public function down(): void
    {
        Schema::table('service_providerss', function (Blueprint $table) {
            $table->dropForeign(['service_id']);
            $table->unsignedBigInteger('service_id')->nullable(false)->change();
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');

            $table->dropColumn(['service_pricing', 'albums']);
        });
    }
};