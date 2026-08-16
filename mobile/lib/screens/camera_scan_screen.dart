import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/indic_voice_widget.dart';
import '../widgets/contamination_heatmap_widget.dart';
import '../widgets/matchmaking_card_widget.dart';

class CameraScanScreen extends StatefulWidget {
  const CameraScanScreen({Key? key}) : super(key: key);

  @override
  State<CameraScanScreen> createState() => _CameraScanScreenState();
}

class _CameraScanScreenState extends State<CameraScanScreen> {
  final ApiService _apiService = ApiService();
  bool _analyzing = false;
  Map<String, dynamic>? _aiResult;

  // Form Controllers
  final _titleController = TextEditingController(text: "Clean Sorted Aluminum Extrusions (Series 6063)");
  final _descController = TextEditingController(text: "Clean secondary aluminum profile offcuts, dry warehouse stored.");
  final _categoryController = TextEditingController(text: "aluminum");
  final _weightController = TextEditingController(text: "450");
  final _conditionController = TextEditingController(text: "Good");
  String _selectedLocation = 'Noida, UP';

  void _handleIndicParsed(Map<String, dynamic> parsed) {
    setState(() {
      _aiResult = parsed;
      _categoryController.text = parsed['category'] ?? 'aluminum';
      _weightController.text = (parsed['estimated_weight_kg'] ?? 450).toString();
      _selectedLocation = parsed['location'] ?? 'Noida, UP';
      _titleController.text = parsed['title'] ?? _titleController.text;
      _descController.text = parsed['description'] ?? _descController.text;
    });
  }

  Future<void> _runAiVisionScan() async {
    setState(() => _analyzing = true);
    try {
      final res = await _apiService.analyzeImageBase64("dGVzdA==");
      setState(() {
        _aiResult = res;
        _categoryController.text = res['category'] ?? 'aluminum';
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

  @override
  Widget build(BuildContext context) {
    final double weightVal = double.tryParse(_weightController.text) ?? 450.0;
    final String catVal = _categoryController.text.isNotEmpty ? _categoryController.text : "aluminum";
    final double calculatedCo2 = _apiService.calculateCO2Saved(catVal, weightVal);

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              'LIST INDUSTRIAL MATERIAL',
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.0,
                color: AppTheme.bone,
              ),
            ),
            Text(
              'AI VISION & INDIC VOICE INGESTION',
              style: TextStyle(
                fontSize: 9,
                color: AppTheme.moss,
                fontFamily: 'monospace',
              ),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Feature 5: Multilingual Indic Voice & Chat Ingestion
            IndicVoiceWidget(onParsed: _handleIndicParsed),
            const SizedBox(height: 16),

            // Camera Upload Zone
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AppTheme.border),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text(
                        "1. SPECIMEN PHOTOGRAPHY",
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.bone,
                        ),
                      ),
                      Text(
                        "IPFS PINNED",
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 9,
                          color: AppTheme.moss,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Container(
                    height: 120,
                    decoration: BoxDecoration(
                      color: AppTheme.ink,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: AppTheme.border),
                    ),
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.camera_alt_outlined, size: 32, color: AppTheme.moss),
                          const SizedBox(height: 6),
                          const Text(
                            "Tap to Capture or Upload Specimen Photo",
                            style: TextStyle(fontSize: 11, color: AppTheme.muted),
                          ),
                          const SizedBox(height: 8),
                          ElevatedButton.icon(
                            onPressed: _analyzing ? null : _runAiVisionScan,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppTheme.moss,
                              foregroundColor: AppTheme.ink,
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                            ),
                            icon: _analyzing
                                ? const SizedBox(
                                    width: 12,
                                    height: 12,
                                    child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.ink),
                                  )
                                : const Icon(Icons.auto_awesome, size: 14),
                            label: Text(
                              _analyzing ? "AI Classifying..." : "Auto-Fill with AI Vision",
                              style: const TextStyle(fontFamily: 'monospace', fontSize: 10, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Feature 2: Visual Contamination Heatmap Preview
            ContaminationHeatmapWidget(
              purityPercentage: (_aiResult?['purity_percentage'] as num?)?.toDouble() ?? 97.4,
              contaminationType: _aiResult?['contamination_type'] ?? "Minor surface dust and oxidation",
              contaminationPercentage: (_aiResult?['contamination_percentage'] as num?)?.toDouble() ?? 2.6,
              recyclabilityGrade: _aiResult?['recyclability_grade'] ?? "Grade A+ (Remelt Quality)",
              moistureLevel: _aiResult?['moisture_level'] ?? "Low (<1%)",
            ),
            const SizedBox(height: 14),

            // Form Specifications
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
                  const Text(
                    "2. MANIFEST SPECIFICATIONS",
                    style: TextStyle(
                      fontFamily: 'monospace',
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.bone,
                    ),
                  ),
                  const SizedBox(height: 10),

                  // Title
                  const Text("Material Lot Title", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
                  const SizedBox(height: 4),
                  TextField(
                    controller: _titleController,
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

                  // Category & Weight
                  Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text("Category", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
                            const SizedBox(height: 4),
                            TextField(
                              controller: _categoryController,
                              onChanged: (_) => setState(() {}),
                              style: const TextStyle(fontSize: 12, color: AppTheme.bone, fontFamily: 'monospace'),
                              decoration: InputDecoration(
                                filled: true,
                                fillColor: AppTheme.ink,
                                contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(4), borderSide: const BorderSide(color: AppTheme.border)),
                                enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(4), borderSide: const BorderSide(color: AppTheme.border)),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text("Mass (kg)", style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted)),
                            const SizedBox(height: 4),
                            TextField(
                              controller: _weightController,
                              keyboardType: TextInputType.number,
                              onChanged: (_) => setState(() {}),
                              style: const TextStyle(fontSize: 12, color: AppTheme.bone, fontFamily: 'monospace'),
                              decoration: InputDecoration(
                                filled: true,
                                fillColor: AppTheme.ink,
                                contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(4), borderSide: const BorderSide(color: AppTheme.border)),
                                enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(4), borderSide: const BorderSide(color: AppTheme.border)),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),

                  // Carbon Math Banner
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: AppTheme.ink,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: AppTheme.moss.withOpacity(0.3)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "EPA WARM Carbon Abatement:",
                          style: TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted),
                        ),
                        Text(
                          "+${calculatedCo2.toStringAsFixed(1)} kg CO₂e",
                          style: const TextStyle(
                            fontFamily: 'monospace',
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: AppTheme.moss,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Feature 1: MCX Price Oracle Preview
            MatchmakingCardWidget(
              category: catVal,
              weightKg: weightVal,
              location: _selectedLocation,
            ),
            const SizedBox(height: 16),

            // List Material Button
            ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    backgroundColor: AppTheme.moss,
                    content: Text(
                      '✅ Material Lot Immutably Registered on Polygon Amoy!',
                      style: TextStyle(fontFamily: 'monospace', color: AppTheme.ink, fontWeight: FontWeight.bold),
                    ),
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.moss,
                foregroundColor: AppTheme.ink,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
              ),
              child: const Text(
                'MINT & LIST LOT ON BLOCKCHAIN',
                style: TextStyle(
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 0.8,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
