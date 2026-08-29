<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    protected $table = 'company_profiles';

    protected $fillable = [
        'company_name',
        'company_slogan',
        'about_company',
        'logo',
        'support_number',
        'phone',
        'email',
        'whatsapp',
        'address',
        'working_hours',
        'map_embed',
        'facebook',
        'instagram',
        'linkedin',
        'youtube',
        'footer_about',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /** The single currently-active profile, or null if none is active yet. */
    public static function active(): ?self
    {
        return static::where('is_active', true)->first();
    }

    /** Make this the only active profile; deactivates every other row. */
    public function activate(): void
    {
        static::where('id', '!=', $this->id)->update(['is_active' => false]);

        if (! $this->is_active) {
            $this->is_active = true;
            $this->save();
        }
    }
}
