<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('service_providerss', 'role')) {
            Schema::table('service_providerss', function (Blueprint $table) {
                $table->string('role')->default('vendor')->after('email');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('service_providerss', 'role')) {
            Schema::table('service_providerss', function (Blueprint $table) {
                $table->dropColumn('role');
            });
        }
    }
};