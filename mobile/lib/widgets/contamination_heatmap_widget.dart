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
                  Icon(Icons.layers_outlined, size: 16, color: AppTheme.moss),
                  SizedBox(width: 6),
                  Text(
                    "OPTICAL QUALITY & CONTAMINATION",
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
                  color: isHighGrade
                      ? AppTheme.moss.withOpacity(0.15)
                      : AppTheme.amber.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(
                    color: isHighGrade
                        ? AppTheme.moss.withOpacity(0.4)
                        : AppTheme.amber.withOpacity(0.4),
                  ),
                ),
                child: Text(
                  recyclabilityGrade,
                  style: TextStyle(
                    fontFamily: 'monospace',
                    fontSize: 9,
                    fontWeight: FontWeight.bold,
                    color: isHighGrade ? AppTheme.moss : AppTheme.amber,
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
              const Text(
                "Clean Material Fraction",
                style: TextStyle(
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: AppTheme.muted,
                ),
              ),
              Text(
                "${purityPercentage.toStringAsFixed(1)}%",
                style: const TextStyle(
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.moss,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(3),
            child: SizedBox(
              height: 8,
              child: Row(
                children: [
                  Expanded(
                    flex: purityPercentage.round(),
                    child: Container(color: AppTheme.moss),
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
                style: const TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.muted),
              ),
              Text(
                "Contaminant: ${contaminationPercentage.toStringAsFixed(1)}%",
                style: const TextStyle(fontFamily: 'monospace', fontSize: 9, color: AppTheme.amber),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Impurity & Moisture Info Row
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppTheme.ink,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: AppTheme.border),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "IDENTIFIED IMPURITIES",
                        style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        contaminationType,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 10, color: AppTheme.bone),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    const Text(
                      "MOISTURE",
                      style: TextStyle(fontFamily: 'monospace', fontSize: 8, color: AppTheme.muted),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      moistureLevel,
                      style: const TextStyle(
                        fontFamily: 'monospace',
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.bone,
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
