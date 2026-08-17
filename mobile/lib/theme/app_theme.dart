import 'package:flutter/material.dart';

class AppTheme {
  // ---------------------------------------------------------------------------
  // COLOR TOKENS: CYBER OBSIDIAN DARK MODE (Vibrant Saffron Orange & Emerald)
  // ---------------------------------------------------------------------------
  static const Color darkBackground = Color(0xFF08090C);       // Deep Obsidian Onyx
  static const Color darkSurface = Color(0xFF0F131A);          // Frosted Slate Card
  static const Color darkSurfaceRaised = Color(0xFF161B26);    // Elevated Slate Card
  static const Color darkSurfaceSubtle = Color(0xFF1E2433);    // Interactive Surface Highlight
  static const Color darkBorder = Color(0xFF222B3D);           // Crisp Slate Border
  static const Color darkBorderSubtle = Color(0x33FFFFFF);     // 20% White Edge Glow

  // Vibrant Accents (Cyber Saffron & Mint Emerald)
  static const Color emerald = Color(0xFF00E599);              // Neon Mint Emerald #00E599
  static const Color emeraldDark = Color(0xFF059669);          // Deep Forest Green
  static const Color orange = Color(0xFFFF6B00);               // High-Voltage Saffron Orange #FF6B00
  static const Color amber = Color(0xFFF59E0B);                // Amber Gold #F59E0B
  static const Color teal = Color(0xFF38BDF8);                 // Cyber Sky Cyan #38BDF8
  static const Color purple = Color(0xFFA855F7);               // Electric Violet #A855F7
  static const Color red = Color(0xFFF87171);                  // Coral Red #F87171

  // ---------------------------------------------------------------------------
  // COLOR TOKENS: PARCHMENT NOTEBOOK LIGHT MODE (Artisan Paper & Warm Ochre)
  // ---------------------------------------------------------------------------
  static const Color lightBackground = Color(0xFFFAF8F5);      // Warm Artisan Paper
  static const Color lightSurface = Color(0xFFFFFFFF);         // Pure White Card
  static const Color lightSurfaceRaised = Color(0xFFF3EFEA);   // Warm Linen Card
  static const Color lightSurfaceSubtle = Color(0xFFEBE5DC);   // Warm Sand Highlight
  static const Color lightBorder = Color(0xFFD6CFC4);          // Vintage Notebook Border
  static const Color lightBorderSubtle = Color(0x22000000);    // 13% Black Shadow

  // Light Mode Accents
  static const Color lightEmerald = Color(0xFF059669);         // Rich Botanical Green
  static const Color lightOrange = Color(0xFFD97706);          // Artisan Saffron Amber
  static const Color lightTeal = Color(0xFF0284C7);            // Deep Blueprint Cyan

  // Dynamic Getters based on Theme Brightness
  static Color getBackground(bool isDark) => isDark ? darkBackground : lightBackground;
  static Color getSurface(bool isDark) => isDark ? darkSurface : lightSurface;
  static Color getSurfaceRaised(bool isDark) => isDark ? darkSurfaceRaised : lightSurfaceRaised;
  static Color getSurfaceSubtle(bool isDark) => isDark ? darkSurfaceSubtle : lightSurfaceSubtle;
  static Color getBorder(bool isDark) => isDark ? darkBorder : lightBorder;
  static Color getBorderSubtle(bool isDark) => isDark ? darkBorderSubtle : lightBorderSubtle;
  static Color getTextMain(bool isDark) => isDark ? const Color(0xFFFFFFFF) : const Color(0xFF18181B);
  static Color getTextSecondary(bool isDark) => isDark ? const Color(0xFFE2E8F0) : const Color(0xFF3F3F46);
  static Color getTextMuted(bool isDark) => isDark ? const Color(0xFF94A3B8) : const Color(0xFF71717A);
  static Color getPrimaryAccent(bool isDark) => isDark ? emerald : lightEmerald;
  static Color getSecondaryAccent(bool isDark) => isDark ? orange : lightOrange;

  // Legacy Static Aliases (for seamless backward compatibility)
  static const Color background = darkBackground;
  static const Color surface = darkSurface;
  static const Color surfaceRaised = darkSurfaceRaised;
  static const Color surfaceSubtle = darkSurfaceSubtle;
  static const Color border = darkBorder;
  static const Color borderSubtle = darkBorderSubtle;
  static const Color textMain = Color(0xFFFFFFFF);
  static const Color textSecondary = Color(0xFFE2E8F0);
  static const Color textMuted = Color(0xFF94A3B8);
  static const Color textLight = Color(0xFF64748B);

  // ---------------------------------------------------------------------------
  // TYPOGRAPHY ENGINE (Fast, Robust, Standard Sans & Mono)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // THEME DATA DEFINITIONS
  // ---------------------------------------------------------------------------
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: darkBackground,
      primaryColor: emerald,
      cardColor: darkSurface,
      dividerColor: darkBorder,
      fontFamily: 'sans-serif',
      colorScheme: const ColorScheme.dark(
        primary: emerald,
        secondary: orange,
        tertiary: teal,
        surface: darkSurface,
        onPrimary: darkBackground,
        onSurface: textMain,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: darkBackground,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: textMain),
      ),
      cardTheme: CardThemeData(
        color: darkSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
          side: const BorderSide(color: darkBorder, width: 1),
        ),
      ),
    );
  }

  static ThemeData get lightTheme {
    return ThemeData(
      brightness: Brightness.light,
      scaffoldBackgroundColor: lightBackground,
      primaryColor: lightEmerald,
      cardColor: lightSurface,
      dividerColor: lightBorder,
      fontFamily: 'sans-serif',
      colorScheme: const ColorScheme.light(
        primary: lightEmerald,
        secondary: lightOrange,
        tertiary: lightTeal,
        surface: lightSurface,
        onPrimary: Colors.white,
        onSurface: Color(0xFF18181B),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: lightBackground,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: Color(0xFF18181B)),
      ),
      cardTheme: CardThemeData(
        color: lightSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
          side: const BorderSide(color: lightBorder, width: 1),
        ),
      ),
    );
  }
}
