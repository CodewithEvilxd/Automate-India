import 'dart:convert';
import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/verification_stamp_widget.dart';

class CameraScanScreen extends StatefulWidget {
  const CameraScanScreen({Key? key}) : super(key: key);

  @override
  State<CameraScanScreen> createState() => _CameraScanScreenState();
}

class _CameraScanScreenState extends State<CameraScanScreen> {
  final ApiService _apiService = ApiService();
  bool _analyzing = false;
  Map<String, dynamic>? _aiResult;

  // Form Fields
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  final _categoryController = TextEditingController();
  final _weightController = TextEditingController();
  final _conditionController = TextEditingController();
  String _selectedLocation = 'Noida, UP';

  Future<void> _simulateAiScan() async {
    setState(() => _analyzing = true);

    try {
      // Mocked sample base64 for emulator demo testing
      await Future.delayed(const Duration(seconds: 2));
      final result = {
        'category': 'aluminum',
        'estimated_weight_kg': 450.0,
        'condition': 'Good (Uncontaminated)',
        'title': 'Structural 6061-T6 Extrusion Scrap',
        'description': 'Clean mill-finish fabrication scrap ready for secondary furnace remelting.',
      };

      setState(() {
        _aiResult = result;
        _categoryController.text = result['category'].toString();
        _weightController.text = result['estimated_weight_kg'].toString();
        _conditionController.text = result['condition'].toString();
        _titleController.text = result['title'].toString();
        _descController.text = result['description'].toString();
        _analyzing = false;
      });
    } catch (e) {
      setState(() => _analyzing = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('AI Analysis Error: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Specimen Scanner'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Camera Preview / Upload Zone
            Container(
              height: 180,
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AppTheme.border),
              ),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.camera_alt_outlined, size: 40, color: AppTheme.moss),
                    const SizedBox(height: 8),
                    const Text(
                      'Capture or Upload Industrial Scrap Photo',
                      style: TextStyle(color: AppTheme.bone, fontSize: 12),
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton.icon(
                      onPressed: _analyzing ? null : _simulateAiScan,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.moss,
                        foregroundColor: AppTheme.ink,
                      ),
                      icon: _analyzing
                          ? const SizedBox(
                              width: 14,
                              height: 14,
                              child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.ink),
                            )
                          : const Icon(Icons.auto_awesome, size: 16),
                      label: Text(_analyzing ? 'AI Classifying...' : 'Auto-Fill with AI Vision'),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Form Inputs
            if (_aiResult != null) ...[
              const Text(
                'AI Extracted Manifest Specifications',
                style: TextStyle(
                  color: AppTheme.moss,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                  fontFamily: 'monospace',
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _titleController,
                decoration: const InputDecoration(
                  labelText: 'Material Lot Title',
                  filled: true,
                  fillColor: AppTheme.surface,
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _categoryController,
                      decoration: const InputDecoration(
                        labelText: 'Category',
                        filled: true,
                        fillColor: AppTheme.surface,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: TextField(
                      controller: _weightController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'Est. Weight (kg)',
                        filled: true,
                        fillColor: AppTheme.surface,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Lot recorded on-chain!')),
                  );
                  Navigator.pop(context);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.moss,
                  foregroundColor: AppTheme.ink,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
                child: const Text('Confirm & List Lot on Blockchain'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
