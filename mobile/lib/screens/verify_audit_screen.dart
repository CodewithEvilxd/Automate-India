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
      'label': 'Aluminum Tx',
      'hash': '0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234',
      'title': 'Clean Aluminum Extrusion Offcuts (Series 6063)',
      'category': 'aluminum',
      'weight': '450',
      'co2': '4108.5',
    },
    {
      'label': 'PET Bottle Lot',
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
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.background,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'ON-CHAIN AUDIT PROOF',
              style: AppTheme.fontSans(
                fontSize: 14.5,
                fontWeight: FontWeight.w800,
                letterSpacing: 0.6,
                color: AppTheme.textMain,
              ),
            ),
            Text(
              'POLYGON AMOY TESTNET (80002)',
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
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              "Zero-Knowledge Public Verifier",
              style: AppTheme.fontMono(
                color: AppTheme.emerald,
                fontSize: 11.5,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              "Auditors, SPCB officers, and buyers can cryptographically verify any transaction hash or lot token.",
              style: AppTheme.fontSans(color: AppTheme.textMuted, fontSize: 11, height: 1.3),
            ),
            const SizedBox(height: 14),

            // Search Bar
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    style: AppTheme.fontMono(color: AppTheme.textMain, fontSize: 11.5),
                    decoration: InputDecoration(
                      hintText: 'Enter 0x... Transaction Hash',
                      hintStyle: AppTheme.fontMono(color: AppTheme.textMuted.withOpacity(0.6), fontSize: 11),
                      filled: true,
                      fillColor: AppTheme.surface,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppTheme.border),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppTheme.border),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: const BorderSide(color: AppTheme.emerald),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () => _handleVerify(_searchController.text),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.emerald,
                    foregroundColor: AppTheme.background,
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  child: Text(
                    'Verify',
                    style: AppTheme.fontMono(fontSize: 11, fontWeight: FontWeight.w800),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Sample Hashes
            Wrap(
              spacing: 8,
              runSpacing: 6,
              children: _sampleQueries.map((sample) {
                return InkWell(
                  borderRadius: BorderRadius.circular(6),
                  onTap: () {
                    _searchController.text = sample['hash']!;
                    _handleVerify(sample['hash']!, sample);
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceRaised,
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Text(
                      'Sample: ${sample['label']}',
                      style: AppTheme.fontMono(
                        fontSize: 9.5,
                        color: AppTheme.emerald,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 16),

            // Verified Proof Card
            if (_verified) ...[
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppTheme.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppTheme.emerald.withOpacity(0.5)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.verified, size: 16, color: AppTheme.emerald),
                            const SizedBox(width: 6),
                            Text(
                              "ON-CHAIN RECORD VERIFIED",
                              style: AppTheme.fontMono(
                                fontSize: 10,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.emerald,
                                letterSpacing: 0.6,
                              ),
                            ),
                          ],
                        ),
                        const VerificationStampWidget(size: 48),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Text(
                      _lotTitle,
                      style: AppTheme.fontSans(fontSize: 14, fontWeight: FontWeight.w800, color: AppTheme.textMain),
                    ),
                    const SizedBox(height: 8),

                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppTheme.surfaceRaised,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppTheme.border),
                      ),
                      child: Column(
                        children: [
                          _verifiedRow("Consensus Status", "CONFIRMED (Block #12849102)"),
                          const Divider(color: AppTheme.border),
                          _verifiedRow("Recycled Mass", "${_weightKg.toInt()} kg"),
                          const Divider(color: AppTheme.border),
                          _verifiedRow("CO₂ Abated", "+${_co2Kg.toStringAsFixed(1)} kg CO₂e", isHighlight: true),
                          const Divider(color: AppTheme.border),
                          _verifiedRow("Statutory EPR", "CPCB FY26-27 Approved"),
                        ],
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      "TX: $_txHash",
                      style: AppTheme.fontMono(fontSize: 8.5, color: AppTheme.textMuted),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Fraud Sentinel check on verified Tx
              FraudSentinelWidget(
                fromWallet: "0x8f2e9a4f20bc871239ab1e6d45901234c91a",
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

  Widget _verifiedRow(String label, String value, {bool isHighlight = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: AppTheme.fontSans(color: AppTheme.textMuted, fontSize: 11)),
        Text(
          value,
          style: AppTheme.fontMono(
            color: isHighlight ? AppTheme.emerald : AppTheme.textMain,
            fontWeight: FontWeight.w800,
            fontSize: 11,
          ),
        ),
      ],
    );
  }
}
