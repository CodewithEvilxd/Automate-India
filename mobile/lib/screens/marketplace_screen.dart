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

  final List<Map<String, String>> _categories = [
    {'id': 'all', 'label': 'All Lots'},
    {'id': 'aluminum', 'label': 'Aluminum'},
    {'id': 'steel', 'label': 'Steel'},
    {'id': 'plastic_pet', 'label': 'PET Plastic'},
    {'id': 'plastic_hdpe', 'label': 'HDPE Plastic'},
    {'id': 'paper', 'label': 'Paper / OCC'},
    {'id': 'electronic', 'label': 'E-Waste'},
  ];

  @override
  void initState() {
    super.initState();
    _loadMaterials();
  }

  Future<void> _loadMaterials() async {
    setState(() => _loading = true);
    final items = await _apiService.getMaterials();
    if (mounted) {
      setState(() {
        _materials = items;
        _loading = false;
      });
    }
  }

  List<MaterialItem> get filteredMaterials {
    return _materials.where((item) {
      final matchesSearch = item.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          item.location.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          item.category.toLowerCase().contains(_searchQuery.toLowerCase());
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
            Text(
              'CIRCULARCHAIN',
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: AppTheme.bone,
              ),
            ),
            Text(
              'VERIFIABLE INDUSTRIAL LEDGER',
              style: TextStyle(
                fontSize: 9,
                color: AppTheme.moss,
                fontFamily: 'monospace',
              ),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.fromLTRB(14, 8, 14, 6),
            child: TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              style: const TextStyle(color: AppTheme.bone, fontSize: 12),
              decoration: InputDecoration(
                hintText: 'Search lots, hubs (Noida, Pune, Bengaluru)...',
                hintStyle: TextStyle(color: AppTheme.muted.withOpacity(0.6), fontSize: 11),
                prefixIcon: const Icon(Icons.search, color: AppTheme.muted, size: 16),
                filled: true,
                fillColor: AppTheme.surface,
                contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(4),
                  borderSide: const BorderSide(color: AppTheme.border),
                ),
                enabledBorder: OutlineInputBorder(
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

          // Category Chips Horizontal Scroll
          SizedBox(
            height: 36,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 14),
              itemCount: _categories.length,
              itemBuilder: (context, index) {
                final cat = _categories[index];
                final bool isSelected = _selectedCategory == cat['id'];

                return Padding(
                  padding: const EdgeInsets.only(right: 6),
                  child: ChoiceChip(
                    label: Text(
                      cat['label']!,
                      style: TextStyle(
                        fontFamily: 'monospace',
                        fontSize: 10,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                        color: isSelected ? AppTheme.ink : AppTheme.bone,
                      ),
                    ),
                    selected: isSelected,
                    selectedColor: AppTheme.moss,
                    backgroundColor: AppTheme.surface,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4),
                      side: BorderSide(
                        color: isSelected ? AppTheme.moss : AppTheme.border,
                      ),
                    ),
                    onSelected: (_) => setState(() => _selectedCategory = cat['id']!),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 6),

          // Materials List
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator(color: AppTheme.moss, strokeWidth: 2))
                : RefreshIndicator(
                    onRefresh: _loadMaterials,
                    color: AppTheme.moss,
                    backgroundColor: AppTheme.surface,
                    child: ListView.builder(
                      itemCount: filteredMaterials.length,
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      itemBuilder: (context, index) {
                        final item = filteredMaterials[index];
                        final isTransferred = item.status == 'transferred';

                        return Card(
                          margin: const EdgeInsets.only(bottom: 12),
                          color: AppTheme.surface,
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
                            borderRadius: BorderRadius.circular(6),
                            child: Padding(
                              padding: const EdgeInsets.all(12.0),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  // Image with Status Stamp
                                  Stack(
                                    children: [
                                      ClipRRect(
                                        borderRadius: BorderRadius.circular(4),
                                        child: Image.network(
                                          item.imageUrl,
                                          width: 95,
                                          height: 95,
                                          fit: BoxFit.cover,
                                          errorBuilder: (_, __, ___) => Container(
                                            width: 95,
                                            height: 95,
                                            color: AppTheme.surfaceRaised,
                                            child: const Icon(Icons.inventory_2_outlined, color: AppTheme.muted),
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

                                  // Details Column
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                          children: [
                                            CategoryBadgeWidget(category: item.category),
                                            Text(
                                              "₹${(item.estimatedLotValueInr ?? 0).toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}",
                                              style: const TextStyle(
                                                fontFamily: 'monospace',
                                                fontSize: 12,
                                                fontWeight: FontWeight.bold,
                                                color: AppTheme.bone,
                                              ),
                                            ),
                                          ],
                                        ),
                                        const SizedBox(height: 5),
                                        Text(
                                          item.title,
                                          style: const TextStyle(
                                            color: AppTheme.bone,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 12,
                                            height: 1.2,
                                          ),
                                          maxLines: 2,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                        const SizedBox(height: 5),
                                        Row(
                                          children: [
                                            const Icon(Icons.location_on_outlined, size: 11, color: AppTheme.muted),
                                            const SizedBox(width: 2),
                                            Text(
                                              "${item.location} • ${item.estimatedWeightKg.toInt()} kg",
                                              style: const TextStyle(color: AppTheme.muted, fontSize: 10),
                                            ),
                                          ],
                                        ),
                                        const SizedBox(height: 5),
                                        Row(
                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                          children: [
                                            Text(
                                              "+${item.co2SavedKg.toStringAsFixed(1)} kg CO₂e",
                                              style: const TextStyle(
                                                color: AppTheme.moss,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 11,
                                                fontFamily: 'monospace',
                                              ),
                                            ),
                                            Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                                              decoration: BoxDecoration(
                                                color: AppTheme.ink,
                                                borderRadius: BorderRadius.circular(2),
                                                border: Border.all(color: AppTheme.border),
                                              ),
                                              child: Text(
                                                "${item.purityPercentage.toStringAsFixed(1)}% Pure",
                                                style: const TextStyle(
                                                  fontFamily: 'monospace',
                                                  fontSize: 8,
                                                  color: AppTheme.bone,
                                                ),
                                              ),
                                            ),
                                          ],
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
