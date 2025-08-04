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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['new', 'contacted', 'qualified', 'lost', 'converted'])->default('new');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->decimal('value', 10, 2)->nullable()->comment('Potential deal value');
            $table->date('follow_up_date')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['user_id', 'status']);
            $table->index(['user_id', 'priority']);
            $table->index(['user_id', 'follow_up_date']);
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};