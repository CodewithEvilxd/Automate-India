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
    {'id': 'all', 'label': 'All Batches'},
    {'id': 'aluminum', 'label': 'Aluminum 6063'},
    {'id': 'steel', 'label': 'HMS Steel'},
    {'id': 'plastic_pet', 'label': 'PET Plastic (Cat I)'},
    {'id': 'plastic_hdpe', 'label': 'HDPE Drums (Cat II)'},
    {'id': 'paper', 'label': 'OCC Paper'},
    {'id': 'electronic', 'label': 'E-Waste PCB'},
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
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.background,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'CIRCULAR MARKETPLACE',
              style: AppTheme.fontSans(
                fontSize: 14.5,
                fontWeight: FontWeight.w800,
                letterSpacing: 0.6,
                color: AppTheme.textMain,
              ),
            ),
            Text(
              'VERIFIED SECONDARY SCRAP LOTS',
              style: AppTheme.fontMono(
                fontSize: 8.5,
                color: AppTheme.emerald,
                fontWeight: FontWeight.w700,
                letterSpacing: 0.5,
              ),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Search Field
          Padding(
            padding: const EdgeInsets.fromLTRB(14, 4, 14, 8),
            child: TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              style: AppTheme.fontSans(color: AppTheme.textMain, fontSize: 12),
              decoration: InputDecoration(
                hintText: 'Search lots, hubs (Noida, Pune, Sanand)...',
                hintStyle: AppTheme.fontSans(color: AppTheme.textMuted.withOpacity(0.7), fontSize: 11),
                prefixIcon: const Icon(Icons.search_rounded, color: AppTheme.textMuted, size: 18),
                filled: true,
                fillColor: AppTheme.surface,
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppTheme.border),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppTheme.border),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppTheme.emerald),
                ),
              ),
            ),
          ),

          // Horizontal Category Filter Chips
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
                  child: InkWell(
                    borderRadius: BorderRadius.circular(8),
                    onTap: () => setState(() => _selectedCategory = cat['id']!),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 7),
                      decoration: BoxDecoration(
                        color: isSelected ? AppTheme.emerald : AppTheme.surface,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: isSelected ? AppTheme.emerald : AppTheme.border,
                        ),
                      ),
                      child: Center(
                        child: Text(
                          cat['label']!,
                          style: AppTheme.fontMono(
                            fontSize: 10,
                            fontWeight: isSelected ? FontWeight.w800 : FontWeight.w500,
                            color: isSelected ? AppTheme.background : AppTheme.textMain,
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 8),

          // Materials List
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator(color: AppTheme.emerald, strokeWidth: 2))
                : RefreshIndicator(
                    onRefresh: _loadMaterials,
                    color: AppTheme.emerald,
                    backgroundColor: AppTheme.surface,
                    child: ListView.builder(
                      itemCount: filteredMaterials.length,
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
                      itemBuilder: (context, index) {
                        final item = filteredMaterials[index];
                        final isTransferred = item.status == 'transferred';

                        return Container(
                          margin: const EdgeInsets.only(bottom: 10),
                          decoration: BoxDecoration(
                            color: AppTheme.surface,
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: AppTheme.border),
                          ),
                          child: Material(
                            color: Colors.transparent,
                            child: InkWell(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) => MaterialDetailScreen(material: item),
                                  ),
                                );
                              },
                              borderRadius: BorderRadius.circular(14),
                              child: Padding(
                                padding: const EdgeInsets.all(12.0),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    // Image with Status Stamp
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(10),
                                      child: SizedBox(
                                        width: 85,
                                        height: 85,
                                        child: Stack(
                                          fit: StackFit.expand,
                                          children: [
                                            Image.network(
                                              item.imageUrl,
                                              width: 85,
                                              height: 85,
                                              fit: BoxFit.cover,
                                              errorBuilder: (_, __, ___) => Container(
                                                width: 85,
                                                height: 85,
                                                color: AppTheme.surfaceRaised,
                                                child: const Icon(Icons.inventory_2_outlined, color: AppTheme.textMuted),
                                              ),
                                            ),
                                            if (isTransferred)
                                              const Center(
                                                child: VerificationStampWidget(size: 60),
                                              ),
                                          ],
                                        ),
                                      ),
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
                                              Flexible(
                                                child: Text(
                                                  "₹${(item.estimatedLotValueInr ?? 0).toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}",
                                                  style: AppTheme.fontMono(
                                                    fontSize: 13,
                                                    fontWeight: FontWeight.w800,
                                                    color: AppTheme.textMain,
                                                  ),
                                                  overflow: TextOverflow.ellipsis,
                                                ),
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 5),
                                          Text(
                                            item.title,
                                            style: AppTheme.fontSans(
                                              color: AppTheme.textMain,
                                              fontWeight: FontWeight.w700,
                                              fontSize: 12.5,
                                              height: 1.2,
                                            ),
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                          const SizedBox(height: 4),
                                          Row(
                                            children: [
                                              const Icon(Icons.location_on_outlined, size: 11, color: AppTheme.textMuted),
                                              const SizedBox(width: 2),
                                              Expanded(
                                                child: Text(
                                                  "${item.location} • ${item.estimatedWeightKg.toInt()} kg",
                                                  style: AppTheme.fontSans(
                                                    color: AppTheme.textMuted,
                                                    fontSize: 10.5,
                                                    fontWeight: FontWeight.w500,
                                                  ),
                                                  overflow: TextOverflow.ellipsis,
                                                ),
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 6),
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              Text(
                                                "+${item.co2SavedKg.toStringAsFixed(1)} kg CO₂e",
                                                style: AppTheme.fontMono(
                                                  color: AppTheme.emerald,
                                                  fontWeight: FontWeight.w700,
                                                  fontSize: 10.5,
                                                ),
                                              ),
                                              Container(
                                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                                decoration: BoxDecoration(
                                                  color: AppTheme.surfaceRaised,
                                                  borderRadius: BorderRadius.circular(6),
                                                  border: Border.all(color: AppTheme.border),
                                                ),
                                                child: Text(
                                                  "${item.purityPercentage.toStringAsFixed(1)}% Purity",
                                                  style: AppTheme.fontMono(
                                                    fontSize: 8.5,
                                                    fontWeight: FontWeight.w600,
                                                    color: AppTheme.textMain,
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
