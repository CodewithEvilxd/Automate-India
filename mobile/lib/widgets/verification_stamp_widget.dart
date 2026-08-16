import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class VerificationStampWidget extends StatelessWidget {
  final String? txHash;
  final double size;
  final double rotation;

  const VerificationStampWidget({
    Key? key,
    this.txHash,
    this.size = 110,
    this.rotation = -0.05, // ~-3 degrees
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final displayHash = txHash != null && txHash!.length >= 10
        ? '${txHash!.substring(0, 6)}...${txHash!.substring(txHash!.length - 4)}'
        : '0x8F2E...C91A';

    return Transform.rotate(
      angle: rotation,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: AppTheme.moss, width: 2),
        ),
        padding: const EdgeInsets.all(4),
        child: Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(
              color: AppTheme.moss.withOpacity(0.6),
              width: 1,
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'CIRCULAR',
                style: TextStyle(
                  color: AppTheme.moss,
                  fontSize: 8,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.5,
                ),
              ),
              const SizedBox(height: 2),
              const Text(
                'VERIFIED',
                style: TextStyle(
                  color: AppTheme.moss,
                  fontSize: 11,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 1.2,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                displayHash.toUpperCase(),
                style: TextStyle(
                  color: AppTheme.moss.withOpacity(0.8),
                  fontSize: 6.5,
                  fontFamily: 'monospace',
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
