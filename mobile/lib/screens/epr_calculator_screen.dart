import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/app_theme.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../services/user_state_service.dart';
import '../services/wallet_service.dart';
import '../widgets/wallet_connect_modal.dart';

class EPRCalculatorScreen extends StatefulWidget {
  const EPRCalculatorScreen({Key? key}) : super(key: key);

  @override
  State<EPRCalculatorScreen> createState() => _EPRCalculatorScreenState();
}

class _EPRCalculatorScreenState extends State<EPRCalculatorScreen> {
  final ApiService _apiService = ApiService();
  final UserStateService _userState = UserStateService();
  final WalletService _walletService = WalletService();

  final List<Map<String, dynamic>> _demoPresets = [
    {
      'label': 'Tata Motors (Pune/MPCB)',
      'name': 'Tata Motors Commercial Vehicle Ancillary',
      'pibo': 'CPCB/PIBO/2026/MH/08941',
      'state': 'Maharashtra (MPCB - Pune/Chakan)',
      'industry': 'automotive',
      'material': 'aluminum',
      'volume': 450.0,
    },
    {
      'label': 'PepsiCo / Bottler (Noida/UP)',
      'name': 'Moon Beverages & Rigid Packaging Unit',
      'pibo': 'CPCB/PIBO/2026/UP/04512',
      'state': 'Uttar Pradesh (UPPCB - Noida)',
      'industry': 'fmcg',
      'material': 'plastic_pet',
      'volume': 850.0,
    },
    {
      'label': 'Foxconn (Chennai/TNPCB)',
      'name': 'Foxconn Hon Hai Precision Electronics',
      'pibo': 'CPCB/PIBO/2026/TN/09142',
      'state': 'Tamil Nadu (TNPCB - Sriperumbudur)',
      'industry': 'electronics',
      'material': 'electronic',
      'volume': 240.0,
    },
  ];

  late String _companyName;
  late String _piboNo;
  late String _stateJurisdiction;
  late String _industry;
  late String _materialCategory;
  late double _productionMT;
  List<MaterialItem> _allMaterials = [];
  Map<String, dynamic>? _apiData;
  bool _loading = true;
  bool _minting = false;

  @override
  void initState() {
    super.initState();
    _applyPreset(_demoPresets[0], shouldFetch: false);
    _fetchMaterials();
    _recalculate();
  }

  void _applyPreset(Map<String, dynamic> preset, {bool shouldFetch = true}) {
    _companyName = preset['name'];
    _piboNo = preset['pibo'];
    _stateJurisdiction = preset['state'];
    _industry = preset['industry'];
    _materialCategory = preset['material'];
    _productionMT = preset['volume'];
    if (shouldFetch) {
      setState(() {});
      _recalculate();
    }
  }

  Future<void> _fetchMaterials() async {
    final mats = await _apiService.getMaterials();
    if (mounted) {
      setState(() {
        _allMaterials = mats;
        _loading = false;
      });
    }
  }

  Future<void> _recalculate() async {
    final data = await _apiService.calculateCPCBLiability(
      companyName: _companyName,
      piboNo: _piboNo,
      stateJurisdiction: _stateJurisdiction,
      industry: _industry,
      materialCategory: _materialCategory,
      productionMT: _productionMT,
    );
    if (mounted) {
      setState(() {
        _apiData = data;
      });
    }
  }

  Future<void> _handleMintCertificate() async {
    setState(() => _minting = true);
    final double targetPct = (_apiData?['mandated_recycling_target_percent'] ?? 75.0) / 100.0;
    final double mandatoryMT = (_apiData?['mandated_offset_obligation_mt'] ?? (_productionMT * targetPct)).toDouble();
    final double carbonKg = (_apiData?['verified_carbon_abatement_kg_co2e'] ?? (mandatoryMT * 1000 * 9.13)).toDouble();
    final double avoidedPenaltyINR = (_apiData?['avoided_statutory_penalty_inr'] ?? (mandatoryMT * 25000)).toDouble();

    try {
      final txHash = await _walletService.recordTransaction(
        title: 'CPCB Form 1 EPR Certificate ($mandatoryMT MT $_materialCategory)',
        type: 'EPR_CERT',
        amount: mandatoryMT,
        token: 'MT Obligation',
        carbonCreditsToAdd: carbonKg / 1000,
        penaltySavedToAdd: avoidedPenaltyINR,
      );

      if (mounted) {
        setState(() => _minting = false);
        _showCertificateModal(txHash, mandatoryMT, carbonKg, avoidedPenaltyINR);
      }
    } catch (_) {
      if (mounted) setState(() => _minting = false);
    }
  }

  void _showCertificateModal(String txHash, double mandatoryMT, double carbonKg, double avoidedPenalty) {
    final isDark = _userState.isDarkMode;
    final certId = 'CPCB-EPR-2026-${DateTime.now().millisecondsSinceEpoch.toString().substring(6)}';

    showDialog(
      context: context,
      builder: (ctx) => Dialog(
        backgroundColor: AppTheme.getSurface(isDark),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(22),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // CPCB Seal
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.emerald.withOpacity(0.18),
                  shape: BoxShape.circle,
                  border: Border.all(color: AppTheme.emerald, width: 2),
                ),
                child: const Icon(Icons.verified, color: AppTheme.emerald, size: 32),
              ),
              const SizedBox(height: 12),

              Text(
                'CPCB EPR STATUTORY CERTIFICATE',
                style: AppTheme.fontSans(fontSize: 14, fontWeight: FontWeight.w900, color: AppTheme.getTextMain(isDark), letterSpacing: 0.6),
                textAlign: TextAlign.center,
              ),
              Text(
                'MoEFCC PWM Rules 2026 · Form 1 Filing',
                style: AppTheme.fontMono(fontSize: 9.5, color: AppTheme.orange, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),

              // QR Code
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppTheme.emerald, width: 2),
                ),
                child: QrImageView(
                  data: 'https://circularchain.in/verify?cert=$certId&tx=$txHash',
                  version: QrVersions.auto,
                  size: 140.0,
                  eyeStyle: const QrEyeStyle(eyeShape: QrEyeShape.square, color: Color(0xFF0F131A)),
                  dataModuleStyle: const QrDataModuleStyle(dataModuleShape: QrDataModuleShape.square, color: Color(0xFF0F131A)),
                ),
              ),
              const SizedBox(height: 14),

              // Certificate Meta
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.getSurfaceRaised(isDark),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppTheme.getBorder(isDark)),
                ),
                child: Column(
                  children: [
                    _certRow('Certificate ID:', certId, isDark),
                    _certRow('PIBO Number:', _piboNo, isDark),
                    _certRow('Target Fulfilled:', '${mandatoryMT.toStringAsFixed(1)} MT', isDark),
                    _certRow('GHG Abated:', '${(carbonKg / 1000).toStringAsFixed(2)} tCO₂e', isDark),
                    _certRow('Avoided Penalty:', '₹${(avoidedPenalty / 1000).toStringAsFixed(0)}k INR', isDark),
                    _certRow('Polygon Tx:', '${txHash.substring(0, 8)}...${txHash.substring(txHash.length - 4)}', isDark),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              ElevatedButton(
                onPressed: () async {
                  final url = 'https://amoy.polygonscan.com/tx/$txHash';
                  final uri = Uri.parse(url);
                  if (await canLaunchUrl(uri)) {
                    await launchUrl(uri, mode: LaunchMode.externalApplication);
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.emerald,
                  foregroundColor: Colors.black,
                  minimumSize: const Size.fromHeight(42),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Text('Inspect On Polygonscan Amoy', style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 12)),
              ),
              const SizedBox(height: 8),
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: Text('Close Certificate', style: AppTheme.fontSans(color: AppTheme.getTextMuted(isDark), fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _certRow(String label, String val, bool isDark) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2.5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: AppTheme.fontMono(fontSize: 9.5, color: AppTheme.getTextMuted(isDark))),
          Text(val, style: AppTheme.fontSans(fontSize: 10.5, fontWeight: FontWeight.bold, color: AppTheme.getTextMain(isDark))),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final double targetPct = (_apiData?['mandated_recycling_target_percent'] ?? 75.0) / 100.0;
    final double mandatoryMT = (_apiData?['mandated_offset_obligation_mt'] ?? (_productionMT * targetPct)).toDouble();
    final double mandatoryPCRMT = (_apiData?['mandatory_pcr_mass_mt'] ?? (_productionMT * 0.25)).toDouble();
    final double carbonKg = (_apiData?['verified_carbon_abatement_kg_co2e'] ?? (mandatoryMT * 1000 * 9.13)).toDouble();
    final double avoidedPenaltyINR = (_apiData?['avoided_statutory_penalty_inr'] ?? (mandatoryMT * 25000)).toDouble();

    final matchingLots = _allMaterials.where((m) =>
        m.category.toLowerCase().contains(_materialCategory.replaceAll('plastic_', '').replaceAll('battery_', ''))).toList();
    final double totalMatchingMass = matchingLots.fold(0.0, (sum, m) => sum + m.estimatedWeightKg);

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
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'CPCB STATUTORY EPR CALCULATOR',
                  style: AppTheme.fontSans(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 0.6,
                    color: textMain,
                  ),
                ),
                Text(
                  'MoEFCC PWM RULES 2026 · AGENT 06 SHIELD',
                  style: AppTheme.fontMono(
                    fontSize: 8.5,
                    color: AppTheme.emerald,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
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
                // Preset Corporate Selector
                Text(
                  'QUICK PRESET CORPORATE ENTITIES (PIBO)',
                  style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.w800, color: textMuted, letterSpacing: 0.5),
                ),
                const SizedBox(height: 8),
                SizedBox(
                  height: 38,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: _demoPresets.length,
                    itemBuilder: (context, idx) {
                      final p = _demoPresets[idx];
                      final isSel = _companyName == p['name'];
                      return GestureDetector(
                        onTap: () => _applyPreset(p),
                        child: Container(
                          margin: const EdgeInsets.only(right: 8),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: isSel ? AppTheme.emerald.withOpacity(0.2) : cardBg,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: isSel ? AppTheme.emerald : border, width: isSel ? 1.5 : 1),
                          ),
                          child: Center(
                            child: Text(
                              p['label'],
                              style: AppTheme.fontSans(
                                fontSize: 11,
                                fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                                color: isSel ? AppTheme.emerald : textMain,
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 14),

                // 4 Statutory Metric Summary Cards
                Row(
                  children: [
                    Expanded(
                      child: _buildMetricCard(
                        'MANDATORY RECYCLING',
                        '${mandatoryMT.toStringAsFixed(1)} MT',
                        '${(targetPct * 100).toInt()}% Target Obligation',
                        AppTheme.emerald,
                        isDark,
                        cardBg,
                        border,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _buildMetricCard(
                        'AVOIDED PENALTY',
                        '₹${(avoidedPenaltyINR / 1000).toStringAsFixed(0)}k',
                        'CPCB Statutory Shield',
                        AppTheme.orange,
                        isDark,
                        cardBg,
                        border,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: _buildMetricCard(
                        'GHG ABATEMENT',
                        '${(carbonKg / 1000).toStringAsFixed(1)} tCO₂e',
                        'EPA WARM Certified',
                        AppTheme.teal,
                        isDark,
                        cardBg,
                        border,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _buildMetricCard(
                        'MANDATORY PCR',
                        '${mandatoryPCRMT.toStringAsFixed(1)} MT',
                        '25% Min Recycled Content',
                        AppTheme.purple,
                        isDark,
                        cardBg,
                        border,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Parameter Configuration Card
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: surface,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: border),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'STATUTORY DECLARATION PARAMETERS',
                        style: AppTheme.fontMono(fontSize: 9.5, fontWeight: FontWeight.w800, color: textMain, letterSpacing: 0.5),
                      ),
                      const SizedBox(height: 12),

                      // Material Category Dropdown
                      Text("Material Schedule (CPCB PWM Rules 2026)", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12),
                        decoration: BoxDecoration(
                          color: cardBg,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: border),
                        ),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton<String>(
                            value: _materialCategory,
                            isExpanded: true,
                            dropdownColor: surface,
                            items: [
                              DropdownMenuItem(value: 'aluminum', child: Text("Aluminum (ELV Scrappage - 75% Target)", style: AppTheme.fontSans(fontSize: 11.5, color: textMain))),
                              DropdownMenuItem(value: 'steel', child: Text("Steel Scrap (HMS 1/2 - 70% Target)", style: AppTheme.fontSans(fontSize: 11.5, color: textMain))),
                              DropdownMenuItem(value: 'plastic_pet', child: Text("PET Plastic (Cat I Rigid - 80% Target)", style: AppTheme.fontSans(fontSize: 11.5, color: textMain))),
                              DropdownMenuItem(value: 'plastic_hdpe', child: Text("HDPE Plastic (Cat II Flexible - 70%)", style: AppTheme.fontSans(fontSize: 11.5, color: textMain))),
                              DropdownMenuItem(value: 'electronic', child: Text("E-Waste (Schedule I PCBs - 85% Target)", style: AppTheme.fontSans(fontSize: 11.5, color: textMain))),
                            ],
                            onChanged: (val) {
                              if (val != null) {
                                setState(() => _materialCategory = val);
                                _recalculate();
                              }
                            },
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Volume Slider
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("Annual Declared Ingested Volume", style: AppTheme.fontMono(fontSize: 9, color: textMuted)),
                          Text(
                            "${_productionMT.toInt()} Metric Tonnes",
                            style: AppTheme.fontMono(fontSize: 12, fontWeight: FontWeight.w800, color: AppTheme.emerald),
                          ),
                        ],
                      ),
                      Slider(
                        value: _productionMT,
                        min: 20,
                        max: 2500,
                        divisions: 248,
                        activeColor: AppTheme.emerald,
                        inactiveColor: isDark ? AppTheme.darkBorder : AppTheme.lightBorder,
                        onChanged: (val) {
                          setState(() => _productionMT = val);
                          _recalculate();
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Form 1 Audit Assessment Box
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: surface,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppTheme.emerald.withOpacity(0.4)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.verified_outlined, size: 16, color: AppTheme.emerald),
                              const SizedBox(width: 6),
                              Text(
                                "FORM 1 • STATUTORY SUMMARY",
                                style: AppTheme.fontMono(fontSize: 9.5, fontWeight: FontWeight.w800, color: textMain),
                              ),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                            decoration: BoxDecoration(
                              color: AppTheme.emerald,
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              "100% VERIFIED",
                              style: AppTheme.fontMono(fontSize: 8, fontWeight: FontWeight.w800, color: Colors.black),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),

                      Text(
                        "\"This assessment certifies that $_companyName (PIBO: $_piboNo) in $_stateJurisdiction is obligated under MoEFCC guidelines to divert at least ${mandatoryMT.toStringAsFixed(1)} MT of $_materialCategory to fulfill compliance and abate ${(carbonKg / 1000).toStringAsFixed(1)} MT CO₂e.\"",
                        style: AppTheme.fontSans(fontSize: 11, color: textMuted, height: 1.4, fontStyle: FontStyle.italic),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Mint Certificate Button
                ElevatedButton(
                  onPressed: _minting ? null : _handleMintCertificate,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.orange,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    elevation: 0,
                  ),
                  child: _minting
                      ? Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white),
                            ),
                            const SizedBox(width: 10),
                            Text('Generating CPCB Certificate on Chain...', style: AppTheme.fontSans(fontWeight: FontWeight.bold)),
                          ],
                        )
                      : Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.verified, size: 18),
                            const SizedBox(width: 8),
                            Text(
                              'MINT DIGITAL CPCB EPR CERTIFICATE',
                              style: AppTheme.fontSans(fontSize: 12.5, fontWeight: FontWeight.w900, letterSpacing: 0.6),
                            ),
                          ],
                        ),
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildMetricCard(
    String label,
    String val,
    String sub,
    Color color,
    bool isDark,
    Color cardBg,
    Color border,
  ) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: AppTheme.fontMono(fontSize: 8.5, fontWeight: FontWeight.w700, color: AppTheme.getTextMuted(isDark))),
          const SizedBox(height: 6),
          Text(val, style: AppTheme.fontSans(fontSize: 16, fontWeight: FontWeight.w900, color: color)),
          const SizedBox(height: 2),
          Text(sub, style: AppTheme.fontMono(fontSize: 8, color: AppTheme.getTextMuted(isDark))),
        ],
      ),
    );
  }
}
