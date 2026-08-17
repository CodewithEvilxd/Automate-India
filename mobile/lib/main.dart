import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/marketplace_screen.dart';
import 'screens/camera_scan_screen.dart';
import 'screens/epr_calculator_screen.dart';
import 'screens/docs_screen.dart';
import 'screens/leaderboard_screen.dart';
import 'screens/onboarding_screen.dart';
import 'services/user_state_service.dart';
import 'services/wallet_service.dart';
import 'theme/app_theme.dart';
import 'widgets/wallet_connect_modal.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const CircularChainApp());
}

class CircularChainApp extends StatelessWidget {
  const CircularChainApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final userState = UserStateService();

    return AnimatedBuilder(
      animation: userState,
      builder: (context, _) {
        return MaterialApp(
          title: 'CircularChain',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: userState.isDarkMode ? ThemeMode.dark : ThemeMode.light,
          home: const AppRootRouter(),
        );
      },
    );
  }
}

class AppRootRouter extends StatelessWidget {
  const AppRootRouter({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final userState = UserStateService();

    return AnimatedBuilder(
      animation: userState,
      builder: (context, _) {
        if (!userState.hasCompletedOnboarding) {
          return OnboardingScreen(
            onFinish: () {
              userState.completeOnboarding();
            },
          );
        }
        return const MainNavigationShell();
      },
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({Key? key}) : super(key: key);

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;
  final UserStateService _userState = UserStateService();
  final WalletService _walletService = WalletService();

  void _navigateTo(int index) {
    setState(() => _currentIndex = index);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = _userState.isDarkMode;
    final bg = AppTheme.getBackground(isDark);
    final surface = AppTheme.getSurface(isDark);
    final border = AppTheme.getBorder(isDark);
    final textMain = AppTheme.getTextMain(isDark);
    final textMuted = AppTheme.getTextMuted(isDark);

    final List<Widget> screens = [
      HomeScreen(onNavigate: _navigateTo),
      const MarketplaceScreen(),
      const CameraScanScreen(),
      const EPRCalculatorScreen(),
      const DocsScreen(),
      const LeaderboardScreen(),
    ];

    return Scaffold(
      backgroundColor: bg,
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: surface,
          border: Border(top: BorderSide(color: border, width: 1.2)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(isDark ? 0.4 : 0.06),
              blurRadius: 16,
              offset: const Offset(0, -4),
            ),
          ],
        ),
        child: SafeArea(
          child: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: (index) => setState(() => _currentIndex = index),
            backgroundColor: surface,
            selectedItemColor: isDark ? AppTheme.emerald : AppTheme.lightEmerald,
            unselectedItemColor: textMuted,
            type: BottomNavigationBarType.fixed,
            elevation: 0,
            selectedLabelStyle: AppTheme.fontSans(
              fontSize: 9.5,
              fontWeight: FontWeight.w800,
              letterSpacing: 0.2,
            ),
            unselectedLabelStyle: AppTheme.fontSans(
              fontSize: 9.0,
              fontWeight: FontWeight.w600,
            ),
            items: [
              const BottomNavigationBarItem(
                icon: Icon(Icons.dashboard_outlined, size: 20),
                activeIcon: Icon(Icons.dashboard, size: 20),
                label: 'Command',
              ),
              const BottomNavigationBarItem(
                icon: Icon(Icons.storefront_outlined, size: 20),
                activeIcon: Icon(Icons.storefront, size: 20),
                label: 'Market',
              ),
              BottomNavigationBarItem(
                icon: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: AppTheme.orange.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.camera_alt, color: AppTheme.orange, size: 18),
                ),
                activeIcon: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: AppTheme.orange,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.camera_alt, color: Colors.white, size: 18),
                ),
                label: 'AI Scanner',
              ),
              const BottomNavigationBarItem(
                icon: Icon(Icons.calculate_outlined, size: 20),
                activeIcon: Icon(Icons.calculate, size: 20),
                label: 'EPR Calc',
              ),
              const BottomNavigationBarItem(
                icon: Icon(Icons.menu_book_outlined, size: 20),
                activeIcon: Icon(Icons.menu_book, size: 20),
                label: 'Field Docs',
              ),
              const BottomNavigationBarItem(
                icon: Icon(Icons.leaderboard_outlined, size: 20),
                activeIcon: Icon(Icons.leaderboard, size: 20),
                label: 'Rankings',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
