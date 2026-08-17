import 'package:flutter/material.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/category_badge_widget.dart';
import '../widgets/verification_stamp_widget.dart';
import 'material_detail_screen.dart';
import 'verify_audit_screen.dart';

class HomeScreen extends StatefulWidget {
  final Function(int)? onNavigate;

  const HomeScreen({Key? key, this.onNavigate}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService _apiService = ApiService();
  List<MaterialItem> _featuredMaterials = [];
  List<Map<String, dynamic>> _mcxList = [];
  bool _loading = true;
  String _activeHub = 'UPPCB (Noida Hub)';

  final List<String> _hubs = [
    'UPPCB (Noida Hub)',
    'MPCB (Pune Cluster)',
    'GPCB (Sanand Zone)',
    'KSPCB (Bengaluru Hub)',
    'TNPCB (Chennai Cluster)',
  ];

  @override
  void initState() {
    super.initState();
    _loadDashboardData();
  }

  Future<void> _loadDashboardData() async {
    setState(() => _loading = true);
    try {
      final materials = await _apiService.getMaterials();
      final mcx = await _apiService.getMcxOracle();
      if (mounted) {
        setState(() {
          _featuredMaterials = materials.take(4).toList();
          _mcxList = mcx;
          _loading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.background,
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(7),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppTheme.emerald.withOpacity(0.25),
                    AppTheme.teal.withOpacity(0.15),
                  ],
                ),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: AppTheme.emerald.withOpacity(0.4)),
              ),
              child: const Icon(Icons.all_inclusive, color: AppTheme.emerald, size: 20),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'CIRCULARCHAIN',
                  style: AppTheme.fontSans(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 0.6,
                    color: AppTheme.textMain,
                  ),
                ),
                Row(
                  children: [
                    Container(
                      width: 5,
                      height: 5,
                      decoration: const BoxDecoration(
                        color: AppTheme.emerald,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      'POLYGON AMOY #80002 · LIVE LEDGER',
                      style: AppTheme.fontMono(
                        fontSize: 8,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.emerald,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.qr_code_scanner_rounded, color: AppTheme.emerald),
            tooltip: 'Verify On-Chain Hash',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const VerifyAuditScreen()),
              );
            },
          ),
          const SizedBox(width: 4),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.emerald, strokeWidth: 2))
          : RefreshIndicator(
              onRefresh: _loadDashboardData,
              color: AppTheme.emerald,
              backgroundColor: AppTheme.surface,
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                physics: const AlwaysScrollableScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // SPCB Active Compliance Hub Selector
                    _buildHubSelector(),

                    const SizedBox(height: 14),

                    // Executive Impact Metrics Grid (4 Stat Cards)
                    _buildImpactMetrics(),

                    const SizedBox(height: 18),

                    // Quick Action Matrix
                    Text(
                      'QUICK COMMAND MATRIX',
                      style: AppTheme.fontMono(
                        fontSize: 10.5,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.textMuted,
                        letterSpacing: 0.8,
                      ),
                    ),
                    const SizedBox(height: 10),
                    _buildQuickActionMatrix(),

                    const SizedBox(height: 18),

                    // Live MCX Commodity Scrap Ticker
                    _buildMcxTicker(),

                    const SizedBox(height: 18),

                    // Featured Verified Lots Header
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'LIVE SCRAP LOTS & AUDIT PROOFS',
                          style: AppTheme.fontMono(
                            fontSize: 10.5,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.textMuted,
                            letterSpacing: 0.8,
                          ),
                        ),
                        InkWell(
                          onTap: () => widget.onNavigate?.call(1),
                          borderRadius: BorderRadius.circular(6),
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                            child: Row(
                              children: [
                                Text(
                                  'View All',
                                  style: AppTheme.fontSans(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.emerald,
                                  ),
                                ),
                                const SizedBox(width: 2),
                                const Icon(Icons.arrow_forward_rounded, size: 13, color: AppTheme.emerald),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),

                    // Scrap Cards List
                    ..._featuredMaterials.map((item) => _buildScrapCard(item)).toList(),

                    const SizedBox(height: 14),

                    // View Full Marketplace Button
                    SizedBox(
                      width: double.infinity,
                      height: 46,
                      child: OutlinedButton.icon(
                        onPressed: () => widget.onNavigate?.call(1),
                        icon: const Icon(Icons.storefront_rounded, size: 18, color: AppTheme.emerald),
                        label: Text(
                          'EXPLORE FULL INDUSTRIAL MARKETPLACE',
                          style: AppTheme.fontMono(
                            fontSize: 10.5,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.emerald,
                            letterSpacing: 0.6,
                          ),
                        ),
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(color: AppTheme.emerald.withOpacity(0.5)),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          backgroundColor: AppTheme.emerald.withOpacity(0.06),
                        ),
                      ),
                    ),

                    const SizedBox(height: 24),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildHubSelector() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: AppTheme.teal.withOpacity(0.12),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.account_balance_outlined, color: AppTheme.teal, size: 16),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'ACTIVE SPCB REGULATORY JURISDICTION',
                  style: AppTheme.fontMono(
                    fontSize: 8,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.textMuted,
                    letterSpacing: 0.5,
                  ),
                ),
                const SizedBox(height: 2),
                DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _activeHub,
                    isDense: true,
                    dropdownColor: AppTheme.surfaceRaised,
                    icon: const Icon(Icons.keyboard_arrow_down_rounded, size: 18, color: AppTheme.textMuted),
                    style: AppTheme.fontSans(
                      fontSize: 12.5,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.textMain,
                    ),
                    items: _hubs.map((h) => DropdownMenuItem(value: h, child: Text(h))).toList(),
                    onChanged: (val) {
                      if (val != null) setState(() => _activeHub = val);
                    },
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: AppTheme.emerald.withOpacity(0.15),
              borderRadius: BorderRadius.circular(6),
              border: Border.all(color: AppTheme.emerald.withOpacity(0.4)),
            ),
            child: Text(
              'FY26-27 ACTIVE',
              style: AppTheme.fontMono(
                fontSize: 8.5,
                fontWeight: FontWeight.w800,
                color: AppTheme.emerald,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildImpactMetrics() {
    return Row(
      children: [
        // Metric 1: Recycled Mass
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppTheme.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'RECYCLED MASS',
                      style: AppTheme.fontMono(
                        fontSize: 8.5,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.textMuted,
                        letterSpacing: 0.5,
                      ),
                    ),
                    const Icon(Icons.delete_sweep_outlined, size: 14, color: AppTheme.teal),
                  ],
                ),
                const SizedBox(height: 6),
                RichText(
                  text: TextSpan(
                    children: [
                      TextSpan(
                        text: '14,850 ',
                        style: AppTheme.fontMono(
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
                          color: AppTheme.teal,
                        ),
                      ),
                      TextSpan(
                        text: 'MT',
                        style: AppTheme.fontMono(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.teal,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '+18% this month',
                  style: AppTheme.fontSans(
                    fontSize: 9.5,
                    fontWeight: FontWeight.w500,
                    color: AppTheme.textLight,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(width: 10),

        // Metric 2: Carbon Abated
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppTheme.emerald.withOpacity(0.3)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'CO₂e ABATED',
                      style: AppTheme.fontMono(
                        fontSize: 8.5,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.textMuted,
                        letterSpacing: 0.5,
                      ),
                    ),
                    const Icon(Icons.eco_outlined, size: 14, color: AppTheme.emerald),
                  ],
                ),
                const SizedBox(height: 6),
                RichText(
                  text: TextSpan(
                    children: [
                      TextSpan(
                        text: '+48.2k ',
                        style: AppTheme.fontMono(
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
                          color: AppTheme.emerald,
                        ),
                      ),
                      TextSpan(
                        text: 'MT',
                        style: AppTheme.fontMono(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.emerald,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'EPA WARM Verified',
                  style: AppTheme.fontSans(
                    fontSize: 9.5,
                    fontWeight: FontWeight.w500,
                    color: AppTheme.textLight,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildQuickActionMatrix() {
    return Column(
      children: [
        Row(
          children: [
            // AI Vision Scanner
            Expanded(
              child: _buildActionCard(
                title: 'AI Vision Scanner',
                desc: 'Scan scrap lot & grade purity with Gemini 2.5',
                icon: Icons.camera_alt_outlined,
                accentColor: AppTheme.emerald,
                badge: 'MULTIMODAL AI',
                onTap: () => widget.onNavigate?.call(2),
              ),
            ),
            const SizedBox(width: 10),
            // CPCB EPR Calculator
            Expanded(
              child: _buildActionCard(
                title: 'CPCB EPR Engine',
                desc: 'Calculate liability & Form 1 audit reports',
                icon: Icons.calculate_outlined,
                accentColor: AppTheme.amber,
                badge: 'STATUTORY',
                onTap: () => widget.onNavigate?.call(3),
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            // Verified Marketplace
            Expanded(
              child: _buildActionCard(
                title: 'Scrap Marketplace',
                desc: 'Browse verified secondary material lots',
                icon: Icons.storefront_outlined,
                accentColor: AppTheme.teal,
                badge: 'ON-CHAIN',
                onTap: () => widget.onNavigate?.call(1),
              ),
            ),
            const SizedBox(width: 10),
            // ESG Leaderboard
            Expanded(
              child: _buildActionCard(
                title: 'ESG Leaderboard',
                desc: 'Top certified recyclers & audit rankings',
                icon: Icons.leaderboard_outlined,
                accentColor: AppTheme.purple,
                badge: 'REPUTATION',
                onTap: () => widget.onNavigate?.call(4),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildActionCard({
    required String title,
    required String desc,
    required IconData icon,
    required Color accentColor,
    required String badge,
    required VoidCallback onTap,
  }) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14),
        child: Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: AppTheme.surface,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: AppTheme.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: accentColor.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Icon(icon, size: 16, color: accentColor),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceRaised,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Text(
                      badge,
                      style: AppTheme.fontMono(
                        fontSize: 7.5,
                        fontWeight: FontWeight.w700,
                        color: accentColor,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                title,
                style: AppTheme.fontSans(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.textMain,
                ),
              ),
              const SizedBox(height: 3),
              Text(
                desc,
                style: AppTheme.fontSans(
                  fontSize: 9.5,
                  fontWeight: FontWeight.w400,
                  color: AppTheme.textMuted,
                  height: 1.2,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMcxTicker() {
    final List<Map<String, dynamic>> defaultTicks = [
      {'name': 'Aluminum 6063', 'price': '₹215.00/kg', 'change': '+1.8%'},
      {'name': 'PET Flakes', 'price': '₹48.00/kg', 'change': '+0.5%'},
      {'name': 'Copper Berry', 'price': '₹760.00/kg', 'change': '+2.4%'},
      {'name': 'HDPE Granules', 'price': '₹58.00/kg', 'change': '-0.3%'},
      {'name': 'HMS Steel', 'price': '₹42.50/kg', 'change': '+1.1%'},
    ];

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.trending_up_rounded, size: 14, color: AppTheme.amber),
                  const SizedBox(width: 4),
                  Text(
                    'LIVE MCX INDIAN COMMODITY ORACLE',
                    style: AppTheme.fontMono(
                      fontSize: 9,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.amber,
                      letterSpacing: 0.6,
                    ),
                  ),
                ],
              ),
              Text(
                'SPOT BENCHMARK',
                style: AppTheme.fontMono(
                  fontSize: 8,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textLight,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: defaultTicks.map((t) {
                final isPositive = t['change']!.startsWith('+');
                return Container(
                  margin: const EdgeInsets.only(right: 8),
                  padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceRaised,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: AppTheme.border),
                  ),
                  child: Row(
                    children: [
                      Text(
                        '${t['name']}: ',
                        style: AppTheme.fontSans(
                          fontSize: 10.5,
                          fontWeight: FontWeight.w500,
                          color: AppTheme.textMuted,
                        ),
                      ),
                      Text(
                        '${t['price']} ',
                        style: AppTheme.fontMono(
                          fontSize: 10.5,
                          fontWeight: FontWeight.w800,
                          color: AppTheme.textMain,
                        ),
                      ),
                      Text(
                        t['change']!,
                        style: AppTheme.fontMono(
                          fontSize: 9.5,
                          fontWeight: FontWeight.w700,
                          color: isPositive ? AppTheme.emerald : AppTheme.red,
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildScrapCard(MaterialItem item) {
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
          borderRadius: BorderRadius.circular(14),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => MaterialDetailScreen(material: item)),
            );
          },
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Image with Stamp
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: SizedBox(
                    width: 80,
                    height: 80,
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        Image.network(
                          item.imageUrl,
                          width: 80,
                          height: 80,
                          fit: BoxFit.cover,
                          errorBuilder: (_, __, ___) => Container(
                            width: 80,
                            height: 80,
                            color: AppTheme.surfaceRaised,
                            child: const Icon(Icons.inventory_2_outlined, color: AppTheme.textMuted),
                          ),
                        ),
                        if (isTransferred)
                          const Center(
                            child: VerificationStampWidget(size: 55),
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
  }
}
