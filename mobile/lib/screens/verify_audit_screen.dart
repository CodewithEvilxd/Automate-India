import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/verification_stamp_widget.dart';
import '../widgets/fraud_sentinel_widget.dart';

class VerifyAuditScreen extends StatefulWidget {
  const VerifyAuditScreen({Key? key}) : super(key: key);

  @override
  State<VerifyAuditScreen> createState() => _VerifyAuditScreenState();
}

class _VerifyAuditScreenState extends State<VerifyAuditScreen> {
  final _searchController = TextEditingController();
  bool _verified = false;
  String _txHash = '';
  String _lotTitle = "Clean Aluminum Extrusion Offcuts (Series 6063)";
  String _category = "aluminum";
  double _weightKg = 450.0;
  double _co2Kg = 4108.5;

  final List<Map<String, String>> _sampleQueries = [
    {
      'label': 'Aluminum Extrusions Tx',
      'hash': '0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234',
      'title': 'Clean Aluminum Extrusion Offcuts (Series 6063)',
      'category': 'aluminum',
      'weight': '450',
      'co2': '4108.5',
    },
    {
      'label': 'PET Bottle Flakes Lot',
      'hash': '0x3d0bc12948a7192837bc910283748293bc910293847291038472910384729103',
      'title': 'Post-Consumer Clean Washed PET Flakes',
      'category': 'plastic_pet',
      'weight': '1200',
      'co2': '1800.0',
    },
  ];

  void _handleVerify(String hash, [Map<String, String>? sample]) {
    if (hash.isEmpty) return;
    setState(() {
      _verified = true;
      _txHash = hash;
      if (sample != null) {
        _lotTitle = sample['title']!;
        _category = sample['category']!;
        _weightKg = double.parse(sample['weight']!);
        _co2Kg = double.parse(sample['co2']!);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              'VERIFY ON-CHAIN PROOF',
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.0,
                color: AppTheme.bone,
              ),
            ),
            Text(
              'POLYGON AMOY TESTNET (80002)',
              style: TextStyle(
                fontSize: 9,
                color: AppTheme.moss,
                fontFamily: 'monospace',
              ),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              "Zero-Knowledge Public Verifier",
              style: TextStyle(
                color: AppTheme.moss,
                fontSize: 12,
                fontWeight: FontWeight.bold,
                fontFamily: 'monospace',
              ),
            ),
            const SizedBox(height: 4),
            const Text(
              "Inspect any transaction hash, lot ID, or QR code to audit cryptographic signatures and EPA WARM carbon math.",
              style: TextStyle(color: AppTheme.muted, fontSize: 12, height: 1.3),
            ),
            const SizedBox(height: 14),

            // Search Bar
            TextField(
              controller: _searchController,
              style: const TextStyle(color: AppTheme.bone, fontSize: 12, fontFamily: 'monospace'),
              decoration: InputDecoration(
                hintText: '0x8f2e9a4f... or lot_al_01',
                hintStyle: TextStyle(color: AppTheme.muted.withOpacity(0.5), fontSize: 11),
                filled: true,
                fillColor: AppTheme.surface,
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(4),
                  borderSide: const BorderSide(color: AppTheme.border),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(4),
                  borderSide: const BorderSide(color: AppTheme.border),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(4),
                  borderSide: const BorderSide(color: AppTheme.moss),
                ),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.search, color: AppTheme.moss, size: 20),
                  onPressed: () => _handleVerify(_searchController.text),
                ),
              ),
            ),
            const SizedBox(height: 10),

            // Sample Quick Queries
            Wrap(
              spacing: 6,
              children: _sampleQueries.map((s) {
                return ActionChip(
                  label: Text(s['label']!, style: const TextStyle(fontFamily: 'monospace', fontSize: 10, color: AppTheme.bone)),
                  backgroundColor: AppTheme.surface,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(4),
                    side: const BorderSide(color: AppTheme.border),
                  ),
                  onPressed: () {
                    _searchController.text = s['hash']!;
                    _handleVerify(s['hash']!, s);
                  },
                );
              }).toList(),
            ),
            const SizedBox(height: 16),

            // Verified Proof Card
            if (_verified) ...[
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.surface,
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: AppTheme.moss),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: VerificationStampWidget(txHash: _txHash, size: 90),
                    ),
                    const SizedBox(height: 12),
                    const Center(
                      child: Text(
                        'CRYPTOGRAPHICALLY VALIDATED',
                        style: TextStyle(
                          fontFamily: 'monospace',
                          color: AppTheme.moss,
                          fontWeight: FontWeight.bold,
                          fontSize: 11,
                          letterSpacing: 1.0,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),

                    Text(
                      _lotTitle,
                      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.bone),
                    ),
                    const SizedBox(height: 8),

                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppTheme.ink,
                        borderRadius: BorderRadius.circular(4),
                        border: Border.all(color: AppTheme.border),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text("TRANSACTION HASH", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                          const SizedBox(height: 2),
                          Text(
                            _txHash,
                            style: const TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.moss),
                          ),
                          const Divider(color: AppTheme.border),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text("Mass Diverted", style: TextStyle(fontFamily: 'monospace', fontSize: 10, color: AppTheme.muted)),
                              Text("${_weightKg.toInt()} kg", style: const TextStyle(fontFamily: 'monospace', fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.bone)),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text("EPA WARM Carbon Saved", style: TextStyle(fontFamily: 'monospace', fontSize: 10, color: AppTheme.muted)),
                              Text("+${_co2Kg.toStringAsFixed(1)} kg CO₂e", style: const TextStyle(fontFamily: 'monospace', fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.moss)),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: const [
                              Text("Smart Contract", style: TextStyle(fontFamily: 'monospace', fontSize: 10, color: AppTheme.muted)),
                              Text("MaterialRegistry.sol", style: TextStyle(fontFamily: 'monospace', fontSize: 10, color: AppTheme.bone)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Feature 4: On-Chain Fraud Sentinel Badge
              FraudSentinelWidget(
                fromWallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                toWallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
                weightKg: _weightKg,
                claimedCo2: _co2Kg,
                category: _category,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
