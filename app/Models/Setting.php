<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['key', 'value'])]
class Setting extends Model
{
    /** All settings as a simple { key: value } map. */
    public static function allAsMap(): array
    {
        return static::query()->pluck('value', 'key')->toArray();
    }

    /** Create or update a single setting. */
    public static function put(string $key, $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
