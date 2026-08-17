import 'package:flutter/material.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../services/user_state_service.dart';
import '../services/wallet_service.dart';
import '../theme/app_theme.dart';
import '../widgets/category_badge_widget.dart';
import '../widgets/verification_stamp_widget.dart';
import '../widgets/wallet_connect_modal.dart';
import 'material_detail_screen.dart';

class MarketplaceScreen extends StatefulWidget {
  const MarketplaceScreen({Key? key}) : super(key: key);

  @override
  State<MarketplaceScreen> createState() => _MarketplaceScreenState();
}

class _MarketplaceScreenState extends State<MarketplaceScreen> {
  final ApiService _apiService = ApiService();
  final UserStateService _userState = UserStateService();
  final WalletService _walletService = WalletService();

  List<MaterialItem> _materials = [];
  bool _loading = true;
  String _searchQuery = '';
  String _selectedCategory = 'all';

  final List<Map<String, String>> _categories = [
    {'id': 'all', 'label': 'All Batches'},
    {'id': 'aluminum', 'label': 'Aluminum 6063'},
    {'id': 'copper', 'label': 'Berry Copper'},
    {'id': 'steel', 'label': 'HMS Steel'},
    {'id': 'plastic_pet', 'label': 'PET Flakes'},
    {'id': 'plastic_hdpe', 'label': 'HDPE Drums'},
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
    return AnimatedBuilder(
      animation: Listenable.merge([_userState, _walletService]),
      builder: (context, _) {
        final isDark = _userState.isDarkMode;
        final bg = AppTheme.getBackground(isDark);
        final surface = AppTheme.getSurface(isDark);
        final textMain = AppTheme.getTextMain(isDark);
        final textMuted = AppTheme.getTextMuted(isDark);
        final border = AppTheme.getBorder(isDark);
        final cardBg = AppTheme.getSurfaceRaised(isDark);

        final items = filteredMaterials;

        return Scaffold(
          backgroundColor: bg,
          appBar: AppBar(
            backgroundColor: bg,
            elevation: 0,
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'CIRCULAR MARKETPLACE',
                  style: AppTheme.fontSans(
                    fontSize: 14,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 0.6,
                    color: textMain,
                  ),
                ),
                Text(
                  'VERIFIED SECONDARY SCRAP LOTS · MCX TIED',
                  style: AppTheme.fontMono(
                    fontSize: 8.5,
                    color: AppTheme.emerald,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.account_balance_wallet, color: AppTheme.emerald, size: 20),
                onPressed: () => WalletConnectModal.show(context),
              ),
            ],
          ),
          body: Column(
            children: [
              // Search Field
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 4, 16, 8),
                child: TextField(
                  onChanged: (val) => setState(() => _searchQuery = val),
                  style: AppTheme.fontSans(color: textMain, fontSize: 12),
                  decoration: InputDecoration(
                    hintText: 'Search lots, materials, hubs (Noida, Pune, Sanand)...',
                    hintStyle: AppTheme.fontSans(color: textMuted, fontSize: 11),
                    prefixIcon: const Icon(Icons.search_rounded, color: AppTheme.emerald, size: 18),
                    filled: true,
                    fillColor: cardBg,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: border),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: border),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(color: AppTheme.emerald, width: 1.5),
                    ),
                  ),
                ),
              ),

              // Category Pills
              SizedBox(
                height: 38,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: _categories.length,
                  itemBuilder: (context, idx) {
                    final cat = _categories[idx];
                    final isSel = _selectedCategory == cat['id'];
                    return GestureDetector(
                      onTap: () => setState(() => _selectedCategory = cat['id']!),
                      child: Container(
                        margin: const EdgeInsets.only(right: 8),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: isSel ? AppTheme.emerald.withOpacity(0.2) : cardBg,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: isSel ? AppTheme.emerald : border,
                            width: isSel ? 1.5 : 1,
                          ),
                        ),
                        child: Center(
                          child: Text(
                            cat['label']!,
                            style: AppTheme.fontMono(
                              fontSize: 10,
                              fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                              color: isSel ? AppTheme.emerald : textMain,
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 10),

              // Results Count Bar
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${items.length} VERIFIED LOTS AVAILABLE',
                      style: AppTheme.fontMono(fontSize: 9.5, fontWeight: FontWeight.w800, color: textMuted),
                    ),
                    Row(
                      children: [
                        Container(width: 6, height: 6, decoration: const BoxDecoration(color: AppTheme.emerald, shape: BoxShape.circle)),
                        const SizedBox(width: 4),
                        Text('ESCROW PROTECTED', style: AppTheme.fontMono(fontSize: 9, color: AppTheme.emerald, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 4),

              // Lots List
              Expanded(
                child: _loading
                    ? Center(child: CircularProgressIndicator(color: isDark ? AppTheme.emerald : AppTheme.lightEmerald, strokeWidth: 2))
                    : items.isEmpty
                        ? Center(
                            child: Padding(
                              padding: const EdgeInsets.all(32),
                              child: Text(
                                'No matching scrap lots found for "$_searchQuery".',
                                style: AppTheme.fontSans(color: textMuted, fontSize: 12),
                                textAlign: TextAlign.center,
                              ),
                            ),
                          )
                        : ListView.builder(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                            itemCount: items.length,
                            itemBuilder: (context, idx) {
                              final mat = items[idx];
                              return _buildMarketCard(mat, isDark, cardBg, textMain, textMuted, border);
                            },
                          ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildMarketCard(MaterialItem mat, bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: border),
      ),
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => MaterialDetailScreen(material: mat)),
          );
        },
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CategoryBadgeWidget(category: mat.category),
                  VerificationStampWidget(status: mat.verificationStatus),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                mat.title,
                style: AppTheme.fontSans(fontSize: 13.5, fontWeight: FontWeight.w800, color: textMain),
              ),
              const SizedBox(height: 4),
              Text(
                mat.description,
                style: AppTheme.fontSans(fontSize: 11, color: textMuted),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('AVAILABLE MASS', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                      Text('${mat.weightKg.toStringAsFixed(0)} kg', style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w900, color: AppTheme.orange)),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('SCOPE 3 OFFSET', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                      Text('+${mat.co2SavedKg.toStringAsFixed(1)} kg', style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w900, color: AppTheme.emerald)),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text('LOCATION', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                      Text(mat.location, style: AppTheme.fontSans(fontSize: 11, fontWeight: FontWeight.bold, color: textMain)),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
