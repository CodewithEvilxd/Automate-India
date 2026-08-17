import 'dart:math';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class WalletTransaction {
  final String id;
  final String title;
  final String type; // 'MINT', 'TRADE', 'FAUCET', 'EPR_CERT'
  final double amount;
  final String token;
  final String txHash;
  final DateTime timestamp;
  final String status; // 'CONFIRMED', 'PENDING'
  final String explorerUrl;

  WalletTransaction({
    required this.id,
    required this.title,
    required this.type,
    required this.amount,
    required this.token,
    required this.txHash,
    required this.timestamp,
    this.status = 'CONFIRMED',
    required this.explorerUrl,
  });
}

class WalletService extends ChangeNotifier {
  static final WalletService _instance = WalletService._internal();
  factory WalletService() => _instance;
  WalletService._internal() {
    _loadWalletState();
  }

  bool _isConnected = true;
  String _activeWalletType = 'MetaMask';
  String _address = '0x71C49B283A412695d130aA849c2598374e9F0082';
  String _networkName = 'Polygon Amoy Testnet';
  int _chainId = 80002;
  String _rpcUrl = 'https://rpc-amoy.polygon.technology';

  double _polBalance = 1.4580;
  double _circBalance = 14250.0;
  double _carbonCreditsTons = 38.45;
  double _avoidedPenaltiesInr = 345000.0;
  bool _gaslessSponsored = true;

  final List<WalletTransaction> _transactions = [
    WalletTransaction(
      id: 'tx-001',
      title: 'Secondary Alum 6063 Ingot Mint',
      type: 'MINT',
      amount: 450.0,
      token: 'CIRC',
      txHash: '0x3a9f1b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a',
      timestamp: DateTime.now().subtract(const Duration(minutes: 18)),
      status: 'CONFIRMED',
      explorerUrl: 'https://amoy.polygonscan.com/tx/0x3a9f1b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a',
    ),
    WalletTransaction(
      id: 'tx-002',
      title: 'CPCB EPR Certificate FY26 Verification',
      type: 'EPR_CERT',
      amount: 15.0,
      token: 'MT CO2e',
      txHash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
      timestamp: DateTime.now().subtract(const Duration(hours: 3)),
      status: 'CONFIRMED',
      explorerUrl: 'https://amoy.polygonscan.com/tx/0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
    ),
    WalletTransaction(
      id: 'tx-003',
      title: 'Copper Scrap Batch #CU-883 Settled',
      type: 'TRADE',
      amount: 2200.0,
      token: 'CIRC',
      txHash: '0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
      timestamp: DateTime.now().subtract(const Duration(hours: 14)),
      status: 'CONFIRMED',
      explorerUrl: 'https://amoy.polygonscan.com/tx/0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    ),
  ];

  // Getters
  bool get isConnected => _isConnected;
  String get activeWalletType => _activeWalletType;
  String get address => _address;
  String get shortAddress => _address.length > 10 
      ? '${_address.substring(0, 6)}...${_address.substring(_address.length - 4)}' 
      : _address;
  String get networkName => _networkName;
  int get chainId => _chainId;
  String get rpcUrl => _rpcUrl;
  double get polBalance => _polBalance;
  double get circBalance => _circBalance;
  double get carbonCreditsTons => _carbonCreditsTons;
  double get avoidedPenaltiesInr => _avoidedPenaltiesInr;
  bool get gaslessSponsored => _gaslessSponsored;
  List<WalletTransaction> get transactions => List.unmodifiable(_transactions);

  Future<void> _loadWalletState() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _isConnected = prefs.getBool('wallet_connected') ?? true;
      _address = prefs.getString('wallet_address') ?? '0x71C49B283A412695d130aA849c2598374e9F0082';
      _activeWalletType = prefs.getString('wallet_type') ?? 'MetaMask';
      _polBalance = prefs.getDouble('wallet_pol') ?? 1.4580;
      _circBalance = prefs.getDouble('wallet_circ') ?? 14250.0;
      _carbonCreditsTons = prefs.getDouble('wallet_carbon') ?? 38.45;
      _avoidedPenaltiesInr = prefs.getDouble('wallet_penalties') ?? 345000.0;
      _gaslessSponsored = prefs.getBool('wallet_gasless') ?? true;
      notifyListeners();
    } catch (_) {}
  }

  Future<void> _saveWalletState() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('wallet_connected', _isConnected);
      await prefs.setString('wallet_address', _address);
      await prefs.setString('wallet_type', _activeWalletType);
      await prefs.setDouble('wallet_pol', _polBalance);
      await prefs.setDouble('wallet_circ', _circBalance);
      await prefs.setDouble('wallet_carbon', _carbonCreditsTons);
      await prefs.setDouble('wallet_penalties', _avoidedPenaltiesInr);
      await prefs.setBool('wallet_gasless', _gaslessSponsored);
    } catch (_) {}
  }

  // Connect specific wallet
  Future<void> connectWallet(String walletType) async {
    _isConnected = true;
    _activeWalletType = walletType;
    if (walletType == 'Burner') {
      final rnd = Random();
      final hexChars = '0123456789abcdef';
      String randomHex = '0x';
      for (int i = 0; i < 40; i++) {
        randomHex += hexChars[rnd.nextInt(hexChars.length)];
      }
      _address = randomHex;
    } else {
      _address = '0x71C49B283A412695d130aA849c2598374e9F0082';
    }
    await _saveWalletState();
    notifyListeners();
  }

  Future<void> disconnectWallet() async {
    _isConnected = false;
    await _saveWalletState();
    notifyListeners();
  }

  void toggleGasless() {
    _gaslessSponsored = !_gaslessSponsored;
    _saveWalletState();
    notifyListeners();
  }

  // Claim Test Faucet Tokens
  Future<String> claimFaucetTokens() async {
    await Future.delayed(const Duration(milliseconds: 900));
    _polBalance += 0.50;
    _circBalance += 500.0;
    _carbonCreditsTons += 2.5;

    final rnd = Random();
    final hexChars = '0123456789abcdef';
    String txHash = '0x';
    for (int i = 0; i < 64; i++) {
      txHash += hexChars[rnd.nextInt(hexChars.length)];
    }

    _transactions.insert(
      0,
      WalletTransaction(
        id: 'tx-faucet-${DateTime.now().millisecondsSinceEpoch}',
        title: 'Polygon Amoy Faucet Airdrop (+0.5 POL, +500 CIRC)',
        type: 'FAUCET',
        amount: 500.0,
        token: 'CIRC',
        txHash: txHash,
        timestamp: DateTime.now(),
        status: 'CONFIRMED',
        explorerUrl: 'https://amoy.polygonscan.com/tx/$txHash',
      ),
    );

    await _saveWalletState();
    notifyListeners();
    return txHash;
  }

  // Record a new transaction (e.g. minting, buying, creating EPR certificate)
  Future<String> recordTransaction({
    required String title,
    required String type,
    required double amount,
    required String token,
    double? carbonCreditsToAdd,
    double? penaltySavedToAdd,
  }) async {
    final rnd = Random();
    final hexChars = '0123456789abcdef';
    String txHash = '0x';
    for (int i = 0; i < 64; i++) {
      txHash += hexChars[rnd.nextInt(hexChars.length)];
    }

    if (carbonCreditsToAdd != null) {
      _carbonCreditsTons += carbonCreditsToAdd;
    }
    if (penaltySavedToAdd != null) {
      _avoidedPenaltiesInr += penaltySavedToAdd;
    }
    if (token == 'CIRC' && type == 'MINT') {
      _circBalance += amount;
    }

    _transactions.insert(
      0,
      WalletTransaction(
        id: 'tx-${DateTime.now().millisecondsSinceEpoch}',
        title: title,
        type: type,
        amount: amount,
        token: token,
        txHash: txHash,
        timestamp: DateTime.now(),
        status: 'CONFIRMED',
        explorerUrl: 'https://amoy.polygonscan.com/tx/$txHash',
      ),
    );

    await _saveWalletState();
    notifyListeners();
    return txHash;
  }
}
