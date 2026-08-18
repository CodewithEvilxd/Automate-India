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
import 'verify_audit_screen.dart';

class HomeScreen extends StatefulWidget {
  final Function(int)? onNavigate;

  const HomeScreen({Key? key, this.onNavigate}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService _apiService = ApiService();
  final UserStateService _userState = UserStateService();
  final WalletService _walletService = WalletService();

  List<MaterialItem> _featuredMaterials = [];
  List<Map<String, dynamic>> _mcxList = [];
  bool _loading = false;
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
    // Instant rich initial state
    _featuredMaterials = _apiService.getFallbackMaterials().take(4).toList();
    _mcxList = ApiService.fallbackMcx;
    _loadDashboardData();
  }

  Future<void> _loadDashboardData() async {
    try {
      final materials = await _apiService.getMaterials();
      final mcx = await _apiService.getMcxOracle();
      if (mounted) {
        setState(() {
          if (materials.isNotEmpty) {
            _featuredMaterials = materials.take(4).toList();
          }
          if (mcx.isNotEmpty) {
            _mcxList = mcx;
          }
        });
      }
    } catch (_) {}
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

        return Scaffold(
          backgroundColor: bg,
          appBar: AppBar(
            backgroundColor: bg,
            elevation: 0,
            titleSpacing: 8,
            leadingWidth: 48,
            leading: Padding(
              padding: const EdgeInsets.only(left: 12),
              child: Center(
                child: Container(
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        AppTheme.orange.withOpacity(0.25),
                        AppTheme.emerald.withOpacity(0.25),
                      ],
                    ),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: AppTheme.emerald.withOpacity(0.4)),
                  ),
                  child: const Icon(Icons.all_inclusive, color: AppTheme.emerald, size: 18),
                ),
              ),
            ),
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'CIRCULARCHAIN',
                  style: AppTheme.fontSans(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 0.5,
                    color: textMain,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                Row(
                  mainAxisSize: MainAxisSize.min,
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
                      'AMOY #80002 · LIVE',
                      style: AppTheme.fontMono(
                        fontSize: 7.5,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.emerald,
                        letterSpacing: 0.4,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            actions: [
              // Theme Toggler
              IconButton(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                icon: Icon(
                  isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
                  color: textMuted,
                  size: 18,
                ),
                tooltip: 'Toggle Theme',
                onPressed: () => _userState.toggleTheme(),
              ),

              // Wallet Button
              GestureDetector(
                onTap: () => WalletConnectModal.show(context),
                child: Container(
                  margin: const EdgeInsets.symmetric(vertical: 11, horizontal: 3),
                  padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppTheme.emerald.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: AppTheme.emerald.withOpacity(0.4)),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.account_balance_wallet, size: 12, color: AppTheme.emerald),
                      const SizedBox(width: 4),
                      Text(
                        _walletService.isConnected ? _walletService.shortAddress : 'WALLET',
                        style: AppTheme.fontMono(
                          fontSize: 9.5,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.emerald,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Verify QR Scanner
              IconButton(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                icon: const Icon(Icons.qr_code_scanner_rounded, color: AppTheme.orange, size: 18),
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
              ? Center(
                  child: CircularProgressIndicator(
                    color: isDark ? AppTheme.emerald : AppTheme.lightEmerald,
                    strokeWidth: 2,
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _loadDashboardData,
                  color: AppTheme.emerald,
                  backgroundColor: surface,
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    physics: const AlwaysScrollableScrollPhysics(),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // User Role & Language Chip
                        _buildUserRoleBanner(isDark, cardBg, textMain, textMuted, border),
                        const SizedBox(height: 12),

                        // SPCB Hub Selector
                        _buildHubSelector(isDark, cardBg, textMain, textMuted, border),
                        const SizedBox(height: 14),

                        // Executive Impact Metrics Grid
                        _buildImpactMetrics(isDark, textMain, textMuted, border),
                        const SizedBox(height: 18),

                        // Quick Action Matrix
                        Text(
                          'QUICK COMMAND MATRIX',
                          style: AppTheme.fontMono(
                            fontSize: 10.5,
                            fontWeight: FontWeight.w800,
                            color: textMuted,
                            letterSpacing: 0.8,
                          ),
                        ),
                        const SizedBox(height: 10),
                        _buildQuickActionMatrix(isDark, cardBg, textMain, textMuted, border),
                        const SizedBox(height: 18),

                        // 6-Agent Autonomous Status Radar
                        _buildAgentRadar(isDark, cardBg, textMain, textMuted, border),
                        const SizedBox(height: 18),

                        // Live MCX Commodity Scrap Ticker
                        _buildMcxTicker(isDark, cardBg, textMain, textMuted, border),
                        const SizedBox(height: 18),

                        // Featured Verified Lots Header
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'LIVE SCRAP LOTS & AUDIT PROOFS',
                              style: AppTheme.fontMono(
                                fontSize: 10.5,
                                fontWeight: FontWeight.w800,
                                color: textMuted,
                                letterSpacing: 0.8,
                              ),
                            ),
                            InkWell(
                              onTap: () => widget.onNavigate?.call(1),
                              child: Row(
                                children: [
                                  Text(
                                    'VIEW ALL',
                                    style: AppTheme.fontMono(
                                      fontSize: 10.5,
                                      fontWeight: FontWeight.w700,
                                      color: AppTheme.emerald,
                                    ),
                                  ),
                                  const Icon(Icons.chevron_right, size: 14, color: AppTheme.emerald),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),

                        // Featured Lots List
                        if (_featuredMaterials.isEmpty)
                          Container(
                            padding: const EdgeInsets.all(24),
                            decoration: BoxDecoration(
                              color: cardBg,
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(color: border),
                            ),
                            child: Center(
                              child: Text(
                                'No verified scrap lots available at this moment.',
                                style: AppTheme.fontSans(color: textMuted, fontSize: 12),
                              ),
                            ),
                          )
                        else
                          ..._featuredMaterials.map((mat) => _buildMaterialCard(mat, isDark, cardBg, textMain, textMuted, border)).toList(),

                        const SizedBox(height: 24),
                      ],
                    ),
                  ),
                ),
        );
      },
    );
  }

  // User Role & Language Bar
  Widget _buildUserRoleBanner(bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: AppTheme.orange.withOpacity(0.18),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(Icons.person_pin, color: AppTheme.orange, size: 16),
              ),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _userState.roleShortBadge,
                    style: AppTheme.fontMono(
                      fontSize: 9.5,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.orange,
                    ),
                  ),
                  Text(
                    '${_userState.userName} · ${_userState.languageName}',
                    style: AppTheme.fontSans(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: textMain,
                    ),
                  ),
                ],
              ),
            ],
          ),
          TextButton(
            onPressed: () {
              // Role switcher dialog
              showModalBottomSheet(
                context: context,
                backgroundColor: AppTheme.getSurface(isDark),
                shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
                builder: (ctx) => Container(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'SWITCH OPERATING ROLE',
                        style: AppTheme.fontMono(fontSize: 11, fontWeight: FontWeight.bold, color: textMuted),
                      ),
                      const SizedBox(height: 12),
                      ListTile(
                        leading: const Icon(Icons.storefront, color: AppTheme.orange),
                        title: Text('Grassroots Aggregator / Kabadiwala', style: AppTheme.fontSans(fontWeight: FontWeight.bold, color: textMain)),
                        onTap: () {
                          _userState.setRole(UserRole.aggregator);
                          Navigator.pop(ctx);
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.factory, color: AppTheme.emerald),
                        title: Text('Certified Recycler & Smelter', style: AppTheme.fontSans(fontWeight: FontWeight.bold, color: textMain)),
                        onTap: () {
                          _userState.setRole(UserRole.recycler);
                          Navigator.pop(ctx);
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.business, color: AppTheme.teal),
                        title: Text('OEM / Corporate Compliance Officer', style: AppTheme.fontSans(fontWeight: FontWeight.bold, color: textMain)),
                        onTap: () {
                          _userState.setRole(UserRole.oem);
                          Navigator.pop(ctx);
                        },
                      ),
                    ],
                  ),
                ),
              );
            },
            style: TextButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              minimumSize: Size.zero,
            ),
            child: Text(
              'SWITCH',
              style: AppTheme.fontMono(
                fontSize: 10,
                fontWeight: FontWeight.bold,
                color: AppTheme.emerald,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // SPCB Hub Selector
  Widget _buildHubSelector(bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              const Icon(Icons.location_on, size: 14, color: AppTheme.emerald),
              const SizedBox(width: 6),
              Text(
                'SPCB JURISDICTION:',
                style: AppTheme.fontMono(
                  fontSize: 9,
                  fontWeight: FontWeight.w700,
                  color: textMuted,
                ),
              ),
            ],
          ),
          DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: _activeHub,
              dropdownColor: AppTheme.getSurface(isDark),
              icon: const Icon(Icons.arrow_drop_down, size: 18, color: AppTheme.emerald),
              style: AppTheme.fontSans(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: textMain,
              ),
              items: _hubs.map((hub) {
                return DropdownMenuItem<String>(
                  value: hub,
                  child: Text(hub),
                );
              }).toList(),
              onChanged: (val) {
                if (val != null) setState(() => _activeHub = val);
              },
            ),
          ),
        ],
      ),
    );
  }

  // 4 Stat Cards
  Widget _buildImpactMetrics(bool isDark, Color textMain, Color textMuted, Color border) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: _buildStatCard(
                'VERIFIED SCRAP MILLED',
                '48,250 kg',
                '+14.2% today',
                Icons.layers,
                AppTheme.emerald,
                isDark,
                border,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: _buildStatCard(
                'SCOPE 3 CO₂e ABATED',
                '142.8 tCO₂e',
                'EPA WARM 9.13 Factor',
                Icons.eco,
                AppTheme.teal,
                isDark,
                border,
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            Expanded(
              child: _buildStatCard(
                'AVOIDED PENALTIES',
                '₹12.4 Lakhs',
                'PWM Rules 2026',
                Icons.shield_outlined,
                AppTheme.orange,
                isDark,
                border,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: _buildStatCard(
                'ACTIVE AI AGENTS',
                '6 / 6 Online',
                'Polygon Amoy Settled',
                Icons.memory,
                AppTheme.purple,
                isDark,
                border,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStatCard(
    String label,
    String val,
    String sub,
    IconData icon,
    Color color,
    bool isDark,
    Color border,
  ) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.getSurfaceRaised(isDark),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                label,
                style: AppTheme.fontMono(
                  fontSize: 8.5,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.getTextMuted(isDark),
                ),
              ),
              Icon(icon, size: 14, color: color),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            val,
            style: AppTheme.fontSans(
              fontSize: 16,
              fontWeight: FontWeight.w900,
              color: color,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            sub,
            style: AppTheme.fontMono(
              fontSize: 8,
              color: AppTheme.getTextMuted(isDark),
            ),
          ),
        ],
      ),
    );
  }

  // Quick Action Matrix
  Widget _buildQuickActionMatrix(bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
    final actions = [
      {
        'title': 'AI Scanner',
        'subtitle': 'Vision & Indic Voice',
        'icon': Icons.camera_alt,
        'color': AppTheme.orange,
        'action': () => widget.onNavigate?.call(2),
      },
      {
        'title': 'EPR Calculator',
        'subtitle': 'CPCB Quota & Penalty',
        'icon': Icons.calculate,
        'color': AppTheme.emerald,
        'action': () => widget.onNavigate?.call(3),
      },
      {
        'title': 'Field Docs',
        'subtitle': '6-Agent Core & FAQ',
        'icon': Icons.menu_book,
        'color': AppTheme.teal,
        'action': () => widget.onNavigate?.call(4),
      },
      {
        'title': 'Verify Hash',
        'subtitle': 'Polygon Audit Trail',
        'icon': Icons.verified,
        'color': AppTheme.purple,
        'action': () => Navigator.push(context, MaterialPageRoute(builder: (_) => const VerifyAuditScreen())),
      },
    ];

    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      childAspectRatio: 2.2,
      children: actions.map((act) {
        final Color c = act['color'] as Color;
        return InkWell(
          onTap: act['action'] as VoidCallback,
          borderRadius: BorderRadius.circular(14),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              color: cardBg,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: border),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: c.withOpacity(0.18),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(act['icon'] as IconData, color: c, size: 18),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        act['title'] as String,
                        style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.bold, color: textMain),
                      ),
                      Text(
                        act['subtitle'] as String,
                        style: AppTheme.fontMono(fontSize: 8.5, color: textMuted),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  // 6-Agent Autonomous Status Radar
  Widget _buildAgentRadar(bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
    final agents = [
      {'name': 'Agent 01: Vision', 'status': '97.4% ISO QA', 'color': AppTheme.emerald},
      {'name': 'Agent 02: EPA WARM', 'status': '9.13 Factor', 'color': AppTheme.teal},
      {'name': 'Agent 03: MCX Oracle', 'status': 'Spot Live', 'color': AppTheme.orange},
      {'name': 'Agent 04: Indic Voice', 'status': '5 Languages', 'color': AppTheme.amber},
      {'name': 'Agent 05: Fraud Radar', 'status': '0 Double Claims', 'color': AppTheme.red},
      {'name': 'Agent 06: CPCB Shield', 'status': 'PWM 2026 Valid', 'color': AppTheme.purple},
    ];

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    width: 7,
                    height: 7,
                    decoration: const BoxDecoration(
                      color: AppTheme.emerald,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 6),
                  Text(
                    '6-AGENT AUTONOMOUS RADAR',
                    style: AppTheme.fontMono(
                      fontSize: 10,
                      fontWeight: FontWeight.w800,
                      color: textMain,
                      letterSpacing: 0.6,
                    ),
                  ),
                ],
              ),
              InkWell(
                onTap: () => widget.onNavigate?.call(4),
                child: Text(
                  'VIEW DOCS',
                  style: AppTheme.fontMono(
                    fontSize: 9,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.emerald,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 8,
            runSpacing: 6,
            children: agents.map((ag) {
              final Color c = ag['color'] as Color;
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF0C0E14) : const Color(0xFFEBE5DC),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: c.withOpacity(0.3)),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(width: 5, height: 5, decoration: BoxDecoration(color: c, shape: BoxShape.circle)),
                    const SizedBox(width: 5),
                    Text(ag['name'] as String, style: AppTheme.fontSans(fontSize: 10, fontWeight: FontWeight.bold, color: textMain)),
                    const SizedBox(width: 4),
                    Text('(${ag['status']})', style: AppTheme.fontMono(fontSize: 8.5, color: c, fontWeight: FontWeight.w700)),
                  ],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  // MCX Live Ticker
  Widget _buildMcxTicker(bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
    if (_mcxList.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                const Icon(Icons.show_chart, size: 14, color: AppTheme.orange),
                const SizedBox(width: 6),
                Text(
                  'MCX SPOT SCRAP COMMODITY TICKER',
                  style: AppTheme.fontMono(
                    fontSize: 10,
                    fontWeight: FontWeight.w800,
                    color: textMuted,
                    letterSpacing: 0.6,
                  ),
                ),
              ],
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: AppTheme.orange.withOpacity(0.15),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                'LIVE ORACLE',
                style: AppTheme.fontMono(fontSize: 8, fontWeight: FontWeight.bold, color: AppTheme.orange),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        SizedBox(
          height: 68,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: _mcxList.length,
            itemBuilder: (context, idx) {
              final item = _mcxList[idx];
              final isUp = item['trend'] == 'up';
              return Container(
                width: 160,
                margin: const EdgeInsets.only(right: 10),
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: cardBg,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: border),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          item['symbol'] ?? 'MAT',
                          style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.bold, color: textMain),
                        ),
                        Text(
                          item['change'] ?? '+0.0%',
                          style: AppTheme.fontMono(
                            fontSize: 9.5,
                            fontWeight: FontWeight.bold,
                            color: isUp ? AppTheme.emerald : AppTheme.red,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '₹${item['unitPriceINR']}/${item['unit'] ?? 'kg'}',
                      style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w900, color: AppTheme.orange),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  // Scrap Lot Card
  Widget _buildMaterialCard(MaterialItem mat, bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
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
              const SizedBox(height: 6),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.scale, size: 14, color: AppTheme.orange),
                      const SizedBox(width: 4),
                      Text(
                        '${mat.weightKg.toStringAsFixed(0)} kg',
                        style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.bold, color: textMain),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      const Icon(Icons.eco, size: 14, color: AppTheme.emerald),
                      const SizedBox(width: 4),
                      Text(
                        '${mat.co2SavedKg.toStringAsFixed(1)} kg CO₂e',
                        style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.emerald),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      Text(
                        mat.location,
                        style: AppTheme.fontSans(fontSize: 11, color: textMuted),
                      ),
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
