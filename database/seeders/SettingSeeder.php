<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'site_name'     => 'SN Engineering Works',
            'logo'          => '/Contents/images/logo.png',
            'phone'         => '+880 1911-234567',
            'email'         => 'info@snengineeringworks.com',
            'whatsapp'      => '8801911234567',
            'address'       => 'J-86, Kabir Shopping Tower, Joydebpur, Gazipur',
            'working_hours' => 'Sat–Thu, 9am–7pm',
            'map_embed'     => '',
            'facebook'      => '',
            'instagram'     => '',
            'linkedin'      => '',
            'youtube'       => '',
            'footer_about'  => 'A trusted name in mechanical fabrication, industrial piping and maintenance services.',
        ];

        foreach ($defaults as $key => $value) {
            Setting::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
