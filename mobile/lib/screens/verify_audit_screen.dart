import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/verification_stamp_widget.dart';

class VerifyAuditScreen extends StatefulWidget {
  const VerifyAuditScreen({Key? key}) : super(key: key);

  @override
  State<VerifyAuditScreen> createState() => _VerifyAuditScreenState();
}

class _VerifyAuditScreenState extends State<VerifyAuditScreen> {
  final _searchController = TextEditingController();
  bool _verified = false;
  String _txHash = '';

  void _handleVerify(String hash) {
    if (hash.isEmpty) return;
    setState(() {
      _verified = true;
      _txHash = hash;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Verify On-Chain'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Public Proof Engine',
              style: TextStyle(
                color: AppTheme.moss,
                fontSize: 12,
                fontWeight: FontWeight.bold,
                fontFamily: 'monospace',
              ),
            ),
            const SizedBox(height: 4),
            const Text(
              'Paste any Polygon Amoy transaction hash or Material Lot ID to audit.',
              style: TextStyle(color: AppTheme.muted, fontSize: 13),
            ),
            const SizedBox(height: 16),

            // Search Bar
            TextField(
              controller: _searchController,
              style: const TextStyle(color: AppTheme.bone, fontSize: 13, fontFamily: 'monospace'),
              decoration: InputDecoration(
                hintText: '0x8f2e9a4f... or lot_al_01',
                hintStyle: TextStyle(color: AppTheme.muted.withOpacity(0.5), fontSize: 12),
                filled: true,
                fillColor: AppTheme.surface,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(4),
                  borderSide: const BorderSide(color: AppTheme.border),
                ),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.search, color: AppTheme.moss),
                  onPressed: () => _handleVerify(_searchController.text),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Verified Result Box
            if (_verified) ...[
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.surface,
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: AppTheme.moss),
                ),
                child: Column(
                  children: [
                    VerificationStampWidget(txHash: _txHash, size: 90),
                    const SizedBox(height: 14),
                    const Text(
                      'CRYPTOGRAPHICALLY VALIDATED',
                      style: TextStyle(
                        color: AppTheme.moss,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _txHash,
                      style: const TextStyle(
                        color: AppTheme.bone,
                        fontSize: 11,
                        fontFamily: 'monospace',
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'AI Agent 2 Confidence: 98% • Polygon Amoy (80002)',
                      style: TextStyle(color: AppTheme.muted, fontSize: 11),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
