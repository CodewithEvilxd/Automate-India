import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/category_badge_widget.dart';
import '../widgets/verification_stamp_widget.dart';
import '../widgets/contamination_heatmap_widget.dart';
import '../widgets/matchmaking_card_widget.dart';
import '../widgets/fraud_sentinel_widget.dart';

class MaterialDetailScreen extends StatefulWidget {
  final MaterialItem material;

  const MaterialDetailScreen({Key? key, required this.material}) : super(key: key);

  @override
  State<MaterialDetailScreen> createState() => _MaterialDetailScreenState();
}

class _MaterialDetailScreenState extends State<MaterialDetailScreen> {
  final ApiService _apiService = ApiService();
  bool _verifying = false;
  bool _transferred = false;
  String? _txHash;
  String? _certificate;

  @override
  void initState() {
    super.initState();
    _transferred = widget.material.status == 'transferred';
    _txHash = widget.material.transactions?.isNotEmpty == true
        ? widget.material.transactions![0]['tx_hash']
        : '0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234';
  }

  Future<void> _handleTransfer() async {
    setState(() => _verifying = true);
    try {
      const mockBuyerWallet = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
      final res = await _apiService.verifyAndTransfer(widget.material.id, mockBuyerWallet);

      setState(() {
        _transferred = true;
        _txHash = res['txHash'] ?? '0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234';
        _certificate = res['certificate'] ??
            'Official EPR Impact Certificate: Confirms on-chain transfer and responsible recycling diversion of ${widget.material.estimatedWeightKg} kg of ${widget.material.category} scrap.';
        _verifying = false;
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: AppTheme.emerald,
            content: Text(
              '✅ AI Agent 2 Verified & Transferred on Polygon Amoy!',
              style: AppTheme.fontMono(color: AppTheme.background, fontWeight: FontWeight.w800),
            ),
          ),
        );
      }
    } catch (e) {
      setState(() => _verifying = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final m = widget.material;

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.background,
        elevation: 0,
        title: Text(
          'LOT #${m.id.toUpperCase()}',
          style: AppTheme.fontMono(
            fontSize: 13,
            fontWeight: FontWeight.w800,
            letterSpacing: 0.8,
            color: AppTheme.textMain,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Image with Verification Stamp Overlay
            Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(14),
                  child: Image.network(
                    m.imageUrl,
                    height: 210,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(
                      height: 210,
                      color: AppTheme.surfaceRaised,
                      child: const Center(
                        child: Icon(Icons.inventory_2_outlined, size: 50, color: AppTheme.textMuted),
                      ),
                    ),
                  ),
                ),
                Positioned(
                  top: 10,
                  left: 10,
                  child: CategoryBadgeWidget(category: m.category),
                ),
                if (_transferred)
                  Positioned.fill(
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.55),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Center(
                        child: VerificationStampWidget(txHash: _txHash, size: 100),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 14),

            // Title & Location
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.location_on_outlined, size: 13, color: AppTheme.emerald),
                    const SizedBox(width: 3),
                    Text(
                      m.location,
                      style: AppTheme.fontMono(fontSize: 11, color: AppTheme.textMuted),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                  decoration: BoxDecoration(
                    color: _transferred ? AppTheme.emerald.withOpacity(0.15) : AppTheme.amber.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(
                      color: _transferred ? AppTheme.emerald.withOpacity(0.4) : AppTheme.amber.withOpacity(0.4),
                    ),
                  ),
                  child: Text(
                    _transferred ? "SETTLED ON LEDGER" : "OPEN FOR RECYCLING",
                    style: AppTheme.fontMono(
                      fontSize: 8.5,
                      fontWeight: FontWeight.w800,
                      color: _transferred ? AppTheme.emerald : AppTheme.amber,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              m.title,
              style: AppTheme.fontSans(
                color: AppTheme.textMain,
                fontSize: 16,
                fontWeight: FontWeight.w800,
                height: 1.25,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              m.description,
              style: AppTheme.fontSans(color: AppTheme.textMuted, fontSize: 12, height: 1.4),
            ),
            const SizedBox(height: 14),

            // Visual Contamination & Quality Heatmap
            ContaminationHeatmapWidget(
              purityPercentage: m.purityPercentage,
              contaminationType: m.contaminationType,
              contaminationPercentage: m.contaminationPercentage,
              recyclabilityGrade: m.recyclabilityGrade,
              moistureLevel: m.moistureLevel,
            ),
            const SizedBox(height: 14),

            // MCX Scrap Price Oracle & Matchmaker Card
            MatchmakingCardWidget(
              category: m.category,
              weightKg: m.estimatedWeightKg,
              location: m.location,
            ),
            const SizedBox(height: 14),

            // Physical Lot Specs
            Container(
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
                    children: [
                      const Icon(Icons.inventory_2_outlined, size: 14, color: AppTheme.emerald),
                      const SizedBox(width: 6),
                      Text(
                        "ON-CHAIN PHYSICAL MANIFEST",
                        style: AppTheme.fontMono(
                          fontSize: 9.5,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 0.6,
                          color: AppTheme.textMain,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  _specRow('Physical Lot Mass', '${m.estimatedWeightKg.toInt()} kg'),
                  const Divider(color: AppTheme.border),
                  _specRow('Calculated CO₂ Abated', '+${m.co2SavedKg.toStringAsFixed(1)} kg CO₂e', isHighlight: true),
                  const Divider(color: AppTheme.border),
                  _specRow('Condition Grade', m.condition),
                  const Divider(color: AppTheme.border),
                  _specRow('Origin Wallet', '${m.ownerWallet.substring(0, 8)}...'),
                  const Divider(color: AppTheme.border),
                  _specRow('Consensus Network', 'Polygon Amoy (80002)'),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // On-Chain Fraud Sentinel
            FraudSentinelWidget(
              fromWallet: m.ownerWallet,
              toWallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
              weightKg: m.estimatedWeightKg,
              claimedCo2: m.co2SavedKg,
              category: m.category,
            ),
            const SizedBox(height: 16),

            // Action: AI Escrow Transfer & SPCB Certificate
            if (!_transferred)
              ElevatedButton(
                onPressed: _verifying ? null : _handleTransfer,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.emerald,
                  foregroundColor: AppTheme.background,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: _verifying
                    ? Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const SizedBox(
                            height: 14,
                            width: 14,
                            child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.background),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            "AI AGENT EXECUTING ESCROW...",
                            style: AppTheme.fontMono(fontSize: 11, fontWeight: FontWeight.w800),
                          ),
                        ],
                      )
                    : Text(
                        "DISPATCH & VERIFY ON BLOCKCHAIN",
                        style: AppTheme.fontMono(
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 0.8,
                        ),
                      ),
              )
            else
              OutlinedButton.icon(
                onPressed: () => _showAuditCertificateModal(context),
                icon: const Icon(Icons.qr_code_2, size: 18, color: AppTheme.emerald),
                label: Text(
                  "VIEW IMMUTABLE EPR CERTIFICATE",
                  style: AppTheme.fontMono(
                    fontSize: 10.5,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.emerald,
                    letterSpacing: 0.5,
                  ),
                ),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: AppTheme.emerald),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  backgroundColor: AppTheme.emerald.withOpacity(0.08),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _specRow(String label, String value, {bool isHighlight = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: AppTheme.fontSans(color: AppTheme.textMuted, fontSize: 11.5)),
          Text(
            value,
            style: AppTheme.fontMono(
              color: isHighlight ? AppTheme.emerald : AppTheme.textMain,
              fontWeight: FontWeight.w800,
              fontSize: 11.5,
            ),
          ),
        ],
      ),
    );
  }

  void _showAuditCertificateModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        side: BorderSide(color: AppTheme.border),
      ),
      builder: (context) {
        return Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 36,
                height: 4,
                decoration: BoxDecoration(
                  color: AppTheme.border,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                "CPCB IMMUTABLE RECYCLING CERTIFICATE",
                style: AppTheme.fontMono(
                  fontSize: 11,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.emerald,
                  letterSpacing: 0.8,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                "Verified by AI Agent Sentinel #2 · Polygon Amoy",
                style: AppTheme.fontSans(fontSize: 11, color: AppTheme.textMuted),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: QrImageView(
                  data: "https://amoy.polygonscan.com/tx/$_txHash",
                  version: QrVersions.auto,
                  size: 140,
                ),
              ),
              const SizedBox(height: 14),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceRaised,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppTheme.border),
                ),
                child: Text(
                  _txHash ?? '0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234',
                  style: AppTheme.fontMono(fontSize: 9, color: AppTheme.emerald),
                  textAlign: TextAlign.center,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                _certificate ??
                    'Confirms valid on-chain recycling diversion under statutory CPCB FY26-27 EPR guidelines.',
                style: AppTheme.fontSans(fontSize: 10.5, color: AppTheme.textMuted, height: 1.3),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        );
      },
    );
  }
}
