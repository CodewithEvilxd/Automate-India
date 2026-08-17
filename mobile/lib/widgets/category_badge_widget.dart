import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class CategoryBadgeWidget extends StatelessWidget {
  final String category;

  const CategoryBadgeWidget({Key? key, required this.category}) : super(key: key);

  String get formattedName {
    switch (category.toLowerCase()) {
      case 'aluminum':
        return 'Aluminum';
      case 'steel':
        return 'Steel HMS';
      case 'plastic_pet':
        return 'PET Cat I';
      case 'plastic_hdpe':
        return 'HDPE Cat II';
      case 'plastic_mlp':
        return 'MLP Cat III';
      case 'paper':
        return 'OCC Paper';
      case 'glass':
        return 'Cullet Glass';
      case 'electronic':
        return 'E-Waste PCB';
      default:
        return category.toUpperCase();
    }
  }

  Color get badgeColor {
    switch (category.toLowerCase()) {
      case 'aluminum':
      case 'steel':
        return AppTheme.teal;
      case 'plastic_pet':
      case 'plastic_hdpe':
        return AppTheme.emerald;
      case 'electronic':
        return AppTheme.purple;
      default:
        return AppTheme.amber;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
      decoration: BoxDecoration(
        color: badgeColor.withOpacity(0.12),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: badgeColor.withOpacity(0.35)),
      ),
      child: Text(
        formattedName,
        style: AppTheme.fontMono(
          color: badgeColor,
          fontSize: 9.5,
          fontWeight: FontWeight.w700,
          letterSpacing: 0.2,
        ),
      ),
    );
  }
}
