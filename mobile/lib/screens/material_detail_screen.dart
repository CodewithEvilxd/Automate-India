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
          const SnackBar(
            backgroundColor: AppTheme.moss,
            content: Text(
              '✅ AI Agent 2 Verified & Transferred on Polygon Amoy!',
              style: TextStyle(fontFamily: 'monospace', color: AppTheme.ink, fontWeight: FontWeight.bold),
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
      appBar: AppBar(
        title: Text(
          'LOT #${m.id.toUpperCase()}',
          style: const TextStyle(
            fontFamily: 'monospace',
            fontSize: 14,
            fontWeight: FontWeight.bold,
            letterSpacing: 1.0,
            color: AppTheme.bone,
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
                  borderRadius: BorderRadius.circular(6),
                  child: Image.network(
                    m.imageUrl,
                    height: 210,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(
                      height: 210,
                      color: AppTheme.surfaceRaised,
                      child: const Center(
                        child: Icon(Icons.inventory_2_outlined, size: 50, color: AppTheme.muted),
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
                      color: Colors.black.withOpacity(0.55),
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
                    const Icon(Icons.location_on_outlined, size: 13, color: AppTheme.moss),
                    const SizedBox(width: 3),
                    Text(
                      m.location,
                      style: const TextStyle(fontSize: 11, color: AppTheme.muted, fontFamily: 'monospace'),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: _transferred ? AppTheme.moss.withOpacity(0.15) : AppTheme.amber.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(3),
                  ),
                  child: Text(
                    _transferred ? "SETTLED ON LEDGER" : "OPEN FOR RECYCLING",
                    style: TextStyle(
                      fontFamily: 'monospace',
                      fontSize: 9,
                      fontWeight: FontWeight.bold,
                      color: _transferred ? AppTheme.moss : AppTheme.amber,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              m.title,
              style: const TextStyle(
                color: AppTheme.bone,
                fontSize: 17,
                fontWeight: FontWeight.bold,
                height: 1.25,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              m.description,
              style: const TextStyle(color: AppTheme.muted, fontSize: 12, height: 1.4),
            ),
            const SizedBox(height: 14),

            // Feature 2: Visual Contamination & Quality Heatmap
            ContaminationHeatmapWidget(
              purityPercentage: m.purityPercentage,
              contaminationType: m.contaminationType,
              contaminationPercentage: m.contaminationPercentage,
              recyclabilityGrade: m.recyclabilityGrade,
              moistureLevel: m.moistureLevel,
            ),
            const SizedBox(height: 14),

            // Feature 1: MCX Scrap Price Oracle & Matchmaker Card
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
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Icon(Icons.inventory_2_outlined, size: 14, color: AppTheme.moss),
                      SizedBox(width: 6),
                      Text(
                        "ON-CHAIN PHYSICAL MANIFEST",
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

            // Feature 4: On-Chain Fraud Sentinel
            FraudSentinelWidget(
              fromWallet: m.ownerWallet,
              toWallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
              weightKg: m.estimatedWeightKg,
              claimedCo2: m.co2SavedKg,
              category: m.category,
            ),
            const SizedBox(height: 16),

            // Post-Transfer Certificate & QR Code
            if (_transferred) ...[
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppTheme.surface,
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: AppTheme.moss),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text(
                          "OFFICIAL EPR IMPACT CERTIFICATE",
                          style: TextStyle(
                            fontFamily: 'monospace',
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: AppTheme.moss,
                          ),
                        ),
                        Icon(Icons.verified, size: 16, color: AppTheme.moss),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _certificate ??
                          "This official EPR Impact Certificate confirms the on-chain transfer and certified diversion of ${m.estimatedWeightKg} kg of ${m.category} scrap.",
                      style: const TextStyle(fontSize: 11, color: AppTheme.bone, fontStyle: FontStyle.italic, height: 1.4),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        QrImageView(
                          data: "https://amoy.polygonscan.com/tx/$_txHash",
                          version: QrVersions.auto,
                          size: 70.0,
                          backgroundColor: Colors.white,
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text("LEDGER TRANSACTION HASH", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                              const SizedBox(height: 2),
                              Text(
                                _txHash ?? "0x8f2e9a4f...",
                                style: const TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.moss),
                              ),
                              const SizedBox(height: 4),
                              const Text("Scan QR code for instant Polygonscan validation.", style: TextStyle(fontSize: 10, color: AppTheme.muted)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
            ],

            // Action Button
            if (!_transferred)
              ElevatedButton.icon(
                onPressed: _verifying ? null : _handleTransfer,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.moss,
                  foregroundColor: AppTheme.ink,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                ),
                icon: _verifying
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.ink),
                      )
                    : const Icon(Icons.verified_user),
                label: Text(
                  _verifying ? 'AUDITING WITH AI AGENT 2...' : 'REQUEST VERIFIED TRANSFER',
                  style: const TextStyle(
                    fontFamily: 'monospace',
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.8,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _specRow(String label, String value, {bool isHighlight = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: AppTheme.muted, fontSize: 11)),
        Text(
          value,
          style: TextStyle(
            color: isHighlight ? AppTheme.moss : AppTheme.bone,
            fontSize: 11,
            fontWeight: FontWeight.bold,
            fontFamily: 'monospace',
          ),
        ),
      ],
    );
  }
}
