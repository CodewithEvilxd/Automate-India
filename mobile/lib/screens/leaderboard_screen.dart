import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../services/user_state_service.dart';
import '../services/wallet_service.dart';
import '../widgets/wallet_connect_modal.dart';

class LeaderboardScreen extends StatefulWidget {
  const LeaderboardScreen({Key? key}) : super(key: key);

  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> {
  final ApiService _apiService = ApiService();
  final UserStateService _userState = UserStateService();
  final WalletService _walletService = WalletService();

  List<OrganizationItem> _orgs = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchOrgs();
  }

  Future<void> _fetchOrgs() async {
    final list = await _apiService.getOrganizations();
    if (mounted) {
      setState(() {
        _orgs = list;
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: Listenable.merge([_userState, _walletService]),
      builder: (context, _) {
        final isDark = _userState.isDarkMode;
        final bg = AppTheme.getBackground(isDark);
        final textMain = AppTheme.getTextMain(isDark);
        final textMuted = AppTheme.getTextMuted(isDark);
        final border = AppTheme.getBorder(isDark);
        final cardBg = AppTheme.getSurfaceRaised(isDark);

        return Scaffold(
          backgroundColor: bg,
          appBar: AppBar(
            backgroundColor: bg,
            elevation: 0,
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "ESG COMPLIANCE LEADERBOARD",
                  style: AppTheme.fontSans(
                    fontSize: 14,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 0.6,
                    color: textMain,
                  ),
                ),
                Text(
                  "VERIFIED ON-CHAIN RECYCLING AUDIT RANKINGS",
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
          body: _loading
              ? Center(
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: isDark ? AppTheme.emerald : AppTheme.lightEmerald,
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _fetchOrgs,
                  color: AppTheme.emerald,
                  backgroundColor: cardBg,
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _orgs.length,
                    itemBuilder: (context, index) {
                      final org = _orgs[index];
                      final bool isTop3 = index < 3;
                      final Color rankColor = index == 0
                          ? const Color(0xFFFFD700)
                          : index == 1
                              ? const Color(0xFFC0C0C0)
                              : index == 2
                                  ? const Color(0xFFCD7F32)
                                  : textMuted;

                      return Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: cardBg,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isTop3 ? AppTheme.emerald.withOpacity(0.5) : border,
                            width: isTop3 ? 1.5 : 1,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Top Row: Rank, Org Name, Score
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Row(
                                    children: [
                                      Container(
                                        width: 28,
                                        height: 28,
                                        decoration: BoxDecoration(
                                          color: rankColor.withOpacity(0.15),
                                          shape: BoxShape.circle,
                                          border: Border.all(color: rankColor.withOpacity(0.4)),
                                        ),
                                        child: Center(
                                          child: Text(
                                            '#${index + 1}',
                                            style: AppTheme.fontMono(
                                              fontSize: 10,
                                              fontWeight: FontWeight.w900,
                                              color: rankColor,
                                            ),
                                          ),
                                        ),
                                      ),
                                      const SizedBox(width: 10),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              org.name,
                                              style: AppTheme.fontSans(
                                                fontSize: 12.5,
                                                fontWeight: FontWeight.w800,
                                                color: textMain,
                                              ),
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                            Text(
                                              org.type.toUpperCase(),
                                              style: AppTheme.fontMono(
                                                fontSize: 8.5,
                                                fontWeight: FontWeight.bold,
                                                color: AppTheme.orange,
                                              ),
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(width: 6),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                                  decoration: BoxDecoration(
                                    color: AppTheme.emerald.withOpacity(0.15),
                                    borderRadius: BorderRadius.circular(6),
                                    border: Border.all(color: AppTheme.emerald.withOpacity(0.3)),
                                  ),
                                  child: Text(
                                    '${org.complianceScore.toStringAsFixed(0)}% ESG',
                                    style: AppTheme.fontMono(
                                      fontSize: 9.5,
                                      fontWeight: FontWeight.bold,
                                      color: AppTheme.emerald,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),

                            // Metrics Grid
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('TOTAL RECYCLED', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                                    Text('${(org.totalRecycledKg / 1000).toStringAsFixed(1)} MT', style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w800, color: AppTheme.orange)),
                                  ],
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('SCOPE 3 ABATED', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                                    Text('${(org.totalCO2SavedKg / 1000).toStringAsFixed(1)} tCO₂e', style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w800, color: AppTheme.emerald)),
                                  ],
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    Text('SECTOR', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                                    Text(org.state, style: AppTheme.fontSans(fontSize: 11, fontWeight: FontWeight.w700, color: textMain)),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
        );
      },
    );
  }
}
