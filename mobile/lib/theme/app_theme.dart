import 'package:flutter/material.dart';

class AppTheme {
  // Exact Color Tokens
  static const Color ink = Color(0xFF10140F);
  static const Color surface = Color(0xFF1B211A);
  static const Color surfaceRaised = Color(0xFF232B22);
  static const Color border = Color(0xFF2E362C);
  static const Color moss = Color(0xFF4E9B6F);
  static const Color amber = Color(0xFFD98A3D);
  static const Color bone = Color(0xFFEDEAE0);
  static const Color muted = Color(0xFF8B9188);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: ink,
      primaryColor: moss,
      cardColor: surface,
      dividerColor: border,
      colorScheme: const ColorScheme.dark(
        primary: moss,
        secondary: amber,
        surface: surface,
        background: ink,
        onPrimary: ink,
        onSurface: bone,
        onBackground: bone,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: ink,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: bone,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
