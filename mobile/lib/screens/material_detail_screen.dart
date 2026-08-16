import 'package:flutter/material.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/category_badge_widget.dart';
import '../widgets/verification_stamp_widget.dart';

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

  @override
  void initState() {
    super.initState();
    _transferred = widget.material.status == 'transferred';
    _txHash = widget.material.transactions?.isNotEmpty == true
        ? widget.material.transactions![0]['tx_hash']
        : null;
  }

  Future<void> _handleTransfer() async {
    setState(() => _verifying = true);
    try {
      // Trigger AI Agent 2 verification + Polygon Amoy backend transfer
      const mockBuyerWallet = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
      final res = await _apiService.verifyAndTransfer(widget.material.id, mockBuyerWallet);
      
      setState(() {
        _transferred = true;
        _txHash = res['txHash'] ?? '0x8f2e9a4f...amoy';
        _verifying = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Ownership transferred and CIRC token minted!')),
      );
    } catch (e) {
      setState(() => _verifying = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Transfer failed: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final m = widget.material;

    return Scaffold(
      appBar: AppBar(
        title: Text('Lot #${m.id}'),
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
                    height: 200,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(
                      height: 200,
                      color: AppTheme.surfaceRaised,
                      child: const Center(
                        child: Icon(Icons.inventory_2, size: 50, color: AppTheme.muted),
                      ),
                    ),
                  ),
                ),
                if (_transferred)
                  Positioned.fill(
                    child: Container(
                      color: Colors.black.withOpacity(0.5),
                      child: Center(
                        child: VerificationStampWidget(txHash: _txHash, size: 100),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 16),

            // Title & Badges
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                CategoryBadgeWidget(category: m.category),
                Text(
                  'Hub: ${m.location}',
                  style: const TextStyle(color: AppTheme.muted, fontSize: 12),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              m.title,
              style: const TextStyle(
                color: AppTheme.bone,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              m.description,
              style: const TextStyle(color: AppTheme.muted, fontSize: 13, height: 1.4),
            ),
            const SizedBox(height: 16),

            // Specs Card
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                children: [
                  _specRow('Physical Lot Mass', '${m.estimatedWeightKg} kg'),
                  const Divider(color: AppTheme.border),
                  _specRow('Calculated CO₂ Abated', '+${m.co2SavedKg.toStringAsFixed(1)} kg CO₂e', isHighlight: true),
                  const Divider(color: AppTheme.border),
                  _specRow('Condition Grade', m.condition),
                  const Divider(color: AppTheme.border),
                  _specRow('Origin Wallet', '${m.ownerWallet.substring(0, 6)}...'),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Action Button
            if (!_transferred)
              ElevatedButton.icon(
                onPressed: _verifying ? null : _handleTransfer,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.moss,
                  foregroundColor: AppTheme.ink,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
                icon: _verifying
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.ink),
                      )
                    : const Icon(Icons.verified_user),
                label: Text(_verifying ? 'Verifying with AI Agent 2...' : 'Request Verified Transfer'),
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
        Text(label, style: const TextStyle(color: AppTheme.muted, fontSize: 12)),
        Text(
          value,
          style: TextStyle(
            color: isHighlight ? AppTheme.moss : AppTheme.bone,
            fontSize: 12,
            fontWeight: FontWeight.bold,
            fontFamily: 'monospace',
          ),
        ),
      ],
    );
  }
}
