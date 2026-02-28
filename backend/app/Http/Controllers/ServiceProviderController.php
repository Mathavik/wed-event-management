namespace App\Http\Controllers;

use App\Models\ServiceProvider;
use Illuminate\Http\Request;

class ServiceProviderController extends Controller
{
    // Get providers by service
    public function index($service_id)
    {
        $providers = ServiceProvider::where('service_id', $service_id)->get();
        return response()->json($providers);
    }

    // Store new provider (registration)
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
        ]);

        $provider = ServiceProvider::create($request->all());

        return response()->json([
            'message' => 'Provider registered successfully',
            'data' => $provider
        ], 201);
    }

    // Show single provider
    public function show($id)
    {
        $provider = ServiceProvider::findOrFail($id);
        return response()->json($provider);
    }

    // Delete
    public function destroy($id)
    {
        ServiceProvider::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}