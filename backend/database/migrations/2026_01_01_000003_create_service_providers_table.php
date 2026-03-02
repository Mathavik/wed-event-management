<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_providers', function (Blueprint $table) {
            $table->id();
            
            // Intha line thaan link pannuthu
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade');
            
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('experience')->nullable();
            $table->string('image')->nullable();
            $table->string('contact');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_providers');
    }
};