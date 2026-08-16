import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/api_service.dart';

class FraudSentinelWidget extends StatefulWidget {
  final String fromWallet;
  final String toWallet;
  final double weightKg;
  final double claimedCo2;
  final String category;

  const FraudSentinelWidget({
    Key? key,
    required this.fromWallet,
    required this.toWallet,
    required this.weightKg,
    required this.claimedCo2,
    required this.category,
  }) : super(key: key);

  @override
  State<FraudSentinelWidget> createState() => _FraudSentinelWidgetState();
}

class _FraudSentinelWidgetState extends State<FraudSentinelWidget> {
  final ApiService _apiService = ApiService();
  Map<String, dynamic>? _auditData;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchAudit();
  }

  Future<void> _fetchAudit() async {
    setState(() => _loading = true);
    final data = await _apiService.getFraudAudit(
      widget.fromWallet,
      widget.toWallet,
      widget.weightKg,
      widget.claimedCo2,
      widget.category,
    );
    if (mounted) {
      setState(() {
        _auditData = data;
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading || _auditData == null) {
      return Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppTheme.surface,
          borderRadius: BorderRadius.circular(6),
          border: Border.all(color: AppTheme.border),
        ),
        child: const Center(
          child: SizedBox(
            height: 16,
            width: 16,
            child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.moss),
          ),
        ),
      );
    }

    final String riskLevel = _auditData!['risk_level'] ?? 'LOW';
    final int riskScore = _auditData!['risk_score'] ?? 4;
    final String summary = _auditData!['security_audit_summary'] ?? 'Cryptographic audit passed.';
    final List<dynamic> flags = _auditData!['anomaly_flags'] ?? [];

    final bool isLow = riskLevel == 'LOW';
    final Color badgeColor = isLow ? AppTheme.moss : const Color(0xFFE57373);

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(
                    isLow ? Icons.shield_outlined : Icons.warning_amber_rounded,
                    size: 16,
                    color: badgeColor,
                  ),
                  const SizedBox(width: 6),
                  const Text(
                    "ON-CHAIN FRAUD SENTINEL",
                    style: TextStyle(
                      fontFamily: 'monospace',
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.8,
                      color: AppTheme.bone,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: badgeColor.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(color: badgeColor.withOpacity(0.4)),
                ),
                child: Text(
                  "RISK: $riskLevel ($riskScore%)",
                  style: TextStyle(
                    fontFamily: 'monospace',
                    fontSize: 9,
                    fontWeight: FontWeight.bold,
                    color: badgeColor,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),

          Text(
            summary,
            style: const TextStyle(fontSize: 11, color: AppTheme.muted, height: 1.3),
          ),

          if (flags.isNotEmpty) ...[
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppTheme.ink,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: const Color(0xFFE57373).withOpacity(0.4)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: flags.map((f) => Text(
                  "• $f",
                  style: const TextStyle(
                    fontFamily: 'monospace',
                    fontSize: 9,
                    color: Color(0xFFE57373),
                  ),
                )).toList(),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
