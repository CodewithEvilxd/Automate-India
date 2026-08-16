import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/api_service.dart';

class IndicVoiceWidget extends StatefulWidget {
  final Function(Map<String, dynamic> parsed) onParsed;

  const IndicVoiceWidget({Key? key, required this.onParsed}) : super(key: key);

  @override
  State<IndicVoiceWidget> createState() => _IndicVoiceWidgetState();
}

class _IndicVoiceWidgetState extends State<IndicVoiceWidget> {
  final TextEditingController _controller = TextEditingController();
  final ApiService _apiService = ApiService();
  bool _loading = false;
  String? _recentSuccess;

  final List<String> samplePrompts = [
    "Noida sector 63 me 450 kilo clean aluminum scrap ready hai",
    "Pune chakan factory se 800 kg washed PET plastic flakes",
    "Gurugram warehouse me 1200 kilo cardboard gatta scrap available",
  ];

  Future<void> _handleParse(String text) async {
    if (text.trim().isEmpty) return;
    setState(() => _loading = true);
    try {
      final parsed = await _apiService.parseIndicVoice(text);
      widget.onParsed(parsed);
      setState(() {
        _recentSuccess = "Extracted: ${(parsed['category'] ?? '').toUpperCase()} • ${parsed['estimated_weight_kg']} kg";
      });
    } catch (_) {}
    setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: const [
                  Icon(Icons.mic, size: 16, color: AppTheme.amber),
                  SizedBox(width: 6),
                  Text(
                    "INDIC VOICE & TEXT INGESTION",
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
                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                decoration: BoxDecoration(
                  color: AppTheme.amber.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(3),
                ),
                child: const Text(
                  "HINDI / HINGLISH",
                  style: TextStyle(
                    fontFamily: 'monospace',
                    fontSize: 8,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.amber,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          const Text(
            "Weighbridge operators can speak or type in Hindi/English to auto-populate scrap lot details.",
            style: TextStyle(fontSize: 10, color: AppTheme.muted, height: 1.3),
          ),
          const SizedBox(height: 10),

          // Input & Auto-fill Button
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _controller,
                  style: const TextStyle(fontSize: 12, color: AppTheme.bone),
                  decoration: InputDecoration(
                    hintText: "e.g. Noida me 450 kilo aluminum...",
                    hintStyle: TextStyle(fontSize: 11, color: AppTheme.muted.withOpacity(0.6)),
                    filled: true,
                    fillColor: AppTheme.ink,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(4),
                      borderSide: const BorderSide(color: AppTheme.border),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(4),
                      borderSide: const BorderSide(color: AppTheme.border),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(4),
                      borderSide: const BorderSide(color: AppTheme.moss),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              ElevatedButton(
                onPressed: _loading ? null : () => _handleParse(_controller.text),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.moss,
                  foregroundColor: AppTheme.ink,
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                ),
                child: _loading
                    ? const SizedBox(
                        width: 14,
                        height: 14,
                        child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.ink),
                      )
                    : const Text(
                        "Auto-Fill",
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
              ),
            ],
          ),
          const SizedBox(height: 8),

          // Quick Prompt Chips
          Wrap(
            spacing: 6,
            runSpacing: 4,
            children: samplePrompts.map((prompt) {
              return InkWell(
                onTap: () {
                  _controller.text = prompt;
                  _handleParse(prompt);
                },
                borderRadius: BorderRadius.circular(3),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppTheme.ink,
                    borderRadius: BorderRadius.circular(3),
                    border: Border.all(color: AppTheme.border),
                  ),
                  child: Text(
                    "\"$prompt\"",
                    style: const TextStyle(fontSize: 9, color: AppTheme.muted),
                  ),
                ),
              );
            }).toList(),
          ),

          if (_recentSuccess != null) ...[
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: AppTheme.moss.withOpacity(0.15),
                borderRadius: BorderRadius.circular(3),
                border: Border.all(color: AppTheme.moss.withOpacity(0.4)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.check_circle_outline, size: 12, color: AppTheme.moss),
                  const SizedBox(width: 4),
                  Text(
                    _recentSuccess!,
                    style: const TextStyle(
                      fontFamily: 'monospace',
                      fontSize: 9,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.moss,
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
}
