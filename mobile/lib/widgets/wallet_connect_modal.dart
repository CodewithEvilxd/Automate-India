import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/wallet_service.dart';
import '../services/user_state_service.dart';
import '../theme/app_theme.dart';

class WalletConnectModal extends StatefulWidget {
  const WalletConnectModal({Key? key}) : super(key: key);

  static Future<void> show(BuildContext context) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => const WalletConnectModal(),
    );
  }

  @override
  State<WalletConnectModal> createState() => _WalletConnectModalState();
}

class _WalletConnectModalState extends State<WalletConnectModal> {
  final WalletService _walletService = WalletService();
  final UserStateService _userState = UserStateService();
  final TextEditingController _customAddressController = TextEditingController();

  int _selectedTab = 0; // 0: Overview, 1: Receive QR, 2: History
  bool _isClaimingFaucet = false;
  bool _isConnecting = false;
  bool _showCustomInput = false;

  @override
  void dispose() {
    _customAddressController.dispose();
    super.dispose();
  }

  Future<void> _handleClaimFaucet() async {
    setState(() => _isClaimingFaucet = true);
    try {
      final txHash = await _walletService.claimFaucet();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: AppTheme.emerald,
            content: Row(
              children: [
                const Icon(Icons.check_circle, color: Colors.black, size: 18),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Faucet Claimed! +0.50 POL & +500 CIRC credited to your wallet.',
                    style: AppTheme.fontSans(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                ),
              ],
            ),
            action: SnackBarAction(
              label: 'VIEW SCAN',
              textColor: Colors.black,
              onPressed: () {
                final url = Uri.parse('https://amoy.polygonscan.com/tx/$txHash');
                launchUrl(url, mode: LaunchMode.externalApplication);
              },
            ),
          ),
        );
      }
    } catch (_) {} finally {
      if (mounted) setState(() => _isClaimingFaucet = false);
    }
  }

  Future<void> _handleConnectWallet(String walletType, {String? customAddress}) async {
    setState(() => _isConnecting = true);
    await Future.delayed(const Duration(milliseconds: 700));
    await _walletService.connect(walletType, customAddress: customAddress);
    if (mounted) {
      setState(() {
        _isConnecting = false;
        _showCustomInput = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: AppTheme.emerald,
          content: Text(
            'Connected to Polygon Amoy with $walletType!',
            style: AppTheme.fontSans(color: Colors.black, fontWeight: FontWeight.bold),
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: Listenable.merge([_walletService, _userState]),
      builder: (context, _) {
        final isDark = _userState.isDarkMode;
        final bg = isDark ? const Color(0xFF0C1017) : const Color(0xFFFAF8F5);
        final surface = isDark ? const Color(0xFF131A24) : Colors.white;
        final cardBg = isDark ? const Color(0xFF182230) : const Color(0xFFF3EFEA);
        final textMain = AppTheme.getTextMain(isDark);
        final textMuted = AppTheme.getTextMuted(isDark);
        final border = isDark ? const Color(0xFF223044) : const Color(0xFFD6CFC4);

        return Container(
          decoration: BoxDecoration(
            color: bg,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
            border: Border.all(color: border, width: 1.2),
          ),
          padding: EdgeInsets.only(
            top: 12,
            bottom: MediaQuery.of(context).viewInsets.bottom + 20,
          ),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Handle Bar
                Container(
                  width: 44,
                  height: 4,
                  decoration: BoxDecoration(
                    color: textMuted.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                const SizedBox(height: 14),

                // Modal Header
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(7),
                            decoration: BoxDecoration(
                              color: _walletService.isConnected 
                                  ? AppTheme.emerald.withOpacity(0.15)
                                  : AppTheme.orange.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(
                                color: _walletService.isConnected ? AppTheme.emerald : AppTheme.orange,
                              ),
                            ),
                            child: Icon(
                              Icons.account_balance_wallet_rounded,
                              color: _walletService.isConnected ? AppTheme.emerald : AppTheme.orange,
                              size: 20,
                            ),
                          ),
                          const SizedBox(width: 10),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'POLYGON AMOY WALLET',
                                style: AppTheme.fontSans(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w900,
                                  color: textMain,
                                  letterSpacing: 0.5,
                                ),
                              ),
                              Text(
                                _walletService.isConnected 
                                    ? 'Chain ID: 80002 · ${_walletService.activeWalletType}'
                                    : 'Connect Web3 Account or Burner Wallet',
                                style: AppTheme.fontMono(
                                  fontSize: 9.5,
                                  color: _walletService.isConnected ? AppTheme.emerald : AppTheme.orange,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      IconButton(
                        icon: Icon(Icons.close, color: textMuted, size: 20),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                if (_walletService.isConnected) ...[
                  // Tab Navigation Switcher
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Container(
                      padding: const EdgeInsets.all(3),
                      decoration: BoxDecoration(
                        color: surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: border),
                      ),
                      child: Row(
                        children: [
                          _buildTabItem(0, 'Overview', Icons.dashboard_outlined, isDark),
                          _buildTabItem(1, 'Receive QR', Icons.qr_code, isDark),
                          _buildTabItem(2, 'History (${_walletService.transactions.length})', Icons.history, isDark),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  if (_selectedTab == 0)
                    _buildOverviewTab(isDark, surface, cardBg, textMain, textMuted, border)
                  else if (_selectedTab == 1)
                    _buildReceiveQrTab(isDark, surface, cardBg, textMain, textMuted, border)
                  else
                    _buildHistoryTab(isDark, surface, cardBg, textMain, textMuted, border),
                ] else ...[
                  // NOT CONNECTED: Wallet Selection Menu
                  _buildConnectWalletMenu(isDark, surface, cardBg, textMain, textMuted, border),
                ],
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildTabItem(int index, String title, IconData icon, bool isDark) {
    final isSelected = _selectedTab == index;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _selectedTab = index),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 7),
          decoration: BoxDecoration(
            color: isSelected ? (isDark ? AppTheme.emerald.withOpacity(0.15) : AppTheme.lightEmerald.withOpacity(0.15)) : Colors.transparent,
            borderRadius: BorderRadius.circular(9),
            border: isSelected ? Border.all(color: AppTheme.emerald.withOpacity(0.4)) : null,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 13, color: isSelected ? AppTheme.emerald : (isDark ? Colors.white60 : Colors.black54)),
              const SizedBox(width: 5),
              Text(
                title,
                style: AppTheme.fontSans(
                  fontSize: 11,
                  fontWeight: isSelected ? FontWeight.w800 : FontWeight.w600,
                  color: isSelected ? AppTheme.emerald : (isDark ? Colors.white70 : Colors.black87),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // ---------------------------------------------------------------------------
  // Connect Wallet Menu (When not connected)
  // ---------------------------------------------------------------------------
  Widget _buildConnectWalletMenu(bool isDark, Color surface, Color cardBg, Color textMain, Color textMuted, Color border) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.orange.withOpacity(0.08),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppTheme.orange.withOpacity(0.3)),
            ),
            child: Row(
              children: [
                const Icon(Icons.info_outline, color: AppTheme.orange, size: 20),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Connect a Polygon Amoy testnet wallet to claim free tokens, mint lots on-chain, and record verifiable CPCB ESG audits.',
                    style: AppTheme.fontSans(fontSize: 11.5, color: textMain, height: 1.3),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          Text(
            'CHOOSE CONNECTION METHOD',
            style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.bold, color: textMuted, letterSpacing: 0.6),
          ),
          const SizedBox(height: 10),

          // Option 1: MetaMask
          _buildWalletConnectCard(
            title: 'MetaMask',
            subtitle: 'Connect via EVM Browser or In-App Wallet',
            icon: Icons.shield_rounded,
            color: AppTheme.orange,
            isDark: isDark,
            surface: surface,
            border: border,
            onTap: () => _handleConnectWallet('MetaMask'),
          ),
          const SizedBox(height: 10),

          // Option 2: 1-Click Instant Burner Wallet (For Aggregators)
          _buildWalletConnectCard(
            title: 'Instant 1-Click Burner Wallet',
            subtitle: 'Recommended for Kabadiwalas & Field Operators (Zero Gas)',
            icon: Icons.bolt_rounded,
            color: AppTheme.emerald,
            isDark: isDark,
            surface: surface,
            border: border,
            onTap: () => _handleConnectWallet('Instant Burner Wallet'),
          ),
          const SizedBox(height: 10),

          // Option 3: Coinbase / Trust Wallet
          _buildWalletConnectCard(
            title: 'Trust Wallet / Coinbase',
            subtitle: 'Multi-Chain EVM Self-Custody Protocol',
            icon: Icons.account_balance_wallet_outlined,
            color: AppTheme.teal,
            isDark: isDark,
            surface: surface,
            border: border,
            onTap: () => _handleConnectWallet('Trust Wallet'),
          ),
          const SizedBox(height: 10),

          // Option 4: Custom Address Input
          if (!_showCustomInput)
            GestureDetector(
              onTap: () => setState(() => _showCustomInput = true),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
                decoration: BoxDecoration(
                  color: cardBg,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: border),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.edit_note, size: 18, color: textMuted),
                        const SizedBox(width: 10),
                        Text(
                          'Paste My Own Ethereum / Polygon Address (0x...)',
                          style: AppTheme.fontSans(fontSize: 11.5, fontWeight: FontWeight.w600, color: textMain),
                        ),
                      ],
                    ),
                    Icon(Icons.chevron_right, size: 16, color: textMuted),
                  ],
                ),
              ),
            )
          else
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppTheme.emerald.withOpacity(0.4)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'ENTER POLYGON AMOY PUBLIC ADDRESS',
                    style: AppTheme.fontMono(fontSize: 9.5, fontWeight: FontWeight.bold, color: AppTheme.emerald),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: _customAddressController,
                    style: AppTheme.fontMono(fontSize: 12, color: textMain),
                    decoration: InputDecoration(
                      hintText: '0x71C49B283A412695d130aA849c2598374e9F0082',
                      hintStyle: AppTheme.fontMono(fontSize: 11, color: textMuted.withOpacity(0.5)),
                      filled: true,
                      fillColor: cardBg,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.emerald,
                            foregroundColor: Colors.black,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            padding: const EdgeInsets.symmetric(vertical: 11),
                          ),
                          onPressed: () {
                            if (_customAddressController.text.trim().isNotEmpty) {
                              _handleConnectWallet('Custom EVM Wallet', customAddress: _customAddressController.text.trim());
                            }
                          },
                          child: Text('CONNECT ADDRESS', style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 12)),
                        ),
                      ),
                      const SizedBox(width: 8),
                      TextButton(
                        onPressed: () => setState(() => _showCustomInput = false),
                        child: Text('CANCEL', style: AppTheme.fontSans(fontSize: 11, color: textMuted)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildWalletConnectCard({
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required bool isDark,
    required Color surface,
    required Color border,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: _isConnecting ? null : onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: border),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.15),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w800, color: isDark ? Colors.white : Colors.black87)),
                  const SizedBox(height: 2),
                  Text(subtitle, style: AppTheme.fontSans(fontSize: 10.5, color: isDark ? Colors.white60 : Colors.black54)),
                ],
              ),
            ),
            Icon(Icons.arrow_forward_ios_rounded, size: 13, color: isDark ? Colors.white38 : Colors.black38),
          ],
        ),
      ),
    );
  }

  // ---------------------------------------------------------------------------
  // Overview Tab (When Connected)
  // ---------------------------------------------------------------------------
  Widget _buildOverviewTab(bool isDark, Color surface, Color cardBg, Color textMain, Color textMuted, Color border) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Address Card
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.emerald.withOpacity(0.35)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(width: 7, height: 7, decoration: const BoxDecoration(color: AppTheme.emerald, shape: BoxShape.circle)),
                        const SizedBox(width: 6),
                        Text(_walletService.activeWalletType.toUpperCase(), style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.emerald)),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppTheme.orange.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(color: AppTheme.orange.withOpacity(0.3)),
                      ),
                      child: Text('POLYGON 80002', style: AppTheme.fontMono(fontSize: 8.5, fontWeight: FontWeight.bold, color: AppTheme.orange)),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _walletService.address,
                        style: AppTheme.fontMono(fontSize: 11, fontWeight: FontWeight.w600, color: textMain),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.copy_rounded, size: 16, color: AppTheme.emerald),
                      tooltip: 'Copy Address',
                      onPressed: () {
                        Clipboard.setData(ClipboardData(text: _walletService.address));
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Address copied to clipboard!'), duration: Duration(seconds: 2)),
                        );
                      },
                    ),
                  ],
                ),
                Divider(color: border, height: 16),

                // Balances Grid
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('CIRC TOKENS', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted, fontWeight: FontWeight.bold)),
                          Text('${_walletService.circBalance.toStringAsFixed(0)} \$CIRC', style: AppTheme.fontSans(fontSize: 16, fontWeight: FontWeight.w900, color: AppTheme.emerald)),
                        ],
                      ),
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('TESTNET GAS', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted, fontWeight: FontWeight.bold)),
                          Text('${_walletService.polBalance.toStringAsFixed(3)} POL', style: AppTheme.fontSans(fontSize: 16, fontWeight: FontWeight.w900, color: textMain)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('CARBON RETIRED', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted, fontWeight: FontWeight.bold)),
                          Text('${_walletService.carbonCreditsTons.toStringAsFixed(1)} tCO₂e', style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w800, color: AppTheme.teal)),
                        ],
                      ),
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('AVOIDED PENALTY', style: AppTheme.fontMono(fontSize: 8.5, color: textMuted, fontWeight: FontWeight.bold)),
                          Text('₹${(_walletService.avoidedPenaltiesInr / 1000).toStringAsFixed(0)}k', style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w800, color: AppTheme.orange)),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),

          // Claim Faucet Button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.orange,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 13),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                elevation: 0,
              ),
              icon: _isClaimingFaucet
                  ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : const Icon(Icons.water_drop_rounded, size: 18),
              label: Text(
                _isClaimingFaucet ? 'Minting Testnet Faucet...' : 'Claim Testnet Faucet (+0.5 POL & +500 CIRC)',
                style: AppTheme.fontSans(fontSize: 12.5, fontWeight: FontWeight.w800),
              ),
              onPressed: _isClaimingFaucet ? null : _handleClaimFaucet,
            ),
          ),
          const SizedBox(height: 12),

          // Gasless Sponsorship Toggle Card
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: surface,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: border),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: AppTheme.emerald.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(Icons.flash_on, color: AppTheme.emerald, size: 16),
                    ),
                    const SizedBox(width: 10),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Gasless Meta-Tx Sponsor (Biconomy)', style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.bold, color: textMain)),
                        Text('Zero gas required for scrap listings & minting', style: AppTheme.fontSans(fontSize: 9.5, color: textMuted)),
                      ],
                    ),
                  ],
                ),
                Switch(
                  value: _walletService.gaslessSponsored,
                  activeColor: AppTheme.emerald,
                  onChanged: (_) => _walletService.toggleGasless(),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Disconnect Button
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.redAccent,
                side: BorderSide(color: Colors.redAccent.withOpacity(0.4)),
                padding: const EdgeInsets.symmetric(vertical: 11),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              icon: const Icon(Icons.link_off_rounded, size: 16),
              label: Text('Disconnect Wallet', style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 12)),
              onPressed: () async {
                await _walletService.disconnect();
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Wallet disconnected successfully.')),
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }

  // ---------------------------------------------------------------------------
  // Receive QR Tab
  // ---------------------------------------------------------------------------
  Widget _buildReceiveQrTab(bool isDark, Color surface, Color cardBg, Color textMain, Color textMuted, Color border) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.emerald, width: 2),
            ),
            child: QrImageView(
              data: _walletService.address,
              version: QrVersions.auto,
              size: 180.0,
              backgroundColor: Colors.white,
            ),
          ),
          const SizedBox(height: 14),
          Text(
            'Scan to send Polygon Amoy tokens to this address',
            style: AppTheme.fontSans(fontSize: 11, color: textMuted),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: surface,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: border),
            ),
            child: Text(
              _walletService.address,
              style: AppTheme.fontMono(fontSize: 10, color: AppTheme.emerald, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }

  // ---------------------------------------------------------------------------
  // History Tab
  // ---------------------------------------------------------------------------
  Widget _buildHistoryTab(bool isDark, Color surface, Color cardBg, Color textMain, Color textMuted, Color border) {
    final txs = _walletService.transactions;
    if (txs.isEmpty) {
      return Padding(
        padding: const EdgeInsets.all(30.0),
        child: Column(
          children: [
            Icon(Icons.history_toggle_off_rounded, size: 40, color: textMuted),
            const SizedBox(height: 10),
            Text('No on-chain transactions yet', style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.bold, color: textMain)),
            Text('Claim the faucet or mint a scrap lot to generate your first on-chain audit proof.', style: AppTheme.fontSans(fontSize: 11, color: textMuted), textAlign: TextAlign.center),
          ],
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: txs.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (context, index) {
          final tx = txs[index];
          return Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(tx.title, style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.bold, color: textMain)),
                    Text('${tx.amount} ${tx.token}', style: AppTheme.fontMono(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.emerald)),
                  ],
                ),
                const SizedBox(height: 4),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${tx.txHash.substring(0, 8)}...${tx.txHash.substring(tx.txHash.length - 6)}',
                      style: AppTheme.fontMono(fontSize: 9.5, color: textMuted),
                    ),
                    GestureDetector(
                      onTap: () => launchUrl(Uri.parse(tx.explorerUrl), mode: LaunchMode.externalApplication),
                      child: Text('VIEW SCAN ↗', style: AppTheme.fontMono(fontSize: 9.5, color: AppTheme.orange, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
