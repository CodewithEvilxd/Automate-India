import 'dart:async';
import 'package:flutter/material.dart';
import '../services/update_service.dart';
import '../services/user_state_service.dart';
import '../theme/app_theme.dart';

class InAppUpdateModal extends StatefulWidget {
  final UpdateInfo info;

  const InAppUpdateModal({Key? key, required this.info}) : super(key: key);

  static Future<void> show(BuildContext context, UpdateInfo info) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => InAppUpdateModal(info: info),
    );
  }

  @override
  State<InAppUpdateModal> createState() => _InAppUpdateModalState();
}

class _InAppUpdateModalState extends State<InAppUpdateModal> {
  final UpdateService _updateService = UpdateService();
  final UserStateService _userState = UserStateService();

  bool _isDownloading = false;
  double _progress = 0.0;
  String _statusText = 'Ready to install';
  Timer? _timer;

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _startDownload() {
    setState(() {
      _isDownloading = true;
      _progress = 0.05;
      _statusText = 'Connecting to update mirror...';
    });

    _timer = Timer.periodic(const Duration(milliseconds: 150), (timer) {
      if (!mounted) return;
      setState(() {
        _progress += 0.06;
        if (_progress < 0.4) {
          _statusText = 'Downloading CircularChain v${widget.info.latestVersion} (${(_progress * 48.2).toStringAsFixed(1)} / ${widget.info.apkSizeMb})...';
        } else if (_progress < 0.85) {
          _statusText = 'Verifying SHA-256 integrity hash & package signature...';
        } else if (_progress < 0.99) {
          _statusText = 'Preparing Android Package Installer...';
        } else {
          _progress = 1.0;
          _statusText = 'Opening APK installer...';
          timer.cancel();
          _triggerInstall();
        }
      });
    });
  }

  Future<void> _triggerInstall() async {
    await Future.delayed(const Duration(milliseconds: 400));
    await _updateService.launchDownloadUrl(widget.info.apkDownloadUrl);
    if (mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: AppTheme.emerald,
          content: Row(
            children: [
              const Icon(Icons.check_circle, color: Colors.black, size: 18),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Installer launched for CircularChain v${widget.info.latestVersion}!',
                  style: AppTheme.fontSans(color: Colors.black, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = _userState.isDarkMode;
    final bg = isDark ? const Color(0xFF0C1017) : const Color(0xFFFAF8F5);
    final surface = isDark ? const Color(0xFF131A24) : Colors.white;
    final cardBg = isDark ? const Color(0xFF182230) : const Color(0xFFF3EFEA);
    final textMain = AppTheme.getTextMain(isDark);
    final textMuted = AppTheme.getTextMuted(isDark);
    final border = isDark ? const Color(0xFF223044) : const Color(0xFFD6CFC4);

    return Container(
      decoration: BoxDecoration(
        color: bg,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        border: Border.all(color: border, width: 1.2),
      ),
      padding: EdgeInsets.only(
        top: 12,
        bottom: MediaQuery.of(context).viewInsets.bottom + 20,
        left: 20,
        right: 20,
      ),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Handle bar
            Center(
              child: Container(
                width: 44,
                height: 4,
                decoration: BoxDecoration(
                  color: textMuted.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Top Header Box
            Row(
              children: [
                Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    color: AppTheme.emerald.withOpacity(0.18),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: AppTheme.emerald, width: 1.5),
                  ),
                  child: const Icon(Icons.system_update_alt_rounded, color: AppTheme.emerald, size: 26),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppTheme.orange.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(6),
                              border: Border.all(color: AppTheme.orange.withOpacity(0.4)),
                            ),
                            child: Text(
                              'OTA UPDATE AVAILABLE',
                              style: AppTheme.fontMono(
                                fontSize: 8.5,
                                fontWeight: FontWeight.bold,
                                color: AppTheme.orange,
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            widget.info.apkSizeMb,
                            style: AppTheme.fontMono(fontSize: 9.5, color: textMuted),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'v${widget.info.latestVersion} (Build #${widget.info.versionCode})',
                        style: AppTheme.fontSans(
                          fontSize: 16,
                          fontWeight: FontWeight.w900,
                          color: textMain,
                        ),
                      ),
                    ],
                  ),
                ),
                if (!widget.info.isCritical)
                  IconButton(
                    icon: Icon(Icons.close, color: textMuted, size: 20),
                    onPressed: () => Navigator.pop(context),
                  ),
              ],
            ),
            const SizedBox(height: 16),

            // What's New Box
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'WHAT\'S NEW IN THIS VERSION',
                    style: AppTheme.fontMono(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.emerald,
                      letterSpacing: 0.6,
                    ),
                  ),
                  const SizedBox(height: 10),
                  ...widget.info.releaseNotes.map((note) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8.0),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            margin: const EdgeInsets.only(top: 3),
                            padding: const EdgeInsets.all(2),
                            decoration: const BoxDecoration(
                              color: AppTheme.emerald,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.check, size: 9, color: Colors.black),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              note,
                              style: AppTheme.fontSans(
                                fontSize: 11.5,
                                color: textMain,
                                height: 1.35,
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Download Progress Bar or Action Buttons
            if (_isDownloading) ...[
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: cardBg,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: border),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            _statusText,
                            style: AppTheme.fontMono(fontSize: 10.5, color: textMain, fontWeight: FontWeight.bold),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          '${(_progress * 100).toInt()}%',
                          style: AppTheme.fontMono(fontSize: 12, fontWeight: FontWeight.w900, color: AppTheme.emerald),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: LinearProgressIndicator(
                        value: _progress.clamp(0.0, 1.0),
                        backgroundColor: border,
                        valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.emerald),
                        minHeight: 8,
                      ),
                    ),
                  ],
                ),
              ),
            ] else ...[
              Row(
                children: [
                  if (!widget.info.isCritical)
                    Expanded(
                      flex: 1,
                      child: OutlinedButton(
                        style: OutlinedButton.styleFrom(
                          foregroundColor: textMuted,
                          side: BorderSide(color: border),
                          padding: const EdgeInsets.symmetric(vertical: 13),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        onPressed: () {
                          _updateService.dismissBanner();
                          Navigator.pop(context);
                        },
                        child: Text(
                          'LATER',
                          style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 11.5),
                        ),
                      ),
                    ),
                  if (!widget.info.isCritical) const SizedBox(width: 10),
                  Expanded(
                    flex: 2,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.emerald,
                        foregroundColor: Colors.black,
                        padding: const EdgeInsets.symmetric(vertical: 13),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        elevation: 0,
                      ),
                      icon: const Icon(Icons.download_rounded, size: 18),
                      label: Text(
                        'INSTALL UPDATE NOW',
                        style: AppTheme.fontSans(fontWeight: FontWeight.w900, fontSize: 12.5),
                      ),
                      onPressed: _startDownload,
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}
