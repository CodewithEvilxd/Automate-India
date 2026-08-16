import 'package:flutter/material.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/category_badge_widget.dart';
import '../widgets/verification_stamp_widget.dart';
import 'material_detail_screen.dart';

class MarketplaceScreen extends StatefulWidget {
  const MarketplaceScreen({Key? key}) : super(key: key);

  @override
  State<MarketplaceScreen> createState() => _MarketplaceScreenState();
}

class _MarketplaceScreenState extends State<MarketplaceScreen> {
  final ApiService _apiService = ApiService();
  List<MaterialItem> _materials = [];
  bool _loading = true;
  String _searchQuery = '';
  String _selectedCategory = 'all';

  @override
  void initState() {
    super.initState();
    _loadMaterials();
  }

  Future<void> _loadMaterials() async {
    setState(() => _loading = true);
    final items = await _apiService.getMaterials();
    setState(() {
      _materials = items;
      _loading = false;
    });
  }

  List<MaterialItem> get filteredMaterials {
    return _materials.where((item) {
      final matchesSearch = item.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          item.location.toLowerCase().contains(_searchQuery.toLowerCase());
      final matchesCategory = _selectedCategory == 'all' ||
          item.category.toLowerCase().contains(_selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text('CircularChain', style: TextStyle(fontWeight: FontWeight.bold)),
            Text(
              'Industrial Materials Ledger',
              style: TextStyle(fontSize: 10, color: AppTheme.muted, fontFamily: 'monospace'),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Search & Filter Header
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              style: const TextStyle(color: AppTheme.bone, fontSize: 13),
              decoration: InputDecoration(
                hintText: 'Search materials, hubs (e.g. Pune, Noida)...',
                hintStyle: TextStyle(color: AppTheme.muted.withOpacity(0.6), fontSize: 12),
                prefixIcon: const Icon(Icons.search, color: AppTheme.muted, size: 18),
                filled: true,
                fillColor: AppTheme.surface,
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(4),
                  borderSide: const BorderSide(color: AppTheme.border),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(4),
                  borderSide: const BorderSide(color: AppTheme.moss),
                ),
              ),
            ),
          ),

          // Materials List
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator(color: AppTheme.moss))
                : RefreshIndicator(
                    onRefresh: _loadMaterials,
                    color: AppTheme.moss,
                    child: ListView.builder(
                      itemCount: filteredMaterials.length,
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      itemBuilder: (context, index) {
                        final item = filteredMaterials[index];
                        final isTransferred = item.status == 'transferred';

                        return Card(
                          margin: const EdgeInsets.only(bottom: 12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(6),
                            side: const BorderSide(color: AppTheme.border),
                          ),
                          child: InkWell(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) => MaterialDetailScreen(material: item),
                                ),
                              );
                            },
                            child: Padding(
                              padding: const EdgeInsets.all(12.0),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  // Thumbnail
                                  Stack(
                                    children: [
                                      ClipRRect(
                                        borderRadius: BorderRadius.circular(4),
                                        child: Image.network(
                                          item.imageUrl,
                                          width: 90,
                                          height: 90,
                                          fit: BoxFit.cover,
                                          errorBuilder: (_, __, ___) => Container(
                                            width: 90,
                                            height: 90,
                                            color: AppTheme.surfaceRaised,
                                            child: const Icon(Icons.inventory_2, color: AppTheme.muted),
                                          ),
                                        ),
                                      ),
                                      if (isTransferred)
                                        const Positioned.fill(
                                          child: Center(
                                            child: VerificationStampWidget(size: 70),
                                          ),
                                        ),
                                    ],
                                  ),
                                  const SizedBox(width: 12),

                                  // Details
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        CategoryBadgeWidget(category: item.category),
                                        const SizedBox(height: 4),
                                        Text(
                                          item.title,
                                          style: const TextStyle(
                                            color: AppTheme.bone,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 13,
                                          ),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          'Hub: ${item.location} • Mass: ${item.estimatedWeightKg} kg',
                                          style: const TextStyle(color: AppTheme.muted, fontSize: 11),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          '+${item.co2SavedKg.toStringAsFixed(1)} kg CO₂e abated',
                                          style: const TextStyle(
                                            color: AppTheme.moss,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 12,
                                            fontFamily: 'monospace',
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
