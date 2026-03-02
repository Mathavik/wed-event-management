<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
{
    Schema::create('service_providerss', function (Blueprint $table) {
        $table->id();
        $table->foreignId('service_id')->constrained()->onDelete('cascade');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password');
        $table->string('contact');
        $table->text('description')->nullable();
        $table->string('experience')->nullable();
        $table->string('image')->nullable();
        $table->timestamps();
    });
}

    public function down(): void
    {
        Schema::dropIfExists('service_providerss');
    }
};