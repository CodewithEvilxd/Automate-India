import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ContaminationHeatmapWidget extends StatelessWidget {
  final double purityPercentage;
  final String contaminationType;
  final double contaminationPercentage;
  final String recyclabilityGrade;
  final String moistureLevel;

  const ContaminationHeatmapWidget({
    Key? key,
    this.purityPercentage = 97.4,
    this.contaminationType = "Minor surface dust and light oxidation",
    this.contaminationPercentage = 2.6,
    this.recyclabilityGrade = "Grade A+ (Remelt Quality)",
    this.moistureLevel = "Low (<1%)",
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isHighGrade = purityPercentage >= 90;

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
              Expanded(
                child: Row(
                  children: [
                    const Icon(Icons.layers_outlined, size: 16, color: AppTheme.emerald),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(
                        "OPTICAL CONTAMINATION",
                        style: AppTheme.fontMono(
                          fontSize: 9.5,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 0.6,
                          color: AppTheme.textMain,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: isHighGrade
                      ? AppTheme.emerald.withOpacity(0.15)
                      : AppTheme.amber.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(
                    color: isHighGrade
                        ? AppTheme.emerald.withOpacity(0.4)
                        : AppTheme.amber.withOpacity(0.4),
                  ),
                ),
                child: Text(
                  recyclabilityGrade,
                  style: AppTheme.fontMono(
                    fontSize: 8.5,
                    fontWeight: FontWeight.w800,
                    color: isHighGrade ? AppTheme.emerald : AppTheme.amber,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Purity Bar
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "Clean Material Fraction",
                style: AppTheme.fontMono(
                  fontSize: 10.5,
                  color: AppTheme.textMuted,
                ),
              ),
              Text(
                "${purityPercentage.toStringAsFixed(1)}%",
                style: AppTheme.fontMono(
                  fontSize: 12,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.emerald,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: SizedBox(
              height: 8,
              child: Row(
                children: [
                  Expanded(
                    flex: purityPercentage.round(),
                    child: Container(color: AppTheme.emerald),
                  ),
                  Expanded(
                    flex: contaminationPercentage.round().clamp(1, 100),
                    child: Container(color: AppTheme.amber),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 4),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "Purity: ${purityPercentage.toStringAsFixed(1)}%",
                style: AppTheme.fontMono(fontSize: 8.5, color: AppTheme.textMuted),
              ),
              Text(
                "Contaminant: ${contaminationPercentage.toStringAsFixed(1)}%",
                style: AppTheme.fontMono(fontSize: 8.5, color: AppTheme.amber),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Impurity & Moisture Info Row
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppTheme.surfaceRaised,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppTheme.border),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "IDENTIFIED IMPURITIES",
                        style: AppTheme.fontMono(fontSize: 8, color: AppTheme.textMuted),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        contaminationType,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: AppTheme.fontSans(fontSize: 10.5, color: AppTheme.textMain),
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
                      style: AppTheme.fontMono(fontSize: 8, color: AppTheme.textMuted),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      moistureLevel,
                      style: AppTheme.fontMono(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.textMain,
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
  }
}
