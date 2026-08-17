import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/marketplace_screen.dart';
import 'screens/camera_scan_screen.dart';
import 'screens/epr_calculator_screen.dart';
import 'screens/leaderboard_screen.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const CircularChainApp());
}

class CircularChainApp extends StatelessWidget {
  const CircularChainApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CircularChain',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const MainNavigationShell(),
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

  void _navigateTo(int index) {
    setState(() => _currentIndex = index);
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> screens = [
      HomeScreen(onNavigate: _navigateTo),
      const MarketplaceScreen(),
      const CameraScanScreen(),
      const EPRCalculatorScreen(),
      const LeaderboardScreen(),
    ];

    return Scaffold(
      backgroundColor: AppTheme.background,
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: AppTheme.surface,
          border: Border(top: BorderSide(color: AppTheme.border, width: 1)),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) => setState(() => _currentIndex = index),
          backgroundColor: AppTheme.surface,
          selectedItemColor: AppTheme.emerald,
          unselectedItemColor: AppTheme.textMuted,
          type: BottomNavigationBarType.fixed,
          elevation: 0,
          selectedLabelStyle: AppTheme.fontSans(
            fontSize: 10,
            fontWeight: FontWeight.w700,
            letterSpacing: 0.2,
          ),
          unselectedLabelStyle: AppTheme.fontSans(
            fontSize: 9.5,
            fontWeight: FontWeight.w500,
          ),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.dashboard_outlined, size: 20),
              activeIcon: Icon(Icons.dashboard, size: 20),
              label: 'Command',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.storefront_outlined, size: 20),
              activeIcon: Icon(Icons.storefront, size: 20),
              label: 'Market',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.camera_alt_outlined, size: 20),
              activeIcon: Icon(Icons.camera_alt, size: 20),
              label: 'AI Scanner',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.calculate_outlined, size: 20),
              activeIcon: Icon(Icons.calculate, size: 20),
              label: 'EPR Calc',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.leaderboard_outlined, size: 20),
              activeIcon: Icon(Icons.leaderboard, size: 20),
              label: 'Rankings',
            ),
          ],
        ),
      ),
    );
  }
}
