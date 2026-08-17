import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/api_service.dart';
import '../services/user_state_service.dart';

class MatchmakingCardWidget extends StatefulWidget {
  final String category;
  final double weightKg;
  final String location;

  const MatchmakingCardWidget({
    Key? key,
    required this.category,
    required this.weightKg,
    this.location = "Noida, UP",
  }) : super(key: key);

  @override
  State<MatchmakingCardWidget> createState() => _MatchmakingCardWidgetState();
}

class _MatchmakingCardWidgetState extends State<MatchmakingCardWidget> {
  final ApiService _apiService = ApiService();
  final UserStateService _userState = UserStateService();
  Map<String, dynamic>? _matchData;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchMatch();
  }

  @override
  void didUpdateWidget(covariant MatchmakingCardWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.category != widget.category || oldWidget.weightKg != widget.weightKg) {
      _fetchMatch();
    }
  }

  Future<void> _fetchMatch() async {
    setState(() => _loading = true);
    final data = await _apiService.getMatchmaking(widget.category, widget.weightKg, widget.location);
    if (mounted) {
      setState(() {
        _matchData = data;
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _userState,
      builder: (context, _) {
        final isDark = _userState.isDarkMode;
        final surface = AppTheme.getSurface(isDark);
        final cardBg = AppTheme.getSurfaceRaised(isDark);
        final textMain = AppTheme.getTextMain(isDark);
        final textMuted = AppTheme.getTextMuted(isDark);
        final border = AppTheme.getBorder(isDark);

        if (_loading || _matchData == null) {
          return Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: border),
            ),
            child: const Center(
              child: SizedBox(
                height: 20,
                width: 20,
                child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.emerald),
              ),
            ),
          );
        }

        final int estimatedVal = _matchData!['estimated_lot_value_inr'] ?? 0;
        final double unitPrice = (_matchData!['unit_price_inr_per_kg'] as num?)?.toDouble() ?? 0.0;
        final String hub = _matchData!['nearest_processing_hub'] ?? 'Noida / NCR Cluster';
        final double netCo2 = (_matchData!['net_carbon_abated_kg'] as num?)?.toDouble() ?? 0.0;
        final double penalty = (_matchData!['transport_carbon_penalty_kg'] as num?)?.toDouble() ?? 0.0;
        final int distanceKm = (_matchData!['estimated_transport_km'] as num?)?.toInt() ?? 18;
        final String buyer = _matchData!['suggested_buyer_name'] ?? 'EcoPlast Polymer Solutions';

        return Container(
          decoration: BoxDecoration(
            color: surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header Bar
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                decoration: BoxDecoration(
                  color: cardBg,
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(16),
                    topRight: Radius.circular(16),
                  ),
                  border: Border(bottom: BorderSide(color: border)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.hub_outlined, size: 16, color: AppTheme.orange),
                        const SizedBox(width: 6),
                        Text(
                          "AGENT 03: MCX & LOGISTICS ORACLE",
                          style: AppTheme.fontMono(
                            fontSize: 9.5,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 0.6,
                            color: textMain,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppTheme.emerald.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        "96% MATCH",
                        style: AppTheme.fontMono(
                          fontSize: 8,
                          fontWeight: FontWeight.w800,
                          color: AppTheme.emerald,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Price & Value Row
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("ESTIMATED LOT VALUE", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                            const SizedBox(height: 2),
                            Text(
                              "₹${estimatedVal.toLocaleString()}",
                              style: AppTheme.fontSans(
                                fontSize: 18,
                                fontWeight: FontWeight.w900,
                                color: AppTheme.orange,
                              ),
                            ),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text("MCX SPOT PRICE", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                            const SizedBox(height: 2),
                            Text(
                              "₹$unitPrice/kg",
                              style: AppTheme.fontSans(
                                fontSize: 14,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.emerald,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    const Divider(height: 1),
                    const SizedBox(height: 10),

                    // Suggested Buyer & Hub
                    Row(
                      children: [
                        const Icon(Icons.factory_outlined, size: 14, color: AppTheme.teal),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            "Verified Buyer: $buyer",
                            style: AppTheme.fontSans(fontSize: 11, fontWeight: FontWeight.bold, color: textMain),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        const Icon(Icons.route, size: 14, color: AppTheme.orange),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            "Route: $hub ($distanceKm km transit)",
                            style: AppTheme.fontSans(fontSize: 10.5, color: textMuted),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),

                    // Net Carbon Abatement
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: cardBg,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: border),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("Net Lifecycle Carbon:", style: AppTheme.fontMono(fontSize: 9, color: textMuted)),
                          Text(
                            "+${netCo2.toStringAsFixed(1)} kg CO₂e (after ${penalty.toStringAsFixed(1)}kg haul penalty)",
                            style: AppTheme.fontMono(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.emerald),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

extension IntFormatting on int {
  String toLocaleString() {
    return toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},');
  }
}
