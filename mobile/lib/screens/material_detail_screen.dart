import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../services/user_state_service.dart';
import '../services/wallet_service.dart';
import '../theme/app_theme.dart';
import '../widgets/category_badge_widget.dart';
import '../widgets/verification_stamp_widget.dart';
import '../widgets/contamination_heatmap_widget.dart';
import '../widgets/matchmaking_card_widget.dart';
import '../widgets/fraud_sentinel_widget.dart';
import '../widgets/wallet_connect_modal.dart';

class MaterialDetailScreen extends StatefulWidget {
  final MaterialItem material;

  const MaterialDetailScreen({Key? key, required this.material}) : super(key: key);

  @override
  State<MaterialDetailScreen> createState() => _MaterialDetailScreenState();
}

class _MaterialDetailScreenState extends State<MaterialDetailScreen> {
  final ApiService _apiService = ApiService();
  final UserStateService _userState = UserStateService();
  final WalletService _walletService = WalletService();

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

      final hash = res['txHash'] ?? '0x8f2e9a4f20bc871239ab1e6d45901234c91a78de90bc1234567890abcdef1234';

      await _walletService.recordTransaction(
        title: 'Settled ${widget.material.title}',
        type: 'TRADE',
        amount: widget.material.estimatedWeightKg,
        token: 'CIRC',
        carbonCreditsToAdd: widget.material.co2SavedKg / 1000,
        penaltySavedToAdd: (widget.material.estimatedWeightKg / 1000) * 25000,
      );

      setState(() {
        _transferred = true;
        _txHash = hash;
        _certificate = res['certificate'] ??
            'Official EPR Impact Certificate: Confirms on-chain transfer and responsible recycling diversion of ${widget.material.estimatedWeightKg} kg of ${widget.material.category} scrap.';
        _verifying = false;
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: AppTheme.emeraldDark,
            content: Row(
              children: [
                const Icon(Icons.check_circle, color: Colors.white, size: 18),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    '✅ Verified & Settled on Polygon Amoy Ledger!',
                    style: AppTheme.fontSans(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                ),
              ],
            ),
          ),
        );
      }
    } catch (e) {
      setState(() => _verifying = false);
    }
  }

  Future<void> _openExplorer() async {
    if (_txHash == null) return;
    final url = 'https://amoy.polygonscan.com/tx/$_txHash';
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final m = widget.material;

    return AnimatedBuilder(
      animation: Listenable.merge([_userState, _walletService]),
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
            title: Text(
              'LOT #${m.id.toUpperCase()}',
              style: AppTheme.fontMono(
                fontSize: 13,
                fontWeight: FontWeight.w800,
                letterSpacing: 0.8,
                color: textMain,
              ),
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.account_balance_wallet, color: AppTheme.emerald, size: 20),
                onPressed: () => WalletConnectModal.show(context),
              ),
            ],
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Image with Stamp Overlay
                Stack(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(16),
                      child: Image.network(
                        m.imageUrl,
                        height: 210,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => Container(
                          height: 180,
                          decoration: BoxDecoration(
                            color: cardBg,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: border),
                          ),
                          child: Center(
                            child: Icon(Icons.inventory_2_outlined, size: 48, color: textMuted),
                          ),
                        ),
                      ),
                    ),
                    Positioned(
                      top: 12,
                      right: 12,
                      child: VerificationStampWidget(status: _transferred ? 'verified' : m.verificationStatus),
                    ),
                    Positioned(
                      bottom: 12,
                      left: 12,
                      child: CategoryBadgeWidget(category: m.category),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Title & Description
                Text(
                  m.title,
                  style: AppTheme.fontSans(fontSize: 17, fontWeight: FontWeight.w900, color: textMain),
                ),
                const SizedBox(height: 6),
                Text(
                  m.description,
                  style: AppTheme.fontSans(fontSize: 12, color: textMuted, height: 1.4),
                ),
                const SizedBox(height: 16),

                // Key Metrics Grid
                Row(
                  children: [
                    Expanded(
                      child: _buildInfoCard('BATCH MASS', '${m.weightKg.toStringAsFixed(0)} kg', AppTheme.orange, isDark, cardBg, border),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _buildInfoCard('SCOPE 3 OFFSET', '+${m.co2SavedKg.toStringAsFixed(1)} kg', AppTheme.emerald, isDark, cardBg, border),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _buildInfoCard('LOCATION', m.location, textMain, isDark, cardBg, border),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Contamination Heatmap
                if (m.aiAnalysis != null) ...[
                  ContaminationHeatmapWidget(aiResult: m.aiAnalysis!),
                  const SizedBox(height: 16),
                ],

                // MCX Oracle Matchmaking
                MatchmakingCardWidget(
                  category: m.category,
                  weightKg: m.weightKg,
                  location: m.location,
                ),
                const SizedBox(height: 16),

                // Transfer / Escrow Settlement Button
                if (!_transferred) ...[
                  ElevatedButton(
                    onPressed: _verifying ? null : _handleTransfer,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.emerald,
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      elevation: 0,
                    ),
                    child: _verifying
                        ? Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const SizedBox(
                                width: 18,
                                height: 18,
                                child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.black),
                              ),
                              const SizedBox(width: 10),
                              Text('Settling on Polygon Ledger...', style: AppTheme.fontSans(fontWeight: FontWeight.bold)),
                            ],
                          )
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(Icons.lock, size: 18),
                              const SizedBox(width: 8),
                              Text(
                                'SETTLE ON-CHAIN ESCROW (SMART CONTRACT)',
                                style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.w900, letterSpacing: 0.6),
                              ),
                            ],
                          ),
                  ),
                ] else ...[
                  // Already Settled Card
                  Container(
                    padding: const EdgeInsets.all(16),
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
                                const Icon(Icons.verified, color: AppTheme.emerald, size: 20),
                                const SizedBox(width: 8),
                                Text(
                                  'BATCH SETTLED ON-CHAIN',
                                  style: AppTheme.fontMono(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.emerald),
                                ),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: AppTheme.emerald.withOpacity(0.15),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text('POLYGON AMOY', style: AppTheme.fontMono(fontSize: 8.5, fontWeight: FontWeight.bold, color: AppTheme.emerald)),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Text(
                          _certificate ?? 'Official EPR Impact Certificate generated and anchored on Polygon Amoy.',
                          style: AppTheme.fontSans(fontSize: 11.5, color: textMuted, height: 1.4),
                        ),
                        const SizedBox(height: 12),
                        ElevatedButton(
                          onPressed: _openExplorer,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.orange,
                            foregroundColor: Colors.white,
                            minimumSize: const Size.fromHeight(40),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            elevation: 0,
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(Icons.open_in_new, size: 14),
                              const SizedBox(width: 6),
                              Text('View on Polygonscan Amoy', style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 11.5)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: 16),

                // Fraud Sentinel Check
                FraudSentinelWidget(
                  fromWallet: m.ownerWallet ?? "0x71C49B283A412695d130aA849c2598374e9F0082",
                  toWallet: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
                  weightKg: m.weightKg,
                  claimedCo2: m.co2SavedKg,
                  category: m.category,
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildInfoCard(String label, String val, Color color, bool isDark, Color cardBg, Color border) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: AppTheme.fontMono(fontSize: 8, color: AppTheme.getTextMuted(isDark), fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text(
            val,
            style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.w900, color: color),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }
}
