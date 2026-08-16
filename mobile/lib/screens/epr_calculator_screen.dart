import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/material_model.dart';
import '../services/api_service.dart';
import '../widgets/category_badge_widget.dart';

class EPRCalculatorScreen extends StatefulWidget {
  const EPRCalculatorScreen({Key? key}) : super(key: key);

  @override
  State<EPRCalculatorScreen> createState() => _EPRCalculatorScreenState();
}

class _EPRCalculatorScreenState extends State<EPRCalculatorScreen> {
  final ApiService _apiService = ApiService();
  String _companyName = "Tata Motors Ancillary Unit / NCR";
  String _industry = "automotive";
  String _materialCategory = "aluminum";
  double _productionMT = 350;
  List<MaterialItem> _allMaterials = [];
  bool _loading = true;

  final Map<String, double> _cpcbTargets = {
    'aluminum': 0.75,
    'steel': 0.70,
    'plastic_pet': 0.80,
    'plastic_hdpe': 0.70,
    'paper': 0.65,
    'electronic': 0.85,
  };

  final Map<String, double> _emissionFactors = {
    'aluminum': 9.13,
    'steel': 1.81,
    'plastic_pet': 1.50,
    'plastic_hdpe': 1.35,
    'paper': 3.42,
    'electronic': 5.50,
  };

  @override
  void initState() {
    super.initState();
    _fetchMaterials();
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

  @override
  Widget build(BuildContext context) {
    final double targetPct = _cpcbTargets[_materialCategory] ?? 0.70;
    final double mandatoryMT = double.parse((_productionMT * targetPct).toStringAsFixed(1));
    final double mandatoryKg = mandatoryMT * 1000;
    final double factor = _emissionFactors[_materialCategory] ?? 2.0;
    final double requiredCo2Kg = mandatoryKg * factor;

    final matchingLots = _allMaterials.where((m) =>
        m.category.toLowerCase().contains(_materialCategory.replaceAll('plastic_', ''))).toList();
    final double totalMatchingMass = matchingLots.fold(0.0, (sum, m) => sum + m.estimatedWeightKg);

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              "EPR LIABILITY SIMULATOR",
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.0,
                color: AppTheme.bone,
              ),
            ),
            Text(
              "CPCB MANDATE • FY 2026-27",
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
            // Top Description
            const Text(
              "Calculate mandatory Extended Producer Responsibility (EPR) recycling liability under Central Pollution Control Board (CPCB) guidelines and simulate 100% compliance.",
              style: TextStyle(fontSize: 12, color: AppTheme.muted, height: 1.4),
            ),
            const SizedBox(height: 16),

            // Input Card
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Icon(Icons.calculate_outlined, size: 16, color: AppTheme.moss),
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
                    onChanged: (val) => setState(() => _companyName = val),
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
                  const SizedBox(height: 12),

                  // Material Category
                  const Text("Material Category (CPCB Schedule)", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
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
                          DropdownMenuItem(value: 'aluminum', child: Text("Aluminum Scrap (Auto / Extrusions)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'steel', child: Text("Steel & Heavy Ferrous Scrap", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'plastic_pet', child: Text("PET Plastic (Rigid Category I)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'plastic_hdpe', child: Text("HDPE Plastic (Flexible Category II)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'paper', child: Text("Corrugated OCC Packaging", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                          DropdownMenuItem(value: 'electronic', child: Text("E-Waste (Schedule I IT & Telecom)", style: TextStyle(fontSize: 11, color: AppTheme.bone))),
                        ],
                        onChanged: (val) => setState(() => _materialCategory = val!),
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Annual Consumption Slider
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text("Annual Material Consumption", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
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
                    onChanged: (val) => setState(() => _productionMT = val),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Summary Stats Grid
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(6),
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
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("REQUIRED CO₂ ABATEMENT", style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted)),
                        const SizedBox(height: 4),
                        Text("${(requiredCo2Kg / 1000).toStringAsFixed(1)} MT", style: const TextStyle(fontFamily: 'monospace', fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.moss)),
                        const Text("EPA WARM Verified", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Official Form 1 Assessment Card
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(6),
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
                          Icon(Icons.description_outlined, size: 16, color: AppTheme.moss),
                          SizedBox(width: 6),
                          Text(
                            "FORM 1 • CPCB CORPORATE ASSESSMENT",
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
                      const Icon(Icons.verified, size: 14, color: AppTheme.moss),
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
                      "\"Under CPCB Plastic & Waste Management Rules 2022/2026, $_companyName is mandated to divert at least ${mandatoryMT.toStringAsFixed(1)} MT ($mandatoryKg kg) of $_materialCategory scrap to achieve 100% statutory compliance and abate ${(requiredCo2Kg / 1000).toStringAsFixed(1)} MT CO₂e.\"",
                      style: const TextStyle(fontSize: 11, color: AppTheme.bone, height: 1.4, fontStyle: FontStyle.italic),
                    ),
                  ),
                  const SizedBox(height: 12),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "${matchingLots.length} Matching Lots on Ledger (${(totalMatchingMass / 1000).toStringAsFixed(1)} MT)",
                        style: const TextStyle(fontFamily: 'monospace', fontSize: 10, color: AppTheme.muted),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppTheme.moss,
                          borderRadius: BorderRadius.circular(3),
                        ),
                        child: const Text(
                          "AUDIT READY",
                          style: TextStyle(fontFamily: 'monospace', fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.ink),
                        ),
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
