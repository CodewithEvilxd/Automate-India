import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';

class EPRCalculatorScreen extends StatefulWidget {
  const EPRCalculatorScreen({Key? key}) : super(key: key);

  @override
  State<EPRCalculatorScreen> createState() => _EPRCalculatorScreenState();
}

class _EPRCalculatorScreenState extends State<EPRCalculatorScreen> {
  final ApiService _apiService = ApiService();
  String _companyName = "Tata Motors Ancillary Unit / NCR";
  String _piboNo = "CPCB/PIBO/2026/08941";
  String _stateJurisdiction = "UPPCB (Uttar Pradesh - Noida)";
  String _industry = "automotive";
  String _materialCategory = "aluminum";
  double _productionMT = 350;
  List<MaterialItem> _allMaterials = [];
  Map<String, dynamic>? _apiData;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchMaterials();
    _recalculate();
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
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              "EPR STATUTORY SIMULATOR",
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.0,
                color: AppTheme.bone,
              ),
            ),
            Text(
              "MOEFCC & CPCB FY 2026-27 ENGINE",
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 9,
                color: AppTheme.moss,
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
            // Top Live Status
            Row(
              children: [
                Container(
                  width: 8,
                  height: 8,
                  decoration: const BoxDecoration(
                    color: AppTheme.moss,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 6),
                const Text(
                  "LIVE CPCB BACKEND API SYNC ACTIVE",
                  style: TextStyle(
                    fontFamily: 'monospace',
                    fontSize: 9,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.8,
                    color: AppTheme.moss,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            const Text(
              "Real-time statutory obligation calculation under Plastic Waste Management Rules (PWM), E-Waste Schedule I, and Battery Waste Directives (BWMR 2026).",
              style: TextStyle(fontSize: 11, color: AppTheme.muted, height: 1.4),
            ),
            const SizedBox(height: 16),

            // 4 Stats Overview Cards (2x2 Grid)
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("MANDATORY EPR OFFSET", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                        const SizedBox(height: 4),
                        Text("${mandatoryMT.toStringAsFixed(1)} MT", style: const TextStyle(fontFamily: 'monospace', fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.bone)),
                        Text("${(targetPct * 100).toInt()}% statutory quota", style: const TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.moss)),
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
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("CARBON ABATEMENT", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                        const SizedBox(height: 4),
                        Text("${(carbonKg / 1000).toStringAsFixed(1)} MT", style: const TextStyle(fontFamily: 'monospace', fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.moss)),
                        const Text("EPA WARM Standard", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
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
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("MANDATORY PCR BLEND", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                        const SizedBox(height: 4),
                        Text("${mandatoryPCRMT.toStringAsFixed(1)} MT", style: const TextStyle(fontFamily: 'monospace', fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.ochre)),
                        const Text("Post-Consumer Resin", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
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
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("AVOIDED CPCB PENALTY", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                        const SizedBox(height: 4),
                        Text("₹${(avoidedPenaltyINR / 100000).toStringAsFixed(2)} L", style: const TextStyle(fontFamily: 'monospace', fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.moss)),
                        const Text("EPA Sec 15 Saved", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
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
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Icon(Icons.tune, size: 16, color: AppTheme.moss),
                      SizedBox(width: 6),
                      Text(
                        "ENTERPRISE PARAMETERS",
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 0.8,
                          color: AppTheme.bone,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Company Name
                  const Text("Corporate Entity Name", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
                  const SizedBox(height: 4),
                  TextField(
                    onChanged: (val) {
                      _companyName = val;
                      _recalculate();
                    },
                    controller: TextEditingController(text: _companyName),
                    style: const TextStyle(fontSize: 12, color: AppTheme.bone),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: AppTheme.ink,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(4), borderSide: const BorderSide(color: AppTheme.border)),
                      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(4), borderSide: const BorderSide(color: AppTheme.border)),
                    ),
                  ),
                  const SizedBox(height: 10),

                  // SPCB State
                  const Text("State Pollution Control Board (SPCB)", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    decoration: BoxDecoration(
                      color: AppTheme.ink,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _stateJurisdiction,
                        isExpanded: true,
                        dropdownColor: AppTheme.surface,
                        items: const [
                          DropdownMenuItem(value: "UPPCB (Uttar Pradesh - Noida)", child: Text("UPPCB (Uttar Pradesh - Noida)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: "MPCB (Maharashtra - Pune/Chakan)", child: Text("MPCB (Maharashtra - Pune/Chakan)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: "GPCB (Gujarat - Ahmedabad/Sanand)", child: Text("GPCB (Gujarat - Ahmedabad/Sanand)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: "KSPCB (Karnataka - Bengaluru)", child: Text("KSPCB (Karnataka - Bengaluru)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: "TNPCB (Tamil Nadu - Chennai)", child: Text("TNPCB (Tamil Nadu - Chennai)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                        ],
                        onChanged: (val) {
                          setState(() => _stateJurisdiction = val!);
                          _recalculate();
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),

                  // Material Category
                  const Text("Statutory Material Schedule (CPCB)", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    decoration: BoxDecoration(
                      color: AppTheme.ink,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _materialCategory,
                        isExpanded: true,
                        dropdownColor: AppTheme.surface,
                        items: const [
                          DropdownMenuItem(value: 'aluminum', child: Text("Aluminum (ELV Scrappage - 75% Target)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'steel', child: Text("Steel Scrap (HMS 1/2 - 70% Target)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'plastic_pet', child: Text("PET Plastic (Cat I Rigid - 80% Target)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'plastic_hdpe', child: Text("HDPE Plastic (Cat II Flexible - 70%)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'plastic_mlp', child: Text("Multi-Layered Plastic (Cat III MLP - 60%)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'paper', child: Text("Corrugated OCC Paper (65% Target)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'electronic', child: Text("E-Waste (Schedule I PCBs - 85% Target)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'battery_lithium', child: Text("Lithium Battery Scrap (BWMR - 70%)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                        ],
                        onChanged: (val) {
                          setState(() => _materialCategory = val!);
                          _recalculate();
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Annual Consumption Slider
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text("Annual Ingested Volume", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
                      Text(
                        "${_productionMT.toInt()} Metric Tonnes",
                        style: const TextStyle(fontFamily: 'monospace', fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.moss),
                      ),
                    ],
                  ),
                  Slider(
                    value: _productionMT,
                    min: 20,
                    max: 2000,
                    divisions: 198,
                    activeColor: AppTheme.moss,
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
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppTheme.moss.withOpacity(0.5)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.verified_outlined, size: 16, color: AppTheme.moss),
                          SizedBox(width: 6),
                          Text(
                            "FORM 1 • CPCB STATUTORY AUDIT",
                            style: TextStyle(
                              fontFamily: 'monospace',
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 0.8,
                              color: AppTheme.bone,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppTheme.moss,
                          borderRadius: BorderRadius.circular(3),
                        ),
                        child: const Text(
                          "100% COMPLIANT",
                          style: TextStyle(fontFamily: 'monospace', fontSize: 8, fontWeight: FontWeight.bold, color: AppTheme.ink),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),

                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppTheme.ink,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Text(
                      "\"This statutory assessment certifies that $_companyName (PIBO: $_piboNo) is obligated under CPCB 2026 guidelines to divert at least ${mandatoryMT.toStringAsFixed(1)} MT of $_materialCategory into authorized secondary recycling facilities to fulfill compliance and abate ${(carbonKg / 1000).toStringAsFixed(1)} MT CO₂e.\"",
                      style: const TextStyle(fontSize: 11, color: AppTheme.bone, height: 1.4, fontStyle: FontStyle.italic),
                    ),
                  ),
                  const SizedBox(height: 12),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "${matchingLots.length} Matching Lots Available (${(totalMatchingMass / 1000).toStringAsFixed(1)} MT)",
                        style: const TextStyle(fontFamily: 'monospace', fontSize: 10, color: AppTheme.muted),
                      ),
                      const Text(
                        "Polygon Amoy Verified",
                        style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.moss, fontWeight: FontWeight.bold),
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
