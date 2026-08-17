import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';

class LeaderboardScreen extends StatefulWidget {
  const LeaderboardScreen({Key? key}) : super(key: key);

  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> {
  final ApiService _apiService = ApiService();
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
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.background,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "ESG COMPLIANCE LEADERBOARD",
              style: AppTheme.fontSans(
                fontSize: 14.5,
                fontWeight: FontWeight.w800,
                letterSpacing: 0.6,
                color: AppTheme.textMain,
              ),
            ),
            Text(
              "VERIFIED ON-CHAIN RECYCLING AUDIT",
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
      body: _loading
          ? const Center(
              child: SizedBox(
                height: 24,
                width: 24,
                child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.emerald),
              ),
            )
          : RefreshIndicator(
              onRefresh: _fetchOrgs,
              color: AppTheme.emerald,
              backgroundColor: AppTheme.surface,
              child: ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: _orgs.length,
                itemBuilder: (context, index) {
                  final org = _orgs[index];
                  final bool isFirst = index == 0;

                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(
                        color: isFirst ? AppTheme.emerald.withOpacity(0.5) : AppTheme.border,
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
                                    padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                                    decoration: BoxDecoration(
                                      color: isFirst ? AppTheme.emerald : AppTheme.surfaceRaised,
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: Text(
                                      "#${index + 1}",
                                      style: AppTheme.fontMono(
                                        fontSize: 10,
                                        fontWeight: FontWeight.w800,
                                        color: isFirst ? AppTheme.background : AppTheme.textMain,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      org.orgName,
                                      style: AppTheme.fontSans(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w700,
                                        color: AppTheme.textMain,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: AppTheme.emerald.withOpacity(0.12),
                                borderRadius: BorderRadius.circular(6),
                                border: Border.all(color: AppTheme.emerald.withOpacity(0.35)),
                              ),
                              child: Text(
                                "SCORE: ${org.reputationScore}",
                                style: AppTheme.fontMono(
                                  fontSize: 9.5,
                                  fontWeight: FontWeight.w800,
                                  color: AppTheme.emerald,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),

                        // Location
                        Row(
                          children: [
                            const Icon(Icons.location_on_outlined, size: 12, color: AppTheme.textMuted),
                            const SizedBox(width: 4),
                            Expanded(
                              child: Text(
                                org.location,
                                style: AppTheme.fontSans(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w500,
                                  color: AppTheme.textMuted,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),

                        // Stats Row
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                          decoration: BoxDecoration(
                            color: AppTheme.surfaceRaised,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: AppTheme.border),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      "CO₂ ABATED",
                                      style: AppTheme.fontMono(fontSize: 7.5, fontWeight: FontWeight.w700, color: AppTheme.textMuted),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      "+${org.totalCo2AbatedKg.toStringAsFixed(0)} kg",
                                      style: AppTheme.fontMono(fontSize: 11, fontWeight: FontWeight.w800, color: AppTheme.emerald),
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Text(
                                      "RECYCLED MASS",
                                      style: AppTheme.fontMono(fontSize: 7.5, fontWeight: FontWeight.w700, color: AppTheme.textMuted),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      "${org.totalMassRecycledKg.toStringAsFixed(0)} kg",
                                      style: AppTheme.fontMono(fontSize: 11, fontWeight: FontWeight.w800, color: AppTheme.textMain),
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    Text(
                                      "ESCROW SETTLED",
                                      style: AppTheme.fontMono(fontSize: 7.5, fontWeight: FontWeight.w700, color: AppTheme.textMuted),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      "${org.completedTransfers} Batches",
                                      style: AppTheme.fontMono(fontSize: 11, color: AppTheme.amber, fontWeight: FontWeight.w800),
                                      overflow: TextOverflow.ellipsis,
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
              ),
            ),
    );
  }
}
