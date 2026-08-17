import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
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
        borderRadius: BorderRadius.circular(14),
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
                children: [
                  const Icon(Icons.mic, size: 16, color: AppTheme.amber),
                  const SizedBox(width: 6),
                  Text(
                    "INDIC VOICE & TEXT INGESTION",
                    style: GoogleFonts.jetBrainsMono(
                      fontSize: 9.5,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 0.6,
                      color: AppTheme.textMain,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: AppTheme.amber.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  "HINDI / HINGLISH",
                  style: GoogleFonts.jetBrainsMono(
                    fontSize: 8,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.amber,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            "Weighbridge operators can speak or type in Hindi/English to auto-populate scrap lot details.",
            style: GoogleFonts.plusJakartaSans(fontSize: 10.5, color: AppTheme.textMuted, height: 1.3),
          ),
          const SizedBox(height: 10),

          // Input & Auto-fill Button
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _controller,
                  style: GoogleFonts.plusJakartaSans(fontSize: 11.5, color: AppTheme.textMain),
                  decoration: InputDecoration(
                    hintText: "e.g. Noida me 450 kilo aluminum...",
                    hintStyle: GoogleFonts.plusJakartaSans(fontSize: 11, color: AppTheme.textMuted.withOpacity(0.6)),
                    filled: true,
                    fillColor: AppTheme.surfaceRaised,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: AppTheme.border),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: AppTheme.border),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: AppTheme.emerald),
                    ),
                  ),
                  onSubmitted: _handleParse,
                ),
              ),
              const SizedBox(width: 8),
              ElevatedButton(
                onPressed: _loading ? null : () => _handleParse(_controller.text),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.emerald,
                  foregroundColor: AppTheme.background,
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: _loading
                    ? const SizedBox(
                        height: 14,
                        width: 14,
                        child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.background),
                      )
                    : Text(
                        "Auto-Fill",
                        style: GoogleFonts.jetBrainsMono(
                          fontSize: 10,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
              ),
            ],
          ),
          const SizedBox(height: 10),

          // Suggested Prompts
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: samplePrompts.map((prompt) {
              return InkWell(
                borderRadius: BorderRadius.circular(6),
                onTap: () {
                  _controller.text = prompt;
                  _handleParse(prompt);
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceRaised,
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: AppTheme.border),
                  ),
                  child: Text(
                    "\"$prompt\"",
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 9.5,
                      color: AppTheme.textMuted,
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),

          if (_recentSuccess != null) ...[
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: AppTheme.emerald.withOpacity(0.12),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: AppTheme.emerald.withOpacity(0.3)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.check_circle_outline, size: 14, color: AppTheme.emerald),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      _recentSuccess!,
                      style: GoogleFonts.jetBrainsMono(
                        fontSize: 9.5,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.emerald,
                      ),
                      overflow: TextOverflow.ellipsis,
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
