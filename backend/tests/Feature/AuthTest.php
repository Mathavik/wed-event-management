<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\ServiceProviders;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_registration_and_login()
    {
        $data = [
            'name' => 'Alice',
            'email' => 'alice@example.com',
            'password' => 'password123',
            'role' => 'bride',
        ];

        // register
        $this->postJson('/api/register', $data)
             ->assertStatus(200)
             ->assertJsonFragment(['message' => 'User registered successfully']);

        $this->assertDatabaseHas('users', ['email' => 'alice@example.com', 'role' => 'bride']);

        // login
        $this->postJson('/api/login', ['email' => 'alice@example.com', 'password' => 'password123'])
             ->assertStatus(200)
             ->assertJsonStructure(['message', 'user' => ['email','role']]);
    }

    public function test_vendor_registration_and_login()
    {
        $providerData = [
            // primary service is optional now; supply as part of service_pricing instead
            'name' => 'Vendor One',
            'email' => 'vendor1@example.com',
            'password' => 'vendorpass',
            'contact' => '1234567890',
            'role' => 'vendor',
            'city' => 'Chennai',
            'area' => 'Downtown',
            'service_pricing' => [
                ['service_id' => 1, 'price' => 1500],
            ],
            'albums' => [
                ['name' => 'mathavi', 'photos' => ['https://example.com/1.jpg']],
            ],
        ];

        // ensure there is a service record (id 1)
        \App\Models\Service::create(['id'=>1, 'title' => 'Test Service', 'image' => '']);

        $this->postJson('/api/providers', $providerData)
             ->assertStatus(201)
             ->assertJsonFragment(['message' => 'Provider registered successfully']);

        $this->assertDatabaseHas('service_providerss', ['email' => 'vendor1@example.com', 'role' => 'vendor']);

        // login
        $this->postJson('/api/login', ['email' => 'vendor1@example.com', 'password' => 'vendorpass'])
             ->assertStatus(200)
             ->assertJsonPath('user.role', 'vendor');
    }

    public function test_admin_login_creates_user_if_missing()
    {
        config(['app.admin_email' => 'admin@test']);
        config(['app.admin_password' => 'secret']);

        $this->postJson('/api/login', ['email' => 'admin@test', 'password' => 'secret'])
             ->assertStatus(200)
             ->assertJsonPath('user.role', 'admin');

        $this->assertDatabaseHas('users', ['email' => 'admin@test', 'role' => 'admin']);
    }
}
