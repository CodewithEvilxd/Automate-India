import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class VerificationStampWidget extends StatelessWidget {
  final String? status;
  final String? txHash;
  final double size;
  final double rotation;

  const VerificationStampWidget({
    Key? key,
    this.status,
    this.txHash,
    this.size = 110,
    this.rotation = -0.05, // ~-3 degrees
  }) : super(key: key);

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
                      const SizedBox(height: 2),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Icon(Icons.star, size: 7, color: AppTheme.emerald),
                          SizedBox(width: 2),
                          Icon(Icons.verified, size: 10, color: AppTheme.emerald),
                          SizedBox(width: 2),
                          Icon(Icons.star, size: 7, color: AppTheme.emerald),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        status?.toUpperCase() ?? 'VERIFIED',
                        style: AppTheme.fontMono(
                          color: AppTheme.emerald,
                          fontSize: 8.5,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 1.2,
                        ),
                      ),
                      const SizedBox(height: 1),
                      Text(
                        'AGENT 2 / EPA',
                        style: AppTheme.fontMono(
                          color: AppTheme.emerald.withOpacity(0.8),
                          fontSize: 6.5,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        displayHash,
                        style: AppTheme.fontMono(
                          color: AppTheme.emerald.withOpacity(0.6),
                          fontSize: 5.5,
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
