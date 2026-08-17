import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum UserRole {
  aggregator, // Kabadiwala / Informal Collector (Voice-First, Instant MCX Cash)
  recycler,   // Certified Recycler & Smelter (Batch QA, Weighbridge Telemetry)
  oem,        // OEM & Brand Officer (CPCB EPR Quotas, Scope 3 ESG Audit)
}

class UserStateService extends ChangeNotifier {
  static final UserStateService _instance = UserStateService._internal();
  factory UserStateService() => _instance;
  UserStateService._internal() {
    _loadState();
  }

  bool _isDarkMode = true;
  bool _hasCompletedOnboarding = false;
  UserRole _selectedRole = UserRole.aggregator;
  String _selectedLanguage = 'hi'; // Default to Hindi for inclusive grassroots experience
  String _userName = 'Ramesh Kumar';
  String _userLocation = 'Noida Sector 62, UP';

  // Getters
  bool get isDarkMode => _isDarkMode;
  bool get hasCompletedOnboarding => _hasCompletedOnboarding;
  UserRole get selectedRole => _selectedRole;
  String get selectedLanguage => _selectedLanguage;
  String get userName => _userName;
  String get userLocation => _userLocation;

  String get roleDisplayName {
    switch (_selectedRole) {
      case UserRole.aggregator:
        return 'Grassroots Aggregator / Kabadiwala';
      case UserRole.recycler:
        return 'Certified Recycler & Secondary Smelter';
      case UserRole.oem:
        return 'OEM / Corporate Compliance Officer';
    }
  }

  String get roleShortBadge {
    switch (_selectedRole) {
      case UserRole.aggregator:
        return 'KABADIWALA AGGREGATOR';
      case UserRole.recycler:
        return 'CERTIFIED RECYCLER';
      case UserRole.oem:
        return 'ENTERPRISE OEM';
    }
  }

  String get languageName {
    switch (_selectedLanguage) {
      case 'hi':
        return 'हिन्दी (Hindi)';
      case 'mr':
        return 'मराठी (Marathi)';
      case 'ta':
        return 'தமிழ் (Tamil)';
      case 'te':
        return 'తెలుగు (Telugu)';
      case 'bn':
        return 'বাংলা (Bengali)';
      case 'en':
      default:
        return 'English';
    }
  }

  Future<void> _loadState() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _isDarkMode = prefs.getBool('app_is_dark') ?? true;
      _hasCompletedOnboarding = prefs.getBool('app_onboarded') ?? false;
      final roleIdx = prefs.getInt('app_user_role') ?? 0;
      _selectedRole = UserRole.values[roleIdx.clamp(0, UserRole.values.length - 1)];
      _selectedLanguage = prefs.getString('app_language') ?? 'hi';
      _userName = prefs.getString('app_user_name') ?? 'Ramesh Kumar';
      _userLocation = prefs.getString('app_user_loc') ?? 'Noida Sector 62, UP';
      notifyListeners();
    } catch (_) {}
  }

  Future<void> _saveState() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('app_is_dark', _isDarkMode);
      await prefs.setBool('app_onboarded', _hasCompletedOnboarding);
      await prefs.setInt('app_user_role', _selectedRole.index);
      await prefs.setString('app_language', _selectedLanguage);
      await prefs.setString('app_user_name', _userName);
      await prefs.setString('app_user_loc', _userLocation);
    } catch (_) {}
  }

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    _saveState();
    notifyListeners();
  }

  void setDarkMode(bool val) {
    _isDarkMode = val;
    _saveState();
    notifyListeners();
  }

  void completeOnboarding() {
    _hasCompletedOnboarding = true;
    _saveState();
    notifyListeners();
  }

  void resetOnboarding() {
    _hasCompletedOnboarding = false;
    _saveState();
    notifyListeners();
  }

  void setRole(UserRole role) {
    _selectedRole = role;
    _saveState();
    notifyListeners();
  }

  void setLanguage(String lang) {
    _selectedLanguage = lang;
    _saveState();
    notifyListeners();
  }

  void setUserProfile(String name, String location) {
    _userName = name;
    _userLocation = location;
    _saveState();
    notifyListeners();
  }
}
