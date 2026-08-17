import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class VerificationStampWidget extends StatelessWidget {
  final String? txHash;
  final double size;
  final double rotation;

  const VerificationStampWidget({
    super.key,
    this.txHash,
    this.size = 110,
    this.rotation = -0.05, // ~-3 degrees
  });

  @override
  Widget build(BuildContext context) {
    final displayHash = txHash != null && txHash!.length >= 10
        ? '${txHash!.substring(0, 6)}...${txHash!.substring(txHash!.length - 4)}'
        : '0x8F2E...C91A';

    return SizedBox(
      width: size,
      height: size,
      child: FittedBox(
        fit: BoxFit.contain,
        child: Transform.rotate(
          angle: rotation,
          child: Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: AppTheme.emerald, width: 2.5),
            ),
            padding: const EdgeInsets.all(3),
            child: Container(
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppTheme.emerald.withOpacity(0.6),
                  width: 1.2,
                ),
              ),
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'CIRCULAR',
                        style: AppTheme.fontMono(
                          color: AppTheme.emerald,
                          fontSize: 8,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 1.5,
                        ),
                      ),
                      const SizedBox(height: 1),
                      Text(
                        'VERIFIED',
                        style: AppTheme.fontSans(
                          color: AppTheme.emerald,
                          fontSize: 11,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 1.2,
                        ),
                      ),
                      const SizedBox(height: 1),
                      Text(
                        displayHash.toUpperCase(),
                        style: AppTheme.fontMono(
                          color: AppTheme.emerald.withOpacity(0.85),
                          fontSize: 6.5,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
