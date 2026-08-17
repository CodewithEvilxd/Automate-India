import 'dart:math';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/api_service.dart';
import '../services/user_state_service.dart';

class IndicVoiceWidget extends StatefulWidget {
  final Function(Map<String, dynamic> parsed) onParsed;

  const IndicVoiceWidget({Key? key, required this.onParsed}) : super(key: key);

  @override
  State<IndicVoiceWidget> createState() => _IndicVoiceWidgetState();
}

class _IndicVoiceWidgetState extends State<IndicVoiceWidget> {
  final TextEditingController _controller = TextEditingController();
  final ApiService _apiService = ApiService();
  final UserStateService _userState = UserStateService();

  bool _loading = false;
  bool _isListening = false;
  String? _recentSuccess;

  final List<Map<String, String>> _samplePrompts = [
    {
      'lang': 'HINDI',
      'text': 'Noida Sector 63 me 450 kilo clean aluminum 6063 scrap ready hai',
    },
    {
      'lang': 'MARATHI',
      'text': 'Pune Chakan MIDC madhe 180 kilo copper wire scrap ahe',
    },
    {
      'lang': 'TAMIL',
      'text': 'Chennai Sriperumbudur la 1200 kilo washed PET plastic flakes irukku',
    },
    {
      'lang': 'TELUGU',
      'text': 'Hyderabad Patancheru lo 850 kilo blue HDPE granules unnaayi',
    },
    {
      'lang': 'BENGALI',
      'text': 'Kolkata Howrah warehouse e 600 kilo heavy melting steel scrap ache',
    },
  ];

  Future<void> _handleParse(String text) async {
    if (text.trim().isEmpty) return;
    setState(() => _loading = true);
    try {
      final parsed = await _apiService.parseIndicVoice(text);
      widget.onParsed(parsed);
      setState(() {
        _recentSuccess = "Extracted: ${(parsed['category'] ?? '').toUpperCase()} • ${parsed['estimated_weight_kg']} kg (${parsed['location'] ?? 'Noida'})";
      });
    } catch (_) {}
    setState(() => _loading = false);
  }

  Future<void> _simulateVoiceRecord() async {
    setState(() => _isListening = true);
    await Future.delayed(const Duration(milliseconds: 1500));
    final randomPrompt = _samplePrompts[Random().nextInt(_samplePrompts.length)]['text']!;
    _controller.text = randomPrompt;
    setState(() => _isListening = false);
    await _handleParse(randomPrompt);
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _userState,
      builder: (context, _) {
        final isDark = _userState.isDarkMode;
        final surface = AppTheme.getSurface(isDark);
        final cardBg = AppTheme.getSurfaceRaised(isDark);
        final textMain = AppTheme.getTextMain(isDark);
        final textMuted = AppTheme.getTextMuted(isDark);
        final border = AppTheme.getBorder(isDark);

        return Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: border),
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
                      Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(
                          color: AppTheme.orange.withOpacity(0.18),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Icon(Icons.mic, size: 16, color: AppTheme.orange),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        "INDIC VOICE & ASR INGESTION",
                        style: AppTheme.fontMono(
                          fontSize: 9.5,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 0.6,
                          color: textMain,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppTheme.orange.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      "5 INDIC LANGUAGES",
                      style: AppTheme.fontMono(
                        fontSize: 8,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.orange,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              Text(
                "Aggregators and weighbridge operators can tap the microphone or speak in Hindi/Marathi/Tamil/Telugu/Bengali.",
                style: AppTheme.fontSans(fontSize: 10.5, color: textMuted, height: 1.3),
              ),
              const SizedBox(height: 12),

              // Audio Waveform or Input Field
              if (_isListening)
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppTheme.orange, width: 1.5),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.graphic_eq, color: AppTheme.orange, size: 24),
                      const SizedBox(width: 10),
                      Text(
                        "Listening in ${_userState.languageName}... Speak now",
                        style: AppTheme.fontSans(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.orange),
                      ),
                    ],
                  ),
                )
              else
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        style: AppTheme.fontSans(fontSize: 11.5, color: textMain),
                        decoration: InputDecoration(
                          hintText: "e.g. Noida me 450 kg aluminum scrap ready hai",
                          hintStyle: AppTheme.fontSans(fontSize: 10.5, color: textMuted),
                          filled: true,
                          fillColor: cardBg,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                          enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide(color: border)),
                          focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppTheme.orange, width: 1.5)),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),

                    // Voice Record Mic Button
                    GestureDetector(
                      onTap: _loading ? null : _simulateVoiceRecord,
                      child: Container(
                        padding: const EdgeInsets.all(11),
                        decoration: BoxDecoration(
                          color: AppTheme.orange,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.mic, color: Colors.white, size: 18),
                      ),
                    ),
                    const SizedBox(width: 6),

                    // Parse Text Button
                    ElevatedButton(
                      onPressed: _loading ? null : () => _handleParse(_controller.text),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.emerald,
                        foregroundColor: Colors.black,
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        elevation: 0,
                      ),
                      child: _loading
                          ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.black))
                          : Text("PARSE", style: AppTheme.fontMono(fontSize: 10, fontWeight: FontWeight.w800)),
                    ),
                  ],
                ),

              const SizedBox(height: 10),

              // Sample Prompts Horizontal Scroll
              SizedBox(
                height: 28,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _samplePrompts.length,
                  itemBuilder: (context, idx) {
                    final sp = _samplePrompts[idx];
                    return GestureDetector(
                      onTap: () {
                        _controller.text = sp['text']!;
                        _handleParse(sp['text']!);
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 6),
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: cardBg,
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(color: border),
                        ),
                        child: Row(
                          children: [
                            Text(
                              "${sp['lang']}: ",
                              style: AppTheme.fontMono(fontSize: 8, fontWeight: FontWeight.bold, color: AppTheme.orange),
                            ),
                            Text(
                              sp['text']!,
                              style: AppTheme.fontSans(fontSize: 9, color: textMuted),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),

              // Success Banner
              if (_recentSuccess != null) ...[
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.emerald.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: AppTheme.emerald.withOpacity(0.3)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.check_circle, size: 14, color: AppTheme.emerald),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          _recentSuccess!,
                          style: AppTheme.fontMono(fontSize: 9.5, fontWeight: FontWeight.bold, color: AppTheme.emerald),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}
