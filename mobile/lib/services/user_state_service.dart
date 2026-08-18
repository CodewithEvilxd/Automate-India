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
  String _selectedLanguage = 'hi'; // Default Hindi
  String _userName = '';           // Empty by default (asks user or displays role)
  String _userLocation = 'Delhi / NCR';
  String _spcbJurisdiction = 'DPCC (Delhi NCR Hub)';

  static const List<String> availableSpcbHubs = [
    'DPCC (Delhi NCR Hub)',
    'UPPCB (Noida / UP Hub)',
    'MPCB (Mumbai / Pune Cluster)',
    'GPCB (Sanand / Ahmedabad Zone)',
    'KSPCB (Bengaluru Industrial Hub)',
    'TNPCB (Chennai / Coimbatore Cluster)',
    'RSPCB (Jaipur / Bhiwadi Zone)',
    'WBPCB (Kolkata / Asansol Belt)',
    'PSPCB (Ludhiana Industrial Hub)',
    'TSPCB (Hyderabad Cluster)',
    'HSPCB (Gurugram / Manesar Hub)',
  ];

  // Getters
  bool get isDarkMode => _isDarkMode;
  bool get hasCompletedOnboarding => _hasCompletedOnboarding;
  UserRole get selectedRole => _selectedRole;
  String get selectedLanguage => _selectedLanguage;
  String get userName => _userName;
  String get userLocation => _userLocation;
  String get spcbJurisdiction => _spcbJurisdiction;

  String get displayName {
    if (_userName.trim().isNotEmpty) {
      return _userName.trim();
    }
    switch (_selectedRole) {
      case UserRole.aggregator:
        return 'Independent Aggregator';
      case UserRole.recycler:
        return 'Registered Smelter Unit';
      case UserRole.oem:
        return 'Corporate Enterprise User';
    }
  }

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
      _userName = prefs.getString('app_user_name') ?? '';
      _userLocation = prefs.getString('app_user_loc') ?? 'Delhi / NCR';
      _spcbJurisdiction = prefs.getString('app_spcb_hub') ?? 'DPCC (Delhi NCR Hub)';
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
      await prefs.setString('app_spcb_hub', _spcbJurisdiction);
    } catch (_) {}
  }

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    _saveState();
    notifyListeners();
  }

  void setRole(UserRole role) {
    _selectedRole = role;
    _saveState();
    notifyListeners();
  }

  void setLanguage(String langCode) {
    _selectedLanguage = langCode;
    _saveState();
    notifyListeners();
  }

  void updateProfile({
    String? name,
    String? location,
    UserRole? role,
    String? language,
    String? spcbHub,
  }) {
    if (name != null) _userName = name.trim();
    if (location != null) _userLocation = location.trim();
    if (role != null) _selectedRole = role;
    if (language != null) _selectedLanguage = language;
    if (spcbHub != null) _spcbJurisdiction = spcbHub;
    _saveState();
    notifyListeners();
  }

  void setSpcbHub(String hub) {
    _spcbJurisdiction = hub;
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
}
