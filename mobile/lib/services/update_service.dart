import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import 'api_service.dart';

class UpdateInfo {
  final String latestVersion;
  final int versionCode;
  final String minSupportedVersion;
  final bool isCritical;
  final String releaseDate;
  final String apkDownloadUrl;
  final String apkSizeMb;
  final String title;
  final List<String> releaseNotes;

  UpdateInfo({
    required this.latestVersion,
    required this.versionCode,
    required this.minSupportedVersion,
    required this.isCritical,
    required this.releaseDate,
    required this.apkDownloadUrl,
    required this.apkSizeMb,
    required this.title,
    required this.releaseNotes,
  });

  factory UpdateInfo.fromJson(Map<String, dynamic> json) {
    return UpdateInfo(
      latestVersion: json['latest_version'] ?? '2.6.0',
      versionCode: json['version_code'] ?? 26,
      minSupportedVersion: json['min_supported_version'] ?? '2.0.0',
      isCritical: json['is_critical'] ?? false,
      releaseDate: json['release_date'] ?? '2026-08-18',
      apkDownloadUrl: json['apk_download_url'] ?? '/circularchain.apk',
      apkSizeMb: json['apk_size_mb'] ?? '48.2 MB',
      title: json['title'] ?? 'CircularChain Update Available',
      releaseNotes: List<String>.from(json['release_notes'] ?? [
        'Performance improvements and security enhancements',
      ]),
    );
  }
}

class UpdateService extends ChangeNotifier {
  static final UpdateService _instance = UpdateService._internal();
  factory UpdateService() => _instance;
  UpdateService._internal();

  static const String currentVersion = '2.6.0';
  static const int currentVersionCode = 26;

  bool _isChecking = false;
  bool _hasUpdate = false;
  UpdateInfo? _latestInfo;
  int _dismissedVersionCode = 0;

  bool get isChecking => _isChecking;
  bool get hasUpdate => _hasUpdate && (_latestInfo != null && _latestInfo!.versionCode > _dismissedVersionCode);
  UpdateInfo? get latestInfo => _latestInfo;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _dismissedVersionCode = prefs.getInt('dismissed_update_version_code') ?? 0;
  }

  void dismissBanner() async {
    if (_latestInfo != null) {
      _dismissedVersionCode = _latestInfo!.versionCode;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setInt('dismissed_update_version_code', _dismissedVersionCode);
      notifyListeners();
    }
  }

  void markUpdated() {
    _hasUpdate = false;
    _latestInfo = null;
    notifyListeners();
  }

  Future<UpdateInfo?> checkForUpdates({bool isManualCheck = false}) async {
    _isChecking = true;
    notifyListeners();

    final endpoints = [
      'https://circularchain.vercel.app/api/app-version',
      '${ApiService.baseUrl}/app-version',
      'http://10.0.2.2:3000/api/app-version',
      'http://10.0.2.2:5000/api/app-version',
    ];

    UpdateInfo? foundUpdate;

    for (final url in endpoints) {
      try {
        final uri = Uri.parse(url);
        final response = await http.get(uri).timeout(const Duration(seconds: 3));

        if (response.statusCode == 200) {
          final data = json.decode(response.body);
          final info = UpdateInfo.fromJson(data);

          // REAL LOGIC: Compare remote build code with local installed build code
          if (info.versionCode > currentVersionCode) {
            foundUpdate = info;
            break;
          } else {
            // App is ALREADY up to date or on latest version
            foundUpdate = null;
            break;
          }
        }
      } catch (_) {
        continue;
      }
    }

    if (foundUpdate != null) {
      _hasUpdate = true;
      _latestInfo = foundUpdate;
    } else {
      _hasUpdate = false;
      _latestInfo = null;
    }

    _isChecking = false;
    notifyListeners();
    return _latestInfo;
  }

  // Simulate an OTA update for testing/demonstration purposes
  void simulateOtaUpdate() {
    _hasUpdate = true;
    _latestInfo = UpdateInfo(
      latestVersion: '2.7.0',
      versionCode: 27,
      minSupportedVersion: '2.0.0',
      isCritical: false,
      releaseDate: '2026-08-18',
      apkDownloadUrl: 'https://circularchain.vercel.app/circularchain.apk',
      apkSizeMb: '50.8 MB',
      title: 'CircularChain v2.7.0 Feature Upgrade',
      releaseNotes: [
        '⚡ Real Web3 Polygon Amoy RPC live sync & MetaMask deep linking',
        '📸 High-Definition scrap lot photography headers & verification stamps',
        '👤 Multi-user profile management with custom name & language selector',
        '📍 All-India SPCB hub jurisdictions (DPCC, UPPCB, MPCB, GPCB, etc.)',
        '🔄 Real-time OTA In-App Auto Updater with 1-tap download & install',
        '🤖 6-Agent Autonomous Radar & MCX Spot Oracle integration',
      ],
    );
    notifyListeners();
  }

  Future<void> launchDownloadUrl(String url) async {
    String fullUrl = url;
    if (url.startsWith('/')) {
      fullUrl = 'https://circularchain.vercel.app$url';
    }
    try {
      final uri = Uri.parse(fullUrl);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      }
    } catch (_) {}
  }
}
