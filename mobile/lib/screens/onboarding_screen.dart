import 'package:flutter/material.dart';
import '../services/user_state_service.dart';
import '../services/wallet_service.dart';
import '../theme/app_theme.dart';
import '../widgets/wallet_connect_modal.dart';

class OnboardingScreen extends StatefulWidget {
  final VoidCallback onFinish;

  const OnboardingScreen({Key? key, required this.onFinish}) : super(key: key);

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  final UserStateService _userState = UserStateService();
  final WalletService _walletService = WalletService();
  int _currentPage = 0;

  final List<Map<String, dynamic>> _slides = [
    {
      'badge': 'PROTOCOL OVERVIEW',
      'title': 'Autonomous Circular Economy Ledger',
      'subtitle': 'Modernizing India\'s ₹1.5L Crore Informal Scrap Sector',
      'desc': 'Transform unorganized scrap collection into a transparent, blockchain-verified supply chain with 6 autonomous AI agents and Polygon Amoy smart contracts.',
      'icon': Icons.all_inclusive,
      'accentColor': AppTheme.emerald,
      'stats': [
        {'label': 'Informal Workers', 'val': '15 Million+'},
        {'label': 'Annual Scrap', 'val': '62 MT'},
        {'label': 'EPR Deficit', 'val': '88%'},
      ],
    },
    {
      'badge': 'AGENT 01 & AGENT 04',
      'title': 'Indic Voice & Optical Vision AI',
      'subtitle': 'Zero-Literacy Ingestion in 5 Regional Languages',
      'desc': 'Point your phone camera for instant ISO 9001 quality grading and oxidation detection. Speak naturally in Hindi, Marathi, Tamil, Telugu, or Bengali to create verified scrap listings.',
      'icon': Icons.camera_alt,
      'accentColor': AppTheme.orange,
      'stats': [
        {'label': 'Vision Accuracy', 'val': '97.4%'},
        {'label': 'Scan Speed', 'val': '<2.0s'},
        {'label': 'Languages', 'val': '5 Indic'},
      ],
    },
    {
      'badge': 'AGENT 02 & AGENT 06',
      'title': 'EPA WARM Math & CPCB EPR Shield',
      'subtitle': 'Zero-Hallucination Scope 3 Carbon Calculations',
      'desc': 'Deterministic EPA WARM life-cycle emissions factors (9.13 kg CO₂e per kg Alum) with automated MoEFCC PWM Rules 2026 quota compliance and penalty avoidance.',
      'icon': Icons.calculate,
      'accentColor': AppTheme.teal,
      'stats': [
        {'label': 'Alum Offset', 'val': '9.13 kg/kg'},
        {'label': 'Avoided Penalty', 'val': '₹25k/MT'},
        {'label': 'Hallucination', 'val': '0.0%'},
      ],
    },
    {
      'badge': 'CUSTOMIZED EXPERIENCE',
      'title': 'Select Your Role & Language',
      'subtitle': 'Tailored Tools for Every Circular Economy Stakeholder',
      'desc': 'Configure your primary operating language and industry profile for localized voice commands and statutory compliance filings.',
      'icon': Icons.person_pin,
      'accentColor': AppTheme.purple,
      'isRoleSelector': true,
    },
  ];

  void _nextPage() {
    if (_currentPage < _slides.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 350),
        curve: Curves.easeInOut,
      );
    } else {
      _finishOnboarding();
    }
  }

  void _finishOnboarding() {
    _userState.completeOnboarding();
    widget.onFinish();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = _userState.isDarkMode;
    final bg = AppTheme.getBackground(isDark);
    final textMain = AppTheme.getTextMain(isDark);
    final textMuted = AppTheme.getTextMuted(isDark);

    return Scaffold(
      backgroundColor: bg,
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar with Skip & Theme Toggle
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(
                          color: AppTheme.emerald.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: AppTheme.emerald.withOpacity(0.4)),
                        ),
                        child: const Icon(Icons.all_inclusive, color: AppTheme.emerald, size: 16),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'CIRCULARCHAIN',
                        style: AppTheme.fontSans(
                          fontSize: 13,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 0.8,
                          color: textMain,
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      IconButton(
                        icon: Icon(
                          isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
                          size: 20,
                          color: textMuted,
                        ),
                        onPressed: () => _userState.toggleTheme(),
                      ),
                      if (_currentPage < _slides.length - 1)
                        TextButton(
                          onPressed: () {
                            _pageController.jumpToPage(_slides.length - 1);
                          },
                          child: Text(
                            'SKIP',
                            style: AppTheme.fontMono(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: AppTheme.orange,
                            ),
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),

            // PageView
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                itemCount: _slides.length,
                onPageChanged: (idx) => setState(() => _currentPage = idx),
                itemBuilder: (context, idx) {
                  final slide = _slides[idx];
                  if (slide['isRoleSelector'] == true) {
                    return _buildRoleSelectorSlide(isDark, textMain, textMuted);
                  }
                  return _buildIntroSlide(slide, isDark, textMain, textMuted);
                },
              ),
            ),

            // Bottom Navigation Controls
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  // Page Indicator Dots
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(_slides.length, (idx) {
                      final isActive = _currentPage == idx;
                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        width: isActive ? 24 : 7,
                        height: 7,
                        decoration: BoxDecoration(
                          color: isActive ? AppTheme.emerald : textMuted.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(4),
                        ),
                      );
                    }),
                  ),
                  const SizedBox(height: 20),

                  // Action Button
                  Row(
                    children: [
                      if (_currentPage > 0)
                        Padding(
                          padding: const EdgeInsets.only(right: 12),
                          child: OutlinedButton(
                            onPressed: () {
                              _pageController.previousPage(
                                duration: const Duration(milliseconds: 300),
                                curve: Curves.easeInOut,
                              );
                            },
                            style: OutlinedButton.styleFrom(
                              foregroundColor: textMain,
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 15),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                              side: BorderSide(color: AppTheme.getBorder(isDark)),
                            ),
                            child: const Icon(Icons.arrow_back, size: 20),
                          ),
                        ),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: _nextPage,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: _currentPage == _slides.length - 1
                                ? AppTheme.emerald
                                : AppTheme.orange,
                            foregroundColor: _currentPage == _slides.length - 1
                                ? Colors.black
                                : Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            elevation: 0,
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                _currentPage == _slides.length - 1
                                    ? 'LAUNCH PROTOCOL'
                                    : 'CONTINUE',
                                style: AppTheme.fontSans(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w900,
                                  letterSpacing: 0.8,
                                ),
                              ),
                              const SizedBox(width: 8),
                              Icon(
                                _currentPage == _slides.length - 1
                                    ? Icons.rocket_launch
                                    : Icons.arrow_forward,
                                size: 18,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildIntroSlide(Map<String, dynamic> slide, bool isDark, Color textMain, Color textMuted) {
    final Color accent = slide['accentColor'] as Color;
    final List<Map<String, String>> stats = List<Map<String, String>>.from(slide['stats'] ?? []);

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Badge
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: accent.withOpacity(0.15),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: accent.withOpacity(0.4)),
            ),
            child: Text(
              slide['badge'] as String,
              style: AppTheme.fontMono(
                fontSize: 10,
                fontWeight: FontWeight.bold,
                color: accent,
                letterSpacing: 0.5,
              ),
            ),
          ),
          const SizedBox(height: 16),

          // Central Visual Icon Box
          Center(
            child: Container(
              width: 110,
              height: 110,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    accent.withOpacity(0.25),
                    accent.withOpacity(0.05),
                    Colors.transparent,
                  ],
                ),
                border: Border.all(color: accent.withOpacity(0.5), width: 2),
                boxShadow: [
                  BoxShadow(
                    color: accent.withOpacity(0.2),
                    blurRadius: 30,
                    spreadRadius: 5,
                  ),
                ],
              ),
              child: Icon(slide['icon'] as IconData, size: 52, color: accent),
            ),
          ),
          const SizedBox(height: 24),

          // Title
          Text(
            slide['title'] as String,
            style: AppTheme.fontSans(
              fontSize: 22,
              fontWeight: FontWeight.w900,
              color: textMain,
              height: 1.2,
            ),
          ),
          const SizedBox(height: 6),

          // Subtitle
          Text(
            slide['subtitle'] as String,
            style: AppTheme.fontSans(
              fontSize: 13,
              fontWeight: FontWeight.w700,
              color: accent,
            ),
          ),
          const SizedBox(height: 14),

          // Description
          Text(
            slide['desc'] as String,
            style: AppTheme.fontSans(
              fontSize: 13,
              color: textMuted,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 24),

          // Stats Metrics
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.getSurfaceRaised(isDark),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.getBorder(isDark)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: stats.map((st) {
                return Column(
                  children: [
                    Text(
                      st['val']!,
                      style: AppTheme.fontSans(
                        fontSize: 16,
                        fontWeight: FontWeight.w900,
                        color: accent,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      st['label']!,
                      style: AppTheme.fontMono(
                        fontSize: 9,
                        color: textMuted,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRoleSelectorSlide(bool isDark, Color textMain, Color textMuted) {
    return AnimatedBuilder(
      animation: Listenable.merge([_userState, _walletService]),
      builder: (context, _) {
        return SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.purple.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppTheme.purple.withOpacity(0.4)),
                ),
                child: Text(
                  'SETUP YOUR PROFILE',
                  style: AppTheme.fontMono(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.purple,
                    letterSpacing: 0.5,
                  ),
                ),
              ),
              const SizedBox(height: 10),

              Text(
                'Select Operating Role',
                style: AppTheme.fontSans(
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                  color: textMain,
                ),
              ),
              const SizedBox(height: 10),

              // Role Cards
              _buildRoleCard(
                role: UserRole.aggregator,
                title: 'Grassroots Aggregator / Kabadiwala',
                desc: 'Voice-first listings in Hindi/Tamil, live MCX rate lookup, and instant cash settlements.',
                icon: Icons.storefront,
                color: AppTheme.orange,
                isDark: isDark,
              ),
              _buildRoleCard(
                role: UserRole.recycler,
                title: 'Certified Recycler & Smelter',
                desc: 'Weighbridge telemetry, batch purity testing, and secondary ingot minting.',
                icon: Icons.factory,
                color: AppTheme.emerald,
                isDark: isDark,
              ),
              _buildRoleCard(
                role: UserRole.oem,
                title: 'OEM / Corporate Compliance',
                desc: 'CPCB EPR quota fulfillment, avoided penalty calculator, and verified ESG certificates.',
                icon: Icons.business,
                color: AppTheme.teal,
                isDark: isDark,
              ),

              const SizedBox(height: 14),
              Text(
                'Primary Language',
                style: AppTheme.fontSans(
                  fontSize: 14,
                  fontWeight: FontWeight.w800,
                  color: textMain,
                ),
              ),
              const SizedBox(height: 8),

              // Language Grid
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  {'code': 'hi', 'label': 'हिन्दी (Hindi)'},
                  {'code': 'mr', 'label': 'मराठी (Marathi)'},
                  {'code': 'ta', 'label': 'தமிழ் (Tamil)'},
                  {'code': 'te', 'label': 'తెలుగు (Telugu)'},
                  {'code': 'bn', 'label': 'বাংলা (Bengali)'},
                  {'code': 'en', 'label': 'English'},
                ].map((l) {
                  final isSelected = _userState.selectedLanguage == l['code'];
                  return GestureDetector(
                    onTap: () => _userState.setLanguage(l['code']!),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? AppTheme.emerald.withOpacity(0.2)
                            : AppTheme.getSurfaceRaised(isDark),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: isSelected ? AppTheme.emerald : AppTheme.getBorder(isDark),
                          width: isSelected ? 1.5 : 1,
                        ),
                      ),
                      child: Text(
                        l['label']!,
                        style: AppTheme.fontSans(
                          fontSize: 11,
                          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                          color: isSelected ? AppTheme.emerald : textMain,
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),

              const SizedBox(height: 16),

              // Quick Wallet Connect Section
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.getSurfaceRaised(isDark),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppTheme.getBorder(isDark)),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: AppTheme.orange.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(Icons.account_balance_wallet, color: AppTheme.orange, size: 20),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _walletService.isConnected ? 'Wallet Connected' : 'Connect Polygon Wallet',
                            style: AppTheme.fontSans(fontWeight: FontWeight.bold, fontSize: 12, color: textMain),
                          ),
                          Text(
                            _walletService.isConnected
                                ? _walletService.shortAddress
                                : 'Polygon Amoy (80002) · Gasless',
                            style: AppTheme.fontMono(fontSize: 10, color: textMuted),
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () => WalletConnectModal.show(context),
                      child: Text(
                        _walletService.isConnected ? 'CHANGE' : 'CONNECT',
                        style: AppTheme.fontMono(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.emerald,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildRoleCard({
    required UserRole role,
    required String title,
    required String desc,
    required IconData icon,
    required Color color,
    required bool isDark,
  }) {
    final isSelected = _userState.selectedRole == role;
    final border = isSelected ? color : AppTheme.getBorder(isDark);
    final cardBg = isSelected
        ? color.withOpacity(0.12)
        : AppTheme.getSurfaceRaised(isDark);

    return GestureDetector(
      onTap: () => _userState.setRole(role),
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: cardBg,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: border, width: isSelected ? 1.8 : 1),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.2),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTheme.fontSans(
                      fontSize: 12.5,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.getTextMain(isDark),
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    desc,
                    style: AppTheme.fontSans(
                      fontSize: 10,
                      color: AppTheme.getTextMuted(isDark),
                      height: 1.3,
                    ),
                  ),
                ],
              ),
            ),
            if (isSelected)
              Icon(Icons.check_circle, color: color, size: 20)
            else
              Icon(Icons.radio_button_unchecked, color: AppTheme.getTextMuted(isDark), size: 18),
          ],
        ),
      ),
    );
  }
}
