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
        return 'Steel';
      case 'plastic_pet':
        return 'PET Plastic';
      case 'plastic_hdpe':
        return 'HDPE Plastic';
      case 'paper':
        return 'Paper / OCC';
      case 'glass':
        return 'Cullet Glass';
      case 'electronic':
        return 'E-Waste';
      default:
        return category.toUpperCase();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: AppTheme.surfaceRaised,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: AppTheme.border),
      ),
      child: Text(
        formattedName,
        style: const TextStyle(
          color: AppTheme.bone,
          fontSize: 10,
          fontWeight: FontWeight.bold,
          fontFamily: 'monospace',
        ),
      ),
    );
  }
}
