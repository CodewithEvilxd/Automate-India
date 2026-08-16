import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../widgets/category_badge_widget.dart';

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
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              "RECYCLER LEADERBOARD",
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.0,
                color: AppTheme.bone,
              ),
            ),
            Text(
              "VERIFIED REPUTATION & ABATEMENT",
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 9,
                color: AppTheme.moss,
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
                child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.moss),
              ),
            )
          : RefreshIndicator(
              onRefresh: _fetchOrgs,
              color: AppTheme.moss,
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
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(
                        color: isFirst ? AppTheme.moss.withOpacity(0.6) : AppTheme.border,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Top Row: Rank, Org Name, Score
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: isFirst ? AppTheme.moss : AppTheme.surfaceRaised,
                                    borderRadius: BorderRadius.circular(3),
                                  ),
                                  child: Text(
                                    "#${index + 1}",
                                    style: TextStyle(
                                      fontFamily: 'monospace',
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold,
                                      color: isFirst ? AppTheme.ink : AppTheme.bone,
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  org.orgName,
                                  style: const TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.bold,
                                    color: AppTheme.bone,
                                  ),
                                ),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppTheme.moss.withOpacity(0.15),
                                borderRadius: BorderRadius.circular(3),
                                border: Border.all(color: AppTheme.moss.withOpacity(0.4)),
                              ),
                              child: Text(
                                "SCORE: ${org.reputationScore}",
                                style: const TextStyle(
                                  fontFamily: 'monospace',
                                  fontSize: 9,
                                  fontWeight: FontWeight.bold,
                                  color: AppTheme.moss,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),

                        // Location & Registration
                        Row(
                          children: [
                            const Icon(Icons.location_on_outlined, size: 12, color: AppTheme.muted),
                            const SizedBox(width: 4),
                            Text(
                              org.location,
                              style: const TextStyle(fontSize: 11, color: AppTheme.muted),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),

                        // Stats Row
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: AppTheme.ink,
                            borderRadius: BorderRadius.circular(4),
                            border: Border.all(color: AppTheme.border),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text("TOTAL CO₂ ABATED", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                                  const SizedBox(height: 2),
                                  Text(
                                    "+${org.totalCo2AbatedKg.toStringAsFixed(1)} kg",
                                    style: const TextStyle(fontFamily: 'monospace', fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.moss),
                                  ),
                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  const Text("RECYCLED MASS", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                                  const SizedBox(height: 2),
                                  Text(
                                    "${org.totalMassRecycledKg.toStringAsFixed(0)} kg",
                                    style: const TextStyle(fontFamily: 'monospace', fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.bone),
                                  ),
                                ],
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  const Text("TRANSFERS", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                                  const SizedBox(height: 2),
                                  Text(
                                    "${org.completedTransfers} Settled",
                                    style: const TextStyle(fontFamily: 'monospace', fontSize: 11, color: AppTheme.amber),
                                  ),
                                ],
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
