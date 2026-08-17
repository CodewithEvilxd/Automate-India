import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../services/api_service.dart';

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
    if (_loading || _matchData == null) {
      return Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: AppTheme.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: AppTheme.border),
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
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: const BoxDecoration(
              color: AppTheme.surfaceRaised,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(14),
                topRight: Radius.circular(14),
              ),
              border: Border(bottom: BorderSide(color: AppTheme.border)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.bolt, size: 14, color: AppTheme.amber),
                    const SizedBox(width: 4),
                    Text(
                      "AI PRICE ORACLE & LOGISTICS",
                      style: GoogleFonts.jetBrainsMono(
                        fontSize: 9.5,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 0.6,
                        color: AppTheme.textMain,
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
                    "MCX BENCHMARK",
                    style: GoogleFonts.jetBrainsMono(
                      fontSize: 8.5,
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
                // Estimated Lot Value
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceRaised,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: AppTheme.border),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "ESTIMATED COMMODITY VALUE",
                            style: GoogleFonts.jetBrainsMono(
                              fontSize: 8,
                              fontWeight: FontWeight.w700,
                              color: AppTheme.textMuted,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            "₹${estimatedVal.toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}",
                            style: GoogleFonts.jetBrainsMono(
                              fontSize: 18,
                              fontWeight: FontWeight.w800,
                              color: AppTheme.textMain,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            "(₹${unitPrice.toStringAsFixed(1)}/kg)",
                            style: GoogleFonts.jetBrainsMono(
                              fontSize: 10.5,
                              color: AppTheme.textMuted,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Row(
                            children: [
                              const Icon(Icons.trending_up, size: 12, color: AppTheme.emerald),
                              const SizedBox(width: 2),
                              Text(
                                "TREND: UP",
                                style: GoogleFonts.jetBrainsMono(
                                  fontSize: 9,
                                  fontWeight: FontWeight.w800,
                                  color: AppTheme.emerald,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),

                // Logistics & Net Carbon Row
                Row(
                  children: [
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: AppTheme.surfaceRaised,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: AppTheme.border),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "ROUTING HUB",
                              style: GoogleFonts.jetBrainsMono(fontSize: 8, fontWeight: FontWeight.w700, color: AppTheme.textMuted),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              hub,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: GoogleFonts.plusJakartaSans(fontSize: 11, fontWeight: FontWeight.w700, color: AppTheme.textMain),
                            ),
                            Text(
                              "$distanceKm km transit",
                              style: GoogleFonts.jetBrainsMono(fontSize: 9, color: AppTheme.textMuted),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: AppTheme.surfaceRaised,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: AppTheme.border),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "NET CARBON ROI",
                              style: GoogleFonts.jetBrainsMono(fontSize: 8, fontWeight: FontWeight.w700, color: AppTheme.textMuted),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              "+${netCo2.toStringAsFixed(1)} kg",
                              style: GoogleFonts.jetBrainsMono(fontSize: 11, fontWeight: FontWeight.w800, color: AppTheme.emerald),
                            ),
                            Text(
                              "-$penalty kg transit",
                              style: GoogleFonts.jetBrainsMono(fontSize: 9, color: AppTheme.textMuted),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),

                // Suggested Buyer Match
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceRaised,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: AppTheme.emerald.withOpacity(0.3)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "CERTIFIED BUYER MATCH",
                              style: GoogleFonts.jetBrainsMono(fontSize: 8, fontWeight: FontWeight.w700, color: AppTheme.textMuted),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              buyer,
                              style: GoogleFonts.plusJakartaSans(fontSize: 11, fontWeight: FontWeight.w700, color: AppTheme.textMain),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 6),
                      const Icon(Icons.verified, size: 16, color: AppTheme.emerald),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
