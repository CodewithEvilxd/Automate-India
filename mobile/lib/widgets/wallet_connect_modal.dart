import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/wallet_service.dart';
import '../services/user_state_service.dart';
import '../theme/app_theme.dart';

class WalletConnectModal extends StatefulWidget {
  const WalletConnectModal({Key? key}) : super(key: key);

  static void show(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => const WalletConnectModal(),
    );
  }

  @override
  State<WalletConnectModal> createState() => _WalletConnectModalState();
}

class _WalletConnectModalState extends State<WalletConnectModal> {
  final WalletService _walletService = WalletService();
  final UserStateService _userState = UserStateService();
  bool _claimingFaucet = false;
  String? _lastClaimedHash;
  int _activeTab = 0; // 0: Overview, 1: Receive QR, 2: History

  final List<Map<String, dynamic>> _walletProviders = [
    {
      'name': 'MetaMask',
      'icon': Icons.account_balance_wallet,
      'color': Color(0xFFF6851B),
      'desc': 'Popular EVM Web3 Browser & Mobile Wallet',
    },
    {
      'name': 'Coinbase Wallet',
      'icon': Icons.shield,
      'color': Color(0xFF0052FF),
      'desc': 'Secure Self-Custody Multi-Chain Wallet',
    },
    {
      'name': 'Trust Wallet',
      'icon': Icons.verified_user,
      'color': Color(0xFF3375BB),
      'desc': 'Official Binance Multi-Asset Crypto Wallet',
    },
    {
      'name': 'Burner',
      'icon': Icons.bolt,
      'color': AppTheme.emerald,
      'desc': '⚡ 1-Click Instant Gasless Wallet for Kabadiwalas',
    },
  ];

  Future<void> _handleClaimFaucet() async {
    setState(() => _claimingFaucet = true);
    try {
      final txHash = await _walletService.claimFaucetTokens();
      if (mounted) {
        setState(() {
          _claimingFaucet = false;
          _lastClaimedHash = txHash;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: AppTheme.emeraldDark,
            content: Row(
              children: [
                const Icon(Icons.check_circle, color: Colors.white, size: 18),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Faucet Claimed: +0.5 POL & +500 CIRC Airdropped!',
                    style: AppTheme.fontSans(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                ),
              ],
            ),
          ),
        );
      }
    } catch (_) {
      if (mounted) setState(() => _claimingFaucet = false);
    }
  }

  void _copyAddress() {
    Clipboard.setData(ClipboardData(text: _walletService.address));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: AppTheme.darkSurfaceRaised,
        duration: const Duration(seconds: 2),
        content: Text(
          'Wallet address copied to clipboard!',
          style: AppTheme.fontSans(color: AppTheme.emerald, fontSize: 12, fontWeight: FontWeight.w600),
        ),
      ),
    );
  }

  Future<void> _openExplorer(String url) async {
    try {
      final uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      }
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    final isDark = _userState.isDarkMode;
    final bg = AppTheme.getSurface(isDark);
    final textMain = AppTheme.getTextMain(isDark);
    final textMuted = AppTheme.getTextMuted(isDark);
    final border = AppTheme.getBorder(isDark);
    final cardBg = AppTheme.getSurfaceRaised(isDark);

    return AnimatedBuilder(
      animation: Listenable.merge([_walletService, _userState]),
      builder: (context, _) {
        return Container(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height * 0.90,
          ),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
            border: Border.all(color: border, width: 1.5),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.5),
                blurRadius: 30,
                offset: const Offset(0, -10),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Grab handle
              Center(
                child: Container(
                  margin: const EdgeInsets.only(top: 12, bottom: 8),
                  width: 44,
                  height: 4.5,
                  decoration: BoxDecoration(
                    color: textMuted.withOpacity(0.4),
                    borderRadius: BorderRadius.circular(3),
                  ),
                ),
              ),

              // Header
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            AppTheme.orange.withOpacity(0.2),
                            AppTheme.emerald.withOpacity(0.2),
                          ],
                        ),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppTheme.emerald.withOpacity(0.4)),
                      ),
                      child: const Icon(Icons.account_balance_wallet, color: AppTheme.emerald, size: 20),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'POLYGON AMOY WALLET',
                            style: AppTheme.fontSans(
                              fontSize: 14,
                              fontWeight: FontWeight.w800,
                              color: textMain,
                              letterSpacing: 0.6,
                            ),
                          ),
                          Text(
                            'Chain ID: 80002 · Zero-Gas Sponsored',
                            style: AppTheme.fontMono(
                              fontSize: 10,
                              color: AppTheme.orange,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: Icon(Icons.close, color: textMuted, size: 20),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
              ),

              // Tabs
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
                child: Row(
                  children: [
                    _buildTabBtn(0, 'Overview', Icons.dashboard_outlined),
                    const SizedBox(width: 8),
                    _buildTabBtn(1, 'Receive QR', Icons.qr_code),
                    const SizedBox(width: 8),
                    _buildTabBtn(2, 'History (${_walletService.transactions.length})', Icons.history),
                  ],
                ),
              ),

              const SizedBox(height: 8),
              const Divider(height: 1),

              // Content Area
              Flexible(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(20),
                  child: _activeTab == 0
                      ? _buildOverviewTab(isDark, cardBg, textMain, textMuted, border)
                      : _activeTab == 1
                          ? _buildQrTab(isDark, cardBg, textMain, textMuted, border)
                          : _buildHistoryTab(isDark, cardBg, textMain, textMuted, border),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildTabBtn(int index, String label, IconData icon) {
    final isDark = _userState.isDarkMode;
    final isActive = _activeTab == index;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _activeTab = index),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isActive 
                ? (isDark ? AppTheme.darkSurfaceSubtle : AppTheme.lightSurfaceSubtle)
                : Colors.transparent,
            borderRadius: BorderRadius.circular(10),
            border: Border.all(
              color: isActive ? AppTheme.emerald : Colors.transparent,
              width: 1.2,
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 14,
                color: isActive ? AppTheme.emerald : AppTheme.getTextMuted(isDark),
              ),
              const SizedBox(width: 4),
              Text(
                label,
                style: AppTheme.fontSans(
                  fontSize: 11,
                  fontWeight: isActive ? FontWeight.w700 : FontWeight.w500,
                  color: isActive ? AppTheme.getTextMain(isDark) : AppTheme.getTextMuted(isDark),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOverviewTab(bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Connected Account Card
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: isDark
                  ? [const Color(0xFF131824), const Color(0xFF0D111A)]
                  : [const Color(0xFFFFFFFF), const Color(0xFFF3EFEA)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: AppTheme.emerald.withOpacity(0.35), width: 1.5),
            boxShadow: [
              BoxShadow(
                color: AppTheme.emerald.withOpacity(0.08),
                blurRadius: 15,
                spreadRadius: 2,
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: const BoxDecoration(
                          color: AppTheme.emerald,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        _walletService.activeWalletType.toUpperCase(),
                        style: AppTheme.fontMono(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.emerald,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppTheme.orange.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: AppTheme.orange.withOpacity(0.3)),
                    ),
                    child: Text(
                      'POLYGON 80002',
                      style: AppTheme.fontMono(
                        fontSize: 9,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.orange,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Address with copy button
              Row(
                children: [
                  Expanded(
                    child: Text(
                      _walletService.address,
                      style: AppTheme.fontMono(
                        fontSize: 11.5,
                        fontWeight: FontWeight.w600,
                        color: textMain,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  IconButton(
                    onPressed: _copyAddress,
                    icon: const Icon(Icons.copy, size: 16, color: AppTheme.emerald),
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                  ),
                ],
              ),

              const SizedBox(height: 16),
              const Divider(height: 1),
              const SizedBox(height: 14),

              // Balances Grid
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'CIRC TOKENS',
                          style: AppTheme.fontMono(fontSize: 9, color: textMuted, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '${_walletService.circBalance.toStringAsFixed(0)} \$CIRC',
                          style: AppTheme.fontSans(
                            fontSize: 18,
                            fontWeight: FontWeight.w900,
                            color: AppTheme.emerald,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'TESTNET GAS',
                          style: AppTheme.fontMono(fontSize: 9, color: textMuted, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '${_walletService.polBalance.toStringAsFixed(3)} POL',
                          style: AppTheme.fontSans(
                            fontSize: 18,
                            fontWeight: FontWeight.w900,
                            color: textMain,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'CARBON RETIRED',
                          style: AppTheme.fontMono(fontSize: 9, color: textMuted, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '${_walletService.carbonCreditsTons.toStringAsFixed(1)} tCO₂e',
                          style: AppTheme.fontSans(
                            fontSize: 14,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.teal,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'AVOIDED PENALTY',
                          style: AppTheme.fontMono(fontSize: 9, color: textMuted, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '₹${(_walletService.avoidedPenaltiesInr / 1000).toStringAsFixed(0)}k',
                          style: AppTheme.fontSans(
                            fontSize: 14,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.orange,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // Claim Faucet Button
        ElevatedButton(
          onPressed: _claimingFaucet ? null : _handleClaimFaucet,
          style: ElevatedButton.styleFrom(
            backgroundColor: AppTheme.orange,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(vertical: 14),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            elevation: 0,
          ),
          child: _claimingFaucet
              ? Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(
                      width: 16,
                      height: 16,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                    ),
                    const SizedBox(width: 10),
                    Text('Minting Testnet Faucet...', style: AppTheme.fontSans(fontWeight: FontWeight.bold)),
                  ],
                )
              : Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.water_drop, size: 18),
                    const SizedBox(width: 8),
                    Text(
                      'Claim Testnet Faucet (+0.5 POL & +500 CIRC)',
                      style: AppTheme.fontSans(fontWeight: FontWeight.w800, fontSize: 12.5),
                    ),
                  ],
                ),
        ),

        const SizedBox(height: 12),

        // Gasless Meta-Tx Toggle
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          decoration: BoxDecoration(
            color: cardBg,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: border),
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: AppTheme.emerald.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(Icons.bolt, color: AppTheme.emerald, size: 16),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Gasless Meta-Tx Sponsor (Biconomy)',
                      style: AppTheme.fontSans(fontSize: 11.5, fontWeight: FontWeight.bold, color: textMain),
                    ),
                    Text(
                      'Zero gas required for scrap listings & minting',
                      style: AppTheme.fontSans(fontSize: 9.5, color: textMuted),
                    ),
                  ],
                ),
              ),
              Switch(
                value: _walletService.gaslessSponsored,
                onChanged: (_) => _walletService.toggleGasless(),
                activeColor: AppTheme.emerald,
              ),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // Switch Wallet Options
        Text(
          'SWITCH OR CONNECT ALTERNATIVE WALLET',
          style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.w800, color: textMuted, letterSpacing: 0.5),
        ),
        const SizedBox(height: 10),
        ..._walletProviders.map((w) {
          final isSelected = _walletService.activeWalletType == w['name'];
          return Container(
            margin: const EdgeInsets.only(bottom: 8),
            decoration: BoxDecoration(
              color: isSelected ? AppTheme.emerald.withOpacity(0.1) : cardBg,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: isSelected ? AppTheme.emerald : border,
                width: isSelected ? 1.5 : 1,
              ),
            ),
            child: ListTile(
              dense: true,
              leading: Icon(w['icon'] as IconData, color: w['color'] as Color, size: 22),
              title: Text(
                w['name'] as String,
                style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 12.5, color: textMain),
              ),
              subtitle: Text(
                w['desc'] as String,
                style: AppTheme.fontSans(fontSize: 10, color: textMuted),
              ),
              trailing: isSelected
                  ? const Icon(Icons.check_circle, color: AppTheme.emerald, size: 18)
                  : Icon(Icons.chevron_right, color: textMuted, size: 18),
              onTap: () async {
                await _walletService.connectWallet(w['name'] as String);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    backgroundColor: AppTheme.emeraldDark,
                    content: Text('Switched to ${w['name']}'),
                  ),
                );
              },
            ),
          );
        }).toList(),
      ],
    );
  }

  Widget _buildQrTab(bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'SCAN TO RECEIVE SCRAP TOKENS & SETTLEMENTS',
          style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.w800, color: textMuted, letterSpacing: 0.5),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: AppTheme.emerald, width: 2),
            boxShadow: [
              BoxShadow(
                color: AppTheme.emerald.withOpacity(0.2),
                blurRadius: 20,
              ),
            ],
          ),
          child: QrImageView(
            data: _walletService.address,
            version: QrVersions.auto,
            size: 200.0,
            eyeStyle: const QrEyeStyle(
              eyeShape: QrEyeShape.square,
              color: Color(0xFF0F131A),
            ),
            dataModuleStyle: const QrDataModuleStyle(
              dataModuleShape: QrDataModuleShape.square,
              color: Color(0xFF0F131A),
            ),
          ),
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: cardBg,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: border),
          ),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  _walletService.address,
                  style: AppTheme.fontMono(fontSize: 11, color: textMain),
                  textAlign: TextAlign.center,
                ),
              ),
              IconButton(
                onPressed: _copyAddress,
                icon: const Icon(Icons.copy, size: 16, color: AppTheme.emerald),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Text(
          'Accepts \$POL, \$CIRC, and CPCB Digital Compliance Tokens on Polygon Amoy (80002).',
          style: AppTheme.fontSans(fontSize: 10.5, color: textMuted),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildHistoryTab(bool isDark, Color cardBg, Color textMain, Color textMuted, Color border) {
    final txs = _walletService.transactions;
    if (txs.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Text('No transaction history yet.', style: AppTheme.fontSans(color: textMuted)),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'ON-CHAIN AUDIT TRAIL (POLYGONSCAN AMOY)',
          style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.w800, color: textMuted, letterSpacing: 0.5),
        ),
        const SizedBox(height: 12),
        ...txs.map((tx) {
          final isMint = tx.type == 'MINT';
          final isFaucet = tx.type == 'FAUCET';
          final isEpr = tx.type == 'EPR_CERT';
          final iconColor = isFaucet ? AppTheme.orange : isMint ? AppTheme.emerald : AppTheme.teal;

          return Container(
            margin: const EdgeInsets.only(bottom: 10),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: cardBg,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            color: iconColor.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Icon(
                            isFaucet ? Icons.water_drop : isMint ? Icons.add_circle : isEpr ? Icons.verified : Icons.swap_horiz,
                            color: iconColor,
                            size: 14,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          tx.type,
                          style: AppTheme.fontMono(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: iconColor,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppTheme.emerald.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        'CONFIRMED',
                        style: AppTheme.fontMono(fontSize: 8.5, fontWeight: FontWeight.bold, color: AppTheme.emerald),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  tx.title,
                  style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.bold, color: textMain),
                ),
                const SizedBox(height: 4),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${tx.amount} ${tx.token}',
                      style: AppTheme.fontSans(fontSize: 11, fontWeight: FontWeight.w700, color: AppTheme.emerald),
                    ),
                    InkWell(
                      onTap: () => _openExplorer(tx.explorerUrl),
                      child: Row(
                        children: [
                          Text(
                            '${tx.txHash.substring(0, 8)}...${tx.txHash.substring(tx.txHash.length - 4)}',
                            style: AppTheme.fontMono(fontSize: 9.5, color: AppTheme.orange, fontWeight: FontWeight.w600),
                          ),
                          const SizedBox(width: 3),
                          const Icon(Icons.open_in_new, size: 11, color: AppTheme.orange),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          );
        }).toList(),
      ],
    );
  }
}
