namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceProvider extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'name',
        'description',
        'experience',
        'image',
        'contact',
    ];

    // Relationship
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}