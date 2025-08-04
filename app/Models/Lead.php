<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Lead
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $email
 * @property string|null $phone
 * @property string|null $company
 * @property string|null $notes
 * @property string $status
 * @property string $priority
 * @property string|null $value
 * @property \Illuminate\Support\Carbon|null $follow_up_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Task> $tasks
 * @property-read int|null $tasks_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Lead newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lead newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lead query()
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereFollowUpDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereValue($value)
 * @method static \Database\Factories\LeadFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Lead extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'company',
        'notes',
        'status',
        'priority',
        'value',
        'follow_up_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'value' => 'decimal:2',
        'follow_up_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the lead.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the tasks for the lead.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Scope a query to only include leads that need follow-up.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeNeedsFollowUp($query)
    {
        return $query->whereNotNull('follow_up_date')
                    ->where('follow_up_date', '<=', now())
                    ->whereNotIn('status', ['lost', 'converted']);
    }

    /**
     * Scope a query to only include active leads.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->whereNotIn('status', ['lost', 'converted']);
    }
}