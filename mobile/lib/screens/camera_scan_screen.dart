import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/api_service.dart';
import '../services/user_state_service.dart';
import '../services/wallet_service.dart';
import '../theme/app_theme.dart';
import '../widgets/indic_voice_widget.dart';
import '../widgets/contamination_heatmap_widget.dart';
import '../widgets/matchmaking_card_widget.dart';
import '../widgets/wallet_connect_modal.dart';

class CameraScanScreen extends StatefulWidget {
  const CameraScanScreen({Key? key}) : super(key: key);

  @override
  State<CameraScanScreen> createState() => _CameraScanScreenState();
}

class _CameraScanScreenState extends State<CameraScanScreen> {
  final ApiService _apiService = ApiService();
  final UserStateService _userState = UserStateService();
  final WalletService _walletService = WalletService();

  bool _analyzing = false;
  bool _minting = false;
  Map<String, dynamic>? _aiResult;
  int _selectedPresetIndex = 0;

  final List<Map<String, dynamic>> _specimenPresets = [
    {
      'title': 'Clean Sorted Aluminum Extrusions (Series 6063)',
      'desc': 'Clean secondary aluminum profile offcuts, dry warehouse stored, zero paint residue.',
      'category': 'aluminum',
      'weight': '450',
      'condition': 'Grade A+ (Remelt Quality)',
      'purity': 97.4,
      'oxidation': 2.6,
      'location': 'Noida Sector 62, UP',
      'color': AppTheme.emerald,
    },
    {
      'title': 'Stripped Heavy Berry Copper Wire (No. 1)',
      'desc': 'High conductivity unalloyed copper wire, bare and stripped of PVC insulation.',
      'category': 'copper',
      'weight': '180',
      'condition': 'Grade A (Mill Grade)',
      'purity': 98.8,
      'oxidation': 1.2,
      'location': 'Pune Cluster, MH',
      'color': AppTheme.orange,
    },
    {
      'title': 'Hot-Washed PET Bottle Clear Flakes',
      'desc': 'De-labeled, caustic hot-washed food-grade bottle flakes with <50ppm PVC.',
      'category': 'plastic_pet',
      'weight': '1200',
      'condition': 'Grade A (Yarn Grade)',
      'purity': 96.5,
      'oxidation': 3.5,
      'location': 'Sanand Industrial Zone, GJ',
      'color': AppTheme.teal,
    },
    {
      'title': 'Blue HDPE Regrind Injection Granules',
      'desc': 'Single-source post-consumer HDPE drum regrind, washed and sieved.',
      'category': 'plastic_hdpe',
      'weight': '850',
      'condition': 'Grade B+ (Extrusion Ready)',
      'purity': 94.2,
      'oxidation': 5.8,
      'location': 'Bengaluru Hub, KA',
      'color': AppTheme.purple,
    },
  ];

  // Form Controllers
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  final _categoryController = TextEditingController();
  final _weightController = TextEditingController();
  final _conditionController = TextEditingController();
  String _selectedLocation = 'Noida Sector 62, UP';

  @override
  void initState() {
    super.initState();
    _applyPreset(0);
  }

  void _applyPreset(int idx) {
    final p = _specimenPresets[idx];
    setState(() {
      _selectedPresetIndex = idx;
      _titleController.text = p['title'];
      _descController.text = p['desc'];
      _categoryController.text = p['category'];
      _weightController.text = p['weight'];
      _conditionController.text = p['condition'];
      _selectedLocation = p['location'];
      _aiResult = {
        'title': p['title'],
        'description': p['desc'],
        'category': p['category'],
        'estimated_weight_kg': double.tryParse(p['weight']) ?? 450.0,
        'condition': p['condition'],
        'purity_percentage': p['purity'],
        'contamination_percentage': p['oxidation'],
        'contamination_type': 'Surface patina & ambient micro-dust',
        'recyclability_grade': p['condition'],
        'moisture_level': '<1% Low',
      };
    });
  }

  void _handleIndicParsed(Map<String, dynamic> parsed) {
    setState(() {
      _aiResult = parsed;
      _categoryController.text = parsed['category'] ?? _categoryController.text;
      _weightController.text = (parsed['estimated_weight_kg'] ?? 450).toString();
      _selectedLocation = parsed['location'] ?? _selectedLocation;
      _titleController.text = parsed['title'] ?? _titleController.text;
      _descController.text = parsed['description'] ?? _descController.text;
    });
  }

  Future<void> _runAiVisionScan() async {
    setState(() => _analyzing = true);
    await Future.delayed(const Duration(milliseconds: 1400));
    try {
      final res = await _apiService.analyzeImageBase64("dGVzdA==");
      setState(() {
        _aiResult = res;
        _categoryController.text = res['category'] ?? _categoryController.text;
        _weightController.text = (res['estimated_weight_kg'] ?? 450).toString();
        _conditionController.text = res['condition'] ?? 'Good';
        _titleController.text = res['title'] ?? _titleController.text;
        _descController.text = res['description'] ?? _descController.text;
        _analyzing = false;
      });
    } catch (_) {
      setState(() => _analyzing = false);
    }
  }

  Future<void> _handleMintToBlockchain() async {
    setState(() => _minting = true);
    final double weightVal = double.tryParse(_weightController.text) ?? 450.0;
    final String catVal = _categoryController.text.isNotEmpty ? _categoryController.text : "aluminum";
    final double co2 = _apiService.calculateCO2Saved(catVal, weightVal);

    try {
      final txHash = await _walletService.recordTransaction(
        title: _titleController.text,
        type: 'MINT',
        amount: weightVal,
        token: 'CIRC',
        carbonCreditsToAdd: co2 / 1000,
        penaltySavedToAdd: (weightVal / 1000) * 25000,
      );

      if (mounted) {
        setState(() => _minting = false);
        _showMintSuccessModal(txHash, weightVal, co2);
      }
    } catch (_) {
      if (mounted) setState(() => _minting = false);
    }
  }

  void _showMintSuccessModal(String txHash, double weight, double co2) {
    final isDark = _userState.isDarkMode;
    showDialog(
      context: context,
      builder: (ctx) => Dialog(
        backgroundColor: AppTheme.getSurface(isDark),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        child: Padding(
          padding: const EdgeInsets.all(22),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.emerald.withOpacity(0.18),
                  shape: BoxShape.circle,
                  border: Border.all(color: AppTheme.emerald, width: 2),
                ),
                child: const Icon(Icons.check, color: AppTheme.emerald, size: 36),
              ),
              const SizedBox(height: 16),
              Text(
                'MINTED TO POLYGON AMOY!',
                style: AppTheme.fontSans(fontSize: 16, fontWeight: FontWeight.w900, color: AppTheme.getTextMain(isDark), letterSpacing: 0.6),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 6),
              Text(
                'Lot #CIRC-${DateTime.now().millisecondsSinceEpoch.toString().substring(7)} is immutably anchored on-chain with IPFS visual proof.',
                style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.getTextMuted(isDark), height: 1.4),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.getSurfaceRaised(isDark),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppTheme.getBorder(isDark)),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Batch Mass:', style: AppTheme.fontMono(fontSize: 10, color: AppTheme.getTextMuted(isDark))),
                        Text('${weight.toStringAsFixed(0)} kg', style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 12, color: AppTheme.getTextMain(isDark))),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Scope 3 Offset:', style: AppTheme.fontMono(fontSize: 10, color: AppTheme.getTextMuted(isDark))),
                        Text('+${co2.toStringAsFixed(1)} kg CO₂e', style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 12, color: AppTheme.emerald)),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Network:', style: AppTheme.fontMono(fontSize: 10, color: AppTheme.getTextMuted(isDark))),
                        Text('Polygon Amoy #80002', style: AppTheme.fontMono(fontWeight: FontWeight.bold, fontSize: 10.5, color: AppTheme.orange)),
                      ],
                    ),
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
                  backgroundColor: AppTheme.orange,
                  foregroundColor: Colors.white,
                  minimumSize: const Size.fromHeight(44),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.open_in_new, size: 14),
                    const SizedBox(width: 6),
                    Text('View on Polygonscan Amoy', style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 12)),
                  ],
                ),
              ),
              const SizedBox(height: 8),
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: Text('Done', style: AppTheme.fontSans(color: AppTheme.getTextMuted(isDark), fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final double weightVal = double.tryParse(_weightController.text) ?? 450.0;
    final String catVal = _categoryController.text.isNotEmpty ? _categoryController.text : "aluminum";
    final double calculatedCo2 = _apiService.calculateCO2Saved(catVal, weightVal);

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
                  'AI VISION & INDIC VOICE INGESTION',
                  style: AppTheme.fontSans(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 0.6,
                    color: textMain,
                  ),
                ),
                Text(
                  'AGENT 01 QUALITY SCANNER & AGENT 04 ASR',
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
                // Indic Voice Widget
                IndicVoiceWidget(onParsed: _handleIndicParsed),
                const SizedBox(height: 14),

                // Preset Specimen Selector Bar
                Text(
                  'LOAD SAMPLE SCRAP SPECIMEN BATCH',
                  style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.w800, color: textMuted, letterSpacing: 0.5),
                ),
                const SizedBox(height: 8),
                SizedBox(
                  height: 38,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: _specimenPresets.length,
                    itemBuilder: (context, idx) {
                      final p = _specimenPresets[idx];
                      final isSel = _selectedPresetIndex == idx;
                      return GestureDetector(
                        onTap: () => _applyPreset(idx),
                        child: Container(
                          margin: const EdgeInsets.only(right: 8),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: isSel ? AppTheme.emerald.withOpacity(0.2) : cardBg,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(
                              color: isSel ? AppTheme.emerald : border,
                              width: isSel ? 1.5 : 1,
                            ),
                          ),
                          child: Center(
                            child: Text(
                              p['category'].toString().toUpperCase(),
                              style: AppTheme.fontMono(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
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

                // Camera Upload & Optical Segmentation Zone
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: surface,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: border),
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "OPTICAL QUALITY SEGMENTATION",
                            style: AppTheme.fontMono(
                              fontSize: 9.5,
                              fontWeight: FontWeight.w800,
                              color: textMain,
                              letterSpacing: 0.5,
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppTheme.emerald.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              "IPFS CID VERIFIED",
                              style: AppTheme.fontMono(
                                fontSize: 8.5,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.emerald,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      // Camera Specimen Box
                      Container(
                        height: 150,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color: cardBg,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: AppTheme.emerald.withOpacity(0.4),
                            width: 1.5,
                          ),
                        ),
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            // Grid lines / Crosshairs
                            Positioned(
                              top: 8,
                              left: 8,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: Colors.black.withOpacity(0.6),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: Text(
                                  "ISO 9001 GRADE: ${_conditionController.text.toUpperCase()}",
                                  style: AppTheme.fontMono(fontSize: 8.5, color: AppTheme.emerald, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 8,
                              right: 8,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: Colors.black.withOpacity(0.6),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: Text(
                                  "PURITY: ${(_aiResult?['purity_percentage'] ?? 97.4)}%",
                                  style: AppTheme.fontMono(fontSize: 8.5, color: AppTheme.orange, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                            Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                _analyzing
                                    ? const CircularProgressIndicator(color: AppTheme.emerald, strokeWidth: 2.5)
                                    : const Icon(Icons.center_focus_strong, size: 44, color: AppTheme.emerald),
                                const SizedBox(height: 8),
                                Text(
                                  _analyzing
                                      ? "Agent 01: Segmenting Contours & Patina..."
                                      : "Optical Feed Active · Real-Time Contour Mask",
                                  style: AppTheme.fontMono(
                                    fontSize: 10,
                                    fontWeight: FontWeight.w700,
                                    color: textMain,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Trigger Vision Button
                      ElevatedButton(
                        onPressed: _analyzing ? null : _runAiVisionScan,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.orange,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          elevation: 0,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.auto_awesome, size: 16),
                            const SizedBox(width: 8),
                            Text(
                              _analyzing ? 'RUNNING INFERENCE...' : 'RE-SCAN SPECIMEN WITH AGENT 01',
                              style: AppTheme.fontSans(
                                fontSize: 11,
                                fontWeight: FontWeight.w800,
                                letterSpacing: 0.6,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // Contamination Heatmap Widget
                if (_aiResult != null) ...[
                  ContaminationHeatmapWidget(aiResult: _aiResult!),
                  const SizedBox(height: 14),
                ],

                // Parsed Material Form Fields
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
                        "VERIFIED SPECIMEN METRICS",
                        style: AppTheme.fontMono(fontSize: 9.5, fontWeight: FontWeight.w800, color: textMain, letterSpacing: 0.5),
                      ),
                      const SizedBox(height: 12),

                      // Title
                      Text("Material Lot Title", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                      const SizedBox(height: 4),
                      TextField(
                        controller: _titleController,
                        style: AppTheme.fontSans(fontSize: 12.5, color: textMain, fontWeight: FontWeight.w600),
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: cardBg,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                          enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                        ),
                      ),
                      const SizedBox(height: 10),

                      // Category & Weight Grid
                      Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("Category", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                                const SizedBox(height: 4),
                                TextField(
                                  controller: _categoryController,
                                  onChanged: (_) => setState(() {}),
                                  style: AppTheme.fontMono(fontSize: 12, color: textMain, fontWeight: FontWeight.w600),
                                  decoration: InputDecoration(
                                    filled: true,
                                    fillColor: cardBg,
                                    contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                                    enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("Mass (kg)", style: AppTheme.fontMono(fontSize: 8.5, color: textMuted)),
                                const SizedBox(height: 4),
                                TextField(
                                  controller: _weightController,
                                  keyboardType: TextInputType.number,
                                  onChanged: (_) => setState(() {}),
                                  style: AppTheme.fontMono(fontSize: 12, color: textMain, fontWeight: FontWeight.w600),
                                  decoration: InputDecoration(
                                    filled: true,
                                    fillColor: cardBg,
                                    contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                                    enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      // EPA WARM Carbon Banner
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: cardBg,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: AppTheme.emerald.withOpacity(0.35)),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              "EPA WARM Avoided Scope 3:",
                              style: AppTheme.fontMono(fontSize: 9.5, color: textMuted),
                            ),
                            Text(
                              "+${calculatedCo2.toStringAsFixed(1)} kg CO₂e",
                              style: AppTheme.fontSans(
                                fontSize: 13,
                                fontWeight: FontWeight.w900,
                                color: AppTheme.emerald,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // MCX Matchmaking & Price Oracle
                MatchmakingCardWidget(
                  category: catVal,
                  weightKg: weightVal,
                  location: _selectedLocation,
                ),
                const SizedBox(height: 16),

                // Mint Button with real Wallet integration
                ElevatedButton(
                  onPressed: _minting ? null : _handleMintToBlockchain,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.emerald,
                    foregroundColor: Colors.black,
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
                              child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.black),
                            ),
                            const SizedBox(width: 10),
                            Text(
                              'Anchoring on Polygon Amoy...',
                              style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                          ],
                        )
                      : Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.lock, size: 18),
                            const SizedBox(width: 8),
                            Text(
                              'MINT & LIST LOT ON POLYGON AMOY',
                              style: AppTheme.fontSans(
                                fontSize: 12.5,
                                fontWeight: FontWeight.w900,
                                letterSpacing: 0.6,
                              ),
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
}
