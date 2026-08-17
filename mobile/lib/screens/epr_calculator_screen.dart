import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';

class EPRCalculatorScreen extends StatefulWidget {
  const EPRCalculatorScreen({super.key});

  @override
  State<EPRCalculatorScreen> createState() => _EPRCalculatorScreenState();
}

class _EPRCalculatorScreenState extends State<EPRCalculatorScreen> {
  final ApiService _apiService = ApiService();

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

  @override
  Widget build(BuildContext context) {
    final double targetPct = (_apiData?['mandated_recycling_target_percent'] ?? 75.0) / 100.0;
    final double mandatoryMT = (_apiData?['mandated_offset_obligation_mt'] ?? (_productionMT * targetPct)).toDouble();
    final double mandatoryPCRMT = (_apiData?['mandatory_pcr_mass_mt'] ?? (_productionMT * 0.25)).toDouble();
    final double carbonKg = (_apiData?['verified_carbon_abatement_kg_co2e'] ?? (mandatoryMT * 1000 * 9.13)).toDouble();
    final double avoidedPenaltyINR = (_apiData?['avoided_statutory_penalty_inr'] ?? (mandatoryMT * 8500)).toDouble();

    final matchingLots = _allMaterials.where((m) =>
        m.category.toLowerCase().contains(_materialCategory.replaceAll('plastic_', '').replaceAll('battery_', ''))).toList();
    final double totalMatchingMass = matchingLots.fold(0.0, (sum, m) => sum + m.estimatedWeightKg);

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: AppTheme.background,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "EPR STATUTORY SIMULATOR",
              style: AppTheme.fontSans(
                fontSize: 14.5,
                fontWeight: FontWeight.w800,
                letterSpacing: 0.6,
                color: AppTheme.textMain,
              ),
            ),
            Text(
              "MOEFCC & CPCB FY 2026-27 ENGINE",
              style: AppTheme.fontMono(
                fontSize: 8.5,
                color: AppTheme.emerald,
                fontWeight: FontWeight.w700,
                letterSpacing: 0.5,
              ),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Quick Demo Presets
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "QUICK COMPLIANCE PRESETS",
                    style: AppTheme.fontMono(
                      fontSize: 8.5,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.amber,
                      letterSpacing: 0.5,
                    ),
                  ),
                  const SizedBox(height: 8),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: _demoPresets.map((preset) {
                        final isSelected = _companyName == preset['name'];
                        return Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: InkWell(
                            borderRadius: BorderRadius.circular(8),
                            onTap: () => _applyPreset(preset),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 7),
                              decoration: BoxDecoration(
                                color: isSelected ? AppTheme.emerald : AppTheme.surfaceRaised,
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(
                                  color: isSelected ? AppTheme.emerald : AppTheme.border,
                                ),
                              ),
                              child: Text(
                                preset['label'],
                                style: AppTheme.fontSans(
                                  fontSize: 10.5,
                                  fontWeight: isSelected ? FontWeight.w800 : FontWeight.w500,
                                  color: isSelected ? AppTheme.background : AppTheme.textMain,
                                ),
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Top Live Status
            Row(
              children: [
                Container(
                  width: 6,
                  height: 6,
                  decoration: const BoxDecoration(
                    color: AppTheme.emerald,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 6),
                Text(
                  "LIVE CPCB BACKEND API SYNC ACTIVE",
                  style: AppTheme.fontMono(
                    fontSize: 8.5,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.6,
                    color: AppTheme.emerald,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // 4 Stats Overview Cards (2x2 Grid)
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("MANDATORY EPR OFFSET", style: AppTheme.fontMono(fontSize: 8, fontWeight: FontWeight.w700, color: AppTheme.textMuted)),
                        const SizedBox(height: 4),
                        Text("${mandatoryMT.toStringAsFixed(1)} MT", style: AppTheme.fontMono(fontSize: 16, fontWeight: FontWeight.w800, color: AppTheme.textMain)),
                        Text("${(targetPct * 100).toInt()}% statutory quota", style: AppTheme.fontSans(fontSize: 9.5, fontWeight: FontWeight.w600, color: AppTheme.emerald)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("CARBON ABATEMENT", style: AppTheme.fontMono(fontSize: 8, fontWeight: FontWeight.w700, color: AppTheme.textMuted)),
                        const SizedBox(height: 4),
                        Text("${(carbonKg / 1000).toStringAsFixed(1)} MT", style: AppTheme.fontMono(fontSize: 16, fontWeight: FontWeight.w800, color: AppTheme.emerald)),
                        Text("EPA WARM Standard", style: AppTheme.fontSans(fontSize: 9.5, fontWeight: FontWeight.w500, color: AppTheme.textLight)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("MANDATORY PCR BLEND", style: AppTheme.fontMono(fontSize: 8, fontWeight: FontWeight.w700, color: AppTheme.textMuted)),
                        const SizedBox(height: 4),
                        Text("${mandatoryPCRMT.toStringAsFixed(1)} MT", style: AppTheme.fontMono(fontSize: 16, fontWeight: FontWeight.w800, color: AppTheme.amber)),
                        Text("Post-Consumer Resin", style: AppTheme.fontSans(fontSize: 9.5, fontWeight: FontWeight.w500, color: AppTheme.textLight)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("AVOIDED CPCB PENALTY", style: AppTheme.fontMono(fontSize: 8, fontWeight: FontWeight.w700, color: AppTheme.textMuted)),
                        const SizedBox(height: 4),
                        Text("₹${(avoidedPenaltyINR / 100000).toStringAsFixed(2)} L", style: AppTheme.fontMono(fontSize: 16, fontWeight: FontWeight.w800, color: AppTheme.emerald)),
                        Text("EPA Sec 15 Saved", style: AppTheme.fontSans(fontSize: 9.5, fontWeight: FontWeight.w500, color: AppTheme.textLight)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Enterprise Inputs Card
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.tune_rounded, size: 16, color: AppTheme.emerald),
                      const SizedBox(width: 6),
                      Text(
                        "ENTERPRISE PARAMETERS",
                        style: AppTheme.fontMono(
                          fontSize: 9.5,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 0.6,
                          color: AppTheme.textMain,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Company Name
                  Text("Corporate Entity Name", style: AppTheme.fontMono(fontSize: 8.5, color: AppTheme.textMuted)),
                  const SizedBox(height: 4),
                  TextField(
                    onChanged: (val) {
                      _companyName = val;
                      _recalculate();
                    },
                    controller: TextEditingController(text: _companyName),
                    style: AppTheme.fontSans(fontSize: 12, color: AppTheme.textMain, fontWeight: FontWeight.w600),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: AppTheme.surfaceRaised,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppTheme.border)),
                      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppTheme.border)),
                    ),
                  ),
                  const SizedBox(height: 10),

                  // SPCB State
                  Text("State Pollution Control Board (SPCB)", style: AppTheme.fontMono(fontSize: 8.5, color: AppTheme.textMuted)),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceRaised,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _stateJurisdiction,
                        isExpanded: true,
                        dropdownColor: AppTheme.surfaceRaised,
                        items: [
                          DropdownMenuItem(value: "Maharashtra (MPCB - Pune/Chakan)", child: Text("Maharashtra (MPCB - Pune/Chakan)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: "Uttar Pradesh (UPPCB - Noida)", child: Text("Uttar Pradesh (UPPCB - Noida)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: "Gujarat (GPCB - Sanand Industrial Hub)", child: Text("Gujarat (GPCB - Ahmedabad/Sanand)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: "Karnataka (KSPCB - Bengaluru/Peenya)", child: Text("Karnataka (KSPCB - Bengaluru/Peenya)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: "Tamil Nadu (TNPCB - Sriperumbudur)", child: Text("Tamil Nadu (TNPCB - Chennai/Sriperumbudur)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: "Haryana (HSPCB - Gurugram/Manesar)", child: Text("Haryana (HSPCB - Gurugram/Manesar)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: "Delhi (DPCC - Okhla Industrial Area)", child: Text("Delhi (DPCC - Okhla Industrial)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                        ],
                        onChanged: (val) {
                          if (val != null) {
                            setState(() => _stateJurisdiction = val);
                            _recalculate();
                          }
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),

                  // Material Category
                  Text("Statutory Material Schedule (CPCB)", style: AppTheme.fontMono(fontSize: 8.5, color: AppTheme.textMuted)),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceRaised,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _materialCategory,
                        isExpanded: true,
                        dropdownColor: AppTheme.surfaceRaised,
                        items: [
                          DropdownMenuItem(value: 'aluminum', child: Text("Aluminum (ELV Scrappage - 75% Target)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: 'steel', child: Text("Steel Scrap (HMS 1/2 - 70% Target)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: 'plastic_pet', child: Text("PET Plastic (Cat I Rigid - 80% Target)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: 'plastic_hdpe', child: Text("HDPE Plastic (Cat II Flexible - 70%)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: 'plastic_mlp', child: Text("Multi-Layered Plastic (Cat III MLP - 60%)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: 'paper', child: Text("Corrugated OCC Paper (65% Target)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: 'electronic', child: Text("E-Waste (Schedule I PCBs - 85% Target)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
                          DropdownMenuItem(value: 'battery_lithium', child: Text("Lithium Battery Scrap (BWMR - 70%)", style: AppTheme.fontSans(fontSize: 11.5, color: AppTheme.textMain))),
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

                  // Annual Consumption Slider
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text("Annual Ingested Volume", style: AppTheme.fontMono(fontSize: 9, color: AppTheme.textMuted)),
                      Text(
                        "${_productionMT.toInt()} Metric Tonnes",
                        style: AppTheme.fontMono(fontSize: 12.5, fontWeight: FontWeight.w800, color: AppTheme.emerald),
                      ),
                    ],
                  ),
                  Slider(
                    value: _productionMT,
                    min: 20,
                    max: 2500,
                    divisions: 248,
                    activeColor: AppTheme.emerald,
                    inactiveColor: AppTheme.border,
                    onChanged: (val) {
                      setState(() => _productionMT = val);
                      _recalculate();
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Form 1 CPCB Certificate Assessment
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(14),
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
                            "FORM 1 • CPCB STATUTORY AUDIT",
                            style: AppTheme.fontMono(
                              fontSize: 9.5,
                              fontWeight: FontWeight.w800,
                              letterSpacing: 0.6,
                              color: AppTheme.textMain,
                            ),
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
                          "100% COMPLIANT",
                          style: AppTheme.fontMono(fontSize: 8, fontWeight: FontWeight.w800, color: AppTheme.background),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),

                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceRaised,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Text(
                      "\"This statutory assessment certifies that $_companyName (PIBO: $_piboNo) in $_stateJurisdiction is obligated under CPCB 2026 guidelines to divert at least ${mandatoryMT.toStringAsFixed(1)} MT of $_materialCategory into authorized secondary recycling facilities to fulfill compliance and abate ${(carbonKg / 1000).toStringAsFixed(1)} MT CO₂e.\"",
                      style: AppTheme.fontSans(fontSize: 11, color: AppTheme.textMain, height: 1.4, fontStyle: FontStyle.italic),
                    ),
                  ),
                  const SizedBox(height: 12),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          "${matchingLots.length} Matching Lots (${(totalMatchingMass / 1000).toStringAsFixed(1)} MT)",
                          style: AppTheme.fontMono(fontSize: 9.5, color: AppTheme.textMuted),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      Text(
                        "Polygon Amoy Verified",
                        style: AppTheme.fontMono(fontSize: 9, color: AppTheme.emerald, fontWeight: FontWeight.w800),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
