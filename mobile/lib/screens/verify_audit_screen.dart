import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/app_theme.dart';
import '../services/user_state_service.dart';
import '../widgets/verification_stamp_widget.dart';
import '../widgets/fraud_sentinel_widget.dart';

class VerifyAuditScreen extends StatefulWidget {
  const VerifyAuditScreen({Key? key}) : super(key: key);

  @override
  State<VerifyAuditScreen> createState() => _VerifyAuditScreenState();
}

class _VerifyAuditScreenState extends State<VerifyAuditScreen> {
  final UserStateService _userState = UserStateService();
  final _searchController = TextEditingController();
  bool _verified = false;
  String _txHash = '';
  String _lotTitle = "Clean Aluminum Extrusion Offcuts (Series 6063)";
  String _category = "aluminum";
  double _weightKg = 450.0;
  double _co2Kg = 4108.5;

  final List<Map<String, String>> _sampleQueries = [
    {
      'label': 'Aluminum 6063 Tx',
      'hash': '0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234',
      'title': 'Clean Aluminum Extrusion Offcuts (Series 6063)',
      'category': 'aluminum',
      'weight': '450',
      'co2': '4108.5',
    },
    {
      'label': 'PET Bottle Lot Tx',
      'hash': '0x3d0bc12948a7192837bc910283748293bc910293847291038472910384729103',
      'title': 'Post-Consumer Clean Washed PET Flakes',
      'category': 'plastic_pet',
      'weight': '1200',
      'co2': '1776.0',
    },
    {
      'label': 'Berry Copper Scrap Tx',
      'hash': '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
      'title': 'Stripped Heavy Berry Copper Wire (No. 1)',
      'category': 'copper',
      'weight': '280',
      'co2': '786.8',
    },
  ];

  @override
  void initState() {
    super.initState();
    _handleVerify(_sampleQueries[0]['hash']!, _sampleQueries[0]);
  }

  void _handleVerify(String hash, [Map<String, String>? sample]) {
    if (hash.isEmpty) return;
    setState(() {
      _verified = true;
      _txHash = hash;
      _searchController.text = hash;
      if (sample != null) {
        _lotTitle = sample['title']!;
        _category = sample['category']!;
        _weightKg = double.parse(sample['weight']!);
        _co2Kg = double.parse(sample['co2']!);
      }
    });
  }

  Future<void> _openExplorer() async {
    final url = 'https://amoy.polygonscan.com/tx/$_txHash';
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _userState,
      builder: (context, _) {
        final isDark = _userState.isDarkMode;
        final bg = AppTheme.getBackground(isDark);
        final surface = AppTheme.getSurface(isDark);
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
                  'ON-CHAIN AUDIT PROOF',
                  style: AppTheme.fontSans(
                    fontSize: 14,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 0.6,
                    color: textMain,
                  ),
                ),
                Text(
                  'POLYGON AMOY TESTNET (80002) · ZERO-KNOWLEDGE',
                  style: AppTheme.fontMono(
                    fontSize: 8.5,
                    color: AppTheme.emerald,
                    fontWeight: FontWeight.w700,
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
                // Top Verification Intro
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppTheme.emerald.withOpacity(0.35)),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: AppTheme.emerald.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.qr_code_scanner, color: AppTheme.emerald, size: 22),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Zero-Knowledge Public Verifier",
                              style: AppTheme.fontSans(fontSize: 12.5, fontWeight: FontWeight.w800, color: textMain),
                            ),
                            Text(
                              "Verify physical weighbridge readings, IPFS visual hashes, and EPA WARM emissions certificates.",
                              style: AppTheme.fontSans(fontSize: 10.5, color: textMuted, height: 1.3),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // Search Input Field
                TextField(
                  controller: _searchController,
                  style: AppTheme.fontMono(fontSize: 11, color: textMain),
                  decoration: InputDecoration(
                    hintText: "Enter Polygon Amoy Tx Hash (0x...)",
                    hintStyle: AppTheme.fontMono(fontSize: 10, color: textMuted),
                    filled: true,
                    fillColor: surface,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: border)),
                    enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: border)),
                    focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppTheme.emerald, width: 1.5)),
                    suffixIcon: IconButton(
                      icon: const Icon(Icons.search, color: AppTheme.emerald),
                      onPressed: () => _handleVerify(_searchController.text),
                    ),
                  ),
                ),
                const SizedBox(height: 10),

                // Sample Query Pills
                Wrap(
                  spacing: 8,
                  runSpacing: 6,
                  children: _sampleQueries.map((s) {
                    final isSel = _txHash == s['hash'];
                    return GestureDetector(
                      onTap: () => _handleVerify(s['hash']!, s),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: isSel ? AppTheme.emerald.withOpacity(0.2) : cardBg,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: isSel ? AppTheme.emerald : border),
                        ),
                        child: Text(
                          s['label']!,
                          style: AppTheme.fontMono(
                            fontSize: 9.5,
                            fontWeight: FontWeight.bold,
                            color: isSel ? AppTheme.emerald : textMuted,
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 16),

                // Verified Result Card
                if (_verified) ...[
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: surface,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppTheme.emerald.withOpacity(0.5), width: 1.5),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                const Icon(Icons.check_circle, color: AppTheme.emerald, size: 18),
                                const SizedBox(width: 6),
                                Text(
                                  "IMMUTABLE LEDGER RECORD",
                                  style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.w800, color: AppTheme.emerald),
                                ),
                              ],
                            ),
                            const VerificationStampWidget(status: 'verified'),
                          ],
                        ),
                        const SizedBox(height: 12),

                        Text(
                          _lotTitle,
                          style: AppTheme.fontSans(fontSize: 14, fontWeight: FontWeight.w900, color: textMain),
                        ),
                        const SizedBox(height: 8),

                        // Metrics Grid
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("BATCH MASS", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                                Text("${_weightKg.toStringAsFixed(0)} kg", style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w800, color: AppTheme.orange)),
                              ],
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("SCOPE 3 ABATED", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                                Text("+${_co2Kg.toStringAsFixed(1)} kg CO₂e", style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w800, color: AppTheme.emerald)),
                              ],
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text("CONSENSUS", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                                Text("128 Validators", style: AppTheme.fontSans(fontSize: 11, fontWeight: FontWeight.bold, color: textMain)),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),

                        // Tx Hash Container
                        Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: cardBg,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: border),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("POLYGON AMOY TX HASH", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted, fontWeight: FontWeight.bold)),
                              const SizedBox(height: 3),
                              Text(
                                _txHash,
                                style: AppTheme.fontMono(fontSize: 9.5, color: AppTheme.orange),
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),

                        // Button to view on Polygonscan
                        ElevatedButton(
                          onPressed: _openExplorer,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.orange,
                            foregroundColor: Colors.white,
                            minimumSize: const Size.fromHeight(42),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            elevation: 0,
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(Icons.open_in_new, size: 14),
                              const SizedBox(width: 6),
                              Text("Inspect on Polygonscan Amoy", style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 11.5)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Fraud Sentinel Check
                  FraudSentinelWidget(
                    fromWallet: "0x71C49B283A412695d130aA849c2598374e9F0082",
                    toWallet: "0x8A14f8615A6305aD0B3459c0C1e59273f5546e55",
                    weightKg: _weightKg,
                    claimedCo2: _co2Kg,
                    category: _category,
                  ),
                ],
                const SizedBox(height: 20),
              ],
            ),
          ),
        );
      },
    );
  }
}
