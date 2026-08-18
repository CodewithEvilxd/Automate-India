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
  String? _activeProviderInput;

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
    if (customAddress != null && customAddress.isNotEmpty) {
      final cleanAddr = customAddress.trim();
      final regex = RegExp(r'^0x[a-fA-F0-9]{40}$');
      if (!regex.hasMatch(cleanAddr)) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            backgroundColor: Colors.redAccent,
            content: Text(
              'Invalid EVM Address! Must start with 0x and have 40 hexadecimal characters.',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
        );
        return;
      }
    }

    setState(() => _isConnecting = true);
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
            'Connected to Polygon Amoy with $walletType!\nBalance: ${_walletService.polBalance.toStringAsFixed(3)} POL',
            style: AppTheme.fontSans(color: Colors.black, fontWeight: FontWeight.bold),
          ),
        ),
      );
    }
  }

  Future<void> _openExternalWalletApp(String uri) async {
    try {
      final url = Uri.parse(uri);
      await launchUrl(url, mode: LaunchMode.externalApplication);
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Could not open external wallet app. Please ensure it is installed.'),
          ),
        );
      }
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
                const Icon(Icons.shield_outlined, color: AppTheme.orange, size: 20),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Connect your real Polygon address or launch MetaMask / Trust Wallet to sync live on-chain POL balances and sign CPCB ESG audits.',
                    style: AppTheme.fontSans(fontSize: 11.5, color: textMain, height: 1.3),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          Text(
            'CHOOSE REAL CONNECTION METHOD',
            style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.bold, color: textMuted, letterSpacing: 0.6),
          ),
          const SizedBox(height: 10),

          // Option 1: MetaMask Connection Card
          _buildProviderCard(
            providerKey: 'MetaMask',
            title: 'MetaMask Mobile App',
            subtitle: 'Connect via MetaMask app or paste your MetaMask address',
            icon: Icons.shield_rounded,
            color: AppTheme.orange,
            isDark: isDark,
            surface: surface,
            cardBg: cardBg,
            textMain: textMain,
            textMuted: textMuted,
            border: border,
            deepLinkUrl: 'https://metamask.app.link/dapp/circularchain.vercel.app',
          ),
          const SizedBox(height: 10),

          // Option 2: Trust Wallet / Coinbase Card
          _buildProviderCard(
            providerKey: 'Trust Wallet',
            title: 'Trust Wallet / Coinbase',
            subtitle: 'Connect via Trust Wallet or paste your EVM address',
            icon: Icons.account_balance_wallet_outlined,
            color: AppTheme.teal,
            isDark: isDark,
            surface: surface,
            cardBg: cardBg,
            textMain: textMain,
            textMuted: textMuted,
            border: border,
            deepLinkUrl: 'https://link.trustwallet.com/open_url?coin_id=60&url=https://circularchain.vercel.app',
          ),
          const SizedBox(height: 10),

          // Option 3: Direct EVM Address Input
          _buildProviderCard(
            providerKey: 'Custom',
            title: 'Paste Any Polygon / EVM Address',
            subtitle: 'Enter your 0x... public key to sync live on-chain balance',
            icon: Icons.edit_note_rounded,
            color: AppTheme.emerald,
            isDark: isDark,
            surface: surface,
            cardBg: cardBg,
            textMain: textMain,
            textMuted: textMuted,
            border: border,
          ),
          const SizedBox(height: 10),

          // Option 4: Instant Temporary Burner Keypair (For zero-config field demo)
          _buildWalletConnectCard(
            title: 'Generate Temporary Demo Keypair',
            subtitle: 'Quick test mode for field workers without wallet app',
            icon: Icons.bolt_rounded,
            color: const Color(0xFF64748B),
            isDark: isDark,
            surface: surface,
            border: border,
            onTap: () => _handleConnectWallet('Demo Keypair'),
          ),
        ],
      ),
    );
  }

  Widget _buildProviderCard({
    required String providerKey,
    required String title,
    required String subtitle,
    required IconData icon,
    required Color color,
    required bool isDark,
    required Color surface,
    required Color cardBg,
    required Color textMain,
    required Color textMuted,
    required Color border,
    String? deepLinkUrl,
  }) {
    final isExpanded = _activeProviderInput == providerKey;

    return Container(
      decoration: BoxDecoration(
        color: isExpanded ? surface : cardBg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: isExpanded ? color : border,
          width: isExpanded ? 1.5 : 1,
        ),
      ),
      child: Column(
        children: [
          InkWell(
            onTap: () {
              setState(() {
                if (_activeProviderInput == providerKey) {
                  _activeProviderInput = null;
                } else {
                  _activeProviderInput = providerKey;
                }
              });
            },
            borderRadius: BorderRadius.circular(14),
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Row(
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: color.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: color.withOpacity(0.4)),
                    ),
                    child: Icon(icon, color: color, size: 20),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: AppTheme.fontSans(fontSize: 13, fontWeight: FontWeight.w700, color: textMain),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          subtitle,
                          style: AppTheme.fontSans(fontSize: 10.5, color: textMuted),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    isExpanded ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                    color: textMuted,
                    size: 20,
                  ),
                ],
              ),
            ),
          ),
          if (isExpanded) ...[
            Divider(height: 1, color: border),
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (deepLinkUrl != null) ...[
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton.icon(
                            style: OutlinedButton.styleFrom(
                              foregroundColor: color,
                              side: BorderSide(color: color.withOpacity(0.5)),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              padding: const EdgeInsets.symmetric(vertical: 10),
                            ),
                            icon: const Icon(Icons.open_in_new_rounded, size: 15),
                            label: Text('Open $providerKey App', style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 11)),
                            onPressed: () => _openExternalWalletApp(deepLinkUrl),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                  ],
                  Text(
                    'ENTER OR PASTE YOUR $providerKey ADDRESS (0x...)',
                    style: AppTheme.fontMono(fontSize: 9, fontWeight: FontWeight.bold, color: color),
                  ),
                  const SizedBox(height: 6),
                  TextField(
                    controller: _customAddressController,
                    style: AppTheme.fontMono(fontSize: 11.5, color: textMain),
                    decoration: InputDecoration(
                      hintText: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                      hintStyle: AppTheme.fontMono(fontSize: 10.5, color: textMuted.withOpacity(0.4)),
                      filled: true,
                      fillColor: cardBg,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      suffixIcon: IconButton(
                        icon: Icon(Icons.paste_rounded, size: 18, color: color),
                        tooltip: 'Paste from Clipboard',
                        onPressed: () async {
                          final clip = await Clipboard.getData(Clipboard.kTextPlain);
                          if (clip?.text != null) {
                            setState(() => _customAddressController.text = clip!.text!.trim());
                          }
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: color,
                        foregroundColor: Colors.black,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.symmetric(vertical: 11),
                      ),
                      icon: _isConnecting
                          ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.black))
                          : const Icon(Icons.link, size: 16),
                      label: Text(
                        _isConnecting ? 'CONNECTING & SYNCING RPC...' : 'CONNECT $providerKey & FETCH BALANCE',
                        style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 11.5),
                      ),
                      onPressed: _isConnecting
                          ? null
                          : () {
                              if (_customAddressController.text.trim().isNotEmpty) {
                                _handleConnectWallet(providerKey, customAddress: _customAddressController.text.trim());
                              } else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    backgroundColor: Colors.redAccent,
                                    content: Text('Please paste or enter your 0x... wallet address first!'),
                                  ),
                                );
                              }
                            },
                    ),
                  ),
                ],
              ),
            ),
          ],
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

                // Live On-Chain Action Row
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          foregroundColor: AppTheme.emerald,
                          side: BorderSide(color: AppTheme.emerald.withOpacity(0.4)),
                          padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        icon: _walletService.isSyncing
                            ? const SizedBox(width: 12, height: 12, child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.emerald))
                            : const Icon(Icons.sync, size: 14),
                        label: Text(
                          _walletService.isSyncing ? 'SYNCING RPC...' : 'SYNC ON-CHAIN RPC',
                          style: AppTheme.fontMono(fontSize: 9.5, fontWeight: FontWeight.bold),
                        ),
                        onPressed: _walletService.isSyncing
                            ? null
                            : () async {
                                await _walletService.refreshOnChainBalance();
                                if (mounted) {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      backgroundColor: AppTheme.emerald,
                                      content: Text(
                                        'Synced with Polygon RPC! Balance: ${_walletService.polBalance.toStringAsFixed(4)} POL',
                                        style: AppTheme.fontSans(color: Colors.black, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  );
                                }
                              },
                      ),
                    ),
                    const SizedBox(width: 8),
                    OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: textMain,
                        side: BorderSide(color: border),
                        padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      icon: const Icon(Icons.open_in_new, size: 14),
                      label: Text('POLYGONSCAN', style: AppTheme.fontMono(fontSize: 9.5, fontWeight: FontWeight.bold)),
                      onPressed: () {
                        final url = Uri.parse('https://amoy.polygonscan.com/address/${_walletService.address}');
                        launchUrl(url, mode: LaunchMode.externalApplication);
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
