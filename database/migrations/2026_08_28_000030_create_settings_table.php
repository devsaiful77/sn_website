<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->id();

            // Identity
            $table->string('company_name');           // replaces old site_name
            $table->string('company_slogan')->nullable();
            $table->text('about_company')->nullable();
            $table->string('logo')->nullable();

            // Contact
            $table->string('support_number')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('whatsapp')->nullable();
            $table->text('address')->nullable();
            $table->string('working_hours')->nullable();
            $table->text('map_embed')->nullable();

            // Social
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('youtube')->nullable();

            // Footer
            $table->text('footer_about')->nullable();

            // Only one profile should be active at a time
            $table->boolean('is_active')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_profiles');
    }
};
