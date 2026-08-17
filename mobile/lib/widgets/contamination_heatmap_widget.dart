import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../services/user_state_service.dart';

class ContaminationHeatmapWidget extends StatelessWidget {
  final double purityPercentage;
  final String contaminationType;
  final double contaminationPercentage;
  final String recyclabilityGrade;
  final String moistureLevel;

  ContaminationHeatmapWidget({
    Key? key,
    Map<String, dynamic>? aiResult,
    double? purityPercentage,
    String? contaminationType,
    double? contaminationPercentage,
    String? recyclabilityGrade,
    String? moistureLevel,
  })  : purityPercentage = (aiResult?['purity_percentage'] as num?)?.toDouble() ??
            purityPercentage ??
            97.4,
        contaminationType = aiResult?['contamination_type'] as String? ??
            contaminationType ??
            "Minor surface dust and light oxidation",
        contaminationPercentage = (aiResult?['contamination_percentage'] as num?)?.toDouble() ??
            contaminationPercentage ??
            2.6,
        recyclabilityGrade = aiResult?['recyclability_grade'] as String? ??
            recyclabilityGrade ??
            "Grade A+ (Remelt Quality)",
        moistureLevel = aiResult?['moisture_level'] as String? ??
            moistureLevel ??
            "Low (<1%)",
        super(key: key);

  @override
  Widget build(BuildContext context) {
    final userState = UserStateService();

    return AnimatedBuilder(
      animation: userState,
      builder: (context, _) {
        final isDark = userState.isDarkMode;
        final surface = AppTheme.getSurface(isDark);
        final cardBg = AppTheme.getSurfaceRaised(isDark);
        final textMain = AppTheme.getTextMain(isDark);
        final textMuted = AppTheme.getTextMuted(isDark);
        final border = AppTheme.getBorder(isDark);

        final bool isHighGrade = purityPercentage >= 90;

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
                          color: AppTheme.emerald.withOpacity(0.18),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Icon(Icons.layers_outlined, size: 16, color: AppTheme.emerald),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        "OPTICAL CONTAMINATION MAP",
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
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: (isHighGrade ? AppTheme.emerald : AppTheme.orange).withOpacity(0.15),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      recyclabilityGrade.toUpperCase(),
                      style: AppTheme.fontMono(
                        fontSize: 8.5,
                        fontWeight: FontWeight.w800,
                        color: isHighGrade ? AppTheme.emerald : AppTheme.orange,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Purity & Contaminant Bar
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: SizedBox(
                  height: 10,
                  child: Row(
                    children: [
                      Expanded(
                        flex: (purityPercentage * 10).toInt(),
                        child: Container(color: AppTheme.emerald),
                      ),
                      Expanded(
                        flex: (contaminationPercentage * 10).toInt().clamp(1, 1000),
                        child: Container(color: AppTheme.orange),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 6),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Purity: ${purityPercentage.toStringAsFixed(1)}%",
                    style: AppTheme.fontMono(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.emerald),
                  ),
                  Text(
                    "Contaminant / Patina: ${contaminationPercentage.toStringAsFixed(1)}%",
                    style: AppTheme.fontMono(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.orange),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Impurity & Moisture Info Box
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: cardBg,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: border),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "IDENTIFIED SURFACE IMPURITIES",
                            style: AppTheme.fontMono(fontSize: 8, color: textMuted, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            contaminationType,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: AppTheme.fontSans(fontSize: 10.5, color: textMain),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          "MOISTURE",
                          style: AppTheme.fontMono(fontSize: 8, color: textMuted, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          moistureLevel,
                          style: AppTheme.fontMono(
                            fontSize: 10.5,
                            fontWeight: FontWeight.w800,
                            color: textMain,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
