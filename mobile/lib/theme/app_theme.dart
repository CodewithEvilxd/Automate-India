import 'package:flutter/material.dart';

class AppTheme {
  // Deep Obsidian & Frosted Slate Palette (High-Tech FinTech & Web3 Aesthetics)
  static const Color background = Color(0xFF08090C);       // Deep Obsidian Onyx
  static const Color surface = Color(0xFF0F131A);          // Frosted Slate Card
  static const Color surfaceRaised = Color(0xFF161B26);    // Elevated Slate Card
  static const Color surfaceSubtle = Color(0xFF1E2433);    // Interactive Surface Highlight
  static const Color border = Color(0xFF222B3D);           // Crisp Slate Border
  static const Color borderSubtle = Color(0x28FFFFFF);     // 16% White Edge Glow

  // Vibrant Cyber Accents
  static const Color emerald = Color(0xFF00E599);          // Vibrant Mint Emerald #00E599
  static const Color teal = Color(0xFF38BDF8);             // Cyber Sky #38BDF8
  static const Color amber = Color(0xFFFBBF24);            // Amber Gold #FBBF24
  static const Color purple = Color(0xFFA855F7);           // Electric Violet #A855F7
  static const Color red = Color(0xFFF87171);              // Coral Red #F87171

  // Typography Tokens
  static const Color textMain = Color(0xFFFFFFFF);         // Pure Crisp White
  static const Color textSecondary = Color(0xFFE2E8F0);    // Slate 200 Soft White
  static const Color textMuted = Color(0xFF94A3B8);        // Slate 400 High Contrast Muted
  static const Color textLight = Color(0xFF64748B);        // Slate 500 Micro Text

  // Legacy Aliases
  static const Color ink = background;
  static const Color bone = textMain;
  static const Color moss = emerald;
  static const Color muted = textMuted;

  // Ultra-Crisp Typography Engine (100% Robust & Native)
  static TextStyle fontSans({
    double? fontSize,
    FontWeight? fontWeight,
    Color? color,
    double? letterSpacing,
    double? height,
    FontStyle? fontStyle,
  }) {
    return TextStyle(
      fontFamily: 'sans-serif',
      fontSize: fontSize ?? 12,
      fontWeight: fontWeight ?? FontWeight.normal,
      color: color ?? textMain,
      letterSpacing: letterSpacing,
      height: height,
      fontStyle: fontStyle,
    );
  }

  static TextStyle fontMono({
    double? fontSize,
    FontWeight? fontWeight,
    Color? color,
    double? letterSpacing,
    double? height,
  }) {
    return TextStyle(
      fontFamily: 'monospace',
      fontSize: fontSize ?? 11,
      fontWeight: fontWeight ?? FontWeight.normal,
      color: color ?? textMain,
      letterSpacing: letterSpacing,
      height: height,
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      primaryColor: emerald,
      cardColor: surface,
      dividerColor: border,
      fontFamily: 'sans-serif',
      colorScheme: const ColorScheme.dark(
        primary: emerald,
        secondary: teal,
        surface: surface,
        onPrimary: background,
        onSurface: textMain,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: background,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: textMain),
      ),
      cardTheme: CardThemeData(
        color: surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
          side: const BorderSide(color: border, width: 1),
        ),
      ),
    );
  }
}
